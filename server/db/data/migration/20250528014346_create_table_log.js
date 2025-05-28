exports.up = async (knex) => {
  await knex.schema.createTable('log', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.string('parent_feeling').notNullable();
    table.string('weather').notNullable();
    table.date('log_date').notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.unique(['user_id', 'log_date']);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('log');
};
