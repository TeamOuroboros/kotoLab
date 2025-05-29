exports.up = async (knex) => {
    await knex.schema.createTable('suggest_log', (table) => {
      table.increments('id').primary();
      table.integer('log_id').notNullable();
      table.foreign('log_id').references('log.id').onDelete('CASCADE');
      table.text('log').notNullable();
      table.string('role').notNullable();
      table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTable('suggest_log');
  };
  