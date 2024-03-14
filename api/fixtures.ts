import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';


const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
    await db.dropCollection('users');

  } catch (e) {
    console.log('Collections were not present, skipping drop');
  }

  await User.create(
    {
      email: 'superUser',
      password: 'admin123',
      token: 'adminToken',
      role: 'admin',
      displayName: 'Dirty Billy'
    },
    {
      email: 'user',
      password: 'admin123',
      token: 'userToken',
      role: 'user',
      displayName: 'Double wide Joe',
    }
  );

  const [artist1, artist2, artist3] = await Artist.create(
    {
      name: 'Mick Gordon',
      image: 'fixtures/Mick_Gordon.jpeg',
      information: 'Music from the Hell',
      isPublished: true
    },
    {
      name: 'Justin Timberlake',
      image: 'fixtures/Justin-Timberlake.webp',
      information: 'Singer, Actor, gorgeous man',
      isPublished: true
    },
    {
      name: 'TINI',
      image: 'fixtures/Tini.png',
      information: 'Fresh talent',
      isPublished: false
    }
  );

  const [album1, album2, album3, album4, album5] = await Album.create(
    {
      name: 'Doom Guy',
      artist: artist1,
      date_release: 2020,
      image: 'fixtures/doom_guy.webp',
      isPublished: true
    },
    {
      name: 'Reap and Tear',
      artist: artist1,
      date_release: 2016,
      image: 'fixtures/reapandtear.png',
      isPublished: true
    },
    {
      name: 'Dance like Justin Timberlake',
      artist: artist2,
      date_release: 2013,
      image: 'fixtures/justinDancing.jpg',
      isPublished: true
    },
    {
      name: 'Sexy Back',
      artist: artist2,
      date_release: 2018,
      image: 'fixtures/sexy.jpeg',
      isPublished: true
    },
    {
      name: 'Cupido',
      artist: artist3,
      date_release: 2020,
      image: 'fixtures/tini_cupido.jpeg',
      isPublished: false
    }
  );

  await Track.create(
    {name: '10K BFG', album: album1, artist: artist1, durationTime: '4:34', trackNumber: 1, isPublished: true},
    {
      name: 'Hell on the Earth',
      album: album1,
      artist: artist1,
      durationTime: '3:14',
      trackNumber: 2,
      isPublished: true
    },
    {name: 'Cultist Base', album: album1, artist: artist1, durationTime: '5:04', trackNumber: 3, isPublished: true},
    {
      name: 'At the Doom\'s Gate',
      album: album1,
      artist: artist1,
      durationTime: '2:12',
      trackNumber: 4,
      isPublished: true
    },
    {
      name: 'The Super gone nest',
      album: album1,
      artist: artist1,
      durationTime: '3:55',
      trackNumber: 5,
      isPublished: true
    },

    {name: 'Meat Hook', album: album2, artist: artist1, durationTime: '6:04', trackNumber: 1, isPublished: true},
    {name: 'Inferno', album: album2, artist: artist1, durationTime: '1:56', trackNumber: 2, isPublished: true},
    {name: 'Eternal', album: album2, artist: artist1, durationTime: '4:00', trackNumber: 3, isPublished: true},
    {
      name: 'Rust, Dust & Guts',
      album: album2,
      artist: artist1,
      durationTime: '3:15',
      trackNumber: 4,
      isPublished: true
    },
    {name: 'Metal Hell', album: album2, artist: artist1, durationTime: '2:45', trackNumber: 5, isPublished: true},

    {name: 'Better Place', album: album3, artist: artist2, durationTime: '3:02', trackNumber: 1, isPublished: true},
    {name: 'Selfish', album: album3, artist: artist2, durationTime: '2:58', trackNumber: 2, isPublished: true},
    {name: 'Cry Me a River', album: album3, artist: artist2, durationTime: '2:22', trackNumber: 3, isPublished: true},
    {name: 'Mirrors', album: album3, artist: artist2, durationTime: '4:00', trackNumber: 4, isPublished: true},
    {name: 'Perfect', album: album3, artist: artist2, durationTime: '2:42', trackNumber: 5, isPublished: true},

    {name: 'SexyBack', album: album4, artist: artist2, durationTime: '3:10', trackNumber: 1, isPublished: true},
    {name: 'Like i love you', album: album4, artist: artist2, durationTime: '2:43', trackNumber: 2, isPublished: true},
    {
      name: 'Cant stop the Feeling',
      album: album4,
      artist: artist2,
      durationTime: '2:34',
      trackNumber: 3,
      isPublished: true
    },
    {name: 'Selfish', album: album4, artist: artist2, durationTime: '3:44', trackNumber: 4, isPublished: true},
    {
      name: 'Until the end of time',
      album: album4,
      artist: artist2,
      durationTime: '2:24',
      trackNumber: 5,
      isPublished: true
    },

    {name: 'Cupido', album: album5, artist: artist3, durationTime: '3:05', trackNumber: 1, isPublished: false},
    {name: 'Muñecas', album: album5, artist: artist3, durationTime: '2:56', trackNumber: 2, isPublished: false},
    {name: 'Las Jordans', album: album5, artist: artist3, durationTime: '2:55', trackNumber: 3, isPublished: false},
  );

  await db.close();
};

run().catch(console.error);