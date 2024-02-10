import mongoose, { Schema, Types } from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Artist.findById(value),
      message: 'Artist not found!',
    }
  },
  date_release: {
    type: String,
    required: true
  },
  image: {
    type: String,
  }
});

const Album = mongoose.model('album', AlbumSchema);

export default Album;