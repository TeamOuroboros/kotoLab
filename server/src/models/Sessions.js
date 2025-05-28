const db = require('../../db/knex');

const SESSIONS_TABLE = 'sessions';

module.exports = {
    SESSIONS_TABLE,

    async insSession(insertData) {
        await db(SESSIONS_TABLE).insert(insertData);
    },

    async delSession(token) {
        await db(SESSIONS_TABLE).where('token',token).del();
    },

    async findToken(token) {
        return await db(SESSIONS_TABLE)
        .innerJoin('users', function () {
            this.on(`${SESSIONS_TABLE}.use_id`, '=', 'users.id')
        })
        .where('token', token)
        .first();
    }
}