const router = require("express").Router();
const { Genre, Videogame } = require("../db");
const axios = require("axios");
const getVideogames = require("./functions/getVideogames");
const postVideogames = require("./functions/postVideogames");
//configs
require("dotenv").config();

const { BASE_URL, API_KEY } = process.env;
router.get("/", getVideogames);
router.post("/", postVideogames)
module.exports = router;
