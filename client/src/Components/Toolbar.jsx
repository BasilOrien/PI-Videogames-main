import React from "react";
import Styles from "../Styles/css/Toolbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  filterDB,
  getAllVideogames,
  orderAscDesc,
} from "../redux/actions";

const Toolbar = () => {
  const store = useSelector((s) => s);
  const { genres } = store;

  const dispatch = useDispatch();

  function onFilter(e) {
    dispatch(filterDB(e.target.value));
  }

  function onOrder(e) {
    dispatch(orderAscDesc(e.target.value));
  }

  function onGenreFilter(e) {
    dispatch(filterByGenre(e.target.value));
  }

  return (
    <div className={Styles.toolbar}>
      <h3>Filtrar por origen</h3>
      <select onChange={(e) => onFilter(e)} name="" id="">
        <option value="todos">Mostrar todos</option>
        <option value="db">Desde la DB</option>
        <option value="api">Desde la Api</option>
      </select>

      <h3>Filtrar por género</h3>
      <select
        onChange={(e) => {
          onGenreFilter(e);
        }}
      >
        <option value="">Selecciona un genero</option>
        {genres &&
          genres?.map((genre, key) => <option key={key}>{genre.name}</option>)}
      </select>
      <h3>Ordenar de forma ...</h3>
      <select onChange={(e) => onOrder(e)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
};

export default Toolbar;
