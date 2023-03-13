import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { findGames, getAllVideogames } from "../redux/actions";
import Styles from "../Styles/css/Footer.module.css";
import paginationButton from "../Misc/img/pagination.png";
const HomeFooter = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  function onChangeHandler(e) {
    setQuery(e.target.value);
  }
  function onClickHandler() {
    dispatch(findGames(query));
  }

  return (
    <div className={Styles.footer}>
      <img
        onClick={() => dispatch(getAllVideogames("prev"))}
        className={`${Styles.pageBtn} ${Styles.pageBtnLeft}`}
        src={paginationButton}
        alt="pageBtnPrev"
      />
      <div className={Styles.searchbar}>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="text"
          placeholder="Ingresa tu búsqueda"
          value={query}
        />
        <button onClick={() => onClickHandler()}>Buscar</button>
      </div>
      <img
        onClick={() => dispatch(getAllVideogames("next"))}
        className={Styles.pageBtn}
        src={paginationButton}
        alt="pageBtnPrev"
      />
    </div>
  );
};

export default HomeFooter;
