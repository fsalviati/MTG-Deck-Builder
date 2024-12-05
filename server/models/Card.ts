import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
  id: string;
  name: string;
  image_uris?: {
    normal: string;
  };
}

const CardSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  oracle_text: { type: String, required: false },
  image_uris: {
    normal: { type: String, required: false },
  },
});

export const Card = mongoose.model<ICard>("Card", CardSchema);
