import { NextFunction, Request, Response, Router } from 'express';
import Artist from '../models/Artist';
import { ArtistType } from '../types';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import permit from '../middleware/permit';


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

artistRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
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

artistRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedArtist = await Artist.findByIdAndDelete(id);

    if (!deletedArtist) {
      return res.status(404).send({error: 'Artist not found.'});
    }

    return res.send({message: 'success', deletedArtist});
  } catch (e) {
    next(e);
  }
});

artistRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({error: 'Artist not found.'});
    }

    artist.isPublished = !artist.isPublished;
    await artist.save();

    res.send({message: 'success', artist});
  } catch (e) {
    next(e)
  }
});

export default artistRouter;