import { FC } from "react";
import { Card } from "../types/types";
import "../styles/cardDetails.css";
import { manaSymbolMap } from "../utils/manaSymbols";

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
    toughness,
    rarity,
    released_at,
    set_name,
    prices,
    type_line,
    cmc,
  } = card;

  const renderManaCost = (cost: string) => {
    return cost.split(/(?<=})/g).map((symbol, index) => {
      const imgSrc = manaSymbolMap[symbol];
      if (imgSrc) {
        return (
          <img key={index} src={imgSrc} alt={symbol} className="mana-symbol" />
        );
      }
      return <span key={index}>{symbol}</span>;
    });
  };

  const renderCardText = (text: string) => {
    return text.split(/({.*?})/g).map((part, index) => {
      const imgSrc = manaSymbolMap[part];
      if (imgSrc) {
        return (
          <img key={index} src={imgSrc} alt={part} className="mana-symbol" />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };
  return (
    <section className="card-details-container">
      <div className="card-img-container">
        <img src={image_uris?.normal} alt={name} className="card-image" />
      </div>
      <div className="card-info-container">
        <h2 className="card-name">{name}</h2>
        <p>{type_line}</p>
        <p className="card-mana-cost">
          Mana Cost: {mana_cost && renderManaCost(mana_cost)}
        </p>
        <p className="card-oracle-text">
          {oracle_text && renderCardText(oracle_text)}
        </p>
        {type_line?.toLowerCase().includes("creature") && (
          <p className="card-power-toughness">
            Power & Toughness: {power}/{toughness}
          </p>
        )}
        {type_line?.toLowerCase().includes("planeswalker") && <p>CMC: {cmc}</p>}
        <p>Rarity: {rarity}</p>
        <p>Released: {released_at}</p>
        <p>Set: {set_name}</p>
        {prices && (
          <div className="card-prices">
            {prices.usd && <p>Price: US ${prices.usd}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default CardDetails;
