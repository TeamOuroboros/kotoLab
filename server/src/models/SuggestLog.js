const db = require("../../db/index");

const SUGGEST_LOG_TABLE = "suggest_log";

module.exports = {
  async savelog(insertData) {
    return await db(SUGGEST_LOG_TABLE).insert(insertData);
  },
};
