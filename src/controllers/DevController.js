const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {

async	store(req, res) {
		
		const { github_username } = req.body;

		const userExists = await Dev.findOne({ user: github_username })

		if (userExists) {
			return res.json(userExists);
		}

		const response = await axios.get(`https://api.github.com/users/${github_username}`);

		const { name, bio, avatar_url: avatar } = response.data

		const dev = await Dev.create({
			name,
			user: github_username,
			bio,
			avatar
		})
		//console.log(respose.data)
		//return res.json({ ok: true })
		return res.json(dev);
	}
}

// INDEX, SHOW, STORE, UPDATE , DELETE