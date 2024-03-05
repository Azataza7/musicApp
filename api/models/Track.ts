import mongoose, { Schema, Types } from 'mongoose';
import Album from './Album';
import Artist from './Artist';

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Album.findById(value),
      message: 'Album not found',
    }
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Artist.findById(value),
      message: 'Artist not found',
    },
  },
  durationTime: {
    type: String
  },
  trackNumber: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

const Track = mongoose.model('track', TrackSchema);

export default Track;