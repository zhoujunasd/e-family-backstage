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
                    this.BS.refresh()
                    let main = this.$refs.main
                    let scrollTop = main.scrollHeight-main.offsetHeight
                    this.BS.scrollTo(0,-scrollTop,300)
                })
            },
            initScroll(){
                this.$nextTick(() => {
                    let main = this.$refs.main
                    this.BS = new BetterScoll(main,{mouseWheel: true,scrollbar: true})
                })
            }
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