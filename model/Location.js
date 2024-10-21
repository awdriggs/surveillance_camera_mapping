import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const locationSchema = new Schema({
  type: String,
  tags: [String],
  createdAt: Date,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

const Location = model('location', locationSchema);
export default Location;
