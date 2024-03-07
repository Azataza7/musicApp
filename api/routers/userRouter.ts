import { Router } from 'express';
import User from '../models/User';
import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const userRouter = Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = new User({username, password});

    user.generateToken();

    await user.save();
    res.status(201).send({message: 'ok', user});

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const token = randomUUID();

    const user = await User.findOne({username: req.body.username});

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({error: 'Username or password is wrong'});
    }

    user.token = token;
    await user.save();
    return res.send({message: 'Success!', user});
  } catch (e) {
    next(e);
  }
});

userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.send({message: 'No token or invalid'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send({error: 'User not Found'});
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'Success'});
  } catch (e) {
    return next(e);
  }
});

export default userRouter;
