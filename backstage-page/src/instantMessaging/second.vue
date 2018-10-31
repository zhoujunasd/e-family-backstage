<template>
    <div class="main-content">
        <header class="header">第二头部</header>
        <div class="main" ref='main'>
            <ul>
                <li v-for='(item,index) in arr' :key='index'>{{index}}、{{item}}</li>
            </ul>
        </div>
        <div class="footer">
            <input type="text" v-model="text" @keyup.enter="onhandelclick">
            <button @click="onhandelclick">发送</button>
        </div>
    </div>
</template>

<script>
import BetterScoll from 'better-scroll'
    export default {
        name: 'second',
        data(){
            return{
                goEasy: "",
                text: '',
                BS: null,
                arr :[ ]
            }
        },
        methods:{
            onhandelclick(){
                this.arr.push(this.text) 
                this.text = '',
                this.$nextTick(() => {
                    this.BS.refresh()
                    let main = this.$refs.main
                    let scrollTop = main.scrollHeight-main.offsetHeight
                    this.BS.scrollTo(0,-scrollTop,300)
                })
                // this.goEasy.publish({
                //     channel: "firstMan",
                //     message: this.text,
                //     onSuccess:function(){
                //         console.log("消息发布成功。");
                //     },
                //     onFailed: function (error) {
                //         console.log("消息发送失败，错误编码："+error.code+" 错误信息："+error.content);
                //     }

                // });
            },
            initScroll(){
                this.$nextTick(() => {
                    let main = this.$refs.main
                    this.BS = new BetterScoll(main,{mouseWheel: true,scrollbar: true})
                })
            },
            initinstant(){
                this.goEasy = new GoEasy({
                    appkey: "BC-b6eb2ea0562e47d89ed53643a67b40ae",
                    onConnected: function () {
                        console.log("成功连接GoEasy。");
                    },
                    onDisconnected: function () {
                        console.log("与GoEasy连接断开。");
                    },
                    onConnectFailed: function (error) {
                        console.log("与GoEasy连接失败，错误编码："+error.code+"错误信息："+error.content);
                    }
                })
           
                this.goEasy.subscribe({
                    channel: "firstMan",
                    onMessage: function (message) {
                        console.log("您有新消息：channel：" + message.channel + " 内容：" + message.content);
                    },
                    onSuccess: function () {
                        console.log("Channel订阅成功。");
                    },
                    onFailed: function (error) {
                        console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
                    }
                });
            },
        },
        created() {
            this.initinstant()
        },
        mounted() {
            document.documentElement.style.overflow = 'auto'
            document.body.style.overflow = 'auto'
            document.getElementById('app').style.overflow = 'auto'
            this.initScroll()
        },
        beforeDestroy() {
            document.documentElement.style.overflow = 'auto'
            document.body.style.overflow = 'auto'
            document.getElementById('app').style.overflow = 'auto'
        },
    }
</script>

<style>
    html{
        height: 100%;
        overflow: hidden;
    }
    body{
        height: 100%;
        overflow: hidden;
    }
    #app{
         height: 100%;
        overflow: hidden;
    }
</style>
<style scoped lang='scss'>
.main-content{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    background-color: #f1f1f1;
    font-size: 16px;
    .header{
        height: 45px;
        line-height: 45px;
        text-align: center;
        background: skyblue;
        color: #fff;
    }
    .main{
        flex: 1;
        overflow: hidden;
        background-color: #ccc;
        li{
            line-height: 40px;
            height: 40px;
            padding-left: 10px;
            color: #fff;
        }
    }
    .footer{
        display: flex;
        
        input{
            -webkit-appearance: none;
            outline: none;
            flex: 1;
            display: block;
            line-height: 45px;
            height: 45px;
            padding: 0 10px;
            // border: 1px solid #666;
        }
        button{
            width: 80px;
            height: 45px;
            outline: none;
        }
    }
}
</style>