const router = require("express").Router();
const { Genre, Videogame } = require("../db");
const axios = require("axios");

//configs
require("dotenv").config();

const { BASE_URL, API_KEY } = process.env;

//functions
async function getGamesFromApi(name, pagination = 1) {
  let axiosResponse = null;
  if (name) {
    axiosResponse = await axios.get(
      `${BASE_URL}games?search="${name}"&key=${API_KEY}&count=${15}`
    );
  } else {
    pagination = +pagination;
    axiosResponse = await axios.get(
      `${BASE_URL}games?key=${API_KEY}&page=${pagination}`
    );
  }

  const data = await axiosResponse.data;
  const { results } = data;
  let next = pagination + 1;
  let previous = null;

  if (pagination > 1) {
    previous = pagination - 1;
  } else {
    previous = null;
  }

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
  return { games, next, previous };
}

async function getGamesFromDb(name) {
  const databaseResponse = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  let gamesFromDb = databaseResponse;
  if (name) {
    console.log("fromName");
    gamesFromDb = gamesFromDb.filter((game) => {
      return game.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  gamesFromDb?.map((game) => {
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

async function getAllGames(res, name, pagination) {
  const gamesFromDb = await getGamesFromDb(name);

  const gamesFromApi = await getGamesFromApi(name, pagination);

  if (!gamesFromDb.length && !gamesFromApi.games.length) {
    res
      .status(404)
      .json(`No se ha encontrado ningun juego que contenga ${name}`);
    return;
  }

  if (name) {
    const serverResponse = [
      { next: gamesFromApi.next, previous: gamesFromApi.previous },
    ]
      .concat(gamesFromDb, gamesFromApi.games)
      .filter((_, index) => index < 16);
    res.json(serverResponse);
  } else {
    res.json(
      [{ next: gamesFromApi.next, previous: gamesFromApi.previous }].concat(
        gamesFromDb,
        gamesFromApi.games
      )
    );
  }
}

//crud

router.get("/", async function (req, res) {
  try {
    const { name, page } = req.query;
    getAllGames(res, name, page);
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/", async function (req, res) {
  try {
    const { name, description, reldate, rating, platform, genre } = req.body;
    if (!name || !description || !reldate || !rating || !platform || !genre) {
      res.status(400).json({
        message: "Complete all fields",
        
      });
    }
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
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    let destroyElement = await Videogame.findOne({
      where: {
        id: id,
      },
    });
    if (destroyElement) {
      await destroyElement.destroy().then(() => {
        res.status(200).json({
          message: `Se ha eliminado correctamente el objeto con el id ${id}`,
          destroyedElement: destroyElement,
        });
      });
    } else {
      res
        .status(404)
        .json({ message: `No se ha encontrado un elemento con el id ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error en la ruta solicitada" });
  }
});

module.exports = router;
