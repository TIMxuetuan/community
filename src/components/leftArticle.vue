<template>
  <div>
    <div class="leftMenu">
      <!--内容发布-->
      <div class="leftMenu-item">
        <img v-if="isSelectValue == 1" src="../assets/fabu.png" alt />
        <img v-else src="../assets/weiFabu.png" alt />
        <div
          :style="isSelectValue == 1 ? 'color:#FF594A' : 'color:#000'"
          class="leftMenu-item-text"
        >
          发表
        </div>
        <div
          :style="isSelectValue == 1 ? 'color:#FF594A' : 'color:#000'"
          class="leftMenu-item-text listLi"
          @click="isSelectClick('writeArticle')"
        >
          内容发布
        </div>
      </div>
      <!--我的内容-->
      <div class="leftMenu-item">
        <img v-if="isSelectValue == 2" src="../assets/my.png" alt />
        <img v-else src="../assets/weiMy.png" alt />
        <div
          :style="isSelectValue == 2 ? 'color:#FF594A' : 'color:#000'"
          class="leftMenu-item-text"
        >
          内容
        </div>
        <div
          :style="isSelectValue == 2 ? 'color:#FF594A' : 'color:#000'"
          class="leftMenu-item-text listLi"
          @click="isSelectClick('myArticle')"
        >
          我的内容
        </div>
      </div>
      <!--我的管理-->
      <div class="leftMenu-item">
        <img v-if="isSelectValue == 3" src="../assets/my.png" alt />
        <img v-else src="../assets/weiMy.png" alt />
        <div
          :style="isSelectValue == 3 ? 'color:#FF594A' : 'color:#000'"
          class="leftMenu-item-text"
        >
          管理
        </div>
        <div
          :style="isAdminValue == 1 ? 'color:#FF594A' : 'color:#000'"
          class="leftMenu-item-text listLi"
          @click="isSelectClick('adminPostType')"
        >
          帖子类型
        </div>
        <div
          :style="isAdminValue == 2 ? 'color:#FF594A' : 'color:#000'"
          class="leftMenu-item-text listLi"
          @click="isSelectClick('adminCircle')"
        >
          圈子管理
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "leftArticle",
  props: {
    isSelectValue: {
      type: Number //控制菜单的显示；1：代表选中内容发布、2：代表选中我的内容、3：代表选中我的管理
    },
    isAdminValue: {
      type: Number, //控制管理模块三个内容显示；1：代表选中帖子类型、2：代表选中圈子管理、3：代表选中帖子管理
      defalut: 0
    }
  },
  data() {
    return {};
  },
  methods:{
    isSelectClick(name) {
      this.$emit("isSelectClick", name);
    },

    //管理模块跳转
    isAdminClick() {
      this.$emit("isAdminClick");
    }
  }
};
</script>
<style lang="scss" scoped>
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
  width: 140px;
  margin: 30px 0 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

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

.listLi {
  width: 100%;
  padding-left: 24px;
  margin-top: 15px;
  text-align: left;
  cursor: pointer;
}
</style>
