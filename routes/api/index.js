const express = require('express');
const router = express.Router();
const pokemonRouter = require('./pokemon')
const userRouter = require('./users')

router.use('/pokemon', pokemonRouter)
router.use('/users', userRouter)

/* API gets */
router.get('/', function(req, res, next) {
  res.send("API");
});

module.exports = router;