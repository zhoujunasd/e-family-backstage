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
    avatar: String,
    des: String,
    phone: Number,
    sex: Number,
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('admin_user',adminUser)

