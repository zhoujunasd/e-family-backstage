<template>
    <div class="swiper-wrap">
        <el-card v-loading="loading">
            <div slot="header">添加轮播图</div>
            <el-form :model="formData" ref='form' status-icon :rules="rules" size='mini' label-width="110px" label-position="right">
                <el-form-item label='轮播图标题：' prop='title'>
                    <!-- required prop='title' -->
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <!-- <el-form-item label='对应新闻：' prop='newsId'>
                    <el-select v-model="formData.newsId" :disabled='isEdit'>
                        <el-option v-for='(item,index) in news' :key='index'
                            :label='item.title' :value='item._id'></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label='新闻分类：' prop='type'>
                    <el-select v-model="formData.type" @change="categoryChange">
                        <el-option v-for='(item,index) in category' :key='index' :label='item.title' :value='item._id'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='新闻内容：' v-if='newsDetail[0]'>
                    <div class="newsDetail-wrap">
                        <div class="newsDetail-img"><img :src="newsDetail[0].img" alt=""></div>
                        <div class="newsDetail-content">
                            <div class="conent-title"><span>标题：</span>{{newsDetail[0].title}}</div>
                            <div class="content" v-html="newsDetail[0].content"></div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label='轮播图头图：' prop='img'>
                    <uploadImg class="uploadImg" v-model="formData.img"></uploadImg>
                </el-form-item>
                <el-form-item label='轮播图排序：' prop='sort'>
                    <el-input-number v-model.number="formData.sort" :min="1" :max="999"></el-input-number>
                </el-form-item>
                <el-form-item label='轮播图类型：' prop='status'>
                    <el-switch v-model.number="formData.status" :active-value='1' :inactive-value='0' active-text="显示" inactive-text="不显示">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="!isEdit" type="primary" @click="submitForm('form')">添加</el-button>
                    <el-button v-else type="primary" @click="EdittForm('form')">修改</el-button>
                    <el-button v-if="!isEdit" @click="resetForm('form')">重置</el-button>
                    <el-button v-else @click="CancelForm">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-dialog title="新闻列表" :visible.sync="isShowDialog">
            <el-table :data="news">
                <el-table-column prop="avatar" width='100' label="新闻头图" align='center'>
                    <template slot-scope="scope">
                        <img class="table-item-img" :src="scope.row.img" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="title" width='80' label="新闻标题" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column prop="contentText" width='200' label="新闻内容" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column prop="create_time" width='80' label="创建时间" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column prop="author.nickname" width='80' label="作者" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width='100' align='center'>
                    <template slot-scope="scope">
                        <el-button type="primary" size='mini' @click="addnews(scope.row._id)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination
              class="flr pagination"
              background
              small
              layout="prev, pager, next"
              @current-change='handleCurrentChange'
              :page-size="4"
              :total="total">
            </el-pagination> -->
        </el-dialog>
    </div>
</template>

