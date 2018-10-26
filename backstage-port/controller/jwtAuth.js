// const cert = '1024'
// module.exports = cert
module.exports  = '1024' 

// module.exports = function(req, res, next){
//     let token = req.headers.token || req.query.token 
//     if(token){
//         next()
//     }else{
//         const { tokenpost } = req.body
//         if(tokenpost){
//             next()
//         }else{
//             res.json({
//                 code: 403,
//                 msg: '缺少必要参数！',
//             })
//         }
//     }
// }