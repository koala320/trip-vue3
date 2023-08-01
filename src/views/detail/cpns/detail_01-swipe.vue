<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              {{ switchName(value[0].title) }}
            </span>
            <span v-if="swipeData[active]?.enumPictureCategory == key"
              >{{ getCategoryIndex(swipeData[active]) }} /
              {{ value.length }}</span
            >
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});
// 对数据进行转换
const swipeGroup = {};

for (const item of props.swipeData) {
  let valueArr = swipeGroup[item.enumPictureCategory];
  if (!valueArr) {
    valueArr = [];
    swipeGroup[item.enumPictureCategory] = valueArr;
  }
  valueArr.push(item);
}
// for (const item of props.swipeData) {
//   swipeGroup[item.enumPictureCategory] = [];
// }
// for (const item of props.swipeData) {
//   const valueArr = swipeGroup[item.enumPictureCategory];
//   valueArr.push(item);
// }
const nameReg = /【(.*?)】/i;
function switchName(name) {
  const results = nameReg.exec(name);
  return results[1];
}

function getCategoryIndex(item) {
  const valueArr = swipeGroup[item.enumPictureCategory];
  return valueArr.findIndex((data) => data == item) + 1;
}
</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }
    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      border-radius: 2px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      .item {
        margin: 0 8px;
      }
      .active {
        padding: 0 4px;
        border-radius: 2px;
        color: #333;
        background: #fff;
      }
    }
  }
}
</style>
