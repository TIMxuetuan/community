<template>
  <div class="community">
    <!--头部组件-->
    <div class="aboutHead">
      <forumHead></forumHead>
    </div>

    <!--首页圈子列表-->
    <div class="circleLists">
      <!--左侧点击选择圈子-->
      <!-- <ul class="sidebar">
        <li class="sidebarItem">全部圈子</li>
      </ul>-->
      <!--内容上面的站位空-->
      <div class="stanceNone"></div>

      <!--圈子列表组件-->
      <div class="sortList">
        <circleLists
          :topicLists="topicLists"
          @toTopicList="toTopicList"
        ></circleLists>
      </div>
    </div>
    <backTop></backTop>
  </div>
</template>

<script>
import { circleListsData } from "../../libs/public";
import Services from "../../libs/api.js";
export default {
  name: "index",
  components: {
    forumHead: () => import("../components/forumHead"),
    circleLists: () => import("../components/circleLists"),
    backTop: () => import("../components/backTop")
  },
  data() {
    return {
      userInfoList: {},
      topicLists: circleListsData,
      page: 1,
      size: 10
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || "";
    this.userInfoList = userInfo;
    this.getindexList();
  },
  mounted() {},
  methods: {
    //获得圈子数据
    getindexList() {
      let publicData = {
        roles: this.userInfoList.roles,
        top: this.userInfoList.top,
        yg_id: this.userInfoList.yg_id,
        yg_name: this.userInfoList.yg_name
      };
      Services.loginApi.circleList(publicData).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.topicLists = res.list;
        } else {
          console.log(res.msg);
        }
      });
    },

    toTopicList(item) {
      console.log(item);
      // localStorage.setItem("circleListItem", JSON.stringify(item));
      const goTo = this.$router.resolve({
        name: "About",
        query: {
          circleId: item.id
        }
      });
      window.open(goTo.href, "_blank");
    }
  }
};
</script>
<style>
body {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
}
</style>
<style lang="scss" scoped>
ul,
li {
  list-style: none;
}

.community {
  position: relative;
  overflow: hidden;
}

.aboutHead {
  position: relative;
  z-index: 999;
}

.circleLists {
  width: 990px;
  margin: 10px auto;

  .sidebar {
    position: fixed;
    width: 180px;
    margin-left: -180px;
    text-align: right;
    font-size: 18px;
    line-height: 24px;
    background: #f9f9f9;
    padding: 60px 30px 0 0;
    z-index: 2;
  }

  .stanceNone {
    position: fixed;
    width: 1170px;
    background-color: #f9f9f9;
    z-index: 1;
    padding-top: 60px;
  }

  .sortList {
    padding-top: 60px;
  }
}
</style>
