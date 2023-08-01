<template>
  <div class="detail" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <DetailInfos
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />
      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map
        name="周边"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";

import TabControl from "@/components/tab-control/tab-control.vue";
import DetailSwipe from "./cpns/detail_01-swipe.vue";
import DetailInfos from "./cpns/detail_02-infos.vue";
import DetailFacility from "./cpns/detail_03-facility.vue";
import DetailLandlord from "./cpns/detail_04-landlord.vue";
import DetailComment from "./cpns/detail_05-comment.vue";
import DetailNotice from "./cpns/detail_06-notice.vue";
import DetailMap from "./cpns/detail_07-map.vue";
import DetailIntro from "./cpns/detail_08-intro.vue";

import useScroll from "@/hooks/useScroll";

const route = useRoute();
const router = useRouter();
const houseId = route.params.id;

// 发送网络请求
const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});
// 返回按钮
function onClickLeft() {
  router.back();
}
// tabControl相关
const detailRef = ref();
const { scrollTop } = useScroll();

const showTabControl = computed(() => {
  return scrollTop.value >= 300;
});

const sectionEls = ref({});
const names = computed(() => {
  return Object.keys(sectionEls.value);
});
function getSectionRef(value) {
  // 组件在卸载时也会执行这个函数，卸载后value值会变为null，所以需要加个判断
  if (!value) return;
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
}
// 点击切换索引
let isClick = false;
let currentDistance = -1;
function tabClick(index) {
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let distance = el.offsetTop;
  if (index !== 0) {
    distance = distance - 44;
  }

  isClick = true;
  currentDistance = distance;

  window.scrollTo({
    top: distance,
    behavior: "smooth",
  });
}
// 监听页面滚动，匹配对应的tabControl的索引
const tabControlRef = ref();
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false;
  }
  // 优化,当通过点击切换索引时,无需一一匹配
  if (isClick) return;
  // 获取所有区域对应顶部的距离 offsetTop
  const els = Object.values(sectionEls.value);
  const values = els.map((el) => el.offsetTop);
  // 根据newValue去匹配索引
  //如果newValue比最后一个值大,会找不到对应索引,所以让默认值为最后一位的索引值,找不到就直接使用默认值
  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] >= newValue + 44) {
      index = i - 1;
      break; //找到索引,跳出循环
    }
  }
  if (index === -1) return;
  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
