<!--评论组件-->
<template>
  <div>
    <div class="remark-container">
      <div class="allRemark">全部评论({{ remarkList.num || 0 }})</div>
      <div></div>
    </div>

    <!--有评论详情部分-->
    <div v-if="remarkList.event == 100">
      <div
        class="commentItem"
        v-for="(item, index) in remarkList.list"
        :key="index"
      >
        <!--评论者信息-->
        <div class="observer">
          <div class="observer-head">
            <div class="observer-head-img">
              <!-- <img :src="item.author.imgUrl" alt /> -->
              <img src="../assets/no_comment.png" alt />
            </div>
            <span>{{ item.realname }}</span>
          </div>

          <div class="observer-content">
            <section>{{ item.comment }}</section>
            <div class="observer-click">
              <div class="clickTime">{{ item.add_time }}</div>
              <div class="clickBtn">
                <!--回复功能点击按钮 item.ishf   -->
                <div class="clickBtn-one">
                  <div
                    class="reply"
                    v-if="!item.ishf"
                    @click="replyClick(item, true)"
                  >
                    <img class="replyOne" src="../assets/res.svg" alt />
                    <span class="replySpan">回复</span>
                  </div>
                  <div class="reply" v-else @click="replyClick(item, false)">
                    <img class="replyOne" src="../assets/res_h.svg" alt />
                    <span class="replySpan" style="color:#ff594a">
                      取消回复
                    </span>
                  </div>
                </div>
                <!--点赞功能-->
                <div>
                  <div class="reply">
                    <img
                      v-if="item.like_status == 1"
                      class="commentImg replyTwo"
                      src="../assets/zan_h.svg"
                      @click.stop="giveLikeClick(item, 2)"
                      alt
                    />
                    <img
                      v-else
                      class="commentImg replyTwo"
                      src="../assets/zan.svg"
                      @click.stop="giveLikeClick(item, 2)"
                      alt
                    />
                    <span class="replySpan">{{ item.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--回复别人的信息框-->
            <div v-if="item.ishf">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="正在回复"
                v-model="item.textarea"
              ></el-input>
              <div class="myOpinion-btn">
                <el-button
                  type="danger"
                  :disabled="
                    item.textarea != '' && item.textarea != null ? false : true
                  "
                  round
                  @click="fabuReply(item)"
                >
                  发布
                </el-button>
              </div>
            </div>
          </div>
          <!--回复评论者的人 信息-->
          <div class="subComment">
            <div
              class="subComment-first"
              v-for="(items, index) in item.comment_er"
              :key="index"
            >
              <div class="Comment-head">
                <img src="../assets/no_comment.png" alt />
                <span>{{ items.realname }}</span>
              </div>
              <div class="subComment-item">
                <div class="subComment-name">
                  <section>
                    <div
                      v-if="items.p_name != null && items.p_name != ''"
                      class="wrapper-jIzPd"
                    >
                      <span class="content-E_CA9">
                        回复{{ items.p_name }}：
                        <span class="content-hui">
                          {{ items.comment }}
                        </span>
                      </span>
                    </div>
                    <div v-else class="wrapper-jIzPd">
                      <span class="content-E_CA9">
                        <!-- 回复爱多功能手机： -->
                        <span class="content-hui">
                          {{ items.comment }}
                        </span>
                      </span>
                    </div>
                  </section>
                  <!--第二种回复功能-->
                  <div>
                    <div class="article-footer">
                      <div class="article-time">{{ items.add_time }}</div>
                      <!--第二种 回复功能点击按钮-->
                      <div class="clickBtn-one">
                        <div
                          class="reply"
                          v-if="!items.ishf"
                          @click="replyClick2(items, true)"
                        >
                          <img class="replyOne" src="../assets/res.svg" alt />
                          <span class="replySpan">回复</span>
                        </div>
                        <div
                          class="reply"
                          v-else
                          @click="replyClick2(items, false)"
                        >
                          <img class="replyOne" src="../assets/res_h.svg" alt />
                          <span class="replySpan" style="color:#ff594a">
                            取消回复
                          </span>
                        </div>
                      </div>
                      <!--第二种 点赞功能-->
                      <div>
                        <div class="reply">
                          <img
                            v-if="items.like_status == 1"
                            class="commentImg replyTwo"
                            src="../assets/zan_h.svg"
                            @click.stop="giveLikeClick(items, 2)"
                            alt
                          />
                          <img
                            v-else
                            class="commentImg replyTwo"
                            src="../assets/zan.svg"
                            @click.stop="giveLikeClick(items, 2)"
                            alt
                          />
                          <span class="replySpan">{{ items.likes }}</span>
                        </div>
                      </div>
                    </div>
                    <!--第二种 回复别人的信息框-->
                    <div v-if="items.ishf" class="twoReply">
                      <div class="twoReply-text">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="正在回复"
                          v-model="items.textarea"
                        ></el-input>
                      </div>
                      <div class="twoReply-btn">
                        <el-button
                          type="danger"
                          :disabled="
                            items.textarea != '' && items.textarea != null
                              ? false
                              : true
                          "
                          round
                          @click="fabuReplyTwo(items)"
                        >
                          发布
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--展开更多-->
            <div v-if="item.comment_er.length > 1" class="subComment-collapse">
              <div v-if="item.isMoreShow" @click="openMornClick(item, false)">
                展开更多
                <i class="el-icon-arrow-right"></i>
              </div>
              <div v-else @click="offMornClick(item, true)">
                收起评论
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--没有评论的时候-->
    <div v-else class="commentAll">
      <img src="../assets/no_comment.png" alt />
      <div>还没有评论呢，说说你的想法</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "remark",
  props: {
    remarkList: {
      type: Object
    }
  },
  data() {
    return {
      isComment: true,
      isReply: false, //是否回复
      isZanShow: true, //是否点赞
      replyTextarea: false, //控制是否显示回复他人评论的文本框（第一种回复框）
      //第二种回复属性
      replyTextarea2: false,
      isMoreOpen: true
    };
  },
  created() {},
  methods: {
    //点击回复，出现第一种回复框
    replyClick(value, type) {
      console.log(value, type);
      // value.ishf = type;
      // value.textarea = "";
      this.$emit("replyClick", value, type);
    },

    replyClick2(value, type) {
      console.log(value, type);
      value.ishf = type;
      value.textarea = "";
    },

    //点赞
    giveLikeClick(value, type) {
      this.$emit("giveLikeClick", value, type);
    },

    //发布
    fabuReply(value) {
      this.$emit("fabuReply", value);
    },

    //第二种回复，是回复他人的回复评论
    fabuReplyTwo(value) {
      this.$emit("fabuReplyTwo", value);
    },

    //展开更多数据
    openMornClick(item, type) {
      console.log("item", item);
      item.isMoreShow = type;
      this.$emit("openMornClick", item, type);
    },

    //收起评论
    offMornClick(item, type) {
      console.log("item", item, type);
      this.$emit("offMornClick", item, type);
    }
  }
};
</script>
<style lang="scss" scoped>
.remark-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .allRemark {
    opacity: 0.9;
    font-size: 18px;
    color: #000;
    font-weight: 400;
  }
}

