# 🍼 子育て支援アプリ「kotolab」

休日どこでかけていいかわからない親の皆様に自身の体調や子供の様子を記録することで AI が最適な休日プランを提供します！！
スマートフォンでも快適に利用できる PWA（Progressive Web App）対応してます

構成は下記です。

```
KOTOLAB/
├── client/           # React+vite フロントエンド
├── server/           # Node.js + Express バックエンドAPI + postgreDB
└── README.md
```

## 🖥 使用技術

- フロントエンド React
- バックエンド Node.js, Express, Knex.js, PostgreSQL
- その他 GeminAPI, WetherAPI, Google 認証

## 🚀 起動方法

- [ ] このレポジトリをクローンした後、 `npm install` を実行して必要なパッケージをインストールしてください。
- [ ] 次の作業では、 `npm run build` を実行して client ディレクトリにあるコードを`public`にビルドします。
- [ ] 次の作業では、ローカル環境で Postgres が起動している必要があります。Postgres のインスタンスを起動し、`kotolab` という名前のデータベースを作成してください。
  > **補足**: データベースを作成するための `psql` クエリは `CREATE DATABASE kotolab;` です。
- [ ] 次の作業では、`.env`ファイルを作成し以下の環境変数を設定してください

/client/.env

```
VITE_BACKEND_URL=http://localhost:4000
```

/server/.env

```
NODE_ENV=development
POSTGRES_USER=<yourusername> //DB作成時のユーザーネームです。


//以下はGoogle Cloud Consoleから取得
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback


FRONT_URL=http://localhost:3000/

//以下はGEMINI_APIから取得
GEMINI_API=

//以下はWEATHER_APIから取得
WEATHER_API=

```

- [ ] `npm run dev` を使ってアプリを起動し、ブラウザで `localhost` にアクセスしてください（ポート番号は `index.js` に記載されています）。

## 🍎 予測モデル

- model1 : 幾何ブラウン運動に基づくモデル。<br />
  指定した期間のリターン(日次平均暴騰率)とリスク（日次標準偏差）から予測値を算出。ランダム値があるため、毎回結果は変わる。

- model2 : 幾何ブラウン運動に基づくモデルによるシミュレーションを 300 回繰り返して平均を取ったモデル。<br />
  幾何ブラウン運動は標準偏差によるランダム要素があるため複数回のシミュレーションで精度 UP。回数増やすほど精度上がるが、リアルタイム処理だとこのくらいが丁度良さそう。精密なシミュレーションしたい人は`/server/routers/predictRouter.js`内の`simulatedCount`の値を変更してください。

## 🔄 機能一覧

-

## 🤔 今後追加予定機能

-

### 予期せぬ動作（バグ修正）

-
