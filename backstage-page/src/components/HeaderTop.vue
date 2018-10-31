<template>
  <div class="header-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.$route.meta.title}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-dropdown size="medium">
      <el-button>
        <img class="img-top" :src='userInfo.avatar' onerror='this.src="http://oowantxlb.bkt.clouddn.com/upload/front/4470566e228087f9f66ef039be58cbe9.png"'>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="editclick(userInfo._id)">修改个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="quit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "headertop",
  data() {
    return {
      imgUrl: ""
    };
  },
  methods:{
    quit(){
      this.$store.commit('DELETE_USERINFO')
      this.$axios.del('/admine/layout').then(res => {
        if(res.code == 200 ){
          this.$message({
            type: "success",
            message: res.msg,
            center: true,
          });
        setTimeout(()=>{this.$router.push('/login')},1000)
        }else{
          this.$message({
            type: "error",
            message: res.msg,
            center: true,
          });
        }
      }).catch((err) => {
        this.$message({
            type: "error",
            message: 'err:'+ err,
            center: true,
          });
      })
    },
    editclick(id){

      this.$router.push({ name: "editAdmine", params: { id } });
    },
    getBreadcrumb(){
      this.$route.matched.filter(item => {
        console.log(1,item);
      })
    },
  },  
  computed:{
    ...mapState(["userInfo"]),
  },
  watch:{
    $route(to){
      console.log(to);
      this.getBreadcrumb()
    }
  },
  created() {
    // console.log(this.$route)
    this.getBreadcrumb()
  },
};
</script>

<style scoped lang='scss'>
.img-top {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.header-wrap {
  position: relative;
}
.el-breadcrumb {
  line-height: 60px;
  height: 60px;
}
.el-dropdown {
  vertical-align: top;
  position: absolute;
  right: 20px;
  top: 5px;
}
.el-dropdown > button {
  width: 50px;
  height: 50px;
  border: none;
  margin: 0;
  padding: 0;
  border-radius: 50%;
}
</style>