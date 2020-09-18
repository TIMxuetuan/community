<template>
  <div>
    <!--富文本和视频切换-->
    <div class="contentBtns-cut">
      <!-- @click="isCutClick(true)" 先舍弃、等做视频的时候再用 -->
      <div :style="isCut ? 'color:#FF594A' : 'color:#000'">文章</div>
      <!-- <div :style="!isCut ? 'color:#FF594A' : 'color:#000'" @click="isCutClick(false)">视频</div> -->
    </div>
    <!--富文本和视频展示的内容-->
    <div>
      <!--写文章--富文本模块-->
      <div v-if="isCut">
        <!--标题-->
        <div class="titleModule">
          <el-input placeholder="请输入文章标题" v-model="titleInput" clearable></el-input>
        </div>
        <!--富文本输入框-->
        <div class="editorPanel">
          <div ref="toolbar" id="div1" class="toolbar"></div>
          <div ref="editor" id="div2" class="text"></div>
        </div>
        <!--选择圈子和类别-->
        <div class="selectContent">
          <div class="selectContent-item">
            <div class="selectContent-title">选择圈子</div>
            <div>
              <el-select
                v-model="circleValue"
                filterable
                placeholder="请搜索或选择圈子"
                @change="circleValueChange"
              >
                <el-option
                  v-for="(item, index) in circleOptions.list"
                  :key="index"
                  :label="item.lb_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="selectContent-item">
            <div class="selectContent-title">选择类型</div>
            <div>
              <el-select
                v-model="typeValue"
                filterable
                placeholder="请搜索或选择类型"
                @change="typeValueChange"
              >
                <el-option
                  v-for="(item, index) in typeOptions.list"
                  :key="index"
                  :label="item.type_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!--发表按钮-->
        <div class="publishBtn">
          <el-button type="danger" round class="publishBtn-fa" @click="publishClick">发表</el-button>
        </div>
      </div>
      <!--上传视频模块-->
      <div v-else>视频</div>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "myIssue",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    //圈子列表
    circleOptions: {
      type: Object
    },
    //类型列表
    typeOptions: {
      type: Object
    },
    value: {
      type: String,
      default: ""
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    }
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  data() {
    return {
      isCut: true,
      editor: null,
      info_: null,
      titleInput: "", //标题
      //圈子选择器的属性
      circleValue: "",
      //类型选择器的属性
      typeValue: ""
    };
  },
  mounted() {
    this.createFu();
    this.editor.txt.html(this.value);
  },
  methods: {
    //创建富文本
    createFu() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.customConfig.uploadImgServer = "https://www.zjtaoke.cn/trains2/uploadFiles";
        // "http://otp.cdinfotech.top/file/upload_images"; // 配置服务器端地址
        // "/shangchuan";
      this.editor.customConfig.uploadImgHeaders = {
        Accept: "text/x-json"
      }; // 自定义 header
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      // this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      // this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      // 配置菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        // "video", // 插入视频
        // "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen" // 全屏
      ];

      this.editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {
          console.log("before", xhr);
          console.log("before", editor);
          console.log("before", files);
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
          console.log("fail", xhr);
          console.log("fail", editor);
          console.log("fail", result);
          // console.log(xhr, editor, result);
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
          console.log("ok", result);
          console.log(xhr, editor, result);
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
          console.log(xhr, editor);
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
          console.log(xhr, editor);
        },
        customInsert: (insertImg, result, editor) => {
          console.log("customInsert", result);
          console.log("customInsert", editor);
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          // for (let i = 0; i < 1; i++) {
          // console.log(result)
          // let url = "http://otp.cdinfotech.top" + result.url;
          let url = result.url;
          insertImg(url);
          // }
        }
      };

      // this.editor.customConfig.customUploadImg = function(files, insert) {
      //   // files 是 input 中选中的文件列表
      //   // insert 是获取图片 url 后，插入到编辑器的方法
      //   console.log("进来了", files);
      //   console.log("进来了", insert);
      //   // 上传代码返回结果之后，将图片插入到编辑器中
      //   // insert(imgUrl);
      // };

      this.editor.customConfig.customAlert = function(info) {
        console.log(info);
        // alert("自定义提示：" + info);
      };
      this.editor.customConfig.onchange = html => {
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit("issueChange", this.info_); // 将内容同步到父组件中
      };

      // 创建富文本编辑器
      this.editor.create();
    },

    //文章和视频切换
    isCutClick(type) {
      this.isCut = type;
      if (type) {
        console.log("再次", this.value);
        // this.createFu();
        // this.editor.txt.html("");
      }
    },

    //选中圈子事件
    circleValueChange() {
      this.$emit("circleValueChange", this.circleValue);
    },

    //选中类别事件
    typeValueChange() {
      this.$emit("typeValueChange", this.typeValue);
    },

    //发表按钮事件
    publishClick() {
      this.$emit("publishClick");
    }
  }
};
</script>
<style>
body {
  font-size: 14px;
}
.el-select-dropdown {
  position: absolute !important;
  z-index: 10001 !important;
}
</style>
<style lang="scss" scoped>
.contentBtns-cut {
  display: flex;
  height: 66px;
  line-height: 66px;
  font-size: 14px;
  border-bottom: 1px solid #ecf0f3;
  color: rgba(0, 0, 0, 0.6);
  -webkit-transform: unset !important;
  transform: unset !important;
  background-color: #fff;

  div {
    margin-left: 36px;
    cursor: pointer;
  }
}

.titleModule {
  padding: 0 35px;
  border-bottom: 1px solid #ecf0f3;
  background-color: #fff;

  ::v-deep .el-input__inner {
    height: 50px;
    line-height: 50px;
    border: none;
    font-size: 26px;
    font-weight: bold;
  }
  ::v-deep .el-input__inner::placeholder {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.25);
    text-align: left;
    // font-weight: bold;
  }
}

.editorPanel {
  background: #fff;
  padding-bottom: 35px;
  min-height: 400px;

  .w-e-text-container {
    height: 450px;
  }

  ::v-deep .w-e-toolbar {
    padding: 10px;
    background-color: #eaeaea;
  }
  ::v-deep .w-e-text {
    padding: 0 36px;
  }

  .text::-webkit-scrollbar {
    display: none !important;
    margin-right: -15px;
    margin-bottom: -15px;
    visibility: hidden;
  }

  .w-e-text::-webkit-scrollbar {
    display: none !important;
    margin-right: -15px;
    margin-bottom: -15px;
    visibility: hidden;
  }
}

.selectContent {
  padding: 0 36px 40px;
  overflow: hidden;
  background-color: #fff;
  .selectContent-item {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }
  .selectContent-title {
    color: #000;
    font-size: 18px;
    margin-right: 28px;
    font-weight: 700;
  }
}

.publishBtn {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .el-button {
    width: 110px;
    height: 36px;
    line-height: 36px;
    padding: 0;
  }
  .publishBtn-fa {
    margin-right: 20px;
  }
}
</style>
