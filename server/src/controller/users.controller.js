const userModel = require('../model/users.model');

module.exports = {
	async allGet(req, res) {
		const data = await userModel.all();
		res.status(200).json(data);
	},
};
