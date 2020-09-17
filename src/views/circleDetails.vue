<template>
  <div class="circleDetails" v-if="miDataList">
    <!--头部组件-->
    <div class="aboutHead">
      <forumHead :isPublish="isPublish"></forumHead>
    </div>
    <!--没有内容时，如帖子被删-->
    <div v-if="isContentShow" v-cloak class="noContent">
      <div>
        <img src="../assets/lajitong.png" alt />
      </div>
      <div class="noContent-text">
        内容已删除,去
        <span @click="goToQuan">圈子</span>看看吧～
      </div>
    </div>

    <!--有内容展示-->
    <div class="container" v-else v-cloak>
      <!--内容展示-->
      <circleDetailsCommon
        :miDataList="miDataList"
        @giveLikeClick="giveLikeClick"
        @deleteEssay="deleteEssay"
      ></circleDetailsCommon>

      <!--说说我的看法-->
      <div
        class="myOpinion"
        v-if="limitType == 4 || (limitType == 3 && authorId == userInfo.yg_id)"
      >
        <div class="myOpinion-title">说说我的看法</div>
        <div v-if="!isLogin" class="myOpinion-none">登录后可以发表评论</div>
        <div v-else class="myOpinion-text">
          <el-input type="textarea" :rows="3" placeholder="请输入评论内容..." v-model="textarea"></el-input>
          <div class="myOpinion-btn">
            <el-button
              type="danger"
              :disabled="textarea != '' ? false : true"
              round
              @click="issueClick"
            >发布</el-button>
          </div>
        </div>
      </div>

      <!--评论-->
      <div class="remark" v-if="limitType == 4 || limitType == 3">
        <remark
          :remarkList="remarkList"
          @giveLikeClick="giveLikeClick"
          @fabuReply="fabuReply"
          @fabuReplyTwo="fabuReplyTwo"
          @openMornClick="openMornClick"
          @offMornClick="offMornClick"
          @replyClick="replyClick"
          @replyClick2="replyClick2"
        ></remark>
      </div>

      <!--没有更多数据-->
      <!-- <div class="noMore">没有更多数据了</div> -->

      <!--返回顶部-->
      <backTop></backTop>
    </div>
  </div>
</template>
<script>
import { _methods } from "../../libs/public";
import Services from "../../libs/api.js";