.commentAll {
  padding: 30px 0 80px;
  img {
    width: 210px;
    height: 210px;
  }
  div {
    color: #b2b9c6;
    font-size: 16px;
    margin-top: 20px;
  }
}

.commentItem {
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  .observer {
    .observer-head {
      display: flex;
      align-items: center;
      .observer-head-img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: block;
      }
      span {
        opacity: 0.9;
        font-size: 14px;
        color: #000;
        line-height: 16px;
      }
    }

    .observer-content {
      padding-left: 50px;
      word-wrap: break-word;
      opacity: 0.8;
      font-size: 14px;
      color: #000;
      line-height: 26px;
      text-align: left;
      padding-bottom: 22px;
    }

    .observer-click {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 14px 0 22px;
      .clickTime {
        font-size: 14px;
        color: #000;
        opacity: 0.5;
      }
    }

    .clickBtn {
      display: flex;
    }

    .clickBtn-one {
      margin-right: 22px;
      cursor: pointer;
    }

    .reply {
      display: flex;
      align-items: center;
      img {
        margin-right: 8px;
        width: 22px;
        height: 19px;
      }
      .replySpan {
        font-size: 14px;
        opacity: 0.5;
      }
    }

    .replyOne {
      align-self: center;
      opacity: 0.8;
    }

    .replyTwo {
      align-self: flex-start;
      opacity: 0.8;
    }
  }
}

.myOpinion-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;

  .el-button {
    width: 70px;
    height: 30px;
    line-height: 30px;
    padding: 0;
  }
}

//回复 评论人回复的回复内容
.subComment {
  margin-left: 50px;
  margin-bottom: 26px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}

.subComment-first:first-child {
  padding-top: 20px;
}

.subComment-first {
  padding: 0 20px 5px;

  .Comment-head {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      opacity: 0.9;
      font-size: 14px;
      color: #000;
      line-height: 16px;
    }
  }

  .subComment-item {
    padding-left: 40px;

    .wrapper-jIzPd {
      width: 100%;
      overflow: hidden;
      text-align: initial;
      line-height: 0;

      span {
        font-size: 14px;
        font-weight: 400;
      }
      .content-E_CA9 {
        word-break: break-all;
      }
      .content-hui {
        opacity: 0.8;
        line-height: 20px;
      }
    }

    .article-footer {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #000;
      margin: 10px 0;
      line-height: 26px;

      .article-time {
        opacity: 0.5;
        margin-right: 17px;
      }
    }
  }

  .twoReply {
    display: flex;
    justify-content: space-between;
    align-content: center;

    .twoReply-text {
      width: 360px;
      display: flex;
    }

    .twoReply-btn {
      display: flex;
      align-items: flex-end;
      .el-button {
        width: 70px;
        height: 30px;
        line-height: 30px;
        padding: 0;
      }
    }
  }
}

//展开更多
.subComment-collapse {
  color: rgba(0, 0, 0, 0.4);
  margin-left: 20px;
  font-size: 14px;
  display: flex;
  justify-items: center;
  align-items: center;
  padding-bottom: 20px;
  cursor: pointer;
}
</style>
