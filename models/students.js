const mongoose = require('../config/dbConfig')

// 定義 Schema 格式
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [10, '名稱太長'],
    required: true
  },
  age: {
    type: Number,
    default: 18
  },
  company: {
    type: String,
    enum: ['小驢行', '中邦資訊']
  },
  salary: {
    default: {
      type: Number,
      required: true
    },
    bonus: {
      type: Number,
      required: true
    }
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true })

// 建立 Modal
const student = mongoose.model('Student', studentSchema)

module.exports = student