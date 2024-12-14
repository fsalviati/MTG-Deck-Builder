import React, { useState } from "react";
import axios from "axios";
import { Card } from "../types/types";
import "../styles/home.css";
import CardDetails from "../components/CardDetails";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const fetchCard = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a card name to search.");
      return;
    }

    setLoading(true);
    setError(null);
    setCard(null);

    try {
      const response = await axios.get<Card>(
        `http://localhost:3000/cards/${encodeURIComponent(searchQuery)}`,
      );

      setCard(response.data);
    } catch (err) {
      setError(
        "Failed to fetch card. Please check the card name and try again.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCard();
  };

  return (
    <section className="home-container">
      <div className="home-card-search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Enter card name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && card && <CardDetails card={card} />}
      </div>
    </section>
  );
};

export default Home;
