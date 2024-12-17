import React, { useState } from "react";
import axios from "axios";
import { Card } from "../types/types";
import "../styles/home.css";
import CardDetails from "../components/CardDetails";
import mtgLogo from "../assets/mtg-logo.svg";

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
    <>
      <section className="home-container">
        <div className="mtg-logo-container">
          <img src={mtgLogo} alt="mtg-logo" className="mtg-logo" />
        </div>
        <div className="home-card-search-container">
          <div className="home-card-search-description">
            <p>
              Explore a comprehensive collection of Magic: The Gathering cards!
              You can search for any card by name and view detailed information
              including card attributes, abilities, and more.
              <br />
              Login to create your deck. Example of cards to search: Avatar of
              woe, Cancel, Fireball
            </p>
          </div>
          <form className="form-search-card" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="search"
              placeholder="Enter the Card Name"
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            <button type="submit">Search</button>
          </form>

          {loading && <p className="loading-text">Loading...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && card && <CardDetails card={card} />}
        </div>
      </section>
      <section className="home-container-second">
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            vitae praesentium modi perferendis consectetur dicta suscipit ullam
            voluptate quos quis sunt nemo aperiam ab doloremque dignissimos quod
            unde cumque sed laudantium assumenda. Sequi, doloremque culpa,
            similique optio facilis illo mollitia consequuntur nemo alias
            molestias quisquam nesciunt! Molestias dolorum laboriosam, minima
            impedit dicta quidem praesentium fugiat amet incidunt quod ut,
            tempore ipsa totam nostrum. Suscipit eius hic, expedita praesentium
            ut ad numquam voluptatum quas accusamus impedit illum rerum eum
            neque molestiae aut quibusdam recusandae velit iste nisi, nostrum
            laboriosam iusto! Exercitationem tempora corrupti qui repellat
            aperiam placeat tenetur? Ipsum quae eveniet rem. Officia dicta
            provident cumque omnis, odit dolorem natus explicabo, in et voluptas
            doloremque maxime dolor? Unde, quibusdam aut deserunt pariatur optio
            expedita magni nostrum quisquam delectus libero provident ex maxime
            voluptas repudiandae excepturi voluptatem! Ducimus nesciunt suscipit
            dolorum ipsam adipisci excepturi eos deserunt molestias, doloribus
            neque doloremque quam. Recusandae, soluta. Nostrum tenetur harum
            quia cumque saepe perspiciatis, quo eveniet dicta excepturi ipsam
            veritatis nemo! Velit, ullam alias pariatur dolores officiis ipsam
            nostrum necessitatibus maxime odit nisi, esse laborum enim quia sit
            quis atque perferendis quam possimus, facere molestias consequatur?
            Quod consequatur assumenda officia tenetur, recusandae eos ducimus
            accusamus hic sequi dolorum praesentium quisquam! Rerum ab odit
            nihil voluptatem distinctio totam deleniti, molestias qui corrupti
            iusto fugit hic modi repellat facilis iure facere ut ipsam nam
            eveniet vel amet ratione veritatis cum aliquam. Voluptatem dolores
            assumenda, a illo nulla repellendus deserunt quis libero laboriosam
            sit ad magnam totam velit alias aut animi cum minima soluta dolorem
            dicta culpa optio doloribus amet ipsa? Optio provident voluptatem
            quasi, atque delectus doloribus aliquam incidunt quae sint eos nemo
            illo eum labore ab perferendis ullam odit animi officiis omnis,
            asperiores voluptatibus maiores. Laudantium voluptatibus impedit
            unde consectetur veniam accusamus esse nisi provident tenetur non
            minus quasi natus, nemo odit quis atque commodi quo quibusdam
            numquam porro amet at sunt? Dolorem excepturi omnis perspiciatis ad
            quod corporis totam fugiat illum minus, vero obcaecati cum vitae sit
            adipisci voluptatibus alias. Soluta, tempore optio aperiam
            architecto repellat illum. Odio expedita enim nihil architecto quis
            molestiae? Asperiores, ipsam itaque commodi dolores cupiditate
            soluta, nesciunt blanditiis beatae laudantium magni iusto laborum
            qui minus fuga repudiandae, porro sit provident harum debitis omnis
            numquam! Fugit earum magnam eius blanditiis fugiat beatae minus cum
            temporibus vitae tenetur similique eaque voluptatum placeat,
            obcaecati ad officiis minima aspernatur provident. Ducimus, animi
            dignissimos quos incidunt debitis velit autem possimus! Amet sequi
            aliquid autem in labore eos optio eius commodi tenetur aspernatur
            neque earum tempora suscipit, asperiores placeat reprehenderit
            itaque veritatis corrupti iste impedit a. Obcaecati sint laboriosam
            saepe sunt beatae asperiores vitae deserunt minima, placeat
            quibusdam pariatur quod recusandae impedit et minus facere ducimus.
            Velit inventore reprehenderit sequi quas nobis esse corporis aperiam
            facere similique magni debitis dolores error modi molestias
            explicabo officia maiores reiciendis doloremque maxime, quo quod!
            Quas facilis voluptatem tenetur quos? Autem, esse. Quisquam quae
            aspernatur illum laboriosam sunt facilis vitae autem porro nihil
            placeat nostrum, veritatis doloremque pariatur sed libero est!
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