<script>
import uploadImg from "@/components/UploadImg";
export default {
  name: "addSwiper",
  components: { uploadImg },
  data() {
    // var checksort = (rule, value, callback) => {
    //     // !Number.isInteger(value)判读是否是数字
    //     if (!value) {
    //         return callback(new Error('排序值不能为空'));
    //     }
    //     setTimeout(() => {
    //         if(value<1){
    //             callback(new Error('排序值在1~999之间！'));
    //         }else if(value>999){
    //             callback(new Error('排序值在1~999之间！'));
    //         }else{
    //             callback();
    //         }
    //     }, 1000);
    // };
    return {
      formData: {
        title: "",
        img: "",
        newsId: "",
        sort: 1,
        status: 1,
        type: ""
      },
      category: [],
      isShowDialog: false,
      news: [],
      loading: true,
      isEdit: true,
      rules: {
        //  min: 3, max: 5限制的是数据的长度
        // { min:1, max:12, message: '范围在1~12之间', trigger: ['blur','change']},
        title: [
          { required: true, message: "请输入轮播图标题！", trigger: "blur" }
        ],
        // newsId:[{ required: true, message: '请选择轮播图对应新闻类型！', trigger: 'blur'}],
        type: [
          { required: true, message: "请选择新闻类型！", trigger: "blur" }
        ],
        img: [
          { type: "string", message: "请选择轮播图头图！", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "请设置排序值！", trigger: "blur" }
          // { type: 'number', message: '排序值只能是数字！', trigger: 'blur',},
          // { validator: checksort, trigger: ['blur','change'] },
        ],
        status: [
          { type: "number", message: "类型判断是数字！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addnews(id) {
      this.isShowDialog = false;
      this.formData.newsId = id;
    },
    categoryChange() {
      this.isShowDialog = true;
      this.getNewsData();
    },
    getNewsData() {
      this.$axios.get(`/news/getnewsID/${this.formData.type}`)
        .then(res => {
          if (res.code == 200) {
            this.news = res.data;
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 1000,
              center: true
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "网络链接错误！" + error,
            type: "error",
            duration: 1000,
            center: true
          });
        });
    },
    EdittForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.patch(`/swiper/updateSwiper`, this.formData)
            .then(res => {
              // console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                  duration: 1000,
                  center: true
                });
                setTimeout(() => { this.$router.push("/layout/swiper"); }, 500);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                  duration: 1000,
                  center: true
                });
              }
            })
            .catch(err => {
              this.$message({
                message: "网络链接错误！" + err,
                type: "error",
                duration: 1000,
                center: true
              });
            });
        } else {
          this.$message({
            message: "请完善数据内容！！！",
            type: "error",
            duration: 1000,
            center: true
          });
          return false;
        }
      });
    },
    getData() {
      this.loading = true;
      this.$axios.get(`/swiper/getswiper/${this.$route.params.id}`)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.loading = false;
            this.formData = { ...res.data };
            // this.newsId = res.data.newsId._id
            this.formData.type = this.formData.newsId.type;
            this.formData.newsId = this.formData.newsId._id;
          } else {
            this.loading = false;
            this.$message({
              message: res.msg,
              type: "error",
              duration: 1000,
              center: true
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message({
            message: "网络链接错误！" + error,
            type: "error",
            duration: 1000,
            center: true
          });
        });
    },
    CancelForm() {
      this.$message({
        message: "取消修改！！！",
        type: "info",
        duration: 1000,
        center: true
      });
      setTimeout(() => { this.$router.push("/layout/swiper"); }, 1000);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.newsId = "";
    },
    // getNewsId(){
    //     this.$axios.get('/news/getNewsId').then(res => {
    //          if (res.code == 200) {
    //             this.news = res.data;
    //         } else {
    //             this.$message({
    //                 message: res.msg,
    //                 type: "error",
    //                 duration: 1000,
    //                 center: true
    //             });
    //         }
    //     }).catch(err => {
    //         this.$message({
    //             message: "网络链接错误！",
    //             type: "error",
    //             duration: 1000,
    //             center: true
    //         });
    //     });
    // },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios
            .post("/swiper/addSwiper", this.formData)
            .then(res => {
              //   console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                  duration: 1000,
                  center: true
                });
                setTimeout(() => { this.$router.push("/layout/swiper"); }, 500);
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                  duration: 1000,
                  center: true
                });
              }
            })
            .catch(err => {
              this.$message({
                message: "网络链接错误！" + err,
                type: "error",
                duration: 1000,
                center: true
              });
            });
        } else {
          this.$message({
            message: "数据格式不正确！！！",
            type: "error",
            duration: 1000,
            center: true
          });
          return false;
        }
      });
    },
    getCategory() {
      this.$axios.get("/category/getcategory")
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.category = res.data;
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 1000,
              center: true
            });
          }
        })
        .catch(err => {
          this.$message({
            message: "网络链接错误！",
            type: "error",
            duration: 1000,
            center: true
          });
        });
    }
  },
  computed: {
    newsDetail() {
      if (this.formData.newsId) {
        return this.news.filter(item => item._id == this.formData.newsId);
      } else {
        return [];
      }
    }
  },
  watch: {
    $route(to) {
      // console.dir(to);
      if (to.name == "addSwiper") {
        this.loading = false;
        this.isEdit = false;
        this.formData = {};
      } else {
        this.isEdit = true;
      }
    }
  },
  created() {
    // this.getNewsId()
    this.getNewsData();
    this.getCategory();
    // console.log(this.$route);
    if (this.$route.name == "addSwiper") {
      this.loading = false;
      this.isEdit = false;
    } else {
      this.isEdit = true;
      this.getData();
    }
  }
};
</script>

<style scoped lang='scss'>
.newsDetail-wrap {
  display: flex;
  // justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  width: 330px;
  height: 105px;
  padding: 5px;
  .newsDetail-img {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    img {
      border-radius: 5px;
    }
  }
  .newsDetail-content {
    // border: 1px solid #000;
    box-sizing: border-box;
    height: 95px;
    width: 225px;
    padding: 10px;
    .conent-title {
      font-size: 14px;
      font-weight: 500;
      width: 200px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      margin-bottom: 5px;
      span {
        font-weight: 600;
      }
    }
    .content {
      font-size: 12px;
      font-weight: 500;
      line-height: 1.5;
      width: 205px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
.el-input {
  width: 400px;
}
.el-card {
  width: 700px;
  height: calc(100vh - 105px);
}
/deep/ img {
  width: 80px;
  height: 80px;
}
/deep/ .el-upload {
  display: block;
  width: 80px;
}
/deep/ .avatar-uploader-icon {
  font-size: 14px;
  width: 80px;
  height: 80px;
  line-height: 80px;
}
/deep/ .avatar {
  width: 80px;
  height: 80px;
}
.el-dialog {
  img {
    width: 60px;
    height: 60px;
  }
}
</style>