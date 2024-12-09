import { FC } from "react";
import { Card } from "../types/types";
import "../styles/cardDetails.css";

interface CardProps {
  card: Card;
}
const CardDetails: FC<CardProps> = ({ card }) => {
  const {
    name,
    image_uris,
    mana_cost,
    oracle_text,
    power,
    thoughness,
    rarity,
    released_at,
    set_name,
    prices,
  } = card;
  return (
    <section className="card-details-container">
      <div className="card-img-container">
        <img src={image_uris?.normal} alt={name} className="card-image" />
      </div>
      <div className="card-info-container">
        <h2 className="card-name">{name}</h2>
        <p className="card-mana-cost">Mana Cost: {mana_cost}</p>
        <p className="card-oracle-text">{oracle_text}</p>
        <p className="card-power-toughness">
          {power}/{thoughness} (Power/Toughness)
        </p>
        <p className="card-rarity">Rarity: {rarity}</p>
        <p className="card-release-date">Released: {released_at}</p>
        <p className="card-set-name">Set: {set_name}</p>
        {prices && (
          <div className="card-prices">
            <p>Prices:</p>
            {prices.usd && <p>USD: ${prices.usd}</p>}
            {prices.usd_foil && <p>USD (Foil): ${prices.usd_foil}</p>}
            {prices.eur && <p>EUR: €{prices.eur}</p>}
            {prices.eur_foil && <p>EUR (Foil): €{prices.eur_foil}</p>}
            {prices.tix && <p>MTGO (TIX): {prices.tix}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default CardDetails;
