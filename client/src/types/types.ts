export interface Legalities {
  standard: string;
  future: string;
  historic: string;
  timeless: string;
  gladiator: string;
  pioneer: string;
  explorer: string;
  modern: string;
  legacy: string;
  pauper: string;
  vintage: string;
  penny: string;
  commander: string;
  oathbreaker: string;
  standardbrawl: string;
  brawl: string;
  alchemy: string;
  paupercommander: string;
  duel: string;
  oldschool: string;
  premodern: string;
  predh: string;
}

export interface Prices {
  usd: string | null;
  usd_foil: string | null;
  usd_etched: string | null;
  eur: string | null;
  eur_foil: string | null;
  tix: string | null;
}

export interface Card {
  id: string;
  name: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
  };
  artist?: string;
  colors?: string[];
  keywords?: string[];
  legalities?: Legalities;
  mana_cost?: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  prices?: Prices;
  rarity?: string;
  released_at?: string;
  set_name?: string;
  type_line?: string;
  cmc?: number;
}
