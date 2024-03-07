import { Router, Request, Response, NextFunction } from 'express';
import Track from '../models/Track';
import { AlbumTypeWithId, TrackType } from '../types';
import Album from '../models/Album';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const trackRouter = Router();

trackRouter.get('/', async (req, res, next) => {
  const searchByAlbum = req.query.album;
  const searchByArtist = req.query.artist;

  try {
    if (searchByAlbum) {
      const results: TrackType[] = await Track.find({album: searchByAlbum}).sort({trackNumber: 1})
        .populate({
          path: 'album', select: '_id name date_release image',
          populate: {
            path: 'artist',
            select: '_id name image'
          }
        });

      if (!results || results.length === 0) {
        return res.status(404).send({error: 'Not Found!'});
      }

      return res.send(results);

    } else if (searchByArtist) {
      const albums: AlbumTypeWithId[] = await Album.find({artist: searchByArtist}, '_id');
      const albumIds = albums.map(album => album._id);

      const results: TrackType[] = await Track.find({album: {$in: albumIds}})
        .populate('album', '_id name artist date_release image');
      if (!results || results.length === 0) {
        return res.status(404).send({error: 'Not Found!'});
      }

      return res.send(results);
    } else {
      const results: TrackType[] = await Track.find().populate('album', '_id name artist date_release image');

      return res.send(results);
    }
  } catch (e: any) {
    if (e.name === 'CastError') {
      return res.status(400).send({error: 'Invalid album id format'});
    }

    next(e);
  }
});

trackRouter.post('/', auth, async (req, res, next) => {
  const trackCount = await Track.countDocuments({album: req.body.album});


  const track: TrackType = {
    name: req.body.name,
    album: req.body.album,
    durationTime: req.body.durationTime,
    trackNumber: trackCount + 1
  };

  try {
    const newTrack = await new Track(track);
    newTrack.save();

    return res.status(201).send(newTrack);

  } catch (e) {
    next(e);
  }
});

trackRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedTrack = await Track.findByIdAndDelete(id);

    if (!deletedTrack) {
      return res.status(404).send({error: 'Track not found.'});
    }

    return res.send({message: 'success', deletedTrack});
  } catch (e) {
    next(e);
  }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({error: 'Track not found.'});
    }

    track.isPublished = !track.isPublished;
    await track.save();

    res.send({message: 'success', track});
  } catch (e) {
    next(e);
  }
});

export default trackRouter;