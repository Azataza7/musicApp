import { Schema } from 'mongoose';

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },

});