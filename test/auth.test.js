const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const db = require('../server/db');

const app = require('../server');
const expect = chai.expect;

describe('authController', () => {
	let request;

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
	});

	after(() => {
		request.close();
	});

	const userDummyData = {
		mail: 'fuga@fuga.com',
		name: 'mocha',
		password: 'password12345',
		address: 'toyota',
		lat: 111.1111111,
		lon: 111.1111111,
	};

	describe('register', () => {
		it('ユーザーの新規登録ができる', async () => {
			const expected = {
				message: 'ユーザー登録に成功しました',
				newUserEmail: 'fuga@fuga.com',
				newUserName: 'mocha',
			};
			const res = await request.post('/api/auth/register').send(userDummyData);
			expect(res.statusCode).to.equal(201);
			expect(res.body).to.deep.equal(expected);
		});

		it('すでにユーザー登録されている場合は登録しない', async () => {
			const expected = { message: 'すでにユーザーが登録されています' };
			const res = await request.post('/api/auth/register').send(userDummyData);
			expect(res.statusCode).to.equal(400);
			expect(res.body).to.deep.equal(expected);
		});

		it('POSTする情報に欠損があれば処理しない', async () => {
			const expected = { message: 'フィールドが欠損しています' };
			const res = await request.post('/api/auth/register').send({ email: 'aaa@aaa.com' });
			expect(res.statusCode).to.equal(400);
			expect(res.body).to.deep.equal(expected);
		});
	});
	describe('login', () => {
		it('ログインが成功する', async () => {
			const res = await request.post('/api/auth/login').send({
				mail: userDummyData.mail,
				password: userDummyData.password,
			});
			expect(res.statusCode).to.equal(200);
			expect(res.body.message).to.equal('ログインに成功しました');
			expect(res.body).to.have.property('token');
		});
		it('ユーザーが存在しない場合はエラー', async () => {
			const res = await request.post('/api/auth/login').send({
				mail: 'null',
				password: 'null',
			});
			expect(res.statusCode).to.equal(401);
			expect(res.body).to.deep.equal({ message: 'ユーザーが見つかりません' });
		});

		it('パスワードが違う場合はエラー', async () => {
			const res = await request.post('/api/auth/login').send({
				mail: userDummyData.mail,
				password: 'null',
			});
			expect(res.statusCode).to.equal(401);
			expect(res.body).to.deep.equal({ message: 'パスワードが違います' });
		});
	});
	describe('logout', () => {
		it('ログアウトが成功する', async () => {
			const resLogin = await request.post('/api/auth/login').send({
				email: userDummyData.email,
				password: userDummyData.password,
			});
			const res = await request.post('/api/auth/logout').set('Cookie', `session_token=${resLogin.body.token}`);
			expect(res.statusCode).to.equal(200);
		});
	});
});
