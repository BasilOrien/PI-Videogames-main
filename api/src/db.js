require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_URL } = process.env;

const axios = require("axios");
const Genres = require("./models/Genres");

const { BASE_URL, API_KEY } = process.env;

const sequelize = new Sequelize(`${DB_URL}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Aca vendrian las relaciones
Videogame.belongsToMany(Genre, { through: "game_genre" });
Genre.belongsToMany(Videogame, { through: "game_genre" });

getGenres
async function getGenres() {
  const axiosResponse = await axios.get(`${BASE_URL}/genres?key=${API_KEY}`);
  const data = await axiosResponse.data;
  data.results?.forEach((g) => {
    const name = g.name;
    Genre.findOrCreate({
      where: {
        name: name,
      },
    });
  });
}

getGenres();

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  apiKey: API_KEY,
};
