/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
	await knex.schema.alterTable('log', (table) => {
		table.dropColumns('max_temperature');
		table.dropColumns('min_temperature');
		table.dropColumns('weather');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
	await knex.schema.alterTable('log', (table) => {
		table.decimal('max_temperature', 3, 1).notNullable();
		table.decimal('min_temperature', 3, 1).notNullable();
		table.string('weather').notNullable();
	});
};
