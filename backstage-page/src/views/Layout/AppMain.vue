<template>
    <div>
        <HeaderTop></HeaderTop>
        <SideBar></SideBar>
        <AppMain></AppMain>
    </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop.vue";
import SideBar from "@/components/SideBar.vue";
import AppMain from "./AppMain.vue";
export default {
  name: "appmain",
  components: {
    HeaderTop,
    SideBar,
    AppMain
  }
};
</script>

<style scoped>
</style>