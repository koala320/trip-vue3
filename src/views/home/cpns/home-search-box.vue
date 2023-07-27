<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="section location bottom-gray-line">
      <div class="city" @click="cityClick">
        {{ currentCity.cityName }}
      </div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <!-- 日期范围 -->
    <div
      class="section date-range bottom-gray-line"
      @click="showCalender = true"
    >
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time"> {{ startDateStr }} </span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time"> {{ endDateStr }} </span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalender"
      type="range"
      color="#ff9854"
      @confirm="onConfirm"
      :show-confirm="false"
    />
    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 热门建议 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
    <div class="section hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <span
          class="tag"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
          @click="keywordClick(item.tagText.text)"
          >{{ item.tagText.text }}</span
        >
      </template>
    </div>
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useCityStore from "@/stores/modules/city";
import useHomeStore from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";
import { formatMonthDay, getDiffDays } from "@/utils/format_date";

const router = useRouter();

// props

// 城市 / 位置
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

function cityClick() {
  router.push("/city");
}

function positionClick() {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
    },
    (err) => {
      console.log("获取位置失败", err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

// 日期相关逻辑
const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);

const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));

const stayCount = ref(getDiffDays(startDate.value, endDate.value));

const showCalender = ref(false);

function onConfirm(value) {
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  mainStore.startDate = selectStartDate;
  mainStore.endDate = selectEndDate;
  stayCount.value = getDiffDays(selectStartDate, selectEndDate);

  showCalender.value = false;
}

// 热门建议
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);

// 关键字点击
function keywordClick(keyword) {
  router.push({
    path: "/search",
    query: {
      keyword,
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
}

// 搜索按钮
function searchBtnClick() {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
}
</script>

<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: var(--text-color);
    font-size: 15px;
  }
  .position {
    display: flex;
    align-items: center;
    width: 74px;
    .text {
      font-size: 12px;
      color: var(--text-sub-color);
    }
    img {
      width: 18px;
      height: 18px;
      margin-left: 4px;
    }
  }
}
.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
.price-counter {
  height: 44px;
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.keyword {
  height: 44px;
}

.hot-suggest {
  margin: 10px 0;
  height: auto;
  .tag {
    font-size: 12px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    color: var(--text-color);
    background-color: var(--background-color);
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    margin-top: 10px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background: var(--theme-linear-gradient);
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>
