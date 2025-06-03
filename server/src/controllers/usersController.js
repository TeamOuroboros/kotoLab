const userModel = require("../models/Users");

module.exports = {
  async allGet(req, res) {
    const data = await userModel.all();
    res.status(200).json(data);
  },

  async userGet(req, res) {
    user_id = req.params.id;
    const data = await userModel.selectUser(user_id);
    res.status(200).json(data);
  },
};
