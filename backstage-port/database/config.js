const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/ehome',
    // 'mongodb://127.0.0.1:27017/ehome',
    { useNewUrlParser: true, useCreateIndex: true},
    // { useFindAndModify: false},
    // { autoIndex: false },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connection success!')
// });
db.on('open',console.log.bind(console,'connection success!'))

module.exports = db