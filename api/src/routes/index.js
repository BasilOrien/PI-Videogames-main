const { Router } = require("express");
const genres = require("../middlewares/genres");
const videogames = require("../middlewares/videogames");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/genres", genres);
router.use("/videogames", videogames)

module.exports = router;
