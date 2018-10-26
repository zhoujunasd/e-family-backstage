export default function(time){
    let timestr = new Date(time)
    // let Time = timestr.getTime().substr(0,10)
    // date = new Date(parseInt(Time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
    let Time = timestr.getTime()
    return new Date(parseInt(Time)).toLocaleString().replace(/:\d{1,2}$/,' ')
}

// export default function(time){
//     function testZoro(da){
//         da < 10 ? '0' + da : da
//     }
//     let timestr = new Date(time)
//     let y = timestr.getFullYear();//年
//     let m = testZoro(timestr.getMonth()+1);//月
//     let date = testZoro(timestr.getDate());//日
//     // let d = timestr.getDay();//星期
//     let h = testZoro(timestr.getHours());//时
//     let mi = testZoro(timestr.getMinutes());//分
//     let s = testZoro(timestr.getSeconds());//秒

//     return `${y}-${m}-${date} ${h}:${mi}`
// }