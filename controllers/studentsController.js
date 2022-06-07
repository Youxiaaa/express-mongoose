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
  const findUser = await student.find({ _id: {$eq: req.params.id} })
  if (findUser.length === 0 || findUser[0].deletedAt) {
    res.status(401).send({
      success: false,
      message: '修改會員資料失敗'
    })
  } else {
    try {
      const id = req.params.id
      await student.updateOne({_id: `${id}`}, req.body)
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
}

const deleteUser = async (req, res) => {
  const findUser = await student.find({ _id: {$eq: req.params.id} })
  if (findUser.length === 0 || findUser[0].deletedAt) {
    res.status(401).send({
      success: false,
      message: '刪除會員失敗'
    })
  } else {
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
}

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
}