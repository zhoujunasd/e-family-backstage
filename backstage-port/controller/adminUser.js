const { Router } = require('express')
const router = Router()
const adminUserDB = require('../database/model/adminUser')
const newsModel = require('../database/model/news')
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
                msg: '改用户账号已注册！'
            })
        } else {
            res.json({
                code: 400,
                msg: '用户注册失败！'+err
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
            const user = await adminUserDB.findOne({ username })
            if (user) {
                if (password == user.password) {
                    req.session.user = user //将用户信息存进session
                    const data = await adminUserDB.findOne({ username }).select('-password')
                    res.json({
                        code: 200,
                        msg: "登录成功！",
                        data
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

// 获取所有管理员,除自己之外{_id: {$not: {$in: [req.session.user._id]}}}
router.get('/adminUser', auth, async (req, res, next) => {
    try {
        let { pn = 1, size = 10 } = req.query
        pn = parseInt(pn)
        size = parseInt(size)
        const count = await adminUserDB.count()-1
        const adminadta = await adminUserDB
            .find({_id: {$not: {$in: [req.session.user._id]}}})
            .sort({create_time: 1,_id: -1 })
            .limit(size)
            .skip((pn - 1) * size)
            .select('-password')
        res.json({
            code: 200,
            msg: 'success',
            data: adminadta,
            count,
            // asd: req.session
        })
    } catch (err) {
        res.json({
            code: 400,
            msg: '查找失败'+err,
        })
    }
})
// 获取或有管理员
router.get('/getAlladminUser', auth, async (req, res, next) => {
    try {
        // let { pn = 1, size = 10 } = req.query
        // pn = parseInt(pn)
        // size = parseInt(size)
        // const count = await adminUserDB.count()
        const adminadta = await adminUserDB
            .find()
            .sort({create_time: 1,_id: -1 })
            .select('-password')
            // .skip((pn - 1) * size)
            // .limit(size)
        res.json({
            code: 200,
            msg: 'success',
            data: adminadta,
        })
    } catch (err) {
        res.json({
            code: 400,
            msg: '查找失败' + err,
        })
    }
})

// 修改密码
router.patch('/editPassword', auth, async(req, res, next) => {
    try{    
        // let { username, password, newpassword} = req.body
        // const userdata = await adminUserDB.findOne({username})
        let {password, newpassword} = req.body
        const userdata = await adminUserDB.findById(req.session.user._id)
        if(password == userdata.password){
            if(password == newpassword){
                res.json({
                    code: 400,
                    msg: '原密码与旧密码一致！'
                })
            }else{
                const data = await adminUserDB.updateOne({_id:req.session.user._id},{password: newpassword})
                const updata = await adminUserDB.findById({_id:req.session.user._id}).select('-password')
                res.json({
                    code: 200,  
                    msg:'密码修改成功！',
                    data: updata
                })
            }
        }else{
            res.json({
                code: 400,
                msg: '密码不正确！'
            })
        }
    }catch(err){
        res.json({
            code: 400,
            msg: '密码修改失败！' + err
        })
    }
})

// 删除管理员
// 通过账号密码删除数据
router.delete('/delete',auth, async(req, res, next) => {
    try{
        let {username, password} = req.query
        const data = await adminUserDB.findOne({username})
        if(data){
            const news = await newsModel.find({author: data._id })
            if(news){
                res.json({
                    code: 400,
                    msg: '此管理员尚有新闻挂载！'
                })
            }else{
                if(data.password == password){
                    const deldata = await adminUserDB.deleteOne({username})
                    res.json({
                        code: 200,
                        msg: '删除成功！！！',
                        data: deldata,
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '你不是该账号用户，无法删除！'
                    })
                }
            }
        }else{
            res.json({
                code: 400,
                msg: '管理员不存在！'
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

// 获取单个管理员的信息
router.get('/getAdmin/:id',auth, async(req, res, next) => {
    try {
        const id = req.params.id
        const data = await adminUserDB.findById(id).select('-password')
        res.json({
            code: 200,
            msg: 'success',
            data,
        })
    } catch (error) {
        // next(error)
        res.json({
            code: 400,
            msg: 'error'+ error
        })
    }
})

// 修改管理员信息
router.patch('/editAdmin',auth, async(req, res, next) => {
    try {
        let {username, nickname, avatar, des, sex, phone} = req.body
        const userdata = await adminUserDB.findOne({username})
        const update = await userdata.updateOne({$set:{ nickname, avatar, des, sex, phone}})
        const updated = await adminUserDB.findOne({username}).select('-password')
        res.json({
            code: 200,
            msg: '修改成功！',
            data: updated
        })
        // 对于过个数据的验证怎么简写？？？？？？？，一、必须五次验证，多或者函数遍历
        // if( userdata.nickname == nickname && userdata.avatar == avatar
        // userdata.des == des && userdata.sex == sex && userdata.phone == phone ){
        //     res.json({
        //         code: 400,
        //         msg: '数据未修改！'
        //     })
        // }else{
        //     const update = await userdata.update({$set:{ nickname, avatar, des, sex, phone}})
        //     const updated = await adminUserDB.findOne({username}).select('password')
        //     res.json({
        //         code: 200,
        //         msg: '修改成功！',
        //         data: updated
        //     })
        // }
    } catch (error) {
        // next(error)
        res.json({
            code: 400,
            msg: 'error:' + error
        })
    }
})

// 退出登录
router.delete('/layout', auth, (req, res, next) => {
    // if(req.session.user) {
    //     req.session.user = null
    //     res.json({
    //         code:200,
    //         msg: "退出登录成功！"
    //     })
    // }else{
    //     res.json({
    //         code:403,
    //         msg: "登录状态已失效！"
    //     })
    // }

    // req.session.destroy(function (err) {
    //     if(err){
    //         console.log(err)
    //     }
    //     else {
    //         // 清除cookie，但是需要先在session内设置name
    //         res.clearCookie('asdasd')
    //         res.json({
    //             code: 200,
    //             msg: '退出登陆成功'
    //         })
    //     }
    // })
    if(req.session.user) {
        req.session.destroy((err)=>{
            if(err){
                res.json({
                    code:400,
                    msg: 'error'+err
                })
            }else{
                res.clearCookie('asdasd')
                res.json({
                    code:200,
                    msg: "退出登录成功！"
                })
            }
        })
    }else{
        res.json({
            code:403,
            msg: "未登录，怎么退出？"
        })
    }
})

module.exports = router