import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Card } from "./models/Card";
import cors from "cors";
import dotenv from "dotenv";
import { Deck } from "./models/Deck";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err: Error) => console.error("Failed to connect to MongoDB", err));

app.get("/cards/:name", async (req: Request, res: Response) => {
  const cardName = req.params.name;

  try {
    const card = await Card.findOne({ name: new RegExp(`^${cardName}$`, "i") });

    if (!card) {
      return res
        .status(404)
        .json({ message: `Card with name '${cardName}' not found.` });
    }

    res.json(card);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

app.post("/decks", async (req: Request, res: Response) => {
  console.log(" req.body = ", req.body);
  const { deck } = req.body;

  try {
    // Transform plain strings into objects if necessary
    const transformedDeck = {
      ...deck,
      cards: deck.cards.map((card: string) => ({ name: card })),
      createdAt: new Date(),
    };

    console.log("Transformed deck:", transformedDeck);

    const newDeck = new Deck(transformedDeck);

    await newDeck.save();
    res.status(201).json({ message: "Deck saved successfully", deck: newDeck });
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
