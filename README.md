# Express + mongodb + mongoose 使用範例

## 使用套件
- express
- mongoose

## 環境設定
- config
  - dbConfig(設定 mongoDB)
- mondels
  - students(設定 students 的 model)
- controllers
  - studentController(設定 student 相關的 CRUD)
- routes
  - studentRouter(設定 student 的 router)

## api 入口設定
```javascript
const express = require('express')
const app = express()

// 設定傳輸資料格式
app.use(express.json())

// 設定 Router
const studentRouter = require('./routes/studentRouter')
app.use('/api/users', studentRouter)

app.listen(8787, () => {
  console.log('Server is running on 3000 port and alreay to service')
})
```