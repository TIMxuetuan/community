<template>
  <div class="about">
    <!--头部组件-->
    <div class="aboutHead">
      <forumHead :isPublish="isPublish"></forumHead>
    </div>

    <div v-if="isContentShow" class="commentAll">
      <img src="../assets/no_comment.png" alt />
      <div>还没有文章呢，试试发表你的文章</div>
    </div>

    <div v-else class="container">
      <!--左边内容展示-->
      <listDetail
        :miDataList="miDataList"
        :detailList="detailList"
        @goToDetail="goToDetail"
        @giveLikeClick="giveLikeClick"
        @infiniteHandler="infiniteHandler"
      ></listDetail>
      <!--右边功能类型-->
      <!-- <div style="backgroundColor:#fff;width:310px">222</div> -->

      <!--返回顶部-->
      <backTop></backTop>
    </div>
  </div>
</template>
<script>
// import xiaomiData from "../../libs/xiaomiData.js";
import Services from "../../libs/api.js";
import { Storage } from "../../libs/public";
export default {
  name: "About",
  components: {
    forumHead: () => import("../components/forumHead"),
    listDetail: () => import("../components/listDetail"),
    backTop: () => import("../components/backTop")
  },
  data() {
    return {
      userInfo: {},
      isContentShow: false,
      circleId: "", //圈子id
      uid: "", //用户id
      isPublish: true,
      circleListItem: {},
      page: 1,
      size: 10,
      miDataList: {},
      detailList: [] //为miDataList里面的list数组
    };
  },
  state: {
    list: []
  },
  created() {
    let storage = new Storage();
    // this.circleListItem = JSON.parse(localStorage.getItem("circleListItem"));
    this.circleId = JSON.parse(this.$route.query.circleId);
    this.uid = JSON.parse(this.$route.query.uid);
    this.userInfo = storage.getItem("userInfo");
    console.log("this.circleId", this.userInfo);
  },
  mounted() {
    // this.getDocumentList();
  },
  methods: {
    //获取帖子列表
    getDocumentList() {
      let publicData = {
        category_id: this.circleId,
        yg_id: this.uid,
        page: this.page,
        size: this.size
      };
      let jiami = {
        category_id: this.circleId,
        page: this.page,
        size: this.size
      };
      Services.loginApi.documentList(publicData, jiami).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.miDataList = res;
          // this.disposeRichText(res);
          this.detailList = res.list;
        } else {
          console.log(res.msg);
          this.isContentShow = true;
        }
      });
    },

    //滚动事件
    infiniteHandler($state) {
      let list = this.detailList || "";
      let newPage = list.length / 10 + 1;
      // let newPage = this.page;
      console.log(list, newPage);
      let publicData = {
        category_id: this.circleId,
        page: newPage,
        size: this.size,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        category_id: this.circleId,
        page: newPage,
        size: this.size
      };
      Services.loginApi.documentList(publicData, jiami).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.miDataList = res;
          this.detailList = this.detailList.concat(res.list);
          $state.loaded();
        } else {
          console.log(res.msg);
          $state.complete();
        }
      });
    },

    //处理富文本数据
    disposeRichText(res) {
      console.log("富文本", res);
      res.list.map(item => {
        console.log(item.wordse);
      });
    },

    //点赞事件
    giveLikeClick(item) {
      console.log("item", item);
      let publicData = {
        id: item.id,
        type: 1,
        roles: this.userInfo.roles,
        top: item.top,
        yg_id: item.yg_id,
        yg_name: item.yg_name
      };
      let jiami = {
        id: item.id,
        type: 1
      };
      Services.loginApi.giveLike(publicData, jiami).then(res => {
        console.log("res", res);
        if (res.event == 100) {
          console.log("res", res);
          this.fakeLikeShow(item);
        } else {
          console.log(res.msg);
        }
      });
    },

    //点赞进行假显示
    fakeLikeShow(value) {
      console.log(this.detailList);
      this.detailList.map(item => {
        if (value.id == item.id) {
          console.log(111, item);
          if (item.like_status == 0) {
            console.log("点赞");
            item.like_status = 1;
            item.likes = "1";
          } else if (item.like_status == 1) {
            item.like_status = 0;
            item.likes = "0";
            console.log("取消点赞");
          }
        }
      });
    },

    getDataList() {
      this.$nextTick(() => {
        var videos = document.querySelectorAll("video");
        console.log(videos);
      });
    },

    //跳转详情页
    goToDetail(item) {
      console.log("跳转", item);
      // localStorage.setItem("circleDates", JSON.stringify(item));
      const goTo = this.$router.resolve({
        name: "circleDetails",
        query: {
          circleDates: item.id,
          circleId: this.circleId,
          limits: item.category_id,
          category_id: item.category_id,
          uid: this.uid
        }
      });
      // const goTo = this.$router.resolve({
      //   path: "/circleDetails"
      // });
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
.commentAll {
  padding: 30px 0 80px;
  margin-top: 50px;
  img {
    width: 210px;
    height: 210px;
  }
  div {
    color: #b2b9c6;
    font-size: 16px;
    margin-top: 20px;
  }
}

.about {
  position: relative;
  overflow: hidden;
}

.aboutHead {
  position: relative;
  z-index: 999;
}

.container {
  width: 990px;
  height: 100%;
  margin: 70px auto 0;
}
</style>
