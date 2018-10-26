const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId

const news = new mongoose.Schema({
    title: String,
    content: String,
    contentText: String,
    img: String,
    author: {
        type: ObjectId,
        ref: 'admin_user',
        required:  true
    },
    type: {
        type: ObjectId,
        ref: 'category',
        required:  true
    },
    look_num: {
        type: Number,
        default: 0
    },
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}});

module.exports = mongoose.model('news',news);