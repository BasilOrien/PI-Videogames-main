const { BASE_URL, API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../../db");

module.exports = async function (req, res) {
  try {
    const { name, description, genre, reldate, rating, image, platform } =
      req.body;


console.log(req.body)

    const newVideogame = await Videogame.create({
      name,
      description,
      reldate,
      rating,
      image,
      platform,
    });

    genre.forEach(async () => {
      const gameGenre = await Genre.findAll({
        where: { name: genre },
      });
      newVideogame
        .addGenre(gameGenre)
        .then((r) => console.log("genre added"))
        .catch((x) => console.log("Error adding game"));
    });
    res.json("Game Added Succefull");
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

// let url = `${BASE_URL}games?key=${API_KEY}`;
// let queryUrl = `${BASE_URL}games?search=${name}&key=${API_KEY}`;
// const axiosResponse = name
//   ? await axios.get(queryUrl)
//   : await axios.get(url);
// const data = axiosResponse.data;
// const { next, previous } = data;
// const apiResults = data.results.map((result) => {
//   return {
//     name: result?.name,
//     platforms: result?.platforms?.map((p) => {
//       console.log(p, "----------------");
//       return p.platform.name;
//     }),
//     genres: result?.genres.map((g) => g.name),
//     background_image: result?.background_image
//   };
// });
// res.json(apiResults);
