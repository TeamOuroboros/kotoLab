const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const db = require('../server/db/index');

const app = require('../server.js');
const expect = chai.expect;

describe('contactController', () => {
  let request;
  const userDummyData = {
    mail: 'fuga@fuga.com',
    name: 'mocha',
    password: 'password12345',
    address: '豊田市',
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
  describe('contactGemini', () => {
    it('問い合わせできる', async () => {
      const logData =
        'あなたは、親子の行動提案アシスタントです。\n以下の条件をもとに、今日親子でどう過ごすのが最適かを提案してください。また、外出する場合は、3つ程度のジャンルを絞り、それぞれの提案の理由が書かれた詳細もつけてください。\nまた、それぞれの提案に対して20文字程度で詳細理由を要約した文章をつけてください。\nまた、外出先は具体的な施設名があると良いですが、近隣の公園などはあえて名前を出さないのも提案する側の配慮です。\n出力はマークダウン形式でお願いします。フォーマットは以下の通りです。\n\n # 提案1 \n ##要約 \n ## 詳細 # 提案2 \n ##要約 \n ## 詳細 # 提案3\n ##要約 \n ## 詳細 \n\n【条件】\n-居住地：愛知県豊田市\n-日付：8月28日\n- 今日の天気：晴れ\n- 最高気温：40度\n- 最低気温：25度\n- 子供の年齢：1歳,2歳\n- 親の状態（直近3日）：\n  - 3日前：疲れている\n. - 2日前：ちょっと疲れている\n  - 1日前：元気\n- 子供の様子（直近3日）：\n  - 3日前：体調が悪そう\n. - 2日前：ちょっと回復してきたね\n  - 1日前：フル調子じゃないけど元気！';
      const testData = {
        log_id: 1,
        log: logData,
        role: 'user',
      };
      const childData_one = {
				name: 'testBaby',
				birthday: '2024-01-01',
				gender: 'f',
				user_id: 1,
			};
      const childData_two = {
				name: 'testBabyaaa',
				birthday: '2024-01-01',
				gender: 'm',
				user_id: 1,
			};
      const expected = {
        message: '問い合わせに成功しました',
        contactResult:""
      };
      const resLogin = await request.post('/api/auth/login').send({
        mail: userDummyData.mail,
        password: userDummyData.password,
      });
			await request.post('/api/children/').set('Cookie', `session_token=${resLogin.body.token}`).send(childData_one);
			await request.post('/api/children/').set('Cookie', `session_token=${resLogin.body.token}`).send(childData_two);

      const res = await request
        .post('/api/contact')
        .set('Cookie', `session_token=${resLogin.body.token}`)
        .send({
          weather: "晴れ",
          maxTemperture: "40度",
          minTemperture: "25度"
        })
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal(expected);
    });
  });

  // describe('deleteChild', () => {
  //   it('子供を削除できる', async () => {
  //     const resLogin = await request.post('/api/auth/login').send({
  //       mail: userDummyData.mail,
  //       password: userDummyData.password,
  //     });

  //     const childData = {
  //       name: 'test',
  //       birthday: '2024-01-01',
  //       gender: 'f',
  //       user_id: 1,
  //     };
  //     await request
  //       .post('/api/children/')
  //       .set('Cookie', `session_token=${resLogin.body.token}`)
  //       .send(childData);

  //     const expected = { message: '子供を削除しました' };

  //     const res = await request
  //       .delete('/api/children/?user_id=1')
  //       .set('Cookie', `session_token=${resLogin.body.token}`);

  //     expect(res.statusCode).to.equal(201);
  //     expect(res.body).to.deep.equal(expected);
  //   });
  // });
});
