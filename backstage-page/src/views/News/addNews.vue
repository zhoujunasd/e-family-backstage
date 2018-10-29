<template>
    <div class="news-wrap">
        <el-card v-loading="loading">
            <div slot="header">添加新闻</div>
            <el-form :model="formData" ref='form' :rules="rules" size='mini' label-width="100px" label-position="left">
                <el-form-item label='新闻标题：' prop='title'>
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label='作者：' prop='author'>
                    <el-select v-if="!isEdit" v-model="formData.author" >
                        <el-option v-for='(item,index) in users' :key='index'
                            :label='item.nickname' :value='item._id'></el-option>
                    </el-select>
                    <el-input v-else v-model="formData.author.nickname" disabled></el-input>
                </el-form-item>
                <el-form-item label='新闻内容：' prop='content'>
                     <quill-editor
                      v-model="formData.content" 
                      ref="myQuillEditor" 
                      :options="editorOption" 
                      @change="handlechange">
                    </quill-editor>
                </el-form-item>
                <el-form-item label='新闻头图：' prop='img'>
                  <uploadImg class="uploadImg" v-model="formData.img"></uploadImg>
                </el-form-item>
                <el-form-item label='新闻类型：' prop='type'>
                  <el-select v-model="formData.type">
                        <el-option v-for='(item,index) in category' :key='index'
                            :label='item.title' :value='item._id'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="!isEdit" type="primary" @click="submitForm('form')">发布</el-button>
                    <el-button v-else type="primary" @click="EdittForm('form')">修改</el-button>
                    <el-button v-if="!isEdit" @click="resetForm('form')">重置</el-button>
                    <el-button v-else @click="CancelForm">取消</el-button>
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
      loading: true,
      isEdit:true,
      formData: {
        title: "",//
        content: "",//
        contentText: "",//
        img: "",//
        author: "",//
        type: "",
        look_num: ""
      },
      rules:{
        title:[{ required: true, message: '请输入新闻标题！', trigger: 'blur'}],
        author:[{ required: true, message: '请选择新闻作者！', trigger: 'blur'}],
        content:[{ required: true, message: '请编写新闻内容！', trigger: 'blur'}],
        img:[{ required: true, message: '请上传新闻头图！', trigger: 'blur'}],
        type:[{ required: true, message: '请选择新闻类型！', trigger: 'blur'}],
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
                  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                  [{ 'font': [] }],
                  [{ 'align': [] }],
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
    CancelForm(){
      this.$message({
              message: '取消修改！！！',
              type: "info",
              duration: 1000,
              center: true
          })
        setTimeout(()=>{ this.$router.push('/layout/news')},1000)
    },
    EdittForm(form){
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.patch('/news/editNews',this.formData).then(res => {
              // console.log(res);
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
            message: '请完善数据内容！！！',
            type: 'error',
            duration: 1000,
            center: true,
          })
          return false;
        }
      });
    },
    getData(){
      // console.log(this.$route.params.id);
      this.loading = true
      this.$axios.get(`/news/getnews/${this.$route.params.id}`).then(res => {
            // console.log(res);
            if(res.code == 200){
                this.loading = false
                this.formData = { ...res.data, }
                this.formData.type = res.data.type._id
            }else{
                 this.loading = false
                this.$message({
                      message: res.msg,
                      type: "error",
                      duration: 1000,
                      center: true
                  })
            }
        }).catch(error => {
             this.loading = false
            this.$message({
                message: "网络链接错误！" + error,
                type: "error",
                duration: 1000,
                center: true
            });
        })
    },
    // 只有设置了prop的才可以设置重置功能？？？？？？？？？
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
        // this.formData.contentText = this.formData.contentText.substring(0, 200) + "...";
      },
    getUser() {
      this.$axios
        .get("/admine/getAlladminUser").then(res => {
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
        .get("/category/getcategory").then(res => {
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
            message: '数据内容不完整！！！',
            type: 'error',
            duration: 1000,
            center: true,
          })
          return false;
        }
      });
    },
  },
    watch:{
      $route(to){
          // console.dir(to);
        if(to.name == 'addNews'){
            this.loading = false
            this.isEdit = false
            this.formData = {}
        }else{
            this.isEdit = true
        }
      }
  },
  created(){  
    this.getToken()
    this.getCategory()
      // console.log(this.$route);
      if(this.$route.name == 'addNews'){
          this.getUser();
          this.loading = false
          this.isEdit = false
      }else{
           this.isEdit = true
          this.getData()
      }
  },
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
.el-card{
  width: 800px;
  height: calc( 100vh - 105px);
}
.el-input{
  width:400px
}
/deep/ .quill-editor{
  width: 600px
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