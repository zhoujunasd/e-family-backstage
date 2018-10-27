const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId

const common = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: ObjectId,
        ref: 'admin_user'
    },
    topic:{
        type: ObjectId,
        ref: 'topic'
    }
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}});

module.exports = mongoose.model('common',common);