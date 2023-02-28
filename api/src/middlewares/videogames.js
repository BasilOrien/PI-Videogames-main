const router = require("express").Router();
const { Genre, Videogame } = require("../db");
const axios = require("axios");

require("dotenv").config();

const { BASE_URL, API_KEY } = process.env;

async function getGamesFromApi() {
  const axiosResponse = await axios.get(`${BASE_URL}games?key=${API_KEY}`);
  const data = await axiosResponse.data;
  const { results } = data;
  const games = results?.map((game) => {
    const { id, name, image, genres, rating } = game;
    const genresArr = genres.map((g) => g.name).toString();
    return {
      id,
      name,
      image,
      genresArr,
      rating,
      fromDB: false,
    };
  });
  return games;
}

async function getGamesFromDb() {
  const databaseResponse = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  const gamesFromDb = databaseResponse?.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image:
        "https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg",
      genre: game.genres?.map((genre) => genre.name).toString(),
      rating: game.rating,
      fromDB: true,
    };
  });
  return gamesFromDb;
}

async function getAllGames(res) {
  const gamesFromDb = await getGamesFromDb();
  const gamesFromApi = await getGamesFromApi();

  const allGames = gamesFromDb.concat(gamesFromApi);
  res.json(allGames);
}

router.get("/", async function (req, res) {
  try {
    getAllGames(res);
  } catch (error) {
    throw new Error(error);
  }
}); 

router.post("/", async function (req, res) {
  const { name, description, reldate, rating, platform, genre } = req.body;

  const addGame = await Videogame.create({
    name,
    description,
    reldate,
    rating,
    platform: platform.toString(),
  });

  const game_genre = await Genre.findAll({
    where: { name: genre },
  });
  addGame.addGenre(game_genre);

  res.send("Se ha añadido un nuevo juego a la base de datos");
});

module.exports = router;
