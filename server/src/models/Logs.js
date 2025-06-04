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
  async getChildLog(ids) {
    return await db(LOG_CHILD_TABLE)
      .whereIn("children_id", ids)
      .orderBy("created_at", "desc");
  },

  async feel(insertData, array) {
    return await db(LOG_TABLE)
      .select("id", "parent_feeling", "log_date")
      .where({ user_id: insertData })
      .whereIn("log_date", array)
      .orderBy("created_at", "desc");
  },

  async childrenState(insertData) {
    return await db("users")
      .innerJoin("children", function () {
        this.on("children.user_id", "=", "users.id");
      })
      .innerJoin("log_child", function () {
        this.on("log_child.children_id", "=", "children.id");
      })
      .select("children_id", "birthday", "child_state", "log_child.created_at")
      .where({ user_id: insertData })
      .orderBy("created_at", "desc");
  },
  async parentState(paernt_id) {
    return await db("users")
      .innerJoin("log", function () {
        this.on("log.user_id", "=", "users.id");
      })
      .select("log.id", "name", "parent_feeling")
      .where({ user_id: paernt_id })
      .orderBy("log.created_at", "desc");
  },
};
