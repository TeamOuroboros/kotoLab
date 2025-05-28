const db = require('../../db/knex');
const USERS_TABLE = 'users';

module.exports = {
	USERS_TABLE,

	async createUser(mail, password_hash, name) {
		return await db(USERS_TABLE).insert({
			mail,
			name,
			password_hash,
		})
		.returning(['mail', 'name'])
	},

	async findUser(mail) {
		return await db(USERS_TABLE).where('mail', mail).first();
	}
};
