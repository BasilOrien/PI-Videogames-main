import React from "react";
import Styles from "../Styles/css/Card.module.css";
import { Link } from "react-router-dom";
const Card = ({ videogame }) => {
  const platform = videogame.platforms || videogame.platform;
  return (
    <div className={Styles.card}>
      <img src={videogame?.image} alt={`${videogame?.name}_img`} />
      <h3>{videogame?.name}</h3>
      <div className={Styles.platform__container}>
        {platform &&
          platform?.map((genre, key) => {
            return <span key={key}>{genre}</span>;
          })}
        <button>
          <Link className={Styles.buttonLink} to={`/juego/${videogame.id}`}>
            Ver juego
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
