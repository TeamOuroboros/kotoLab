const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const axios = require("axios");
const SuggestLog = require("../models/SuggestLog");
const userModel = require("../models/Users");
const Children = require("../models/Children");
const Log = require("../models/Logs");

const { format, subDays } = require("date-fns");

let aIMode;
let initPrompt;
const contactGemini = async (req, res) => {
  let chidstate = "";
  try {
    const userID = req.user.id;
    const today = format(new Date(), "yyyy-MM-dd");
    const { weather, maxTemperature, minTemperature, sendAiMode } = req.body;

    const todayForCalc = new Date();
    //注：setDataを使うとtodayForCalcも演算されるので注意
    const yesterday = format(
      todayForCalc.setDate(todayForCalc.getDate() - 1),
      "yyyy-MM-dd"
    );
    const theDayBeforeYesterday = format(
      todayForCalc.setDate(todayForCalc.getDate() - 1),
      "yyyy-MM-dd"
    );

    const address = await userModel
      .findUser(req.user.mail)
      .then((data) => data.address);

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

    //------------------------------親の感情取得-----------------------------------
    const selectDate = [];
    selectDate.push(today);
    selectDate.push(yesterday);
    selectDate.push(theDayBeforeYesterday);
    let theDayBeforeYesterdayFeeeling = "";
    let yesterdayFeeeling = "";
    let todayFeeeling = "";

    const parentFeeling = await Log.feel(userID, selectDate);
    const logID = parentFeeling[0].id;

    //2日前の感情取得(複数ある場合は一番最新のものを取得)
    for (const obj of parentFeeling) {
      if (
        format(obj.log_date, "yyyy-MM-dd") === theDayBeforeYesterday &&
        theDayBeforeYesterdayFeeeling === ""
      ) {
        theDayBeforeYesterdayFeeeling = obj.parent_feeling;
      }
    }

    if (theDayBeforeYesterdayFeeeling === "") {
      theDayBeforeYesterdayFeeeling = "特に何も無し";
    }

    //1日前の感情取得(複数ある場合は一番最新のものを取得)
    for (const obj of parentFeeling) {
      if (
        format(obj.log_date, "yyyy-MM-dd") === yesterday &&
        yesterdayFeeeling === ""
      ) {
        yesterdayFeeeling = obj.parent_feeling;
      }
    }

    if (yesterdayFeeeling === "") {
      yesterdayFeeeling = "特に何も無し";
    }

    //今日の感情取得(複数ある場合は一番最新のものを取得)
    for (const obj of parentFeeling) {
      if (
        format(obj.log_date, "yyyy-MM-dd") === today &&
        todayFeeeling === ""
      ) {
        todayFeeeling = obj.parent_feeling;
      }
    }
    if (todayFeeeling === "") {
      todayFeeeling = "特に何も無し";
    }

    //文字列を整形({}を消す)
    theDayBeforeYesterdayFeeeling = theDayBeforeYesterdayFeeeling.replace(
      "{",
      ""
    );
    theDayBeforeYesterdayFeeeling = theDayBeforeYesterdayFeeeling.replace(
      "}",
      ""
    );
    yesterdayFeeeling = yesterdayFeeeling.replace("{", "");
    yesterdayFeeeling = yesterdayFeeeling.replace("}", "");
    todayFeeeling = todayFeeeling.replace("{", "");
    todayFeeeling = todayFeeeling.replace("}", "");
    //--------------------------------------------------------------------------

    //------------------------子どもの状態取得-----------------------------
    const childrenstate = await Log.childrenState(userID);
    let sendChilrenState = "";

    const arrayChildren_id = [];

    for (const obj of childrenstate) {
      if (arrayChildren_id.indexOf(obj.children_id) === -1) {
        arrayChildren_id.push(obj.children_id);
      }
    }

    for (let i = 1; i <= arrayChildren_id.length; i++) {
      let getageFlag = false;
      let getFeelingFlag = false;
      //i番目の子の年齢を取得
      for (const obj of childrenstate) {
        let calctoday = new Date();
        if (
          arrayChildren_id[i - 1] === obj.children_id &&
          getageFlag === false
        ) {
          const age = calctoday.getFullYear() - obj.birthday.getFullYear();
          sendChilrenState =
            sendChilrenState +
            ` \n- ${i}番目の子供の様子（直近3日）：\n  - 年齢：${age}`;
          getageFlag = true;
        }
      }
      getageFlag = false;

      chidstate = "";
      //i番目の子の2日前の状態を取得(複数ある場合は一番最新のものを取得)
      for (const obj of childrenstate) {
        if (
          format(obj.created_at, "yyyy-MM-dd") === theDayBeforeYesterday &&
          arrayChildren_id[i - 1] === obj.children_id &&
          getFeelingFlag === false
        ) {
          chidstate = obj.child_state;
          getFeelingFlag = true; //最新の情報が上書きされないため
        }
      }

      if (chidstate === "") {
        chidstate = "特に何も無し";
      }
      getFeelingFlag = false;
      sendChilrenState = sendChilrenState + `\n  - 2日前：${chidstate}`;

      chidstate = "";
      //i番目の子の1日前の状態を取得(複数ある場合は一番最新のものを取得)
      for (const obj of childrenstate) {
        if (
          format(obj.created_at, "yyyy-MM-dd") === yesterday &&
          arrayChildren_id[i - 1] === obj.children_id &&
          getFeelingFlag === false
        ) {
          chidstate = obj.child_state;
          getFeelingFlag = true; //最新の情報が上書きされないため
        }
      }
      if (chidstate === "") {
        chidstate = "特に何も無し";
      }
      getFeelingFlag = false;
      sendChilrenState = sendChilrenState + `\n  - 1日前：${chidstate}`;

      chidstate = "";
      //i番目の子の今日の状態を取得(複数ある場合は一番最新のものを取得)
      for (const obj of childrenstate) {
        if (
          format(obj.created_at, "yyyy-MM-dd") === today &&
          arrayChildren_id[i - 1] === obj.children_id &&
          getFeelingFlag === false
        ) {
          chidstate = obj.child_state;
          getFeelingFlag = true; //最新の情報が上書きされないため
        }
      }

      if (chidstate === "") {
        chidstate = "特に何も無し";
      }
      getFeelingFlag = false;
      sendChilrenState = sendChilrenState + `\n  - 今日：${chidstate}`;
    }

    initPrompt =
      `あなたは、親子の行動提案アシスタントです。
  \n以下の条件をもとに、今日親子でどう過ごすのが最適かを提案してください。
  また、外出する場合は、3つ程度のジャンルを絞り、それぞれの提案の理由が書かれた詳細もつけてください。
  \nまた、それぞれの提案に対して20文字程度で詳細理由を要約した文章をつけてください。
  \nまた、外出先は具体的な施設名があると良いですが、近隣の公園などはあえて名前を出さないのも提案する側の配慮です。
  \n出力はマークダウン形式でお願いします。フォーマットは以下の通りです。
  \n\n # 提案1 \n ##要約 \n ## 詳細 # 提案2 \n ##要約 \n ## 詳細 # 提案3\n ##要約 \n ## 詳細 \n
  \n【条件】
  \n-居住地：${address}\n-日付：${today}\n- 今日の天気：${weather}\n- 最高気温：${maxTemperature}\n- 最低気温：${minTemperature}
  \n- 親の状態（直近3日）：\n  - 2日前：${theDayBeforeYesterdayFeeeling}\n. - 1日前：${yesterdayFeeeling}\n  - 今日：${todayFeeeling}` +
      sendChilrenState +
      `\n  - 提案モード：${aIMode}\n  - 詳細の条件：改行はしないでください。午前と午後のおすすめを回答してください。回答時の固有名詞は日本語か英語で(極力日本語)回答してください`;

    const api = process.env.GEMINI_API || null;

    if (!api) {
      return res.status(400).json({ message: "APIが登録されていません" });
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api}`;

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

    //ここでgemini-2.0に問い合わせしています
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const contactResult = response.data.candidates[0].content.parts[0].text;

    //---------AIへの質問と反応をDBに登録する----------------------

    const userInput = [
      {
        log_id: logID,
        log: initPrompt,
        created_at: new Date(),
        role: "user",
      },
    ];
    const aiResponse = [
      {
        log_id: logID,
        log: contactResult,
        created_at: new Date(),
        role: "AI",
      },
    ];

    await SuggestLog.savelog(userInput);
    await SuggestLog.savelog(aiResponse);

    //---------------------------------------------------------

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
