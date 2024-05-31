const { BASE_URL, API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../../db");

module.exports = async function (req, res) {
  const { name, page } = req.query;
  try {
    let url = `${BASE_URL}/games?key=${API_KEY}&page=${page || 1}`;
    let queryUrl = `${BASE_URL}/games?search=${name}&key=${API_KEY}&page=${
      page || 1
    }`;
    const axiosResponse = name
      ? await axios.get(queryUrl)
      : await axios.get(url);
    const data = axiosResponse.data;
    const { next, previous } = data;
    const apiResults = data.results.map((result) => {
      return {
        id: result?.id,
        name: result?.name,
        image: result?.background_image,
        platforms: result?.platforms?.map((p) => {
          return p.platform.name;
        }),
        genres: result?.genres.map((g) => g.name),
        comesFromDb: false,
      };
    });

    let dbResponse = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    let dbData = dbResponse.map(({ dataValues }) => {
      return {
        ...dataValues,
        genres: dataValues.genres.map((g) => g.name),
        comesFromDb: true,
      };
    });

    if (name) {
      dbData = dbData.map((game) => {
        let x = name.split("");
        for (let i = 0; i < x.length; i++) {
          console.log(x[i], x[i - 1]);
          if (game.name.includes(x[i])) {
            if (x[i - 1]) {
              if (game.name.includes(x[i - 1])) {
                return game;
              }
            }
          }
        }
      });
    }

    const response = [...dbData, ...apiResults].filter(
      (x) => x !== null && x !== undefined
    );

    res.json({ response, page: page || 1 });
  } catch (error) {
    res.status(404).json(error);
  }
};
