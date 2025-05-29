/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.decimal("lat",10,7).notNullable();
        table.decimal("lon",10,7).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.alterTable('users',(table) => {
        table.dropColumns("lat");
        table.dropColumns("lon");
    });
  };
  
