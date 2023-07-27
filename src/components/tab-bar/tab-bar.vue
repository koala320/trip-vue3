<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img
              :src="
                getAssetURL(
                  currentIndex == index ? item.imageActive : item.image
                )
              "
              alt=""
            />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import tabbarData from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/load_assets.js";

// 当直接在地址栏切换路由时，设置currentIndex，完成tabbar切换
const route = useRoute();
const currentIndex = ref(0);
watch(route, (newRoute) => {
  const index = tabbarData.findIndex((item) => item.path == newRoute.path);
  if (index === -1) return;
  currentIndex.value = index;
});
</script>

<style lang="less" scoped>
.tab-bar {
  img {
    height: 24px;
  }
}
</style>
