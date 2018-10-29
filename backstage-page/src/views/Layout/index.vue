<template>
  <div class="layout-wrap">
    <!-- <div class="sider-bar">
          <SideBar></SideBar>
      </div>
      <div class="content">
        <div class="content-top">
          <HeaderTop></HeaderTop>
        </div>
        <div class="content-wrap">
          <AppMain></AppMain>
        </div>
      </div> -->
    <el-container class="contetn">
      <el-aside width="200px" class="sider-ber">
        <SideBar></SideBar>
      </el-aside>
      <el-container class="right-content">
        <el-header class="header">
          <HeaderTop></HeaderTop>
        </el-header>
        <el-main>
          <AppMain></AppMain>
        </el-main>
        <!-- <el-footer class="footer">
          <FooterBot></FooterBot>
        </el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop.vue";
import SideBar from "@/components/SideBar.vue";
import FooterBot from "@/components/FooterBot.vue";
import AppMain from "./AppMain.vue";

export default {
  name: "index",
  components: {
    HeaderTop,
    SideBar,
    AppMain,
    FooterBot
  }
};
</script>

<style scoped lang='scss'>
// .layout-wrap {
//   display: flex;
//   .sider-bar {
//     width: 200px;
//   }
//   .content {
//     .content-top {
//       height: 60px;
//     }
//   }
// }
.layout-wrap {
  overflow: hidden;
}
.sider-ber,
.right-content {
  height: 100vh;
}
.header {
  border-bottom: 1px solid #ccc;
}
.footer {
  background-color: #ddd;
}
</style>