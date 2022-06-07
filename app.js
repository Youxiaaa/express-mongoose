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