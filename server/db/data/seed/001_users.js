/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del();
	await knex('users').insert([
		{ id: 100000, mail: 'aaa@mail.com', name: 'aaa', password_hash: 'aaa', address: 'nagoya' ,lat: 111.1111111, lon:111.1111111},
		{ id: 100001, mail: 'bbb@mail.com', name: 'bbb', password_hash: 'bbb', address: 'toyota' ,lat: 111.1111111, lon:111.1111111},
	]);
};
