import mongoose, { Schema, Types } from 'mongoose';
import User from './User';
import Track from './Track';

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: 'User not found',
    }
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'track',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Track.findById(value),
      message: 'Track not found',
    }
  },
  datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
});

const TrackHistory = mongoose.model('trackHistory', TrackHistorySchema);

export default TrackHistory;