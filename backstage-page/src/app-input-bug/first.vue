<template>
    <div class="main-content">
        <header class="header">头部</header>
        <div class="main" ref='main'>
            <ul>
                <li v-for='(item,index) in arr' :key='index'>{{index}}、{{item}}</li>
            </ul>
        </div>
        <div class="footer">
            <input type="text" v-model="text" @keyup.enter="onhandelclick">
            <button @click="onhandelclick">发送</button>
            <!-- <button @click="handelclick">发送</button> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'first',
        data(){
            return{
                goEasy: "",
                text: '',
                arr :[
                    "一信息信息信息信息信息信息",
                    "二信息信息信息信息信息信息信息",
                    "三信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                    "信息信息信息信息信息信息信息",
                ]
            }
        },
        methods:{
            onhandelclick(){
                this.arr.push(this.text) 
                this.text = '',
                this.$nextTick(() => {
                    let main = this.$refs.main
                    main.scrollTop = main.scrollHeight
                })
            },
            handelclick(){
                // 发布消息
                this.goEasy = new GoEasy({
                    appkey: "BC-b6eb2ea0562e47d89ed53643a67b40ae",
                    onConnected: function () {
                        alert("成功连接GoEasy。");
                    },
                    onDisconnected: function () {
                        alert("与GoEasy连接断开。");
                    },
                    onConnectFailed: function (error) {
                        alert("与GoEasy连接失败，错误编码："+error.code+"错误信息："+error.content);
                    }
                })
                this.goEasy.publish({
                    channel: "my_channel",
                    message: "Hello, GoEasy!",
                    onSuccess:function(){
                        alert("消息发布成功。");
                    },
                    onFailed: function (error) {
                        alert("消息发送失败，错误编码："+error.code+" 错误信息："+error.content);
                    }

                });
                // 接受消息
                // var goEasy = new GoEasy({
                //     appkey: "BC-b6eb2ea0562e47d89ed53643a67b40ae",
                // });
                // goEasy.subscribe({
                //     channel: "my_channel",
                //     onMessage: function (message) {
                //         alert("Channel:" + message.channel + " content:" + message.content);
                //     },
                //     onMessage: function (message) {
                //         alert("您有新消息：channel：" + message.channel + " 内容：" + message.content);
                //     },
                //     onSuccess: function () {
                //         alert("Channel订阅成功。");
                //     },
                //     onFailed: function (error) {
                //         alert("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
                //     }

                // });
                // // 取消订阅
                // goEasy. unsubscribe ({
                //     channel: "my_channel",
                //     onSuccess: function () {
                //         alert("订阅取消成功。");
                //     },
                //     onFailed: function (error) {
                //         alert("取消订阅失败，错误编码：" + error.code + " 错误信息：" + error.content)
                //     }
                // });
            }

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
        overflow-y:scroll;
        -webkit-overflow-scrolling: touch;
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