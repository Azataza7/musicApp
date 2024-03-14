import { Router } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';

const userRouter = Router();
const client = new OAuth2Client(config.google.clientId);

userRouter.post('/', async (req, res, next) => {
  try {
    const {email, password, displayName} = req.body;
    const user = new User({email, password, displayName});

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

    const user = await User.findOne({email: req.body.email});

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({error: 'email or password is wrong'});
    }

    user.token = token;
    await user.save();
    return res.send({message: 'Success!', user});
  } catch (e) {
    next(e);
  }
});

userRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: 'Google login error'});
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];

    if (!email) {
      res.status(400).send({error: 'Email is not presented'});
    }

    let user = await User.findOne({googleID: id});

    if (!user) {
      user = new User({
        email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
        avatar
      });
    }

    user.generateToken();
    await user.save();

    return res.send({message: 'you authenticated by Google!', user});
  } catch (e) {
    return next(e);
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
