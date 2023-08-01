<template>
  <div class="loading" v-if="mainStore.isLoading">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main.js";
const mainStore = useMainStore();
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 10px rgba(0, 0, 0, 0.5);
  z-index: 999;

  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>
