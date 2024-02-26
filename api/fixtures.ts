import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';


const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop');
  }


  const [artist1, artist2] = await Artist.create(
    {
      name: 'Mick Gordon',
      image: 'fixtures/Mick_Gordon.jpeg',
      information: 'Music from the Hell'
    },
    {
      name: 'Justin Timberlake',
      image: 'fixtures/Justin-Timberlake.webp',
      information: 'Singer, Actor, gorgeous man'
    },
  );

  const [album1, album2, album3, album4] = await Album.create(
    {
      name: 'Doom Guy',
      artist: artist1,
      date_release: 2020,
      image: 'fixtures/doom_guy.webp'
    },
    {
      name: 'Reap and Tear',
      artist: artist1,
      date_release: 2016,
      image: 'fixtures/reapandtear.png'
    },
    {
      name: 'Dance like Justin Timberlake',
      artist: artist2,
      date_release: 2013,
      image: 'fixtures/justinDancing.jpg'
    },
    {
      name: 'Sexy Back',
      artist: artist2,
      date_release: 2018,
      image: 'fixtures/sexy.jpeg'
    },
  );

  await Track.create(
    {
      name: '10K BFG',
      album: album1,
      artist: artist1,
      durationTime: '4:34',
      trackNumber: 1
    },
    {
      name: 'Hell on the Earth',
      album: album1,
      artist: artist1,
      durationTime: '3:14',
      trackNumber: 2
    },
    {
      name: 'Cultist Base',
      album: album1,
      artist: artist1,
      durationTime: '5:04',
      trackNumber: 3
    },
    {
      name: "At the Doom's Gate",
      album: album1,
      artist: artist1,
      durationTime: '2:12',
      trackNumber: 4
    },
    {
      name: 'The Super gone nest',
      album: album1,
      artist: artist1,
      durationTime: '3:55',
      trackNumber: 5
    },

    {
      name: 'Meat Hook',
      album: album2,
      artist: artist1,
      durationTime: '6:04',
      trackNumber: 1
    },
    {
      name: 'Inferno',
      album: album2,
      artist: artist1,
      durationTime: '1:56',
      trackNumber: 2
    },
    {
      name: 'Eternal',
      album: album2,
      artist: artist1,
      durationTime: '4:00',
      trackNumber: 3
    },
    {
      name: "Rust, Dust & Guts",
      album: album2,
      artist: artist1,
      durationTime: '3:15',
      trackNumber: 4
    },
    {
      name: 'Metal Hell',
      album: album2,
      artist: artist1,
      durationTime: '2:45',
      trackNumber: 5
    },

    {
      name: 'Better Place',
      album: album3,
      artist: artist2,
      durationTime: '3:02',
      trackNumber: 1
    },
    {
      name: 'Selfish',
      album: album3,
      artist: artist2,
      durationTime: '2:58',
      trackNumber: 2
    },
    {
      name: 'Cry Me a River',
      album: album3,
      artist: artist2,
      durationTime: '2:22',
      trackNumber: 3
    },
    {
      name: 'Mirrors',
      album: album3,
      artist: artist2,
      durationTime: '4:00',
      trackNumber: 4
    },
    {
      name: 'Perfect',
      album: album3,
      artist: artist2,
      durationTime: '2:42',
      trackNumber: 5
    },

    {
      name: 'SexyBack',
      album: album4,
      artist: artist2,
      durationTime: '3:10',
      trackNumber: 1
    },
    {
      name: 'Like i love you',
      album: album4,
      artist: artist2,
      durationTime: '2:43',
      trackNumber: 2
    },
    {
      name: 'Cant stop the Feeling',
      album: album4,
      artist: artist2,
      durationTime: '2:34',
      trackNumber: 3
    },
    {
      name: 'Selfish',
      album: album4,
      artist: artist2,
      durationTime: '3:44',
      trackNumber: 4
    },
    {
      name: 'Until the end of time',
      album: album4,
      artist: artist2,
      durationTime: '2:24',
      trackNumber: 5
    },
  );


  await db.close();
};

run().catch(console.error);