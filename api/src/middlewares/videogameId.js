const router = require("express").Router();
const { Genre, Videogame } = require("../db");
const axios = require("axios");

require("dotenv").config();

const { BASE_URL, API_KEY } = process.env;

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (!isNaN(id)) {
      const axiosResponse = await axios.get(
        `${BASE_URL}games/${id}?key=${API_KEY}`
      );
      const apiData = await axiosResponse.data;
      if (typeof apiData === "object" && !!Object.keys(apiData).length) {
        res.json(apiData);
        return;
      }
    } else {
      const dbResponse = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (typeof dbResponse === "object" ) {
        res.json(dbResponse);
      } else {
        res.json("No se ha encontrado el recurso solicitado");
        return
      }
    }
  } catch (error) {
    res.status(404).json("error en la ruta solicitada");
  }
});

module.exports = router;
