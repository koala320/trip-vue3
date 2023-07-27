<template>
  <div class="categories">
    <template v-for="item in homeStore.categories" :key="item.id">
      <div class="item">
        <img class="icon" :src="item.pictureUrl" alt="" />
        <span class="text">{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
const homeStore = useHomeStore();
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  height: 80px;
  margin-top: 10px;
  padding: 0 10px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    text-align: center;

    img {
      width: 32px;
      height: 32px;
    }
    .text {
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
</style>
