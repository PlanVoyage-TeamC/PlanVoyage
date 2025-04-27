import { Schema, model } from "mongoose";

const destinationSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  Image: { type: String, required: true },
  Loc_name: { type: String, required: true },
  Description: { type: String, required: true },
  Category: { type: Array, required: true },
  Seasons: { type: Array, required: true },
  Travel_Partner: { type: Array, required: true },
  Activities: { type: Array, required: true },
  State: { type: String, required: true },
  Address: { type: String, required: true },
  Min_Price: { type: Number, required: true },
  Max_Price: { type: Number, required: true },
  Currency: { type: String, required: true },
});

export default model("destinations_updated", destinationSchema);
