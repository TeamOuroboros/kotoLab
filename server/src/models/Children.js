const db = require("../../db/index");

const CHILDREN_TABLE = "children";

module.exports = {
  // 子供のデータをinsert
  async insChild(insertData) {
    return await db(CHILDREN_TABLE).insert(insertData);
  },
  // 子供データ一覧
  async findFamilyChildren(user_id) {
    return await db(CHILDREN_TABLE)
      .select("id", "user_id", "name", "birthday", "gender")
      .where("user_id", user_id);
  },

  //指定した子供データを取得
  async findChild(id) {
    return await db(CHILDREN_TABLE)
      .select("id", "user_id", "name", "birthday", "gender")
      .where("id", id);
  },

  // 子供削除
  async delChild(child_id) {
    await db(CHILDREN_TABLE).where("id", child_id).del();
  },
};
