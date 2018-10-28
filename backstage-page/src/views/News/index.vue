<template>
    <div class="news-wrap">
        <el-card v-loading="loading">
            <div slot="header">新闻列表</div>
            <el-table :data="formData" >
                <el-table-column prop="avatar" width='100' label="新闻头图" align='center'>
                    <template slot-scope="scope">
                        <img class="table-item-img" :src="scope.row.img" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="title" width='100' label="新闻标题" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column prop="contentText" width='300' label="新闻内容" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column sortable prop="create_time" width='160' label="创建时间" align='center'></el-table-column>
                <el-table-column prop="author.nickname" width='100' label="作者" align='center'></el-table-column>
                <el-table-column prop="type.title" width='80' label="类型" align='center'></el-table-column>
                <el-table-column label="操作" width='200' align='center'>
                    <template slot-scope="scope">
                        <el-button type="primary" size='mini' @click="editclick(scope.row._id)">编辑</el-button>
                        <el-button type="danger" size='mini' @click="delclick(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
              class="flr pagination"
              background
              small
              layout="prev, pager, next"
              @current-change='handleCurrentChange'
              :page-size="4"
              :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import getDate from '../../unitls/date.js'
export default {
  name: "news",
  data() {
    return {
      formData: [],
      total: null,
      pn:1,
      size: 4,
      loading: true
    };
  },
  methods:{
    delclick(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                 this.$axios.del(`/news/delete?id=${id}`,).then(res => {
            // console.log(res);
            if(res.code == 200){
               this.$message({
                type: 'success',
                message: res.msg,
                center: true
              });
              setTimeout(()=>{this.getData()},1000)
            }else{
              this.$message({
                type: 'error',
                message: 'error:'+res.msg,
                center: true
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    editclick(id){
      // console.log(id);
      this.$router.push({name: 'editNews', params:{id}})
    },
     handleCurrentChange(val) {
        this.pn = val
        this.getData()
      },
      getData(){
        this.loading = true
          this.$axios
        .get(`/news/getnews?page=${this.pn}&page_size=${this.size}`)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            // mongooseDB自动创建的时间是，格林尼治时间为0时区，北京时间+8时区
            //   res.data.forEach(item => {
            //     item.create_time = item.create_time.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/,'$1年$2月$3日$4点$5分')
            //     return item
            //   })
              res.data.forEach(item => {
                item.create_time = getDate(item.create_time)
                return item
              })
            this.formData = res.data;
            this.total = res.count
            this.loading = false
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              duration: 1000,
              center: true
            });
            this.loading = false
          }
        })
        .catch(err => {
          this.$message({
            message: "网络链接错误！",
            type: "error",
            duration: 1000,
            center: true
          });
          this.loading = false
        });
      }
  },
  created() {
    this.getData()
  },
};
</script>

<style scoped lang='scss'>
.pagination{
  margin: 10px 80px;
}
/deep/ .el-table td{
  padding: 9px 0;
} 
</style>