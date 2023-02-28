const router = require("express").Router();
const { Genre } = require("../db");

router.get("/", async function (req, res) {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
