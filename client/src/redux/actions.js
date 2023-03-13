import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENRES,
  FILTER_DB,
  ORDER_ASCDESC,
  GET_A_GAME,
  FIND_GAMES,
  FILTER_BY_GENRE,
} from "./action_def";

export function getAllVideogames(pagination, page) {
  console.log(pagination, page);
  let url = `http://localhost:3001/videogames`;
  let storePage = store.getState().page;
  if (pagination === "next") {
    url = `${url}?page=${storePage + 1}`;
    console.log(url);
  }
  if (pagination === "prev" && storePage > 1) {
    url = `${url}?page=${storePage - 1}`;
    console.log(url);
  }

  console.log(url);
  return async function (dispatch) {
    const axiosResponse = await axios.get(url);
    const data = await axiosResponse.data;
    dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: data,
    });
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    const axiosResponse = await axios.get("http://localhost:3001/genres");
    const data = await axiosResponse.data;
    dispatch({
      type: GET_ALL_GENRES,
      payload: data,
    });
  };
}

export function getAGame(id) {
  return async function (dispatch) {
    const axiosResponse = await axios.get(
      `http://localhost:3001/videogames/${id}`
    );
    const data = await axiosResponse.data;
    dispatch({
      type: GET_A_GAME,
      payload: data,
    });
  };
}

export function filterDB(db) {
  return {
    type: FILTER_DB,
    payload: db,
  };
}

export function orderAscDesc(order) {
  return {
    type: ORDER_ASCDESC,
    payload: order,
  };
}

export function findGames(query) {
  return async (dispatch) => {
    const axiosResponse = await axios.get(
      `http://localhost:3001/videogames?name=${query}`
    );
    const data = await axiosResponse.data;
    dispatch({
      type: FIND_GAMES,
      payload: data,
    });
  };
}

export function filterByGenre(genre) {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
  };
}
