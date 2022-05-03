const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const routes = require('./src/routes/routes');

const server = express();

mongoose.connect(
  "mongodb+srv://candy:Onepiece3040@cluster0.tcdpt.mongodb.net/tindev?retryWrites=true&w=majority"
);


// MIDDLEWARES
server.use(cors());
server.use(express.json());
server.use(routes);



const port = process.env.PORT || 8555;

server.listen(port, () => {
	console.log(
		`server startet on http://localhost:${port}` +
		' press Crtl-C to terminate...'
	)
})