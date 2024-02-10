import { Router } from 'express';
import Album from '../models/Album';

const albumRouter = Router();

albumRouter.get('/', async (req, res, next) => {
  try {
    const results = await Album.find();

    return res.send(results);
  } catch (e) {
    next(e);
  }
});

export default albumRouter