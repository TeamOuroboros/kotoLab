const db = require('../../db/index');
const USERS_TABLE = 'users';

module.exports = {
	USERS_TABLE,

	async all() {
		return db(USERS_TABLE);
	},

	async createUser(mail, password_hash, name, address, lat, lon) {
		return await db(USERS_TABLE)
		.insert({
			mail,
			name,
			password_hash,
			address,
			lat,
			lon,
		})
		.returning(['mail', 'name', 'id']);
	},

	async findUser(mail) {
		return await db(USERS_TABLE).where('mail', mail).first();
	},
};
