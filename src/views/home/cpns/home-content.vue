<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <house-item-v9
          v-if="item.discoveryContentType == 9"
          :item-data="item.data"
          @click="houseItemClick(item.data)"
        />
        <house-item-v3
          v-else-if="item.discoveryContentType == 3"
          :item-data="item.data"
          @click="houseItemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import HouseItemV9 from "@/components/house-item-v9/house-item-v9.vue";
import HouseItemV3 from "@/components/house-item-v3/house-item-v3.vue";
import useHomeStore from "@/stores/modules/home";
const homeStore = useHomeStore();
const { houseList } = storeToRefs(homeStore);

const router = useRouter();

function houseItemClick(item) {
  router.push(`/detail/${item.houseId}`);
}
</script>

<style lang="less" scoped>
.content {
  padding: 0 8px;

  .title {
    font-size: 20px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
