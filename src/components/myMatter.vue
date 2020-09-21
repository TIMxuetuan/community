<template>
  <div class="maMatter">
    <!--展示发的帖子列表-->
    <div class="maMatter-container">
      <div
        class="maMatter-item"
        v-for="(item, index) in userYftzList.list"
        :key="index"
        @click="goToDetail(item)"
      >
        <div class="item-card">
          <img v-if="item.img == '' || item.img == null" src="../assets/matterNot.png" alt />
          <img v-else :src="item.img" alt />
        </div>
        <div class="article-text">
          <div class="article-title">{{ item.title }}</div>
          <div class="article-info">{{ item.create_time }}</div>
          <div class="article-info passed">已上线</div>
        </div>

        <!--删除帖子-->
        <div class="article-operate">
          <div class="delete" @click.stop="deleteClick(item)"></div>
        </div>
      </div>
    </div>
    <!--分页-->
    <div>
      <el-pagination
        background
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="pageChangeClick"
        :total="userYftzList.num * 1"
        :current-page="1"
        :page-size="10"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "myMatter",
  props: {
    userYftzList: {
      type: Object
    }
  },
  data() {
    return {
      //跳转详情
      goToDetail(item) {
        this.$emit("goToDetail", item);
      },

      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      pageChangeClick: val => {
        console.log(`每页 ${val} 条`);
        this.$emit("pageChangeClick", val);
      },
      // pageChangeClick(val) {
      //   console.log(`每页 ${val} 条`);
      //   this.$emit("pageChangeClick", val);
      // },

      //删除帖子
      deleteClick(item) {
        this.$emit("deleteClick", item);
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.maMatter {
  background-color: #fff;
}
.maMatter-container {
  padding: 0 20px 48px;
  margin-top: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  // overflow: hidden;
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
</style>
