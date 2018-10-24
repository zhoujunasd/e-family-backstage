<template>
    <div class="header-wrap">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/layout/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown size="medium">
            <el-button >
                <img class="img-top" :src='imgUrl' onerror='this.src="http://oowantxlb.bkt.clouddn.com/upload/front/4470566e228087f9f66ef039be58cbe9.png"'>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="editclick">修改个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
  name: "headertop",
  data() {
    return {
      imgUrl: ""
    };
  }
};
</script>

<style scoped lang='scss'>
.img-top{
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