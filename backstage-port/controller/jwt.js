const {Router} = require('express');
const router  = Router();
const adminUserDB = require('../database/model/adminUser')
const newsModel = require('../database/model/news')
// 引入jwt模块
const jwt = require('jsonwebtoken')
const cert = require('./jwtAuth')

router.post('/login',async (req, res, next) => {
    try{
        const {username, password} = req.body
        const user = await adminUserDB.findOne({username})
        if(user){
            if(user.password == password){
                // 使用 RSA SHA256签名
                // var cert = fs.readFileSync('private.key');
                // var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'}); 
                const token = await jwt.sign({userId: user._id},cert,{expiresIn: 60*60})
                res.json({
                    code: 200,
                    msg: 'success',
                    // data: user,
                    token
                })
            }else{
                res.json({
                    code: 400,
                    msg: '密码不正确！'
                })
            }
        }else{
            res.json({
                code: 400,
                msg: '该用户不存在！'
            })
        }
    }catch(err){
        next(err)
    }
})

// 通过token验证的获取数据
router.get('/get', (req, res, next) => {
        let token = req.headers.token || req.query.token 
        // const { token } = req.body
        if(token){
            jwt.verify(token, cert, (err, decode) => {
                if(err){
                    res.json({
                        code: 403,
                        msg: '登录状态失效！',
                    })
                    return
                }else{
                    adminUserDB.findOne({_id: decode.userId}).select('-password').then(data => {
                        newsModel.find().then(newsdata => {
                            res.json({
                                code: 200,
                                data: {
                                    news: newsdata,
                                    user: data
                                }
                            })
                        })
                    })
                }
            })
        }else{
            res.json({
                code: 200,
                msg: '缺少必要参数token！'
            })
        }
})

// 异步写法的token验证获取数据
router.get('/getasync',async (req, res, next) => {
    try { 
        let token = req.headers.token || req.query.token 
        if(token){
            let decode = await jwt.verify(token, cert)
            const data = await adminUserDB.findById(decode.userId).select('-password')
            const newsdata = await newsModel.find()
            res.json({
                code: 200,
                data: {
                    news: newsdata,
                    user: data,
                }
            })
        }else{
            res.json({
                code: 200,
                msg: '缺少必要参数token！'
            })
        }
    } catch (error) {
        // next(error)
        res.json({
            code: 403,
            msg: '登录状态失效！'+error,
        })
    }
})



module.exports = router