import mongoose, { Schema, Types } from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Artist.findById(value),
      message: 'Artist not found!',
    }
  },
  date_release: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

const Album = mongoose.model('album', AlbumSchema);

export default Album;