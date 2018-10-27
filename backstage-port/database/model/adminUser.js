const mongoose = require('mongoose')

const adminUser = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
    },
    nickname: String,
    password: {
        type: String,
        required: true, 
    },
    avatar: {
        type: String,
        default: 'http://pbl.yaojunrong.com/FgbT6pP6UP6t8wYqaTBpYldQhG4w'
    },
    // default值不会在返回数据内显示。
    des: {
        type: String,
        default: '这个人很懒，什么都没留下。',
    },
    phone: Number,
    sex: {
        type: Number,
        default: 1
    },
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('admin_user',adminUser)

