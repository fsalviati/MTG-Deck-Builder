import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const DeckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cards: [CardSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Deck = mongoose.model("Deck", DeckSchema);
