<template>
  <div class="weite-container">
    <!--头部组件-->
    <div class="aboutHead">
      <forumHead></forumHead>
    </div>

    <!--主要内容-->
    <div class="write-article">
      <!--左边菜单栏-->
      <!-- <div class="leftMenu">
        <div class="leftMenu-item" @click="isSelectClick()">
          <img src="../assets/weiFabu.png" alt />
          <div class="leftMenu-item-text">内容发布</div>
        </div>
        <div class="leftMenu-item">
          <img v-if="!isSelect" src="../assets/my.png" alt />
          <img v-else src="../assets/weiMy.png" alt />
          <div style="color:#FF594A" class="leftMenu-item-text">我的内容</div>
        </div>
      </div> -->
      <leftArticle :isSelectValue="isSelectValue" @isSelectClick="isSelectClick"></leftArticle>
      <!--右边主要功能模块-->
      <div class="rightModule">
        <!--发布模块-->
        <!-- <div>
          <myIssue
            ref="myIssue"
            @issueChange="issueChange"
            @circleValueChange="circleValueChange"
            @typeValueChange="typeValueChange"
            @publishClick="publishClick"
            :circleOptions="circleOptions"
            :typeOptions="typeOptions"
          ></myIssue>
        </div> -->

        <!--我的内容模块-->
        <div v-if="isContentShow" class="noMyContent">
          <div class="noMyContent-text">
            <img src="../assets/myNone.png" alt="" />
            <span>你还没有发表过内容</span>
          </div>
          <div>
            <el-button type="danger" round @click="isSelectClick">
              立即发表
            </el-button>
          </div>
        </div>
        <div v-else>
          <myMatter
            :userYftzList="userYftzList"
            @goToDetail="goToDetail"
            @deleteClick="deleteClick"
            @pageChangeClick="pageChangeClick"
          ></myMatter>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _methods, Storage } from "../../libs/public";
import Services from "../../libs/api.js";

export default {
  name: "myArticle",
  components: {
    forumHead: () => import("../components/forumHead"),
    myMatter: () => import("../components/myMatter"),
    leftArticle: () => import("../components/leftArticle")
  },
  created() {
    let storage = new Storage();
    this.userInfo = storage.getItem("userInfo");
    console.log("userInfo", this.userInfo);
  },
  data() {
    return {
      userInfo: {},
      isContentShow: false,
      isSelectValue: 2, //true的时候代表打开内容发布模块、false代表我的内容模块
      wordse: "", //富文本内容
      category_id: "", //选中的圈子id
      type_id: "", //选中的类型id
      page: 1,
      size: 10,
      userYftzList: {},
      circleOptions: {}, //圈子列表
      typeOptions: {}
    };
  },
  mounted() {
    this.getUserYftz();
  },
  methods: {
    ..._methods,
    //内容发布和我的内容 互相切换
    isSelectClick(name) {
      console.log(name);
      this.$router.push({
        name: name
      });
    },

    //获取 我的内容--数据
    getUserYftz() {
      let publicData = {
        page: this.page,
        size: this.size,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        page: this.page,
        size: this.size
      };
      Services.loginApi.userYftz(publicData, jiami).then(res => {
        if (res.event == 100) {
          this.userYftzList = res;
          // _methods.tanChuangOk(this, res.msg);
          console.log("我的内容", res);
        } else {
          console.log(res.msg);
          this.isContentShow = true;
        }
      });
    },

    //分页
    pageChangeClick(val) {
      console.log("当前页", val);
      this.page = val;
      this.getUserYftz();
    },

    //我的内容--跳转详情页
    goToDetail(item) {
      console.log("跳转", item);
      this.$router.push({
        name: "circleDetails",
        query: {
          circleDates: item.id,
          circleId: item.category_id,
          limits: item.category_id,
          category_id: item.category_id,
          uid: item.yg_id
        }
      });
      localStorage.setItem("circleDates", JSON.stringify(item));
      // const goTo = this.$router.resolve({
      //   path: "/circleDetails"
      // });
      // window.open(goTo.href, "_blank");
    },

    //我的内容--删除帖子
    deleteClick(value) {
      console.log("删除帖子", value);
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletePost(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //删除请求
    deletePost(value) {
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
          console.log("我的内容", res);
          this.getUserYftz();
        } else {
          _methods.tanChuang(this, res.msg);
        }
      });
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
.weite-container {
  position: relative;
  overflow: hidden;
}
.write-article {
  width: 1200px;
  margin: 70px auto 0;

  //左侧菜单
  .leftMenu {
    position: fixed;
    width: 200px;
    height: 70vh;
    margin-right: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .leftMenu-item {
    height: 22px;
    margin: 30px 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      margin-right: 4px;
    }
    .leftMenu-item-text {
      color: #000;
      font-size: 16px;
      font-weight: 400;
      align-self: center;
    }
  }
}

//右侧主要模块
.rightModule {
  width: 990px;
  margin-left: 210px;
  // overflow: hidden;
}

//
.noMyContent {
  padding-top: 200px;
  .noMyContent-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 200px;
    height: 200px;
  }
  span {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
  }
}
</style>
