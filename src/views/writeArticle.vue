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
        <div class="leftMenu-item" @click="isSelectClick(true)">
          <img v-if="isSelect" src="../assets/fabu.png" alt="" />
          <img v-else src="../assets/weiFabu.png" alt="" />
          <div :style="isSelect ? 'color:#FF594A' : 'color:#000'" class="leftMenu-item-text">内容发布</div>
        </div>
        <div class="leftMenu-item" @click="isSelectClick(false)">
          <img v-if="!isSelect" src="../assets/my.png" alt="" />
          <img v-else src="../assets/weiMy.png" alt="" />
          <div :style="!isSelect ? 'color:#FF594A' : 'color:#000'" class="leftMenu-item-text">我的内容</div>
        </div>
      </div>
      <!--右边主要功能模块-->
      <div class="rightModule">
        <!--发布模块-->
        <div v-if="isSelect">内容发布</div>

        <!--我的内容模块-->
        <div v-else>
          <myMatter :userYftzList="userYftzList"></myMatter>
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
    myMatter: () => import("../components/myMatter")
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("userInfo", this.userInfo);
  },
  data() {
    return {
      userInfo: {},
      isSelect: false, //true的时候代表打开内容发布模块、false代表我的内容模块
      page: 1,
      size: 10,
      userYftzList: {}
    };
  },
  mounted() {
    this.getUserYftz();
  },
  methods: {
    ..._methods,
    //内容发布和我的内容 互相切换
    isSelectClick(type) {
      this.isSelect = type;
      console.log(this.isSelect)
    },

    //获取我的内容数据
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
          _methods.tanChuangOk(this, res.msg);
          console.log("我的内容", res);
        } else {
          console.log(res.msg);
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
  background-color: #fff;
}
</style>
