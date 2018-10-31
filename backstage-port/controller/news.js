const { Router } = require('express')
const router = Router()
const auth = require('./auth')
const newsModel = require('../database/model/news')
const swiperModel = require('../database/model/swiper')
const adminUserModel = require('../database/model/adminUser')
const categoryModel = require('../database/model/category')

// aggregate
router.get('/aggregate',(req, res, next) => {
    let {page = 1, page_size = 10} = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)

    let { title } = req.query;
    let reg = new RegExp(title)
    // $size 对数组的长度取值
    // $ifNull 空数据兼容
    // $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
    // $group：将集合中的文档分组，可用于统计结果。？？？
    // $geoNear：输出接近某一地理位置的有序文档。？？？
    // 数据聚合
    newsModel.aggregate([
        {
            // 用于过滤数据，输出符合条件的文档
            $match: {
                $or :[
                    {title: reg},
                    {content: reg}
                ]
            }
        },{
            // 数据的多表关联处理
            $lookup:{
                form: '',    //需要关联的表
                localField: '',    //表需要关联的键
                foreignField: '',    //关联表的键
                as: '',    //对应的外键集合的数据
            }
        },{
            // 定义查询后的聚合结果，定义结果的数据结构,可以添加计算结果字段
            // 1\true:指定要包含的字段，0\false:不处理的字段，express：新增的自定义字段或修改掉原有字段的值
            $project:{
                _id: 1,
                look_num: 1,
                title: 1,
                content: 1,
                contentText: 1,
                img: 1,
                author: 1,
                type: 1,
                create_time: 1,
                update_time: 1,
                // count:{$size:{$ifNull:["$img",[]}},
                // 使用$取值符获取数据文档中现有的数组字段
                // { $size: <expression> }
                // { $ifNull: [ <expression>, <replacement-expression-if-null> ] }
            }
        },{ $sort: { _id: -1 } },{ $limit: page_size },{ $skip: (page-1)*page_size }])
        .then(data => {
            res.json({
                code: 200,
                data
            })
        })
})

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
        } = req.body
        const news = await newsModel.create({title, content , contentText , img, author, type,})
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

// 获取新闻信息
router.get('/getNewsId',auth ,async (req, res, next) => {
    try{
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const dataList  = await newsModel
            .find().skip((page-1)*page_size).limit(page_size)
            .sort({ create_time: 1, _id: -1})
            .select('img content title')
           
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

// 阅读新闻,并将阅读数加一
router.get('/readnews/:id',auth,async (req, res, next) => {
    try{
        const {id} = req.params
        const dataList  = await newsModel.findOneAndUpdate({_id: id},
            {
                $inc: {look_num: 1}
            })
            .populate({
                path: 'author',
                select: '_id nickname avatar'
            })
            .populate({
                path: 'type',
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

// 通过typeID获取新闻内容
router.get('/getnewsID/:id',auth,async (req, res, next) => {
    try{
        const {id} = req.params
        const dataList  = await newsModel.find({type: id})
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
        const swiperData = await swiperModel.find({newsId:id})
        if(swiperData){
            const deleteswiper = await swiperModel.deleteMany({newsId: id})
            if(deleteswiper.ok != 0){
                const deldata = await newsModel.deleteOne({_id: id})
                res.json({
                    code: 200,
                    msg: '级联轮播图及新闻已删除',
                    data: deldata,
                    count: deleteswiper.ok
                })
            }else{
                res.json({
                    code: 200,
                    msg: '级联轮播图删除失败',
                    data: deldata,
                })
            }
        }else{
            const deldata = await newsModel.deleteOne({_id: id})
            res.json({
                code: 200,
                msg: '删除成功！！！',
                data: deldata,
            })
        }
    }catch(err) {
        // next(err)
        res.json({
            code: 400,
            msg: '删除失败'+err,
            body: req.body
        })
    }
})

// // 删除一条新闻
// router.delete('/delete',auth, async(req, res, next) => {
//     try{
//         let { id } = req.query
//         const swiperData = await swiperModel.find({newsId:id})
//         if(swiperData){
//             res.json({
//                 code: 400,
//                 msg: '请先删除此新闻对应轮播图！'
//             })
//         }else{
//             const deldata = await newsModel.deleteOne({_id: id})
//             res.json({
//                 code: 200,
//                 msg: '删除成功！！！',
//                 data: deldata,
//             })
//         }
//     }catch(err) {
//         // next(err)
//         res.json({
//             code: 400,
//             msg: '删除失败'+err,
//             body: req.body
//         })
//     }
// })

module.exports = router