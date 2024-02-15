import { Router } from 'express';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const user = await User.findOne({token: authToken});

    if (!authToken || !user) {
      return res.status(401).json({error: 'Unauthorized - Token missing or User not Found'});
    }

    const {track} = req.body;

    const trackHistory = new TrackHistory({
      user: user._id,
      track: track
    });

    await trackHistory.save();

    return res.status(201).json({message: 'TrackHistory created successfully', trackHistory});

  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;
