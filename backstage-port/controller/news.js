const { Router } = require('express')
const router = Router()
const auth = require('./auth')
const newsModel = require('../database/model/news')
const adminUserModel = require('../database/model/adminUser')
const categoryModel = require('../database/model/category')

// 添加新闻
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

// 获取新闻列表
router.get('/getnews',auth,async (req, res, next) => {
    try{
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const count = await newsModel.count()
        const dataList  = await newsModel
            .find().skip((page-1)*page_size).limit(page_size)
            .sort({ create_time: 1, _id: -1})
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
            .sort({ create_time: 1, _id: -1})
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

// 通过ID获取新闻内容
router.get('/getnews/:id',auth,async (req, res, next) => {
    try{
        const {id} = req.params
        const dataList  = await newsModel.findById(id)
            .populate({
                path: 'author',
                select: '_id nickname avatar'
            })
            .populate({
                path: 'type',
            })
            // .populate({
            //     path: 'author',
            //     select: 'nickname avatar'
            // })
            // .populate({
            //     path: 'type',
            //     select:'title icon'
            // })

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

// 编辑新闻内容
router.patch('/editNews', auth, async(req, res, next) => {
    try {
        const {
            _id,
            title,
            content ,
            contentText ,
            img,
            look_num,
            type } = req.body
            // console.log(req.body);
            const userdata = await newsModel.findById(_id)
            const update = await userdata.updateOne({$set:{title, content , contentText , img, look_num, type}})
            const updated = await newsModel.findById(_id)
                .populate({
                    path: 'author',
                    select: 'nickname avatar'
                })
                .populate({
                    path: 'type',
                    select:'title icon'
                })
            res.json({
                code: 200,
                msg: '修改成功！',
                data: updated
            })
    } catch (error) {
        res.json({
            code: 400,
            msg: 'error:' + error
        })
    }
})

// 删除一条新闻
router.delete('/delete',auth, async(req, res, next) => {
    try{
        let { id } = req.query
        const deldata = await newsModel.deleteOne({_id: id})
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