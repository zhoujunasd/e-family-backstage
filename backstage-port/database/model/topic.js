const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId

const topic = new mongoose.Schema({
    user:{
        type: ObjectId,
        ref: 'admin_user'
    },
    content: {
        type: String,
        required: true,
    },
    common:[
        // 限制conmmon数组内对象的格式
        {
            type: ObjectId,
            ref: 'common'
        }
    ]
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}});

module.exports = mongoose.model('topic',topic);