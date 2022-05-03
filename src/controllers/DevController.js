const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {

	async index(req, res) {
    const { user } = req.headers; // Usuário logado

    const loggedDev = await Dev.findById(user);
    
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } }, // Id não seja igual ao usuario logado
        { _id: { $nin: loggedDev.likes } }, // nem que tenha dado like
        { _id: { $nin: loggedDev.dislikes } }, // nem que tenha dado deslike
      ],
    });

    return res.json(users);
  },

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