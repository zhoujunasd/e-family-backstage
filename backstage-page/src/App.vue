<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  .fll{
    float: left;
  }
  .flr{
    float: right;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
  }
  a{
    // a标签去掉下划线
    text-decoration: none;
  }
  // 表格图片样式
  .table-item-img{
    width: 60px;
    height: 60px;
  }
</style>


