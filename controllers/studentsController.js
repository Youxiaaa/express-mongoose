const student = require('../models/students')

const createUser = async (req, res) => {
  const findUser = await student.find({ name: {$eq: req.body.name} })
  if (findUser.length !== 0) {
    res.status(401).send({
      success: false,
      message: '已有相同名稱的使用者'
    })
  } else {
    try {
      const { name, age, company, salary } = req.body
      // 建立 Object
      const newUser = new student({
        name,
        age,
        company,
        salary
      })
      // 儲存
      await newUser.save()
      res.status(201).send({
        success: true,
        message: '創建會員成功'
      })
    } catch (err) {
      res.status(401).send({
        success: false,
        message: '創建會員失敗',
        error_message: err.message
      })
    }
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await student.find({ deletedAt: {$eq: null} }, 'name age company salary')
    res.status(200).send({
      success: true,
      message: '取得會員成功',
      total: users.length,
      users
    })
  } catch (err) {
    res.status(400).send({
      success: false,
      message: '取得會員錯誤'
    })
  }
}

const updateUser = async (req, res) => {
  // 判斷有無相同名稱並且尚未被刪除的使用者
  const findUser = await student.findOne({ $and: [
    { name: {$eq: req.body.name} },
    { deletedAt: {$eq: null} }
  ] })
  // 假如有找到
  if (findUser) {
    return res.status(401).send({
      success: false,
      message: '已有相同名稱的使用者'
    })
  }
  // 沒找到執行
  try {
    await student.updateOne({ _id: req.params.id }, req.body)
    res.status(201).send({
      success: true,
      message: '修改會員資料成功'
    })
  } catch (err) {
    res.status(401).send({
      success: false,
      message: '修改會員資料失敗'
    })
  }
}

const deleteUser = async (req, res) => {
  // 尋找對象，條件為符合 id 以及 deletedAt 為空值
  const findUser = await student.findOne({ $and: [
    { _id: {$eq: req.params.id} },
    { deletedAt: {$eq: null} }
  ] })
  // 找無對象執行
  if (!findUser) {
    return res.status(401).send({
      success: false,
      message: '刪除會員失敗'
    })
  }
  // 否則執行
  try {
    await student.updateOne({_id: `${req.params.id}`}, { deletedAt: new Date() })
    res.status(201).send({
      success: true,
      message: '刪除會員成功'
    })
  } catch (err) {
    res.status(401).send({
      success: false,
      message: '刪除會員失敗'
    })
  }
}

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
}