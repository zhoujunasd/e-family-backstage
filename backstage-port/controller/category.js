const {Router} = require('express');
const router  = Router();
const auth = require('./auth')
const categoryModel = require('../database/model/category')

// 添加分类
router.post('/addcategory', auth, async (req, res, next) => {
    try{
        let { title, icon,} = req.body
        const cate_data = await categoryModel.create({title, icon})
        res.json({
            coed: 200,
            msg: 'success',
            data: cate_data
        })
    }catch(err){
        // next(err)
        res.json({
            code: 200,
            msg: 'error' + err,
        })
    }
})

// 获取分类
router.get('/getcategory',(req, res, next) => {
    // 对于简单的数据获取，不使用异步操作
    // async
    // const data = await categoryModel.find().sort({_id: -1})
    categoryModel.find().sort({_id: -1}).then(data => {
        res.json({
            code: 200,
            msg: 'success',
            data,
        })
    }).catch(err => {
        res.json({
            code: 200,
            msg: 'error' + err,
        })
    })
})

// 数组类型数据时，可以直接创建
// router.post('/postArray',async(req, res, next) => {
//     try {
//         const { title, icon, asd} = req.body
//         const data = await categoryModel.create({ title, icon, asd})
//         res.json({
//             code: 200,
//             msg: '',
//             data
//         })
//     } catch (error) {
//         next(error)
//     }
// })
module.exports = router