const db = require("../../db/index");
const LOG_TABLE = "log";
const LOG_CHILD_TABLE = "log_child";

module.exports = {
  async insParenrLog(insertData) {
    return await db(LOG_TABLE).insert(insertData);
  },

  async findLogId(user_id, log_date) {
    return await db(LOG_TABLE)
      .select("id")
      .where({ user_id, log_date })
      .first();
  },

  async insChildLog(insertData) {
    return await db(LOG_CHILD_TABLE).insert(insertData);
  },
  async getChildLog(child_id) {
    return await db(LOG_CHILD_TABLE).where("id", child_id);
  },

  async feel(insertData, array) {
    return await db(LOG_TABLE)
      .select("id", "parent_feeling", "log_date")
      .where({ user_id: insertData })
      .whereIn("log_date", array)
      .orderBy("created_at", "desc");
  },
};
