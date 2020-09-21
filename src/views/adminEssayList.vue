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
          <!--圈子类型下拉框-->
          <div class="addContent-item">
            <el-select v-model="circleSelectValue" clearable filterable placeholder="请选择圈子">
              <el-option
                v-for="(item, index) in circleOptions.list"
                :key="index"
                :label="item.lb_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <!--帖子类型下拉框-->
          <div class="addContent-item">
            <el-select v-model="postTypeValue" clearable filterable placeholder="请选择帖子类型">
              <el-option
                v-for="(item, index) in typeOptions.list"
                :key="index"
                :label="item.type_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <!--标题-->
          <div class="addContent-item">
            <el-input v-model="titleInput" placeholder="请输入标题"></el-input>
          </div>
          <el-button type="primary" @click="searchClick">搜索</el-button>
        </div>
        <!--展示帖子类型列表-->
        <div class="maMatter-container">
          <div>
            <div class="maMatter-item" v-for="(item, index) in crmPostList.list" :key="index">
              <div class="item-card">
                <img v-if="item.img == '' || item.img == null" src="../assets/matterNot.png" alt />
                <img v-else :src="item.img" alt />
              </div>
              <div class="article-text">
                <div class="article-title">{{ item.title }}</div>
                <div class="article-title">{{ item.create_time }}</div>
                <div class="article-info">{{ item.describe }}</div>
                <div
                  class="article-info"
                  :class="item.status == 0 ? 'grey' : (item.status == 1 ? 'passed' :'no-passed')"
                >{{item.status | isStart}}</div>
              </div>

              <div class="article-operate">
                <!-- <div class="redact-click">
                  <div class="redactBtn">
                    <el-button type="primary" round>通过</el-button>
                  </div>

                  <div class="redactBtn">
                    <el-button type="danger" round>不通过</el-button>
                  </div>
                </div>-->
                <div class="redactBtn see-browse">
                  <el-button type="primary" round @click="getReadList(item)">浏览记录</el-button>
                </div>

                <!--删除帖子-->
                <div>
                  <div class="delete" @click="deleteClick(item)"></div>
                </div>
              </div>
            </div>
          </div>
          <!--分页-->
          <div>
            <el-pagination
              background
              layout="total, prev, pager, next"
              @current-change="pageChangeClick"
              :total="crmPostList.num * 1"
              :current-page="page"
              :page-size="size"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--浏览人记录-->
    <div>
      <el-dialog title="浏览人记录" :visible.sync="dialogTableVisible" width="600px">
        <div class="record-content">
          <div v-for="(item, index) in readListValue.list" :key="index" class="record-item">
            <div class="recordItem-left marginTime">
              <div class="recordItem-title">浏览人姓名：</div>
              <div class="recordItem-value">{{item.yg_name}}</div>
            </div>
            <div class="recordItem-left">
              <div class="recordItem-title">浏览时间：</div>
              <div class="recordItem-value">{{item.add_time}}</div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { _methods, Storage } from "../../libs/public";
import Services from "../../libs/api.js";

