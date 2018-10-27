<template>
    <div class="sider-bar">
        <!-- :collapse='isCollapse' -->
        <el-menu 
            class="el-menu-vertical-demo" 
            :router="true" 
            unique-opened
            :default-active='activeIndex'
            @open="handleOpen" 
            @close="handleClose" 
            background-color="#545c64" 
            text-color="#fff" 
            active-text-color="#ffd04b">
            <!-- <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/home">首页</el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
            <el-menu-item index="/layout/home">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                </template>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">管理员管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/admin">管理员列表</el-menu-item>
                    <el-menu-item index="/layout/addAdmine">添加管理员</el-menu-item>
                    <el-menu-item index="/layout/editAdmin">修改密码</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">新闻管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/news">新闻列表</el-menu-item>
                    <el-menu-item index="/layout/addNews">添加新闻</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">轮播图管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/swiper">轮播图列表</el-menu-item>
                    <el-menu-item index="/layout/addSwiper">添加轮播图</el-menu-item>
                    <!-- <el-menu-item index="/layout/editSwiper">编辑轮播图</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: "sidebar",
  data(){ 
      return{
        //   isCollapse: true
        activeIndex: ""
      }
   },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch:{
      $route(to,from){
        //   console.log(to);
        //   console.log(from);
          this.activeIndex = to.path
      }
  }
};
</script>

<style scoped lang='scss'>
.sider-bar{
  min-height: 100vh;
  background-color: #545c64;
  .el-menu-vertical-demo{
    border-right: 1px solid #545c64;
    overflow: hidden;
  }
}
</style>