<!--话题列表页面用的 内容展示组件-->
<template>
  <div class="center-detail">
    <div v-if="!miDataList">暂无数据</div>
    <div v-else class="left-content">
      <!--帖子详情-->
      <div
        class="content-items"
        v-for="(item, index) in miDataList"
        :key="index"
        @click="goToDetail(item)"
      >
        <div class="contentItems-title">{{ item.title }}</div>
        <!--用户头部信息-->
        <div class="title-user">
          <div class="title-user-left">
            <img v-if="item.img == '' || item.img == null" src="../assets/no_comment.png" alt />
            <img v-else :src="item.img" alt />
          </div>
          <div class="title-user-right">
            <div class="userRight-name">{{ item.yg_name }}</div>
            <!-- <div class="userRight-time">来自{{ item.userDate }}前 · 来自{{ item.userPhoneType }}</div> -->
          </div>
        </div>

        <!--内容部分 文字标题、描述之类-->
        <!-- <div class="titleDescribe">{{ item.wordse }}</div> -->
        <div class="titleDescribe" v-html="item.wordse"></div>

        <!--内容部分 包含文字、图片等-->
        <!-- <div v-if="item.detailsListId == 2">
          <div class="imageList">
            <div
              :class="
                item.detailsList.length == 1
                  ? 'imageList-two'
                  : 'imageList-item'
              "
              v-for="(items, index) in item.detailsList"
              :key="index"
            >
              <img :src="items.imgUrl" alt />
            </div>
          </div>
        </div>-->

        <!--内容部分 包含文字、视频等     -->
        <!-- <div v-if="item.detailsListId == 3">
          <div class="videoStyle">
            <video
              :id="item.id"
              preload="auto"
              controlslist="nodownload"
              controls
              loop
              :src="item.videoLists"
              poster
            ></video>
            <img
              :data-id="item.id"
              v-show="item.isImageShow"
              @click="boFangClick($event, index)"
              src="../assets/bofang.png"
              class="boFang"
              alt
            />
          </div>
        </div>-->

        <!--底部信息 包含标签、评论、点赞功能等-->
        <div class="bottomLine">
          <!--左边手机信息-->
          <div class="bottomLine-left">
            <!-- <div class="bottomLine-card">
              <img src="../assets/jinghao.svg" alt />
              <span>{{ item.labelLeft }}</span>
            </div>
            <div class="bottomLine-card">
              <img src="../assets/circle.svg" alt />
              <span>{{ item.labelRight }}</span>
            </div>-->
          </div>

          <!--右边操作功能-->
          <div class="bottomLine-right">
            <div class="operationOne textStyle">
              <span style="margin-right:6px">{{ item.view }}</span>
              <span>浏览</span>
            </div>
            <!--评论-->
            <!-- <div class="operationTwo layout textStyle">
              <img class="commentImg comUrl" src="../assets/res.svg" alt />
              <span>{{ item.comment }}</span>
            </div>-->

            <!--点赞-->
            <div class="layout textStyle">
              <img
                v-if="item.like_status == 1"
                class="commentImg"
                src="../assets/zan_h.svg"
                @click.stop="giveLikeClick(item, 1)"
                alt
              />
              <img
                v-else
                class="commentImg"
                src="../assets/zan.svg"
                @click.stop="giveLikeClick(item, 1)"
                alt
              />
              <span>{{ item.likes }}</span>
            </div>
          </div>
        </div>
        <!--管理员删除按钮-->
        <div class="adminDelete" v-if="isAdminShow">
          <el-button type="danger" round @click="deleteEssay(item)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Storage } from "../../libs/public";
