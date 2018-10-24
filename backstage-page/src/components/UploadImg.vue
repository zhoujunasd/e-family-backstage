<template>
    <el-upload 
        class="avatar-uploader" 
        action="https://upload-z1.qiniup.com" 
        :data='formData'
        :show-file-list="false" 
        :on-success="handleAvatarSuccess" 
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import axios from 'axios'
export default {
  name: "uploadImg",
  props:{
      value:String
  },
  data() {
      return {
        imageUrl: this.value,
        formData: {
            token: ''
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        // console.log(res);
        // this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(this.imageUrl);
        this.imageUrl = res.url
        this.$emit('input', this.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getToken(){
          axios.get('http://upload.yaojunrong.com/getToken').then(res => {
              if(res.data.code == 200){
                  this.formData.token = res.data.data
              }else{
                  this.$message({
                    message: 'getToken:' + res.data.msg,
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
          })
      }
    },
    created() {
        this.getToken()
    },
    watch:{
        value(val){
            this.imageUrl = val
        }
    }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>