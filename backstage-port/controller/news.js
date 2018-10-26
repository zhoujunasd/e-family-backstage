const { Router } = require('express')
const router = Router()
const auth = require('./auth')
const newsModel = require('../database/model/news')
const adminUserModel = require('../database/model/adminUser')
const categoryModel = require('../database/model/category')

router.post('/addnews',auth ,async (req, res, next) => {
    try{
        let {
            title,
            content ,
            contentText ,
            img,
            author,
            type,
            look_num,
        } = req.body
        const news = await newsModel.create({title, content , contentText , img, author, type, look_num,})
        res.json({
            code: 200,
            msg: '新闻添加成功。'
        })
    }catch(err){
        // next(err)
        res.json({
            code: 400,
            msg: '新闻添加失败' + err
        })
    }
})

router.get('/getnews',auth,async (req, res, next) => {
    try{
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const count = await newsModel.count()
        const dataList  = await newsModel
            .find().skip((page-1)*page_size).limit(page_size)
            .sort({_id: -1})
            .populate({
                path: 'author',
                select: '-password'
                // select: 'nickname _id'
            })
            .populate({
                path: 'type',
            })

            res.json({
                code: 200,
                msg: 'success',
                data: dataList,
                count
            })
    }catch(err){
         // next(err)
         res.json({
            code: 400,
            msg: '新闻列表获取失败' + err
        })
    }
})

// 仅获取新闻Id以及title ,
router.get('/getNewsId',auth ,async (req, res, next) => {
    try{
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const dataList  = await newsModel
            .find().skip((page-1)*page_size).limit(page_size)
            .sort({_id: -1})
            .select('_id title')
            res.json({
                code: 200,
                msg: 'success',
                data: dataList
            })
    }catch(err){
        // next(err)
        res.json({
            code: 400,
            msg: '新闻列表获取失败' + err
        })
    }


})

router.get('/getnews/:id',auth,async (req, res, next) => {
    try{
        const {id} = req.params
        const dataList  = await newsModel.findById(id)
            .populate({
                path: 'admin_user',
                select: '-password'
            })
            .populate({
                psth: 'category',
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
module.exports = router