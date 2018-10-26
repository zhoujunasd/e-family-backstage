const {Router} = require('express');
const router  = Router();
const auth = require('./auth')
const categoryModel = require('../database/model/category')

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
module.exports = router