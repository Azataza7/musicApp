import { Router } from 'express';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';

const trackHistoryRouter = Router();

trackHistoryRouter.get('/', async (req, res, next) => {
  const authToken = req.headers.authorization;

  try {
    const user = await User.findOne({token: authToken});

    if (!user) {
      return res.status(500).send({error: 'No permission'})
    }

    const results = await TrackHistory.find({user: user._id})
      .populate('user')
      .populate('track');

    return res.send(results)
  } catch (e) {
    next(e)
  }
});

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const user = await User.findOne({token: authToken});

    if (!authToken || !user) {
      return res.status(401).json({error: 'Unauthorized - Token missing or User not Found'});
    }

    const {track} = req.body;

    const trackData = await Track.findById(track).populate({path: 'album'});

    const trackHistory = new TrackHistory({
      user: user,
      track: trackData,
    });

    await trackHistory.save();

    return res.status(201).json({message: 'TrackHistory created successfully', trackHistory});

  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;
