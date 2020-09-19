<template>
  <div class="weite-container">
    <!--头部组件-->
    <div class="aboutHead">
      <forumHead></forumHead>
    </div>

    <!--主要内容-->
    <div class="write-article">
      <!--左边菜单栏-->
      <leftArticle
        :isSelectValue="isSelectValue"
        :isAdminValue="isAdminValue"
        @isSelectClick="isSelectClick"
      ></leftArticle>
      <!--右边主要功能模块-->
      <div class="rightModule">
        <!--添加按钮-->
        <div class="addContent">
          <el-button type="primary" @click="centerDialogVisible = true">添加</el-button>
        </div>
        <!--展示帖子类型列表-->
        <div class="maMatter-container">
          <div>
            <div class="maMatter-item" v-for="(item, index) in circleOptions.list" :key="index">
              <div class="item-card">
                <img v-if="item.img == '' || item.img == null" src="../assets/matterNot.png" alt />
                <img v-else :src="item.img" alt />
              </div>
              <div class="article-text">
                <div class="article-title">{{ item.lb_name }}</div>
                <div class="article-title">{{ item.add_time }}</div>
                <div class="article-info">{{ item.describe }}</div>
                <div
                  class="article-info"
                  :class="item.is_start == 0 ? 'passed' : 'no-passed'"
                >{{item.is_start | isStart}}</div>
              </div>

              <!--删除帖子-->
              <div class="article-operate">
                <div class="delete" @click="deleteClick(item)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--添加帖子类型弹窗-->
    <el-dialog title="添加" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="add-dialog">
        <div class="titleInput">
          <el-input v-model="titleInput" placeholder="请输入类型名称"></el-input>
        </div>
        <div class="titleInput">
          <el-input v-model="describeInput" placeholder="请输入类型描述"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTypeClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { _methods, Storage } from "../../libs/public";
import Services from "../../libs/api.js";

export default {
  name: "writeArticle",
  components: {
    forumHead: () => import("../components/forumHead"),
    leftArticle: () => import("../components/leftArticle")
  },
  filters: {
    isStart(value) {
      console.log(value);
      return value == 0 ? "开启" : "关闭";
    }
  },
  created() {
    let storage = new Storage();
    this.userInfo = storage.getItem("userInfo");
    console.log("userInfo", this.userInfo);
  },
  data() {
    return {
      userInfo: {},
      isSelectValue: 3,
      isAdminValue: 2,
      page: 1,
      size: 10,
      userYftzList: {},
      circleOptions: {},
      centerDialogVisible: false,
      titleInput: "",
      describeInput: ""
    };
  },
  mounted() {
    this.getindexList();
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
      Services.loginApi.category_list(publicData).then(res => {
        if (res.event == 100) {
          console.log("res", res);
          this.circleOptions = res;
        } else {
          console.log(res.msg);
        }
      });
    },


    //内容发布和我的内容 互相切换
    isSelectClick(name) {
      this.$router.push({
        name: name
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
}

//右侧主要模块
.rightModule {
  width: 990px;
  margin-left: 210px;
  background-color: #fff;
  overflow: hidden;
}

.addContent {
  padding: 0 20px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #ecf0f3;
  .el-button {
    width: 88px;
    height: 40px;
    line-height: 40px;
    padding: 0;
  }
}

.maMatter-container {
  padding: 0 20px 48px;
  margin-top: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  // min-height: calc(100vh - 184px);
  height: calc(100vh - 184px);
}
.maMatter-container::-webkit-scrollbar {
  display: none;
}

.maMatter-item {
  height: 134px;
  overflow: hidden;
  border-radius: 6px;
  border-bottom: 1px solid #ecf0f3;
  position: relative;
  color: #333;
  display: flex;
  align-items: center;

  .item-card {
    height: 100px;
    width: 180px;
    margin: 0 17px 0 0;
    overflow: hidden;
    object-fit: fill;
    display: flex;
    background: #f5f5f5;
    img {
      width: 36px;
      height: 30px;
      margin: auto;
    }
  }

  .article-text {
    width: calc(100% - 430px);
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    .article-title {
      line-height: 22px;
      font-size: 16px;
      word-break: break-all;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .article-info {
      width: 100%;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .article-operate {
    position: absolute;
    right: 0;
    cursor: pointer;
    .delete {
      width: 88px;
      height: 38px;
      background: url("../assets/delete.png") no-repeat;
    }
    .delete:hover {
      background-color: rgba(243, 230, 229, 1);
      border-radius: 22px;
    }
  }
}

.passed {
  color: #21b900;
}
.no-passed {
  color: #ff594a;
}

//弹窗样式
::v-deep .el-dialog__header {
  display: flex;
  justify-content: center;
}

::v-deep .el-dialog__body {
  padding: 25px 25px 0;
}

.add-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.titleInput {
  width: 300px;
  margin-bottom: 20px;
}
</style>
