import { Router } from 'express';
import Track from '../models/Track';
import { TrackType } from '../types';

const trackRouter = Router();

trackRouter.get('/', async (req, res, next) => {
  const searchByAlbum = req.query.album;

  try {
    if (searchByAlbum) {
      const results = await Track.find({album: searchByAlbum})
        .populate('album', '_id name artist date_release image');

      if (!results || results.length === 0) {
        return res.status(404).send({error: 'Not Found!'});
      }

      return res.send(results);
    } else {
      const results = await Track.find().populate('album', '_id name artist date_release image');

      return res.send(results);
    }
  } catch (e: any) {
    if (e.name === 'CastError') {
      return res.status(400).send({error: 'Invalid album id format'});
    }

    next(e);
  }
});

trackRouter.post('/', async (req, res, next) => {
  const track: TrackType = {
    name: req.body.name,
    album: req.body.album,
    durationTime: req.body.durationTime,
  };

  try {
    const newTrack = await new Track(track);
    newTrack.save();

    return res.status(201).send(newTrack);

  } catch (e) {
    next(e);
  }
});

export default trackRouter;