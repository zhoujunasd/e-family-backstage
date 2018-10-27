const {Router} = require('express');
const router  = Router();
const auth = require('./auth')
const commonModel = require('../database/model/common')
const topicModel = require('../database/model/topic')
const adminUserDB = require('../database/model/adminUser')

router.post('/postCommon', auth, async (req, res, next) => {
    try{
        const {content,topicId} = req.body
        const userId = req.session.user._id
        const topic = await topicModel.findById(topicId)
        if(topic){
            const common = await commonModel.create({content, topic ,user: userId})
            await topic.update({$push:{common: common._id}})
            await topic.save()
            res.json({
                code: 200,
                msg: 'success',
                data: common
            })
        } else {
            res.json({
                code: 400,
                msg: '主题不存在。'
            })
        }
    }catch(err){
        // next(err)
        res.json({
            code: 400,
            msg: 'error:'+err
        })
    }
})

// 获取评论列表
router.get("/getCommon/:topicId",auth, async(req, res, next) => {
  try {
    let {page = 1, page_size = 10} = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)
    const count = await topicModel.count()
    const topicId = req.params.topicId
    // const dataList = await commonModel.findById(topicId)
    const dataList = await commonModel.find({topic: topicId},{topic: 0})
        .skip((page-1)*page_size).limit(page_size)
        .sort({create_time: -1})
        .populate({
            path: 'user',
            select: 'username avatar create_time'
        })
        // 不在每一条评论里显示评论{topic: 0}
        // .populate({
        //     path: 'topic',
        //     select: ' '
        // })
        
    res.json({
        code: 400,
        msg: 'success',
        topic: topicId,
        data: dataList,
        count
    })
  } catch (error) {
      res.json({
          code: 400,
          msg: 'error:'+ error
      })
  }  
})

module.exports = router