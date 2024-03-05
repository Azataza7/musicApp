import mongoose, { Schema } from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  information: {
    type: String
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

const Artist = mongoose.model('artist', ArtistSchema);

export default Artist;