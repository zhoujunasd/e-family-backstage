<template>
    <div class="swiper-wrap">
        <el-card>
            <div slot="header">添加轮播图</div>
            <el-form :model="formData" ref='form' size='mini' label-width="100px" label-position="left">
                <el-form-item label='轮播图标题：' >
                    <!-- required prop='title' -->
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label='对应新闻：'>
                    <el-select v-model="formData.newsId">
                        <el-option v-for='(item,index) in news' :key='index'
                            :label='item.title' :value='item._id'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='轮播图头图：'>
                  <uploadImg class="uploadImg" v-model="formData.img"></uploadImg>
                </el-form-item>
                <el-form-item label='轮播图排序：'>
                    <el-input-number v-model="formData.sort" :min="1" :max="999"></el-input-number>
                </el-form-item>
                <el-form-item label='轮播图类型：'>
                    <el-switch
                        v-model="formData.status"
                        :active-value='1'
                        :inactive-value='0'
                        active-text="显示"
                        inactive-text="不显示">
                    </el-switch>
                </el-form-item>
                <el-form-item label='操作'>
                    <el-button type="primary" @click="submitForm('form')">添加</el-button>
                    <!-- <el-button @click="resetForm('form')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import uploadImg from "@/components/UploadImg";
    export default {
        name: 'addSwiper',
        components:{ uploadImg },
        data(){
            return{
                formData:{
                    title: "",
                    img: "",
                    newsId: "",
                    sort: "",
                    status: 1
                },
                news: []
            }
        },
        methods:{
            getNewsId(){
                this.$axios.get('/news/getNewsId').then(res => {
                     if (res.code == 200) {
                        this.news = res.data;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error",
                            duration: 1000,
                            center: true
                        });
                    }
                }).catch(err => {
                    this.$message({
                        message: "网络链接错误！",
                        type: "error",
                        duration: 1000,
                        center: true
                    });
                });
            },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('/swiper/addSwiper',this.formData).then(res => {
              console.log(res);
              if(res.code == 200){
                  this.$message({
                      message: res.msg,
                      type: "success",
                      duration: 1000,
                      center: true
                  })
                  setTimeout(()=>{this.$router.push('/layout/swiper')},500)
              }else{
                  this.$message({
                      message: res.msg,
                      type: "error",
                      duration: 1000,
                      center: true
                  })
              }
          }).catch((err) => {
              this.$message({
                message: "网络链接错误！" + err,
                type: "error",
                duration: 1000,
                center: true
              });
          })
        } else {
          this.$message({
            message: '数据格式不正确！！！',
            type: 'error',
            duration: 1000,
            center: true,
          })
          return false;
        }
      });
    },
        },
        created() {
            this.getNewsId()
        },
    }
</script>

<style scoped lang='scss'>
.el-input{
  width:400px
}
/deep/ img {
  width: 80px;
  height: 80px;
}
/deep/ .el-upload{
    display: block;
    width: 80px;
} 
/deep/ .avatar-uploader-icon {
  font-size: 14px;
  width: 80px;
  height: 80px;
  line-height: 80px;
}
/deep/ .avatar {
  width: 80px;
  height: 80px;
}

</style>