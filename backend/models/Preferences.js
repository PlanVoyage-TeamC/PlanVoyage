import { Schema, model } from 'mongoose';

const preferencesSchema = new Schema({
  Category: { type: [String], required: true },
  Weather: { type: [String], required: false },
  Travel_Partner: { type: [String], required: false },
  Activities: { type: [String], required: false },
  Budget: { type: String, required: false },
  Travel_experience : {type: [String], required: false}
});

export default model('preferences', preferencesSchema);