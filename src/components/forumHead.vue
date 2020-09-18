<template>
  <div class="head">
    <div class="headContent">
      <!--logo 名字-->
      <div class="leftLogo" @click="goIndex">
        <img src="../assets/logo.png" alt />
        <span>中建社区</span>
      </div>

      <!--右边登录、用户-->
      <div class="rightBtn">
        <!--未登陆-->
        <div class="loginShow" v-if="!isLogin">
          <el-button @click="userLogin" round>登录</el-button>
        </div>
        <!--已经登陆-->
        <div v-else class="loginOk">
          <div class="loginOk-publi" v-if="isPublish">
            <el-button round>发表</el-button>
          </div>
          <div class="publishClick">
            <ul class="publish-ul">
              <li>
                <img src="../assets/wenti.png" alt />
                <span>提问题</span>
              </li>
              <li>
                <img src="../assets/dongtai.png" alt />
                <span>发动态</span>
              </li>
              <li>
                <img src="../assets/shipin.png" alt />
                <span>上传视频</span>
              </li>
              <li @click="gotoArticle">
                <img src="../assets/wenzhang.png" alt />
                <span>写文章</span>
              </li>
            </ul>
          </div>
          <div class="loginOk-name">
            <div class="userMessage">
              <img src="../assets/kongHead.png" alt @click="goToMyArticle" />
              <div>{{ userInfoList.yg_name }}</div>
            </div>
            <div class="quitLogin" @click="logOut">
              <img src="../assets/logoutPic.svg" alt />
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Select } from "element-ui";

Vue.use(Button, Select);

export default {
  name: "forumHead",
  props: {
    isPublish: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userInfoList: {},
      isLogin: false
    };
  },
  created() {
    this.isUserLogin();
  },
  methods: {
    //检测用户是否登录
    isUserLogin() {
      let userInfo = localStorage.getItem("userInfo");
      console.log(userInfo);
      if (userInfo) {
        this.userInfoList = JSON.parse(userInfo);
      } else {
        this.userInfoList = "";
      }
      console.log(this.userInfoList, this.userInfo == null);
      if (this.userInfoList != "" && this.userInfoList != null) {
        this.isLogin = true;
      } else {
        console.log("这里登录");
        this.$router.push({
          name: "circleLogin"
        });
      }
    },

    //跳转首页
    goIndex() {
      console.log("去首页");
      this.$router.push({ name: "index" });
    },

    userLogin() {
      this.$router.push({
        name: "circleLogin"
      });
    },

    //退出登录
    logOut() {
      console.log("退出");
      this.isLogin = false;
      localStorage.setItem("userInfo", "");
      localStorage.setItem("communityToken", "");
      this.$router.push({
        name: "circleLogin"
      });
    },

    //跳转到写文章页面
    gotoArticle() {
      const goTo = this.$router.resolve({
        name: "writeArticle"
      });
      window.open(goTo.href, "_blank");
    },

    //跳转到我的内容页面
    goToMyArticle() {
      const goTo = this.$router.resolve({
        name: "myArticle"
      });
      window.open(goTo.href, "_blank");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0;
}
a {
  color: #42b983;
}

.head {
  position: fixed;
  z-index: 999;
  width: 100%;
  background-color: #fff;

  .headContent {
    width: 1170px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .leftLogo {
    display: inherit;
    align-items: center;
    cursor: pointer;
    img {
      width: 90px;
      height: 50px;
      margin-right: 13px;
      object-fit: cover;
    }
    span {
      font-size: 16px;
      color: #000;
      font-weight: bold;
    }
  }
  .rightBtn {
    display: flex;

    .loginShow {
      display: flex;
    }

    .el-button {
      width: 70px;
      height: 30px;
      line-height: 30px;
      padding: 0;
      background-color: #ff594a;
      color: #fff;
      border: 1px solid #ff594a;
    }

    .loginOk {
      display: flex;
      align-items: center;

      .loginOk-publi {
        height: 60px;
        display: flex;
        align-items: center;
      }

      .publishClick {
        display: none;
        position: fixed;
        top: 60px;
        width: 126px;
        cursor: pointer;
        background-color: #fff;
        border-radius: 5px;
        align-items: center;
        box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);

        .publish-ul {
          padding: 10px 0;
        }

        .publish-ul li {
          height: 36px;
          line-height: 36px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          img {
            width: 19px;
            height: 19px;
            margin-right: 15px;
          }
        }
      }

      .loginOk-publi:hover + .publishClick {
        display: block;
      }

      .publishClick:hover {
        display: block;
      }
      .publishClick li:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      .loginOk-name {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        div {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
        }
      }

      .userMessage {
        display: flex;
        align-items: center;
        line-height: 60px;
        padding: 0 10px;
        img {
          cursor: pointer;
        }
      }

      .quitLogin {
        display: none;
        position: fixed;
        top: 60px;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        background-color: #fff;
        border-radius: 5px;
        align-items: center;
        padding: 0 20px;
        box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
        img {
          width: 20px;
          height: 20px;
          margin: 10px 10px 0 0;
        }
        span {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          vertical-align: super;
        }
      }

      .quitLogin:hover {
        display: block;
        background-color: #f9f9f9;
      }

      .userMessage:hover + .quitLogin {
        display: block;
      }
    }
  }
}
</style>
