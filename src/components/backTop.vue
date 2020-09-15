<template>
  <div class="pageBtns">
    <div @click="backTop" class="backTop btn"></div>
  </div>
</template>
<script>
export default {
  name: "backTop",
  data() {
    return {};
  },
  methods: {
    //返回大写
    backTop() {
      var time = setInterval(function() {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top === 0) {
          clearInterval(time);
        } else {
          document.documentElement.scrollTop = top - 20;
        }
      }, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.pageBtns {
  width: 45px;
  position: fixed;
  bottom: 100px;
  z-index: 99;
  left: calc(50% + 505px);

  .backTop {
    background: url("../assets/backTop.png") no-repeat;
    background-size: cover;
  }

  .btn {
    height: 45px;
    width: 45px;
    border-radius: 100%;
    margin-bottom: 10px;
    cursor: pointer;
  }
}
</style>
