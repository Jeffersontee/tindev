const express = require('express');
const DevController = require('../controllers/DevController');
const LikeController = require('../controllers/LikeController');
const DislikeController = require("../controllers/DislikeController");

const routes = express.Router();

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);
routes.get('')

routes.get("/", (req, res) => {
  res.json("Hello Jefferson");
});


module.exports = routes