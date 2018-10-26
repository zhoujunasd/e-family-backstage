<template>
    <div class="news-wrap">
        <el-card>
            <div slot="header">新闻列表</div>
            <el-table :data="formData">
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
                        <el-button type="primary" size='mini'>编辑</el-button>
                        <el-button type="danger" size='mini'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import getDate from '../../unitls/date.js'
export default {
  name: "news",
  data() {
    return {
      formData: []
    };
  },
  methods:{
      getData(){
          this.$axios
        .get("/news/getnews")
        .then(res => {
          console.log(res);
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
  created() {
    this.getData()
  },
};
</script>

<style scoped>
</style>