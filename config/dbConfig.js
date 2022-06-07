const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/exampleDB')
.then((res) => console.log('Connect to MongoDB'))
.catch((err) => console.log('Faild to connect MongoDB', err))

module.exports = mongoose