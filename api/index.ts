import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import albumRouter from './routers/albumRouter';
import artistRouter from './routers/artistRouter';
import trackRouter from './routers/trackRouter';
import userRouter from './routers/userRouter';
import trackHistoryRouter from './routers/trackHistoryRouter';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/albums', albumRouter);
app.use('/artist', artistRouter);
app.use('/track', trackRouter);
app.use('/users', userRouter);
app.use('/track_history', trackHistoryRouter)

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
