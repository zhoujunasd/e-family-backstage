<template>
    <div class="login">
        <h2>党建e家后台管理系统</h2>
        <div class="login-wrap">
            <el-form ref="form" :rules="rules" :model="form">
              <!-- required prop="账号" 账号 is required -->
                <el-form-item label="账号：" prop="username">
                    <el-input v-model="form.username" placeholder='请输入账号'></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="form.password" type='password' placeholder='请输入密码'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "admin",
        password: "admin",
      },
      rules: {
        username: [
          // 限制用户输入的账号以及密码的格式和长度，trigger: "blur"：在失去焦点时验证，trigger: 'change'：在每次改变时验证
          // { min: 4, max: 11, message: "长度在 4 到 11 个字符", trigger: "blur" },
          { pattern:/^[a-zA-Z0-9]{4,10}$/, message: '请输入正确格式', trigger: 'blur', trigger: 'change' },
        ],
        password: [
          // { min: 4, max: 11, message: "长度在 4 到 11 个字符", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9]{4,10}$/, message: '请输入正确格式', trigger: 'blur',trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('/admine/login',this.form).then((res) => {
            // console.log(res);
            if(res.code == 200){
              this.$message({
                message: '成功登陆！',
                type: 'success',
                duration: 500,
                center: true,
              })
              setTimeout(() => {
                this.$router.push('/layout')
              },500)
            }else{
              this.$message({
                message: '登陆失败！',
                type: 'error',
                duration: 1000,
                center: true,
              })
            }
          })
        } else {
          this.$message({
            message: '账号或密码格式不正确！',
            type: 'error',
            duration: 1000,
            center: true,
          })
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.login {
  height: 100vh;
  background-color: #ccc;
  overflow: hidden;
  text-align: center;
  h2 {
    margin: 60px auto 40px;
  }
}
.login-wrap {
  overflow: hidden;
  box-sizing: border-box;
  width: 400px;
  height: 300px;
  border: 1px solid skyblue;
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px 40px;
  background-color: #fff;
  // position: absolute;
  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%,-50%)
  .el-button {
    width: 100%;
  }
}
</style>