<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box />
    <home-categories />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>
    <home-content />
  </div>
</template>
<script>
export default { name: "home" };
</script>
<script setup>
import { ref, watch, computed, onActivated } from "vue";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue";
import SearchBar from "@/components/search-bar/search-bar.vue";
import HomeContent from "./cpns/home-content.vue";
import useHomeStore from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll";

// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestsData();
homeStore.fetchCategoriesData();
homeStore.fetchHouseListData();
// 滚动到底部, 加载更多
const homeRef = ref();
const { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newVal) => {
  if (newVal) {
    homeStore.fetchHouseListData().then((res) => {
      isReachBottom.value = false;
    });
  }
});
// 滚动显示搜索框
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350;
});

// 跳转回home时,保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<style lang="less" scoped>
.home {
  box-sizing: border-box;
  height: 100vh;
  padding-bottom: 60px;
  overflow-y: auto;
}
.banner {
  img {
    width: 100%;
  }
}
.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background: #fff;
  z-index: 9;
}
</style>
