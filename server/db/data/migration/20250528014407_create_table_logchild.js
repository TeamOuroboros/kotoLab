exports.up = async (knex) => {
  await knex.schema.createTable('log_child', (table) => {
    table.increments('id').primary();
    table.integer('log_id').notNullable();
    table.foreign('log_id').references('log.id').onDelete('CASCADE');
    table.integer('children_id').notNullable();
    table.foreign('children_id').references('children.id').onDelete('CASCADE');
    table.text('child_state').notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('log_child');
};
