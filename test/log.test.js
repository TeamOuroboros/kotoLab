const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const db = require('../server/db/index');

const app = require('../server.js');
const expect = chai.expect;

describe('RecordsController', () => {
	let request;
	const userDummyData = {
		mail: 'fuga@fuga.com',
		name: 'mocha',
		password: 'password12345',
		address: 'toyota',
		lat: 111.1111111,
		lon: 111.1111111,
	};
	before(() => {
		request = chai.request(app).keepOpen();
	});

	before(async () => {
		await db.migrate
			.forceFreeMigrationsLock()
			.then(() => db.migrate.rollback({ all: true }))
			.then(() => db.migrate.latest())
			.then(() => db.seed.run())
			.catch(console.error);
		await request.post('/api/auth/register').send(userDummyData);
	});

	after(() => {
		request.close();
	});

	describe('addParentLog', () => {
		it('親の記録が追加できる', async () => {
			const childData = {
				user_id: 1,
				name: 'testBaby',
				birthday: '2024-01-01',
				gender: 'f',
			};
			const resLogin = await request.post('/api/auth/login').send({
				mail: userDummyData.mail,
				password: userDummyData.password,
			});
			await request.post('/api/children/').set('Cookie', `session_token=${resLogin.body.token}`).send(childData);

			const expected = {
				message: 'ログの追加に成功しました',
			};

			const testData = {
				user_id: 1,
				parent_feeling: 'good',
				log_date: '2025-05-20',
			};
			const res = await request.post('/api/log/parent').set('Cookie', `session_token=${resLogin.body.token}`).send(testData);
			expect(res.statusCode).to.equal(201);
			expect(res.body).to.deep.equal(expected);
		});

		it('子供の記録が追加できる', async () => {
			const childData = {
				user_id: 2,
				name: 'testBaby',
				birthday: '2024-01-01',
				gender: 'f',
			};
			const resLogin = await request.post('/api/auth/login').send({
				mail: userDummyData.mail,
				password: userDummyData.password,
			});
			await request.post('/api/children/').set('Cookie', `session_token=${resLogin.body.token}`).send(childData);

			const parentData = {
				user_id: 1,
				parent_feeling: 'good',
				log_date: '2025-05-20',
			};
			await request.post('/api/log/parent').set('Cookie', `session_token=${resLogin.body.token}`).send(parentData);

			const expected = {
				message: 'ログの追加に成功しました',
			};

			const testData = {
				children_id: 2,
				child_state: 'めっちゃ元気',
				user_id: 1,
				log_date: '2025-05-20',
			};
			const res = await request.post('/api/log/childstate').set('Cookie', `session_token=${resLogin.body.token}`).send(testData);
			expect(res.statusCode).to.equal(201);
			expect(res.body).to.deep.equal(expected);
		});
	});
});
