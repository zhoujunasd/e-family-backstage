<template>
    <div class="addmin-wrap">
        <el-card class="card-wrap" shadow='never'  v-loading="loading">
            <div slot="header" class="header-card">添加管理员</div>
            <el-form class="demo-ruleForm" size='mini' ref='form' :rules="rules" :model='formData' label-width="100px" label-position="left">
                <el-form-item label="用户账号" prop='username'>
                    <el-input v-model="formData.username" :disabled="isEdit" ></el-input>   
                </el-form-item>
                <el-form-item label="用户昵称：" prop='nickname'>
                    <el-input v-model="formData.nickname"></el-input>
                </el-form-item>
                <el-form-item label='用户头像：'>
                    <uploadImg class="uploadImg" v-model="formData.avatar"></uploadImg>
                </el-form-item>
                <el-form-item label="用户密码：" prop='password'>
                    <el-input v-model="formData.password" type='password' :disabled="isEdit"></el-input>
                </el-form-item>
                <el-form-item label="个人描述：">
                    <el-input v-model="formData.des"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop='phone'>
                    <el-input v-model.number="formData.phone"></el-input>
                </el-form-item>
                <el-form-item label='性别：'>
                    <!-- <el-select v-model="formData">
                        <el-option label='男' value='1'></el-option>
                        <el-option label='女' value='0'></el-option>
                    </el-select> -->
                    <el-radio-group v-model="formData.sex">
                        <el-radio :label="1" >男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="!isEdit" type="primary" @click="submitForm('form')">注册</el-button>
                    <el-button v-else type="primary" @click="EdittForm('form')">修改</el-button>
                    <el-button v-if="!isEdit" @click="resetForm('form')">重置</el-button>
                    <el-button v-else @click="CancelForm">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import uploadImg from "@/components/UploadImg";
export default {
  name: "addAdmine",
  components: { uploadImg },
  data() {
    return {
      formData: {
        username: "",
        nickname: "",
        password: "",
        avatar: "",
        des: "",
        sex: 1,
        phone: ''
      },
      isEdit: false,
      loading: true,
        rules:{
            username:[
                {required: true, message: '请输入用户账号！', trigger: 'blur',},
                { pattern:/^[a-zA-Z0-9]{4,10}$/, message: '请输入正确格式', trigger: ['blur','change']} ],
            nickname:[ {required: true, message: '请输入用户昵称！', trigger: 'blur',} ],
            password:[
                {required: true, message: '请输入用户密码！', trigger: 'blur',},
                { pattern:/^[a-zA-Z0-9]{4,10}$/, message: '请输入正确格式', trigger: ['blur','change']}],
            phone:[     
                { type: 'number', message: '电话必须为数字值',trigger: 'change'},
                { pattern:/^1[34578]\d{9}$/,message: '请输入正确格式',trigger: ['blur','change']}]
        }
    };
  },
  methods: {
      CancelForm(){
          this.$message({
              message: '取消修改！！！',
              type: "info",
              duration: 1000,
              center: true
          })
        setTimeout(()=>{ this.$router.push('/layout/admin')},1000)
      },
      EdittForm(){
          this.$axios.patch('/admine/editAdmin',this.formData).then(res => {
            //   console.log(res);
            if(res.code == 200){
                this.$message({
                      message: res.msg,
                      type: "success",
                      duration: 1000,
                      center: true
                  })
                  setTimeout(()=>{ this.$router.push('/layout/admin')},1000)
            }else{
                 this.$message({
                      message: res.msg,
                      type: "error",
                      duration: 1000,
                      center: true
                  })
            }
          }).catch(err => {
              this.$message({
                message: "网络链接错误！" + err,
                type: "error",
                duration: 1000,
                center: true
              });
          })
      },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('/admine/addAdminerUser',this.formData).then(res => {
            //   console.log(res);
              if(res.code == 200){
                  this.$message({
                      message: res.msg,
                      type: "success",
                      duration: 1000,
                      center: true
                  })
                  setTimeout(()=>{this.$router.push('/layout/admin')},500)
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
    resetForm(form) {
      console.log(this.$refs[form]);
      this.$refs[form].resetFields();
    },
    getData(){
        this.loading = true
        this.$axios.get(`/admine/getAdmin/${this.$route.params.id}`).then(res => {
            // console.log(res);
            if(res.code == 200){
                this.loading = false
                this.formData = { ...res.data, password: '000000' }
            }else{
                 this.loading = false
                this.$message({
                      message: res.msg,
                      type: "error",
                      duration: 1000,
                      center: true
                  })
            }
        }).catch(error => {
             this.loading = false
            this.$message({
                message: "网络链接错误！" + error,
                type: "error",
                duration: 1000,
                center: true
            });
        })
    }
  },
  watch:{
      $route(to){
        //   console.dir(to);
        if(to.name == 'addAdmine'){
            this.loading = false
            this.isEdit = false
            this.formData = {}
        }else{
            this.isEdit = true
        }
      }
  },
  created(){  
    //   console.log(this.$route);
      if(this.$route.name == 'addAdmine'){
          this.loading = false
          this.isEdit = false
      }else{
           this.isEdit = true
          this.getData()
      }
  },
};
</script>

<style scoped lang='scss'>
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
.card-wrap {
    overflow: hidden;
    // 计算样式
//   width: calc(100vw - 500px);
//   height: calc(100vh - 120px);
    width: 800px;
  .demo-ruleForm{
      width: 500px
  }
}
</style>