export default {
  name: "listDetail",
  props: {
    miDataList: {
      type: Array || Object
    },
    isTopPing: {
      type: Boolean,
      default: false
    },
    category_id: {
      type: String
    }
  },
  created() {
    let storage = new Storage();
    this.userInfo = storage.getItem("userInfo");
    console.log(this.userInfo)
    // this.miDataList.push(list);
  },
  data() {
    return {
      isShow: false,
      userInfo: {}, //用户数据
      circleDates: {},
      isAdminShow: false //是否显示管理员删除
    };
  },
  mounted() {
    this.Videostate();
    this.isAdminDelete();
  },
  methods: {
    //判断帖子是否能被管理员删除
    isAdminDelete() {
      let qz_admin = this.userInfo.qz_admin;
      console.log("qz_admin", qz_admin);
      qz_admin.map(item => {
        console.log(item);
        if (item.id == this.category_id) {
          console.log("进来了");
          this.isAdminShow = true;
        }
      });
    },

    //点击删除按钮
    deleteEssay(val) {
      this.$emit("deleteEssay", val);
    },

    //跳转详情页面
    goToDetail(item) {
      this.$emit("goToDetail", item);
    },

    //文章 点赞事件
    giveLikeClick(item, type) {
      this.$emit("giveLikeClick", item, type);
    },

    boFangClick(e) {
      var idx = e.target.id ? e.target.id : e.target.dataset.id;
      var myVideo = document.getElementById(idx);
      console.log("myVideo.paused", myVideo.paused);
      if (myVideo.paused) {
        console.log("播放");
        myVideo.play();
        this.centerBtnIs(idx, false);
      } else {
        console.log("暂停");
        myVideo.pause();
        this.centerBtnIs(idx, true);
      }
    },

    //原生video播放、暂停事件
    Videostate() {
      var that = this;
      var myVideo = document.querySelectorAll("video");
      console.log(myVideo);
      for (const item of myVideo) {
        item.addEventListener("play", function(e) {
          var idx = e.target.id ? e.target.id : e.target.dataset.id;
          //播放开始执行的函数
          that.centerBtnIs(idx, false);
        });
        item.addEventListener("pause", function(e) {
          var idx = e.target.id ? e.target.id : e.target.dataset.id;
          //暂停开始执行的函数
          that.centerBtnIs(idx, true);
        });
      }
    },

    //控制中间播放按钮的显示与隐藏
    centerBtnIs(id, val) {
      let listDats = this.miDataList;
      for (const item of listDats) {
        if (item.id == id) {
          item.isImageShow = val;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.center-detail {
  display: flex;
  justify-content: center;
}

.contentItems-title {
  opacity: 0.8;
  font-size: 32px;
  color: #000;
  line-height: 52px;
  margin-bottom: 50px;
  text-align: left;
}

.left-content {
  width: 670px;
  padding: 0 40px 20px;
  background-color: #fff;
  box-sizing: border-box;
}

//置顶帖子
.topInvitation {
  margin: 30px 0 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;

  .topInvitation-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .topping {
    display: inline-block;
    width: 34px;
    height: 18px;
    line-height: 18px;
    background: #ed2701;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    letter-spacing: 0.86px;
    text-align: center;
    margin-right: 10px;
    vertical-align: middle;
  }

  .topping-text {
    max-width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
  }

  .topping-time {
    margin-left: auto;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
}

.content-items {
  margin-top: 30px;
  cursor: pointer;

  .title-user {
    display: flex;
    height: 40px;
    align-items: center;
  }

  .title-user-left {
    margin-right: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: block;
    }
  }

  .title-user-right {
    font-size: 12px;
    color: #000;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;

    .userRight-name {
      font-size: 15px;
    }

    .userRight-time {
      opacity: 0.5;
    }
  }
}

.titleDescribe {
  font-size: 18px;
  margin-top: 16px;
  line-height: 28px;
  min-height: 56px;
  color: rgba(0, 0, 0, 0.8);
  // overflow: hidden;
  // text-overflow: ellipsis;
  // word-break: break-all;
  // display: -webkit-box;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
  // text-align: left;
}

.imageList {
  display: flex;
  flex-wrap: wrap;

  .imageList-item {
    width: 186px;
    height: 186px;
    margin: 10px 10px 0 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .imageList-two {
    width: 590px;
    height: 273px;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
  }
}

.videoStyle {
  width: 590px;
  height: 330px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .boFang {
    position: absolute;
    z-index: 10;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

.bottomLine {
  margin-top: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;

  .bottomLine-left {
    display: flex;
    justify-content: space-between;
  }

  .bottomLine-card {
    display: flex;
    align-items: center;
    margin-right: 16px;
    img {
      width: 14px;
      height: 14px;
      margin-right: 4px;
    }
    span {
      font-size: 14px;
      opacity: 0.4;
      font-weight: 400;
    }
  }

  .bottomLine-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;

    .operationOne {
      margin-right: 20px;
    }

    .textStyle {
      height: 22px;
      font-size: 14px;
      font-weight: 400;
      span {
        opacity: 0.5;
      }
    }
  }
}

.operationTwo {
  margin-right: 26px;
}

.layout {
  display: flex;
  align-items: center;
}

.commentImg {
  width: 22px;
  height: 19px;
  margin-right: 8px;
  align-self: flex-start;
}

.comUrl {
  align-self: flex-end;
}

//管理员删除
.adminDelete {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin: 10px 0;
  .el-button {
    width: 70px;
    height: 30px;
    line-height: 30px;
    padding: 0;
  }
}
</style>