export default {
  name: "circleDetails",
  components: {
    forumHead: () => import("../components/forumHead"),
    circleDetailsCommon: () => import("../components/circleDetailsCommon"),
    backTop: () => import("../components/backTop"),
    remark: () => import("../components/remark")
  },
  created() {
    // this.circleDates = JSON.parse(localStorage.getItem("circleDates"));
    this.circleDates = JSON.parse(this.$route.query.circleDates);
    this.circleId = this.$route.query.circleId;
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("circleDates", this.circleDates, this.circleId);
    // this.miDataList.push(list);
  },
  data() {
    return {
      isContentShow: false,
      isPublish: true, //是否展示头部发表
      userInfo: {}, //用户数据
      circleDates: "", //从列表传递来的数据
      circleId: "", //圈子id
      miDataList: [], //帖子详情数据
      limitType: "", //控制评论回复是否展示
      authorId: "", //作者id
      isLogin: true, //是否登录
      textarea: "",
      isDisabled: true,
      type: 1, //评论类型：最热：1， 最新：2
      page: 1,
      size: 10,
      remarkList: {}, //所有评论数组
      backupsList: {}, //备份初始获得的数据，用于以后的处理
      beifen: {}
    };
  },
  mounted() {
    this.getPostDetails();
  },
  methods: {
    ..._methods,
    // 一级评论回复
    replyClick(value, type) {
      if (this.limitType == 3 && this.authorId != this.userInfo.yg_id) {
        console.log("进来");
        _methods.tanChuang(this, "仅楼主可以回复");
        return;
      }
      console.log(value, type, this.remarkList);
      value.ishf = type;
      value.textarea = "";
    },

    //二级以及多级评论回复
    replyClick2(value, type) {
      if (this.limitType == 3 && this.authorId != this.userInfo.yg_id) {
        console.log("进来");
        _methods.tanChuang(this, "仅楼主可以回复");
        return;
      }
      console.log(value, type, this.remarkList);
      value.ishf = type;
      value.textarea = "";
    },

    //获取帖子详情
    getPostDetails() {
      let publicData = {
        id: this.circleDates,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        id: this.circleDates
      };
      Services.loginApi.postDetails(publicData, jiami).then(res => {
        if (res.event == 100) {
          this.miDataList = res.date;
          this.limitType = res.date[0].type;
          this.authorId = res.date[0].yg_id;
          console.log("this.miDataList", this.miDataList);
          this.getCommentlist();
        } else {
          console.log(res.msg);
          this.isContentShow = true;
        }
      });
    },

    //获取所有评论
    getCommentlist() {
      console.log("this.miDataList.id", this.miDataList[0]);
      let publicData = {
        title_id: this.miDataList[0].id,
        type: this.type,
        page: this.page,
        size: this.size,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        title_id: this.miDataList[0].id,
        type: this.type,
        page: this.page,
        size: this.size
      };
      Services.loginApi.commentlist(publicData, jiami).then(res => {
        if (res.event == 100) {
          //处理数据\
          // this.remarkList = res;
          // console.log("this.remarkList", this.remarkList);
          this.backupsList = res; //备份数据用于以后的数据使用处理
          this.disposeList(res);
        } else {
          console.log(res);
          this.remarkList = res;
        }
      });
    },

    //处理数据，为所有评论加上：1、可控制的回复表示，2、回复框标识
    disposeList(dataList) {
      console.log("disposeList", dataList);
      for (const item of dataList.list) {
        // item["textarea"] = "";
        // item["ishf"] = false;
        item["isMoreShow"] = true;
        this.$set(item, "ishf", false);
        this.$set(item, "textarea", "");
        for (const items of item.comment_er) {
          this.$set(items, "ishf", false);
          this.$set(items, "textarea", "");
        }
      }
      this.remarkList = dataList;
      console.log("this.remarkList", this.remarkList);
    },

    /*
    评论和回复事件的权限控制 
     type：1  所有人不可回复；
     type：2  阅读类；
     type：3  仅楼主回复；
     type：4  所有人可回复；
    */
    limitsControl() {
      let limitType = this.miDataList[0].type;
      console.log(limitType, limitType == 1);
      if (limitType == 1) {
        _methods.tanChuang(this, "所有人不可回复");
        return;
      }
      return;
    },

    //第一次参与评论的发布事件
    issueClick() {
      console.log("this.miDataList", this.miDataList[0]);
      let publicData = {
        title_id: this.miDataList[0].id,
        comment: this.textarea,
        pid: "",
        com_id: "",
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        title_id: this.miDataList[0].id,
        comment: this.textarea,
        pid: "",
        com_id: ""
      };
      Services.loginApi.comment(publicData, jiami).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.getCommentlist();
          _methods.tanChuangOk(this, res.msg);
        } else {
          console.log(res.msg);
        }
      });
    },

    //点赞事件  type:1代表帖子； 2代表评论
    giveLikeClick(item, type) {
      console.log("item", item, type);
      let publicData = {
        id: item.id,
        type: type,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        id: item.id,
        type: type
      };
      Services.loginApi.giveLike(publicData, jiami).then(res => {
        console.log("res", res);
        if (res.event == 100) {
          console.log("res", res);
          if (type == 1) {
            this.getPostDetails();
          }
          this.getCommentlist();
        } else {
          console.log(res.msg);
        }
      });
    },

    //回复 别人的评论
    fabuReply(value) {
      console.log(value);
      let publicData = {
        title_id: this.miDataList[0].id,
        comment: value.textarea,
        pid: value.id,
        com_id: value.id,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        title_id: this.miDataList[0].id,
        comment: value.textarea,
        pid: value.id,
        com_id: value.id
      };
      Services.loginApi.comment(publicData, jiami).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.getCommentlist();
          _methods.tanChuangOk(this, res.msg);
        } else {
          console.log(res.msg);
        }
      });
    },

    //第二种回复， 区别于 这个是回复 回复者的评论，类似于第三级评论
    fabuReplyTwo(value) {
      console.log(value);
      let publicData = {
        title_id: this.miDataList[0].id,
        comment: value.textarea,
        pid: value.id,
        com_id: value.com_id,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        title_id: this.miDataList[0].id,
        comment: value.textarea,
        pid: value.id,
        com_id: value.com_id
      };
      Services.loginApi.comment(publicData, jiami).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.getCommentlist();
          _methods.tanChuangOk(this, res.msg);
        } else {
          console.log(res.msg);
        }
      });
    },

    //更多评论 展开数据
    openMornClick(value, type) {
      console.log("展开评论", value, type);
      this.beifen = value;
      let erId = {};
      var list = [];
      value.comment_er.map(item => {
        console.log(item.id);
        list.push(item.id);
      });
      erId = list.join(",");
      console.log("erId", erId);
      let publicData = {
        title_id: this.miDataList[0].id,
        com_id: value.id,
        er_id: erId,
        page: this.page,
        size: this.size,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        title_id: this.miDataList[0].id,
        com_id: value.id,
        er_id: erId,
        page: this.page,
        size: this.size
      };
      Services.loginApi.moreComment(publicData, jiami).then(res => {
        if (res.event == 100) {
          _methods.tanChuangOk(this, res.msg);
          this.disposeMore(value, res.list, this.remarkList.list);
          console.log("更多评论", value);
        } else {
          _methods.tanChuangOk(this, res.msg);
        }
      });
    },
    //展开评论的处理数据方法
    disposeMore(value, moreList, allList) {
      console.log("moreList", value, moreList, allList);
      for (const item of moreList) {
        console.log(item);
        value.comment_er.push(item);
      }
      console.log("value.comment_er", value.comment_er);
    },

    //收起评论
    offMornClick(item, type) {
      item.comment_er = item.comment_er.slice(0, 2);
      item.isMoreShow = type;
    },

    //管理员删除帖子
    deleteEssay(val) {
      console.log(val);
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteClick(val);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //管理员--删除帖子
    deleteClick(value) {
      console.log("删除帖子", value);
      let publicData = {
        id: value.id,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        id: value.id
      };
      Services.loginApi.deleteMy(publicData, jiami).then(res => {
        if (res.event == 100) {
          this.getPostDetails();
          _methods.tanChuangOk(this, res.msg);
        } else {
          _methods.tanChuangOk(this, res.msg);
        }
      });
    },

    //跳去圈子列表
    goToQuan() {
      this.$router.push({
        name: "About",
        query: {
          circleId: this.circleId
        }
      });
      // window.open(goTo.href, "_blank");
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
.el-message {
  font-size: 18px !important;
}
</style>
<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}

.noContent {
  margin-top: 200px;
  img {
    width: 210px;
    height: 210px;
  }
  .noContent-text {
    color: #b2b9c6;
    font-size: 20px;
    margin-top: 14px;
    letter-spacing: 1px;
    span {
      color: #1890ff;
      cursor: pointer;
    }
  }
}

.circleDetails {
  position: relative;
  overflow: hidden;
}
.container {
  width: 670px;
  height: 100%;
  margin: 70px auto 0;
  background-color: #fff;
}
.noMore {
  width: 670px;
  margin: 0 auto;
  padding: 10px 0 20px;
  font-size: 14px;
  color: #999;
  text-align: center;
  background-color: #fff;
}

.myOpinion {
  margin-top: 20px;
  padding: 0 40px;

  .myOpinion-title {
    opacity: 0.9;
    font-size: 18px;
    color: #000;
    line-height: 16px;
    margin-bottom: 20px;
    text-align: left;
    font-weight: bold;
  }

  .myOpinion-none {
    height: 82px;
    line-height: 82px;
    caret-color: #fa0560;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: auto;
    font-size: 14px;
  }

  .myOpinion-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;

    .el-button {
      width: 70px;
      height: 30px;
      line-height: 30px;
      padding: 0;
    }
  }
}

.remark {
  padding: 40px 40px;
}
</style>
