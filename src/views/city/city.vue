<template>
  <div class="city">
    <div class="top">
      <!-- 1、搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @cancel="onCancel"
      />
      <!-- 2、tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <!-- 当遍历的是对象时，参数分别是value Key index -->
        <template v-for="(value, key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key) in allCities" :key="key">
        <city-group v-show="tabActive == key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCityStore from "@/stores/modules/city";

import CityGroup from "./cpns/city-group.vue";

const router = useRouter();
// 搜索框功能
const searchValue = ref("");
// 取消
function onCancel() {
  router.back();
}
// tab切换
const tabActive = ref("");
// 从Store中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);
// 获取选中标签后的数据
const currentGroup = computed(() => allCities.value[tabActive.value]);
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
