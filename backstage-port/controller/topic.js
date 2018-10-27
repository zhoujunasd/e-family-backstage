const {Router} = require('express');
const router  = Router();
const auth = require('./auth')
const topicModel = require('../database/model/topic')
const adminUserDB = require('../database/model/adminUser')

// 发表评论
router.post('/postTopic',auth, async (req, res, next) => {
    try{
        const { content } = req.body
        // req.session ！！！
        const userId = req.session.user._id
        const topic = await topicModel.create({user: userId, content})
        res.json({
            code: 200,
            msg: 'success',
            data: topic
        })
    }catch(err){
        // next(err)
        res.json({
            code: 400,
            msg: 'error:'+err,
        })
    }
})

// 获取评论
router.get('/getTopic',auth, async (req,res,next) => {
    try {
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const count = await topicModel.count()
        const dataList = await topicModel.find()
            .skip((page-1)*page_size).limit(page_size)
            .sort({create_time: -1})
            .populate({
                path: 'user',
                select: "username avatar",
            })
            res.json({
                code: 200,
                msg: 'success',
                data: dataList,
                count,
            })
    } catch (error) {
        // next(error)
        res.json({
            code: 400,
            msg: 'error:'+err,
        })
    }
})

module.exports = router