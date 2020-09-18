<template>
  <div class="weite-container">
    <!--头部组件-->
    <div class="aboutHead">
      <forumHead></forumHead>
    </div>

    <!--主要内容-->
    <div class="write-article">
      <!--左边菜单栏-->
      <div class="leftMenu">
        <div class="leftMenu-item">
          <img src="../assets/fabu.png" alt />
          <div style="color:#FF594A" class="leftMenu-item-text">内容发布</div>
        </div>
        <div class="leftMenu-item" @click="isSelectClick">
          <img src="../assets/weiMy.png" alt />
          <div class="leftMenu-item-text">我的内容</div>
        </div>
      </div>
      <!--右边主要功能模块-->
      <div class="rightModule">
        <!--发布模块-->
        <div>
          <myIssue
            ref="myIssue"
            @issueChange="issueChange"
            @circleValueChange="circleValueChange"
            @typeValueChange="typeValueChange"
            @publishClick="publishClick"
            :circleOptions="circleOptions"
            :typeOptions="typeOptions"
          ></myIssue>
        </div>

        <!--我的内容模块-->
        <div>
          <!-- <myMatter
            :userYftzList="userYftzList"
            @goToDetail="goToDetail"
            @deleteClick="deleteClick"
          ></myMatter> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _methods } from "../../libs/public";
import Services from "../../libs/api.js";

export default {
  name: "writeArticle",
  components: {
    forumHead: () => import("../components/forumHead"),
    // myMatter: () => import("../components/myMatter"),
    myIssue: () => import("../components/myIssue")
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo", this.userInfo);
  },
  data() {
    return {
      userInfo: {},
      isSelect: false, //true的时候代表打开内容发布模块、false代表我的内容模块
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
    this.getindexList();
    this.getTypeList();
    this.getUserYftz();
  },
  methods: {
    ..._methods,
    //获得圈子数据
    getindexList() {
      let publicData = {
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      Services.loginApi.circleList(publicData).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.circleOptions = res;
        } else {
          console.log(res.msg);
        }
      });
    },

    //获得帖子类型数据
    getTypeList() {
      let publicData = {
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      Services.loginApi.typeList(publicData).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.typeOptions = res;
        } else {
          console.log(res.msg);
        }
      });
    },

    //内容发布和我的内容 互相切换
    isSelectClick() {
      this.$router.push({
        name: "myArticle"
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
        }
      });
    },

    //我的内容--跳转详情页
    goToDetail(item) {
      console.log("跳转", item);
      this.$router.push({
        name: "circleDetails",
        query: {
          circleDates: item.id
        }
      });
      // localStorage.setItem("circleDates", JSON.stringify(item));
      // const goTo = this.$router.resolve({
      //   path: "/circleDetails"
      // });
      // window.open(goTo.href, "_blank");
    },

    //我的内容--删除帖子
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
          _methods.tanChuangOk(this, res.msg);
          console.log("我的内容", res);
          this.getUserYftz();
        } else {
          _methods.tanChuangOk(this, res.msg);
        }
      });
    },

    //获取富文本的内容
    issueChange(value) {
      this.wordse = value;
      console.log("富文本的内容", this.wordse);
    },

    //选中圈子事件
    circleValueChange(value) {
      this.category_id = value;
      console.log(this.category_id);
    },

    //选中类别事件
    typeValueChange(value) {
      this.type_id = value;
      console.log(this.type_id);
    },

    //发布内容按钮事件
    publishClick() {
      let titleValue = this.$refs.myIssue.titleInput;
      console.log(titleValue);
      if (!titleValue || !this.wordse) {
        _methods.tanChuang(this, "标题/正文都要填写才可发表");
        return;
      }
      if (!this.category_id) {
        _methods.tanChuang(this, "请选择一个圈子发表");
        return;
      }
      if (!this.type_id) {
        _methods.tanChuang(this, "请选择一个帖子类型发表");
        return;
      }
      let publicData = {
        title: titleValue,
        wordse: this.wordse,
        category_id: this.category_id,
        type: this.type_id,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        title: titleValue,
        wordse: this.wordse,
        category_id: this.category_id,
        type: this.type_id
      };
      Services.loginApi.postedInvitation(publicData, jiami).then(res => {
        if (res.event == 100) {
          _methods.tanChuangOk(this, res.msg);
          console.log("我的内容", res);
          this.isSelectClick();
        } else {
          _methods.tanChuangOk(this, res.msg);
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
}
</style>
