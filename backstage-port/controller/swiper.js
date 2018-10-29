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
        const count = await swiperModel.count()
        const swiperData  = await swiperModel
            .find().skip((page-1)*page_size).limit(page_size)
            .sort({ sort: -1})
            .populate({
                path: 'newsId',
                // select: ''
            })

            res.json({
                code: 200,
                msg: 'success',
                data: swiperData,
                count
            })
    }catch(err){
         // next(err)
         res.json({
            code: 400,
            msg: '轮播图列表获取失败' + err
        })
    }
})

// 通过ID获取轮播图
router.get('/getswiper/:id',auth,async (req, res, next) => {
    try{
        const {id} = req.params
        const dataList  = await swiperModel.findById(id)
            .populate({
                path: 'newsId',
            })

            res.json({
                code: 200,
                msg: 'success',
                data: dataList
            })
    }catch(err){
         // next(err)
         res.json({
            code: 400,
            msg: '新闻获取失败' + err
        })
    }
})

// 修改轮播图
// $set{“updata”}修改，对于所有'updata'的属性，必须获取所有值，并重新赋值，否，数据丢失为null
// 使用update({查找},{修改})，修改一条数据的部分内容
router.patch('/updateSwiper',auth ,async (req, res, next) => {
    try{
        // console.log(req.body);
        // newsId
        let {_id, title, img, sort, status } = req.body
        const Swiper = await swiperModel.findById(_id)
        const updataSwiper = await Swiper.updateOne({$set:{ title, img, sort, status }})
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

// 删除轮播图
router.delete('/delete',auth, async(req, res, next) => {
    try{
        let { id } = req.query
        const deldata = await swiperModel.deleteOne({_id: id})
        res.json({
            code: 200,
            msg: '删除成功！！！',
            data: deldata,
        })
    }catch(err) {
        // next(err)
        res.json({
            code: 400,
            msg: '删除失败'+err,
            body: req.body
        })
    }
})


module.exports = router