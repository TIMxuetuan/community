import circleListsData from "./circleListsData";

// import { Message } from "element-ui";

//公用方法
let _methods = {
  //数字单位转换；10000 变为 1万
  numberUnit(value) {
    let num = "";
    if (value > 9999) {
      num = Math.floor(value / 1000) / 10 + "万";
    } else if (value < 9999 && value > -9999) {
      num = value;
    }
    return num;
  },

  //弹窗失败
  tanChuang(that, value) {
    console.log(value);
    let message = that.$message({
      message: value,
      offset: 100,
      showClose: true,
      type: "error"
    });
    return message;
  },

  //弹窗成功
  tanChuangOk(that, value) {
    console.log(value);
    let message = that.$message({
      message: value,
      offset: 100,
      showClose: true,
      type: "success"
    });
    return message;
  }

};
export { circleListsData, _methods };
