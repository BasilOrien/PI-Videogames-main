const { Router } = require("express");
const genres = require("../middlewares/genres");
const videogames = require("../middlewares/videogames");
const videogamesId = require("../middlewares/videogameId");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/genres", genres);
router.use("/videogames", videogames);
router.use("/videogames", videogamesId);

module.exports = router;
