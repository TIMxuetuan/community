<template>
  <div class="login-content">
    <div class="content">
      <div class="content-title">社区账号登录</div>
      <div class="input-style">
        <el-input v-model="name" placeholder="请输入用户名" clearable></el-input>
      </div>
      <div class="input-style">
        <el-input v-model="password" placeholder="请输入密码" show-password clearable></el-input>
      </div>
      <div class="input-style">
        <el-button type="primary" @click="userLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { _methods } from "../../libs/public";
import Services from "../../libs/api.js";
export default {
  name: "circleLogin",
  data() {
    return {
      name: "",
      password: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    ..._methods,
    userLogin() {
      localStorage.setItem("communityToken", "");
      if (!this.name) {
        _methods.tanChuang(this, "请输入账号");
        return;
      }
      if (!this.password) {
        _methods.tanChuang(this, "请输入密码");
        return;
      }
      let postObj = {
        username: this.name,
        passwd: this.password,
        login_top: 148
      };
      let jiamiData = {
        username: this.name,
        passwd: this.password,
        login_top: 148
      }
      console.log(postObj);
      Services.loginApi.userLogin(postObj, jiamiData).then(res => {
        console.log("res", res);
        if (res.event == 100) {
          localStorage.setItem("userInfo", JSON.stringify(res.objList));
          localStorage.setItem("communityToken", res.objList.token);
          this.$router.push({
            name: "index"
          });
        } else {
          console.log(res.msg);
          _methods.tanChuang(this, res.msg);
        }
      });
    }
  }
};
</script>
<style>
body {
  background-color: #f5f5f5;
}
.el-message {
  font-size: 18px !important;
}
</style>
<style lang="scss" scoped>
.login-content {
  width: 100%;

  .content {
    position: relative;
    width: 854px;
    height: 400px;
    background-color: #fff;
    margin: 200px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0 0;
  }

  .content-title {
    font-size: 22px;
    padding-top: 15px;
    margin-bottom: 40px;
  }

  .input-style {
    display: flex;
    width: 356px;
    margin-bottom: 20px;

    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
