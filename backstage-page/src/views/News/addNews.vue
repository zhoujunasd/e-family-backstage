<template>
    <div class="news-wrap">
        <el-card>
            <div slot="header">添加新闻</div>
            <el-form :model="formData" ref='form' size='mini' label-width="90px" label-position="left">
                <el-form-item label='新闻标题：'>
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label='作者：'>
                    <el-select v-model="formData.author">
                        <el-option v-for='(item,index) in users' :key='index'
                            :label='item.nickname' :value='item._id'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='新闻内容：'>
                    <quill-editor 
                      v-model="formData.content" 
                      ref="myQuillEditor" 
                      :options="editorOption" 
                      @change="handlechange">
                    </quill-editor>
                </el-form-item>
                <el-form-item label='新闻头图：'>
                  <uploadImg class="uploadImg" v-model="formData.img"></uploadImg>
                </el-form-item>
                <el-form-item label='新闻类型：'>
                  <el-select v-model="formData.type">
                        <el-option v-for='(item,index) in category' :key='index'
                            :label='item.title' :value='item._id'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">发布</el-button>
                    <!-- <el-button @click="resetForm('form')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import uploadImg from "@/components/UploadImg";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
export default {
  name: "addnews",
  components: { quillEditor, uploadImg},
  data() {
    return {
      formData: {
        title: "",//
        content: "",//
        contentText: "",//
        img: "",//
        author: "",//
        type: "",
        look_num: ""
      },
      users: [],
      category: [],
      token: "",
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            size: 2,
            action: "https://upload-z1.qiniup.com",
            headers: xhr => {},
            change: (xhr, formData) => {
              const headers = { "Content-Type": "multipart/form-data" };
              xhr.setRequestHeader("headers", headers);
              formData.append("token", this.token);
            },
            response: res => {
              return res.url;
            }
          },
          toolbar: {
            // container: container, //头部设置样式条的内容
                container: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  ['image'],
                  // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                  // [{ 'font': [] }],
                  // [{ 'align': [] }],
                  // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                  // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                  // [{ 'direction': 'rtl' }],
                ],
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  methods: {
     getToken(){
          axios.get('http://upload.yaojunrong.com/getToken').then(res => {
              if(res.data.code == 200){
                  this.token = res.data.data;
              }else{
                  this.$message({
                    message: 'getToken:' + res.data.msg,
                    type: "error",
                    duration: 1000,
                    center: true
                  });
              }
          }).catch(err => {
            this.$message({
                message: "网络链接错误！",
                type: "error",
                duration: 1000,
                center: true
            });
          })
      },
      handlechange({ quill, html, text }) {
        this.formData.contentText = text;
        this.formData.contentText = this.formData.contentText.substring(0, 200) + "...";
      },
    getUser() {
      this.$axios
        .get("/admine/adminUser").then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.users = res.data;
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 1000,
              center: true
            });
          }
        }).catch(err => {
          this.$message({
            message: "网络链接错误！",
            type: "error",
            duration: 1000,
            center: true
          });
        });
    },
    getCategory(){
      this.$axios
        .get("category/getcategory").then(res => {
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
        }).catch(err => {
          this.$message({
            message: "网络链接错误！",
            type: "error",
            duration: 1000,
            center: true
          });
        });
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('/news/addnews',this.formData).then(res => {
              console.log(res);
              if(res.code == 200){
                  this.$message({
                      message: res.msg,
                      type: "success",
                      duration: 1000,
                      center: true
                  })
                  setTimeout(()=>{this.$router.push('/layout/news')},500)
              }else{
                  this.$message({
                      message: res.msg,
                      type: "error",
                      duration: 1000,
                      center: true
                  })
              }
          }).catch((err) => {
              this.$message({
                message: "网络链接错误！" + err,
                type: "error",
                duration: 1000,
                center: true
              });
          })
        } else {
          this.$message({
            message: '数据格式不正确！！！',
            type: 'error',
            duration: 1000,
            center: true,
          })
          return false;
        }
      });
    },
  },
  created() {
    this.getToken()
    this.getUser();
    this.getCategory()
  }
};
</script>

<style lang='scss'>
// 新闻内容样式
.ql-container {
  min-height: 100px;
  /deep/ img {
    vertical-align: top;
    border: none;
    max-width: 240px;
    max-height: 180px;
    min-width: 120px;
    min-height: 90px;
  }
}
</style>
<style scoped lang='scss'>
.el-input{
  width:400px
}
// 上传图片样式
/deep/ img {
  width: 80px;
  height: 80px;
}
/deep/ .el-upload{
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
</style>