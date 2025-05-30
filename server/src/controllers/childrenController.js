const Children = require("../models/Children");

const validation = (...args) => {
  return args.every((element) => element);
};

const addChild = async (req, res) => {
  try {
    console.log("🚀 ~ addChild ~ req.body:", req.body);
    const { name, birthday, gender, user_id } = req.body;
    if (!validation(name, birthday, gender, user_id)) {
      return res.status(400).json({ message: "フィールドが欠損しています" });
    }

    const newChild = await Children.insChild({
      user_id: req.user.id,
      name,
      birthday,
      gender,
    });
    return res.status(201).json({
      message: "子供の追加に成功しました",
      // newChildName: newChild[0].name
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteChild = async (req, res) => {
  try {
    // ここで欲しいのは子供のid
    const exitChild = await Children.findChild(req.query.user_id);
    if (exitChild.length === 0) {
      return res.status(400).json({ message: "子供が登録されていません" });
    }
    await Children.delChild(exitChild[0].id);
    return res.status(201).json({ message: "子供を削除しました" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getChildren = async (req, res) => {
  // ここで欲しいidは親のuser_id

  const children = await Children.findFamilyChildren(req.query.user_id);
  return res.status(200).json(children);
};
module.exports = { addChild, deleteChild, getChildren };
