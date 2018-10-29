const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId

const swiper = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    img: String,
    newsId:{
        type: ObjectId,
        ref: 'news'
    },
    sort: {
        type: Number,
        required: true,
    },
    status: {
        // type: Boolean,
        type: Number,
        default: 1,
    },
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}});

module.exports = mongoose.model('swiper',swiper);  