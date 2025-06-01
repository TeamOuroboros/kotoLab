/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("log").del();
  await knex("log").insert([
    {
      user_id: 100000,
      parent_feeling: "元気",
      log_date: "2025-05-31",
    },
    {
      user_id: 100000,
      parent_feeling: "疲れ気味",
      log_date: "2025-05-30",
    },
    {
      user_id: 100000,
      parent_feeling: "少し風邪気味",
      log_date: "2025-05-29",
    },
  ]);
};
