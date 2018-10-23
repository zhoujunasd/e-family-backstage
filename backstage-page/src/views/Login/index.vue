<template>
    <div class="login">
        <h2>党建e家后台管理系统</h2>
        <div class="login-wrap">
            <el-form ref="form" :rules="rules" :model="form">
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
        password: "admin"
      },
      rules: {
        username: [
          { min: 4, max: 11, message: "长度在 4 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { min: 4, max: 11, message: "长度在 4 到 11 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('')
        } else {
          return false;
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