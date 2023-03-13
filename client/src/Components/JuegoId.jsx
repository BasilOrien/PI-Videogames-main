import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAGame } from "../redux/actions";

import Styles from "../Styles/css/JuegoId.module.css";

const JuegoId = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAGame(id));
  }, []);

  const store = useSelector((s) => s);
  const game = store.game;

  return game[0] ? (
    <div className={Styles.gameInfo}>
      <img src={game[0].background_image || game[0].image} alt="" />
      <div className={Styles.textContainer}>
        <h2>{game[0].name}</h2>
        <p>{game[0].description.replaceAll(/<\/?[^>]+(>|$)/gi, "")}</p>
      </div>
      <div className={Styles.anotherInfo}>
        <h3>Game Info</h3>
        <h4>Release Date: </h4>
        <span>{game[0].released || game[0].reldate}</span>
        <h4>Platforms: </h4>
        <span>
          {game[0].platforms?.map((platform) => {
            if (platform.platform) {
              return platform.platform.name+" ";
            } else {
              return platform+" ";
            }
          })}
        </span>
        <h4>Genre: </h4>
        <span>{game[0].genres?.map((g) => g.name)}</span>
        <h4>Rating: </h4>
        <span>{game[0].rating}</span>
      </div>
    </div>
  ) : (
    <div className={Styles.l}>carga</div>
  );
};

export default JuegoId;
