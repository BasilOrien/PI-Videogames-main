import {
  FILTER_BY_GENRE,
  FILTER_DB,
  FIND_GAMES,
  GET_ALL_GENRES,
  GET_ALL_VIDEOGAMES,
  GET_A_GAME,
  ORDER_ASCDESC,
} from "./action_def";

const initialState = {
  videogames: [],
  videogamesSearch: [],
  genres: [],
  game: [],
  previousVideogames: [],
  page: 1
};

export const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: [...payload.response],
        previousVideogames: [...payload.response],
        page: +payload.page
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: [...payload],
      };
    case FILTER_DB:
      state.videogames = state.previousVideogames;
      if (payload === "db") {
        return {
          ...state,
          videogames: state.videogames.filter(
            (videogame) => videogame.comesFromDb === true
          ),
        };
      } else if (payload === "api") {
        return {
          ...state,
          videogames: state.videogames.filter(
            (videogame) => videogame.comesFromDb === false
          ),
        };
      } else {
        return {
          ...state,
          videogames: state.previousVideogames,
        };
      }

    case ORDER_ASCDESC:
      let order = state.videogames;

      if (payload === "asc") {
        order = state.videogames.sort((a, b) => a.name.localeCompare(b.name));
      } else if (payload === "desc") {
        order = state.videogames.sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        videogames: order,
      };
    case GET_A_GAME:
      console.log(payload);
      return {
        ...state,
        game: [payload],
      };
    case FIND_GAMES:
      return {
        ...state,
        videogamesSearch: [...payload.response],
      };

    case FILTER_BY_GENRE:
      state = { ...state, videogames: state.previousVideogames };
      if (payload === "") {
        return {
          ...state,
          videogames: state.previousVideogames,
        };
      } else {
        return {
          ...state,
          videogames: state.videogames.filter((x) =>
            x.genres.includes(payload)
          ),
        };
      }
    default:
      return state;
  }
};
