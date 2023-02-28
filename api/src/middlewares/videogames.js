const router = require("express").Router();
const { Genre, Videogame } = require("../db");

router.get("/", async function (req, res) {
  res.json("Aca en el games");
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

  res.send('Se ha añadido un nuevo juego a la base de datos')
});

module.exports = router;
