import { NextFunction, Request, Response, Router } from 'express';
import Album from '../models/Album';
import { imagesUpload } from '../multer';
import { AlbumType, AlbumTypeWithId } from '../types';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';


const albumRouter = Router();

albumRouter.get('/', async (req, res, next) => {
  const searchByArtistId = req.query.artist;

  try {
    if (searchByArtistId) {
      const results: AlbumTypeWithId[] = await Album.find({artist: searchByArtistId})
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
  } catch (error) {
    if (mongoose.MongooseError) {
      return res.status(400).send({error: 'Invalid artist id format'});
    }

    next(error);
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

albumRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {

  const album: AlbumType = {
    name: req.body.name,
    artist: req.body.artist ? req.body.artist :
      res.status(400).send({error: 'artist is required'}),
    date_release: Number(req.body.date_release),
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

albumRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedAlbum = await Album.findByIdAndDelete(id);

    if (!deletedAlbum) {
      return res.status(404).send({ error: 'Album not found.' });
    }

    return res.send({message: 'success', deletedAlbum});
  } catch (e) {
    next(e);
  }
});

albumRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({error: 'Album not found.'});
    }

    album.isPublished = !album.isPublished;
    await album.save();

    res.send({message: 'success', album});
  } catch (e) {
    next(e)
  }
});

export default albumRouter;