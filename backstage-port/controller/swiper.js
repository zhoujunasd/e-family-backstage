const {Router} = require('express');
const router  = Router();
const auth = require('./auth')
const swiperModel = require('../database/model/swiper')
const newsModel = require('../database/model/news')

// 添加轮播图
router.post('/addSwiper',auth ,async (req, res, next) => {
    try{
        let { title, img, newsId, sort, status } = req.body
        const swiperData = await swiperModel.create({title, img, newsId, sort, status})
        res.json({
            code: 200,
            msg: '轮播图添加成功！',
            data: swiperData
        })
    }catch(err){
        // next(err)
        res.json({
            code: 400,
            msg: '轮播图添加失败' + err
        })
    }
})

// 获取轮播图列表
router.get('/getSwiper',auth ,async (req, res, next)=> {
    try{
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const swiperData  = await swiperModel
            .find().skip((page-1)*page_size).limit(page_size)
            .sort({sort: -1})
            .populate({
                path: 'newsId',
                // select: ''
            })

            res.json({
                code: 200,
                msg: 'success',
                data: swiperData
            })
    }catch(err){
         // next(err)
         res.json({
            code: 400,
            msg: '轮播图列表获取失败' + err
        })
    }
})

// 修改轮播图
// $set{“updata”}修改，对于所有'updata'的属性，必须获取所有值，并重新赋值，否，数据丢失为null
// 使用update({查找},{修改})，修改一条数据的部分内容
router.patch('/updateSwiper/:id',auth ,async (req, res, next) => {
    try{
        const {id} = req.query
        let { title, img, newsId, sort, status } = req.body
        const Swiper = await swiperModel.findById(id)
        const updataSwiper = await Swiper.update({$set:{ title, img, newsId, sort, status }})
        res.json({
            code: 200,
            msg: '修改轮播图成功！',
            data: updataSwiper
        })
    }catch(err){
        // next(err)
        res.json({
            code: 400,
            msg: '修改轮播图失败' + err
        })
    }
})

module.exports = router