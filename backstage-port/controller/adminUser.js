const {
    Router
} = require('express')
const router = Router()
const adminUserDB = require('../database/model/adminUser')
// 导入自定义的中间件，对于session的判断
const auth = require('./auth')

// 添加管理员
router.post('/addAdminerUser', auth, async (req, res, next) => {
    try {
        let {
            username,
            nickname,
            password,
            avatar,
            des,
            sex,
            phone
        } = req.body;
        const data = await adminUserDB.create({
            username,
            nickname,
            password,
            avatar,
            des,
            sex,
            phone
        })
        res.json({
            code: 200,
            msg: '注册用户成功。',
            // default值不会在返回数据内显示，在向mongo插入数据时，插入默认值
            data: {
                username,
                nickname,
                avatar,
                des,
                sex,
                phone
            },
        })
    } catch (err) {
        if (err.code == 11000) {
            res.json({
                code: 400,
                msg: '用户已注册！'
            })
        } else {
            res.json({
                code: 400,
                msg: '错误'
            })
        }
    }
})

// 登录
router.post('/login', async (req, res, next) => {
    try {
        const {
            username,
            password
        } = req.body
        if (username && password) {
            const user = await adminUserDB.findOne({
                username
            })
            if (user) {
                if (password == user.password) {
                    req.session.user = user //将用户信息存进session
                    res.json({
                        code: 200,
                        msg: "登录成功！",
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '密码错误！'
                    })
                }
            } else {
                res.json({
                    code: 400,
                    msg: '账号未注册！'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '缺少必要参数！',
            })
        }
    } catch (err) {
        next(err)
    }
})

router.get('/adminUser', auth, async (req, res, next) => {
    try {
        let { pn = 1, size = 5 } = req.body
        pn = parseInt(pn)
        size = parseInt(size)
        const adminadta = await adminUserDB
            .find()
            .sort({ _id: -1 })
            .limit(size)
            .skip((pn - 1) * size)
            .select('-password -_id')
        res.json({
            code: 200,
            msg: 'success',
            data: adminadta,
        })
    } catch (err) {
        res.json({
            code: 400,
            msg: '查找失败',
        })
    }
})

module.exports = router