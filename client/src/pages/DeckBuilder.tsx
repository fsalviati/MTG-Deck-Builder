import React, { useState } from "react";
import axios from "axios";
import "../styles/deckBuilder.css";

const DeckBuilder: React.FC = () => {
  const [deckName, setDeckName] = useState<string>("");
  const [cards, setCards] = useState<
    { number: number | string; name: string }[]
  >([]);
  const [message, setMessage] = useState<string | null>(null);

  //Handle Add Card
  const handleAddCard = () => {
    setCards([...cards, { number: "", name: "" }]);
  };

  //Handle Change Card
  const handleCardChange = (
    index: number,
    field: "number" | "name",
    value: string,
  ) => {
    const updatedCards = [...cards];
    if (field === "number") {
      const limitedValue = value.slice(0, 2);

      updatedCards[index][field] =
        limitedValue === "" ? "" : Number(limitedValue);
    } else {
      updatedCards[index][field] = value;
    }
    setCards(updatedCards);
  };

  //Handle Remove Card
  const handleRemoveCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  //Handle Save Deck
  const handleSave = async () => {
    try {
      const totalNumber = cards.reduce((sum, card) => {
        if (typeof card.number === "number") {
          return sum + card.number;
        }
        return sum;
      }, 0);
      console.log("totalNumber = ", totalNumber);
      if (totalNumber > 60) {
        setMessage("A deck cannot contain more than 60 cards in total.");
        return;
      }

      const validCards = cards.filter(
        (card) => card.name.trim() && card.number,
      );
      console.log("deckName = ", deckName);
      console.log("cards = ", validCards);

      const response = await axios.post("http://localhost:3000/decks", {
        deck: {
          name: deckName,
          cards: validCards,
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
      <div className="card-list">
        {cards.map((card, index) => (
          <div key={index} className="card-row">
            <input
              type="number"
              className="card-number-input"
              placeholder="0"
              value={card.number}
              min="1"
              max="60"
              step="1"
              onChange={(e) =>
                handleCardChange(index, "number", e.target.value)
              }
            />
            <input
              type="text"
              className="card-name-input"
              placeholder="Card name"
              value={card.name}
              onChange={(e) => handleCardChange(index, "name", e.target.value)}
            />
            <button
              className="remove-card-button"
              onClick={() => handleRemoveCard(index)}
            >
              −
            </button>
          </div>
        ))}
      </div>
      <button className="add-card-button" onClick={handleAddCard}>
        Add a Card
      </button>
      <button className="save-button" onClick={handleSave}>
        Save Deck
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DeckBuilder;
