import mongoose, { Schema, Types } from 'mongoose';
import Album from './Album';

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Album.findById(value),
      message: 'Album not found',
    }
  },
  durationTime: {
    type: String
  }
});

const Track = mongoose.model('track', TrackSchema);

export default Track;