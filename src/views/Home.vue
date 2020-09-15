<template>
  <div class="container">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="head">
      <div class="head-left">
        <img class="oneTu" src="../assets/leftthree.png" alt />
        <img class="twoTu" src="../assets/timedate.png" alt />
      </div>
      <div class="head-right">
        <img class="threeTu" src="../assets/righticon.png" alt />
      </div>
    </div>

    <!--日历-->
    <div class="calendar">
      <div class="calendar-head">
        <div
          class="calendar-head-list"
          v-for="(item, index) in headList"
          :key="index"
        >
          {{ item.headName }}
        </div>
      </div>

      <div class="calendar-content">
        <div
          class="calendar-list"
          v-for="(item, index) in contentList"
          :key="index"
          :style="item.backgroundNow"
        >
          <!-- <div :style="item.colorShow == 1 ? huiColor : heiColor">{{item.timeNumber}}</div> -->
          <div v-if="item.colorShow == 1" class="qianhui">
            {{ item.timeNumber }}
          </div>
          <div v-else-if="item.colorShow == 2" style="color:#000">
            {{ item.timeNumber }}
          </div>
          <div v-else-if="item.colorShow == 3" style="color:#fff">
            {{ item.timeNumber }}
          </div>
          <div v-else-if="item.colorShow == 4" style="color:#008C73">
            {{ item.timeNumber }}
          </div>
          <!--代表正常的色块区域  isShow 是否显示色标、划线等 1：代表不显示色标 2：代表显示划线，3：正常显示色标-->
          <div class="color-list" v-if="item.isShow == 3">
            <div
              :style="items"
              class="color-item"
              :class="item.backgroundNow ? 'newBorder' : ''"
              v-for="(items, index) in item.colorList"
              :key="index"
            ></div>
          </div>

          <div class="xian-module" v-else-if="item.isShow == 2">
            <img class="foreTu" src="../assets/huaxian.png" alt />
          </div>
        </div>
      </div>
    </div>

    <!--时间-->
    <div class="timetext">Thursday,October 20, 2016</div>

    <!--任务标签-->
    <div class="task-tags">
      <div class="tags-items" v-for="(item, index) in tagsLists" :key="index">
        <div class="tags-items-left" :style="item.bgColor"></div>
        <div class="tags-items-right">
          <div class="items-right-time">
            <div>{{ item.startTime }}</div>
            <div>{{ item.endTime }}</div>
          </div>

          <div class="items-right-time right-text">
            <div style="font-weight:bold;font-size:0.88rem">
              {{ item.title }}
            </div>
            <div>
              {{ item.content }}
            </div>
          </div>

          <div class="items-right-time items-right-name">
            <div></div>
            <div class="right-name-two">
              <div>
                {{ item.name }}
              </div>
              <img src="../assets/nameTu.png" alt />
              <!-- <img :src="item.imgUrl" alt=""> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import indexList from "../../libs/dataList.js";
export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      headList: [
        { headName: "Sun" },
        { headName: "Mon" },
        { headName: "Tue" },
        { headName: "Wed" },
        { headName: "Thu" },
        { headName: "Fri" },
        { headName: "Sat" }
      ],

      huiColor: { color: "rgb(201,201,201,1)" },
      heiColor: { color: "rgb(0,0,0,1)" },

      // colorShow： 是否显示色标、划线等 1：代表不显示色标 2：代表显示划线，3：正常显示色标
      contentList: indexList.contentList,

      //任务标签数据
      tagsLists: [
        {
          startTime: "10:45",
          endTime: "12:15",
          title: "Maths:Mechanics",
          content: "Mechanics 3,Maths A",
          name: "Rachel Brown",
          bgColor: {
            backgroundColor: "#FD5645"
          },
          imgUrl: "../assets/huaxian.png"
        },
        {
          startTime: "13:05",
          endTime: "14:35",
          title: "Electronics",
          content: "Electronics 3,Sciences A",
          name: "Tony Campbell",
          bgColor: {
            backgroundColor: "#95A5A6"
          },
          imgUrl: "../assets/huaxian.png"
        },
        {
          startTime: "14:45",
          endTime: "16:15",
          title: "Physics",
          content: "Physics 2,Sciences A",
          name: "John Jones",
          bgColor: {
            backgroundColor: "#049372"
          },
          imgUrl: "../assets/huaxian.png"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

.newBorder {
  border: 1px solid #fff;
}

.head {
  height: 3.5rem;
  background-color: #1c8d76;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 1.25rem;

  .head-left {
    display: flex;
    .oneTu {
      width: 1.63rem;
      height: 1.13rem;
      margin-right: 2.5rem;
    }
    .twoTu {
      width: 7.5rem;
      height: 1.38rem;
    }
  }

  .threeTu {
    width: 1.63rem;
    height: 1.63rem;
  }
}

.calendar {
  .calendar-head {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;

    .calendar-head-list {
      // width: 3.31rem;
      width: 14.28%;
      height: 2.19rem;
      line-height: 2.19rem;
      font-size: 0.75rem;
      padding-left: 0.31rem;
      text-align: left;
    }
  }

  //日期内容
  .calendar-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 7px 7px -7px #5e5e5e;

    .calendar-list {
      // width: 3.34rem;
      width: 14.28%;
      // height: 3.13rem;
      height: 3.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 0.75rem;
      text-align: left;
      padding: 0.31rem;
      border: 1px solid #f4f4f4;
      border-left: 0;
      border-bottom: 0;
      box-sizing: border-box;
    }

    .color-list {
      display: flex;
      .color-item {
        width: 0.31rem;
        height: 0.31rem;
        margin-right: 0.19rem;
        border-radius: 0.06rem;
      }
    }

    .xian-module {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      padding-top: 0.44rem;
    }

    .foreTu {
      width: 0.94rem;
      height: 0.94rem;
    }
  }

  .qianhui {
    color: #cbcbcb;
  }
}

//时间
.timetext {
  height: 3rem;
  margin-top: 0.31rem;
  background-color: #f9f9f9;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  font-size: 0.88rem;
}

//任务标签
.task-tags {
  .tags-items {
    display: flex;
    height: 3.75rem;
    box-shadow: 0px 7px 7px -7px #5e5e5e;
    margin-bottom: 0.31rem;

    .tags-items-left {
      width: 0.31rem;
      // background-color: #FD5645;
    }

    .tags-items-right {
      padding: 0 1.25rem 0 0.94rem;
      flex: auto;
      display: flex;
      align-items: center;
    }

    .items-right-time {
      font-size: 0.75rem;
      height: 2.19rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-right: 1.88rem;
      text-align: left;
    }

    .right-text {
      width: 46%;
      margin: 0;
    }

    .items-right-name {
      margin: 0;
      flex: auto;
    }
    .right-name-two {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        width: 0.75rem;
        height: 1rem;
        margin-left: 0.31rem;
      }
    }
  }
}
</style>
