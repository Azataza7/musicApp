import { Router } from 'express';
import Album from '../models/Album';
import { imagesUpload } from '../multer';
import { AlbumType } from '../types';

const albumRouter = Router();

albumRouter.get('/', async (req, res, next) => {
  const searchByArtistId = req.query.artist;


  try {
    if (searchByArtistId) {
      const results: AlbumType[] = await Album.find({artist: searchByArtistId})
        .populate('artist', '_id name information image')
        .sort({date_release: -1})
        .lean();

      if (!results || results.length === 0) {
        return res.status(404).send({error: 'Not Found!'});
      }

      return res.send(results);
    } else {
      const results: AlbumType[] = await Album.find()
        .populate('artist', '_id name information image');

      return res.send(results);
    }
  } catch (e: any) {
    next(e);

    if (e.name === 'CastError') {
      return res.status(400).send({error: 'Invalid artist id format'});
    }
  }
});

albumRouter.get('/:id', async (req, res, next) => {
  const _id: string = req.params.id;

  try {
    const result: AlbumType | null = await Album.findOne({_id})
      .populate('artist', '_id name information image');

    if (!result) {
      res.status(404).send({error: 'Not Found'});
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    next(e);
  }
});

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

  const album: AlbumType = {
    name: req.body.name,
    artist: req.body.artist ? req.body.artist :
      res.status(400).send({error: 'artist is required'}),
    date_release: req.body.date_release,
    image: req.file ? req.file.filename : null
  };

  try {
    const newAlbum = await new Album(album);
    await newAlbum.save();

    return res.status(201).send(newAlbum);
  } catch (e) {
    next(e);
  }
});

export default albumRouter;