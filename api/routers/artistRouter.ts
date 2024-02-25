import { Router } from 'express';
import Artist from '../models/Artist';
import { ArtistType } from '../types';
import { imagesUpload } from '../multer';

const artistRouter = Router();

artistRouter.get('/', async (req, res, next) => {
  const id = req.query.id;

  try {
    if (id) {
      const result: ArtistType | null = await Artist.findById(id);
      return res.send(result);
    } else {
      const results: ArtistType[] = await Artist.find();
      return res.send(results);
    }
  } catch (e) {
    next(e);
  }
});

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  const artist: ArtistType = {
    name: req.body.name ? req.body.name :
      res.status(400).send({error: 'Name is required'}),
    image: req.file ? req.file.filename : null,
    information: req.body.information ? req.body.information : null,
  };

  try {
    const newArtist = await new Artist(artist);
    await newArtist.save();

    return res.status(201).send(newArtist);
  } catch (e) {
    next(e);
  }
});

export default artistRouter;