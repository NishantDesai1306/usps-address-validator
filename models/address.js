import mongoose, { Schema } from 'mongoose';

const AddressSchema = new Schema({
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
}, { timestamps: true });

mongoose.models = {};

const Address = mongoose.model("Address", AddressSchema, "addresses");

export default Address;