export default {
  name: "adminEssayList",
  components: {
    forumHead: () => import("../components/forumHead"),
    leftArticle: () => import("../components/leftArticle")
  },
  filters: {
    isStart(value) {
      console.log(value);
      return value == 0 ? "未审核" : value == 1 ? "审核通过" : "审核未通过";
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
      isAdminValue: 3,
      page: 1,
      size: 10,
      typeOptions: {}, //帖子类型列表
      postTypeValue: "", //帖子类型下拉框选中的值
      circleOptions: {}, //圈子列表
      circleSelectValue: "", //圈子下拉框选中的值
      titleInput: "", //标题
      crmPostList: {},
      dialogTableVisible: false, //控制浏览人记录是否打开
      readListValue: {} //浏览人记录数据
    };
  },
  mounted() {
    this.getTypeList();
    this.getindexList();
    this.getCrmDocumentList();
  },
  methods: {
    ..._methods,
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

    //获取后台帖子列表管理数据
    getCrmDocumentList() {
      let publicData = {
        category_id: this.circleSelectValue,
        type_id: this.postTypeValue,
        title: this.titleInput,
        page: this.page * 1,
        size: this.size * 1,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        category_id: this.circleSelectValue,
        type_id: this.postTypeValue,
        title: this.titleInput,
        page: this.page,
        size: this.size
      };
      Services.loginApi.crmDocumentList(publicData, jiami).then(res => {
        if (res.event == 100) {
          this.crmPostList = res;
          // _methods.tanChuangOk(this, res.msg);
          console.log("我的内容", res);
        } else {
          console.log(res.msg);
          _methods.tanChuang(this, res.msg);
        }
      });
    },

    //分页
    pageChangeClick(val) {
      console.log("当前页", val);
      this.page = val;
      console.log(typeof (this.page));
      console.log(typeof (this.size));
      this.getCrmDocumentList();
    },

    //搜索事件
    searchClick() {
      this.page = 1;
      console.log(this.circleSelectValue);
      console.log(this.postTypeValue);
      console.log(this.titleInput);
      this.getCrmDocumentList();
    },

    //获得浏览记录
    getReadList(item) {
      console.log(item);
      let publicData = {
        id: item.id,
        page: this.page,
        size: this.size,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        id: item.id,
        page: this.page,
        size: this.size
      };
      Services.loginApi.readList(publicData, jiami).then(res => {
        if (res.event == 100) {
          // _methods.tanChuangOk(this, res.msg);
          this.readListValue = res;
          this.dialogTableVisible = true;
          console.log("我的内容", res);
        } else {
          console.log(res.msg);
          _methods.tanChuang(this, res.msg);
        }
      });
    },

    //删除帖子
    deleteClick(item) {
      this.$confirm("此操作将永久删除该帖子, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletePost(item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //删除请求事件
    deletePost(item) {
      console.log(item);
      let publicData = {
        id: item.id,
        roles: this.userInfo.roles,
        top: this.userInfo.top,
        yg_id: this.userInfo.yg_id,
        yg_name: this.userInfo.yg_name
      };
      let jiami = {
        id: item.id
      };
      Services.loginApi.del_document(publicData, jiami).then(res => {
        if (res.event == 100) {
          // _methods.tanChuangOk(this, res.msg);
          console.log("我的内容", res);
          this.getCrmDocumentList();
        } else {
          console.log(res.msg);
          _methods.tanChuang(this, res.msg);
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
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ecf0f3;
  .el-button {
    width: 88px;
    height: 40px;
    line-height: 40px;
    padding: 0;
  }
}

.addContent-item {
  display: flex;
  margin-right: 15px;
}

.maMatter-container {
  padding: 0 20px 48px;
  margin-top: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  // min-height: calc(100vh - 184px);
  height: calc(100vh - 190px);
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
    display: flex;
    cursor: pointer;
    .redact-img {
      width: 88px;
      height: 38px;
      background: url("../assets/redact.png") no-repeat;
    }
    .delete {
      width: 88px;
      height: 38px;
      background: url("../assets/delete.png") no-repeat;
    }
    .delete:hover {
      background-color: rgba(243, 230, 229, 1);
      border-radius: 22px;
    }
    .redact-img:hover {
      background-color: rgba(243, 230, 229, 1);
      border-radius: 22px;
    }
  }
  .redact-click {
    display: flex;
    align-items: center;
  }
  .redactBtn {
    margin-right: 15px;
    display: flex;
  }
  .see-browse {
    .el-button {
      width: 88px;
      height: 38px;
      line-height: 38px;
      padding: 0;
    }
  }
}

.passed {
  color: #21b900;
}
.no-passed {
  color: #ff594a;
}
.grey {
  color: #8e908c;
}

//弹窗样式
::v-deep .el-dialog__header {
  display: flex;
  justify-content: center;
}

::v-deep .el-dialog__body {
  padding: 25px 25px 0;
}

.el-select {
  width: 100%;
}

.isSwitch {
  width: 100%;
}

.record-content {
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  .record-item {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
  .recordItem-left {
    display: flex;
  }
  .marginTime {
    margin-right: 50px;
  }

  .recordItem-title {
    margin-right: 5px;
    font-size: 16px;
    color: #000;
    font-weight: 400;
    height: 24px;
    line-height: 24px;
  }
  .recordItem-value {
    font-size: 16px;
    color: #000;
    opacity: 0.6;
    height: 24px;
    line-height: 24px;
  }
}
</style>
