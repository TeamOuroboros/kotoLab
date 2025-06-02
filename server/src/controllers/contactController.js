const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const axios = require("axios");
const SuggestLog = require("../models/SuggestLog");
const userModel = require("../models/Users");
const Children = require("../models/Children");
const Log = require("../models/Logs");

const { format, subDays } = require("date-fns");

let aIMode;

const contactGemini = async (req, res) => {
  console.log("hello1");
  try {
    const userID = req.user.id;
    const today = format(new Date(), "yyyy-MM-dd");
    const { weather, maxTemperture, minTemperture, sendAiMode } = req.body;

    // #TODO 提案が初回か2回目以降かチェックする（2回目以降であれば履歴取得してそれ用のプロンプト作成）

    // #TODO 居住地に県を含めるか？
    const address = await userModel
      .findUser(req.user.mail)
      .then((data) => data.address);

    console.log("🚀 ~ contactGemini ~ weather:", weather);
    console.log("🚀 ~ contactGemini ~ maxTemperture:", maxTemperture);
    console.log("🚀 ~ contactGemini ~ minTemperture:", minTemperture);

    console.log("💀 ~ contactGemini ~ sendAiMode:", sendAiMode);
    console.log("🚀 ~ contactGemini ~ userID:", userID);
    console.log("🚀 ~ contactGemini ~ today:", today);
    console.log("🚀 ~ contactGemini ~ address:", address);

    //提案モードの切替
    if (sendAiMode === "おまかせ") {
      aIMode = "過去の記録から満遍なく提案";
    } else if (sendAiMode === "アクティブ") {
      aIMode = "なるべく外遊びを提案";
    } else if (sendAiMode === "おうち") {
      aIMode = "なるべく家の中でできることを提案";
    } else {
      aIMode = "なるべく屋内施設で過ごせる提案";
    }
    console.log("💀 ~ contactGemini ~ aIMode:", aIMode);

    // #TODO user.id と今日から三日分の日付でlogからデータ取ってくる
    // ない日付のログはプロンプトに入れない　or 特になしっていうワードにする
    // ここのlengthを変えると他も取得する日付が可変する
    // 仮：Log.getID
    //下記が元々のコード
    // const logIDArr = Array.from({ length: 3 }, (_, i) => {
    //   const targetDate = format(subDays(new Date(), i), "yyyy-MM-dd");
    //   // logTableから取ってくる処理　基本的に1日に1回の記録なのでlog.idは１件（多分firstで取ってくるからない時はundefined）
    //   return Log.getID(userID, targetDate);
    // });
    //findLogIdに変更 Promise.allにする
    const logIDArr = await Promise.all(
      Array.from({ length: 3 }, (_, i) => {
        const targetDate = format(subDays(new Date(), i), "yyyy-MM-dd");
        // Log.getID は async で "当該日付のログがあれば id、それ以外は undefined" を返す想定
        return Log.findLogId(userID, targetDate);
      })
    );
    console.log("🚀 ~ contactGemini ~ logIDArr:", logIDArr);

    // userIDから子供一覧を取得しIDを抽出する
    const childrenID = await Children.findFamilyChildren(userID).then((datas) =>
      datas.map((data) => data.id)
    );
    // あり得ないけど（初回登録時に必ず子供情報を登録させるため）
    if (childrenID.length === 0)
      return res.status(400).json({ message: "子供情報が取得できません" });
    console.log("🚀 ~ contactGemini ~ childrenID:", childrenID);

    // #TODO log.id から、親の気分や子供の状態を取ってくる(仮：Log.feel)
    //⚡️⚡️多分feel定義していないからのちにやらないといけない
    const parentFeeling = await Promise.all(
      Array.from({ length: logIDArr.length }, (_, i) => {
        const logID = logIDArr[i];
        // logから情報取得
        if (!logID) {
          return "特に何も無し";
        }
        return Log.feel(logID) ?? "特に何も無し";
      })
    ); // #TODO 子供の数だけ配列をどうするか検討 子供の状態はchildidで繰り返すか動的に処理
    console.log("🚀 ~ parentFeeling ~ parentFeeling:", parentFeeling);
    //   ```多分こうなる
    // childState === [
    //   [state1a, state1b, state1c], // 子供1人目の3日分のstate
    //   [state2a, state2b, state2c], // 子供2人目の3日分のstate
    // ]
    // ```;
    // がしかし非同期だった場合は全部Promiseの配列になるのでこっち⇩を使う
    // const childState = await Promise.all(
    //   childrenID.map(async (childID) => {
    //     return Promise.all(
    //       Array.from({ length: logIDArr.length }, async (_, i) => {
    //         const logID = logIDArr[i];
    //         if (!logID) {
    //           return "特に何も無し";
    //         }
    //         const result = await Logchild.state(logID, childID);
    //         return result ?? "特に何も無し";
    //       })
    //     );
    //   })
    // );
    //⚡️⚡️多分Logchild.state定義していないからのちにやらないといけない
    const childState = childrenID.map((childID) => {
      return Array.from({ length: logIDArr.length }, (_, i) => {
        const logID = logIDArr[i];
        // logから情報取得
        if (!logID) {
          return "特に何も無し";
        }
        return Logchild.state(logID, childID) ?? "特に何も無し";
      });
    });
    console.log("🚀 ~ childState ~ childState:", childState);

    // ⚡️⚡️initPromptは現在固定で問い合わせています。
    console.log("💀 ~ contactGemini ~ aIMode:", aIMode);

    const initPrompt = `あなたは、親子の行動提案アシスタントです。
    \n以下の条件をもとに、今日親子でどう過ごすのが最適かを提案してください。
    また、外出する場合は、3つ程度のジャンルを絞り、それぞれの提案の理由が書かれた詳細もつけてください。
    \nまた、それぞれの提案に対して20文字程度で詳細理由を要約した文章をつけてください。
    \nまた、外出先は具体的な施設名があると良いですが、近隣の公園などはあえて名前を出さないのも提案する側の配慮です。
    \n出力はマークダウン形式でお願いします。フォーマットは以下の通りです。
    \n\n # 提案1 \n ##要約 \n ## 詳細 # 提案2 \n ##要約 \n ## 詳細 # 提案3\n ##要約 \n ## 詳細 \n
    \n【条件】
    \n-居住地：${address}\n-日付：${today}\n- 今日の天気：${weather}\n- 最高気温：${maxTemperture}\n- 最低気温：${minTemperture}\n- 子供の年齢：1歳,2歳\n- 親の状態（直近3日）：\n  - 3日前：疲れている\n. - 2日前：ちょっと疲れている\n  - 1日前：元気\n- 子供の様子（直近3日）：\n  - 3日前：体調が悪そう\n. - 2日前：ちょっと回復してきたね\n  - 1日前：フル調子じゃないけど元気！
    \n  - 提案モード：${aIMode}\n  - 詳細の条件：改行はしないでください。午前と午後のおすすめを回答してください`;
    const api = process.env.GEMINI_API || null;

    if (!api) {
      return res.status(400).json({ message: "APIが登録されていません" });
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api}`;

    console.log("🚀サーバー側　 urlまではきている", url);
    //渡し方NGのため変更
    const body = {
      contents: [
        {
          parts: [
            {
              text: initPrompt,
            },
          ],
        },
      ],
    };
    console.log("🚀 ~ contactGemini ~ body:", body);
    console.log("🚀 ~ contactGemini ~ body:", body.contents[0].parts);

    //ここでgemini-2.0に問い合わせしています
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(
      "🚀🚀🚀🚀🚀:",
      response.data.candidates[0].content.parts[0].text
    );

    const contactResult = response.data.candidates[0].content.parts[0].text;
    // console.log("🥇🥇🥇 ~ contactGemini ~ contactResult:", contactResult);

    return res
      .status(200)
      .json({ message: "問い合わせに成功しました", contactResult });
  } catch (error) {
    if (error.response) {
      console.error("🚨 Gemini API からのステータス:", error.response.status);
      console.error(
        "🚨 Gemini API からのレスポンスボディ:",
        error.response.data
      );
    } else {
      console.error("🚨 Axios 自体のエラー:", error.message);
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { contactGemini };
