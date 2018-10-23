const {Router} = require('express')
const router  = Router()
const adminUserDB = require('../database/model/adminUser')
// 导入自定义的中间件，对于session的判断
const auth = require('./auth')

// 添加管理员
router.post('/addAdminerUser',auth,async (req, res, next) => {
    try{
        let{ username, nickname, password, avatar, des, sex, phone} = req.body;
        const data = await adminUserDB.create({username, nickname, password, avatar, des, sex, phone})
        res.json({
            code: 200,
            msg: '注册用户成功。',
            data:{ username, nickname, avatar, des, sex, phone },
        })
    }catch(err){
        next(err)
    }
})

// 登录
router.post('/login',async (req, res, next) => {
    try{
        const {username, password} = req.body
        if(username && password){
            const user = await adminUserDB.findOne({username})
            if(user){
                if(password == user.password){
                    req.session.user = user //将用户信息存进session
                    res.json({
                        code: 200,
                        msg: "登录成功！",
                    })
                }else{
                    res.json({
                        code: 400,
                        msg: '密码错误！'
                    })
                }
            }else{
                res.json({
                    code: 400,
                    msg: '账号未注册！'
                })
            }
        }else{
            res.json({
                code: 400,
                msg: '缺少必要参数！',
            })
        }
    }catch(err){
        next(err)
    }
})

module.exports = router