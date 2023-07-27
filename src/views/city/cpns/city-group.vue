<template>
  <div class="city-group">
    <van-index-bar highlight-color="#ff9854" :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities" key="index">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>
      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, idx) in group.cities" :key="idx">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city.js";
// props
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});
// 动态索引
const indexList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});
// 监听城市点击
const router = useRouter();
const cityStory = useCityStore();
function cityClick(city) {
  cityStory.currentCity = city;
  router.back();
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  padding-right: 25px;
  .city {
    width: 70px;
    height: 28px;
    margin: 6px 0;
    border-radius: 18px;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
    color: #000;
    background: #fff4ec;
  }
}
</style>
