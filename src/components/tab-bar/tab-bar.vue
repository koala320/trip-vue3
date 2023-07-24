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
import { ref } from "vue";
import tabbarData from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/load_assets.js";

const currentIndex = ref(0);
</script>

<style lang="less" scoped>
.tab-bar {
  img {
    height: 24px;
  }
}
</style>
