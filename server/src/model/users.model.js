const db = require('../knex');
const USERS = 'users';

module.exports = {
	USERS,

	async all() {
		return await db(USERS);
	},

	
};