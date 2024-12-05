import React, { useState } from "react";
import axios from "axios";
import "../styles/deckBuilder.css";

const DeckBuilder: React.FC = () => {
  const [deckName, setDeckName] = useState<string>("");
  const [deckContent, setDeckContent] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      const cards = deckContent
        .split("\n")
        .map((card) => card.trim())
        .filter((card) => card);

      console.log("deckContent = ", deckContent);
      console.log("deckName = ", deckName);
      console.log("cards = ", cards);

      const response = await axios.post("http://localhost:3000/decks", {
        deck: {
          name: deckName,
          cards,
        },
      });

      setMessage("Deck saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving deck:", error);
      setMessage("Failed to save the deck. Please try again.");
    }
  };

  return (
    <div className="deck-builder">
      <input
        type="text"
        className="deck-name-input"
        placeholder="Enter deck name"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <textarea
        className="deck-textarea"
        placeholder="Type your deck here - one card per line..."
        value={deckContent}
        onChange={(e) => setDeckContent(e.target.value)}
      ></textarea>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DeckBuilder;
