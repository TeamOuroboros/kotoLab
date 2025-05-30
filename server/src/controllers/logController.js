const logModel = require('../models/Logs');

const validation = (...args) => {
	return args.every((element) => element);
};

const addParentLog = async (req, res) => {
	try {
		const { user_id, parent_feeling, log_date } = req.body;
		if (!validation(user_id, parent_feeling, log_date)) {
			return res.status(400).json({ message: 'フィールドが欠損しています' });
		}
		await logModel.insParenrLog({
			user_id,
			parent_feeling,
			log_date,
		});

		return res.status(201).json({ message: 'ログの追加に成功しました' });
	} catch (error) {
		if (error.code === '23505') {
			// postgreで一意性制約があった場合に返るエラーコード
			return res.status(409).json({ message: 'すでに同じ記録が存在します' });
		}
		return res.status(500).json({ message: 'Server Error' });
	}
};

const addChildLog = async (req, res) => {
	try {
		const { children_id, child_state, user_id, log_date } = req.body;
		
		if (!validation(children_id, child_state, user_id, log_date)) {
			return res.status(400).json({ message: 'フィールドが欠損しています' });
		}
		
		const logId = await logModel.findLogId(user_id, log_date);
		await logModel.insChildLog({
			log_id: logId.id,
			children_id,
			child_state,
		});
		
		return res.status(201).json({ message: 'ログの追加に成功しました' });
	} catch (error) {
		return res.status(500).json({ message: 'Server Error' });
	}
};

module.exports = { addParentLog, addChildLog };
