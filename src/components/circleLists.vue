<template>
  <div class="circleLists">
    <div class="circleLists-list">
      <!--头部标题-->
      <div class="headTitle">
        <!-- <div>{{ item.topicSort }}</div> -->
      </div>

      <!--圈子、话题列表-->
      <div class="topicLists">
        <div
          class="topicLists-item"
          v-for="(item, index) in topicLists"
          :key="index"
          @click="toTopicList(item)"
        >
          <div class="topicImg">
            <img v-if="item.img == ''" src="../assets/no_comment.png" alt />
            <img v-else :src="item.img" alt />
          </div>

          <div class="topicText">
            <p>{{ item.lb_name }}</p>
            <!-- <div>入驻{{ items.topicEnter }}位</div> -->
            <!-- <div>
              <span>讨论{{ items.topicDiscuss | numberUnit }}</span>
              <span style="margin-left:8px">
                成员{{ items.topicMember | numberUnit }}
              </span>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _methods } from "../../libs/public";
export default {
  name: "circleLists",
  props: {
    topicLists: {
      type: [Object, Array]
    }
  },
  filters: {
    numberUnit: _methods.numberUnit
  },
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    toTopicList(item) {
      this.$emit("toTopicList", item);
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

p {
  margin: 0;
}

.circleLists {
  width: 670px;
  background-color: #fff;
}

.circleLists-list {
  padding: 0 30px;
}

.headTitle {
  padding: 20px 0 0;
  display: flex;
  justify-content: space-between;

  div {
    font-size: 18px;
    line-height: 24px;
    color: #000;
  }
}

.topicLists {
  padding: 10px 0 0;
  display: flex;
  flex-wrap: wrap;
}

.topicLists-item:hover {
  transform: translateY(-3px);
  box-shadow: 0px 20px 20px -25px rgba(0, 0, 0, 0.4);
}

.topicLists-item {
  width: 290px;
  height: 112px;
  margin: 0 0 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: transform 0.25s ease-in-out;

  .topicImg {
    width: 66px;
    height: 66px;
    margin-left: 23px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .topicText {
    margin-left: 23px;
    font-size: 14px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.4);
    text-align: left;

    p {
      font-size: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.8);
      font-weight: 700;
    }
    div {
      margin-top: 5px;
    }
  }
}
</style>
