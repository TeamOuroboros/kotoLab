const db = require('../../db/index');
const LOG_TABLE = 'log';
const LOG_CHILD_TABLE = 'log_child';

module.exports = {
	async insParenrLog(insertData) {
		return await db(LOG_TABLE).insert(insertData);
	},

	async findLogId(user_id, log_date) {
		return await db(LOG_TABLE).select('id').where({ user_id, log_date }).first();
	},

	async insChildLog(insertData) {
		return await db(LOG_CHILD_TABLE).insert(insertData);
	},
};
