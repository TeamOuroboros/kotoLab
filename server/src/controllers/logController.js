const logModel = require('../models/Logs');

const validation = (...args) => {
	return args.every((element) => element);
};

// リクエストの中身がちゃんと全ての要素が含まれているのか

const addParentLog= async (req, res) => {
    try {
        const {user_id, parent_feeling} = req.body;
    } catch (error) {

    }
};
// child_idが存在するか確認必要？
// 成功メッセージは201
// user_idがちゃんと存在しているか
// log_dateはフロントで設定して持ってくる？それともバックで指定？



// テーブルの一意性制約のところ　エラーコードを見てメッセージを返す
// catch (error) {
//     console.log('error: ', error);
//     if (error.code === '23505') { // postgreで一意性制約があった場合に返るエラーコード
//       return res.status(409).json({ message: 'すでに同じ記録が存在します' });
//     }
//     return res.status(500).json({ message: 'Server Error' });
//   }