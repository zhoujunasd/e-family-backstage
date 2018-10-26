<template>
    <div class="swiper-wrap">
        <el-card>
            <div slot="header">轮播图列表</div>
            <el-table :data="formData">
                <el-table-column prop="avatar" width='100' label="轮播图头图" align='center'>
                    <template slot-scope="scope">
                        <img class="table-item-img" :src="scope.row.img" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="title" width='120' label="轮播图标题" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column prop="newsId" width='100' label="新闻头图" align='center'>
                    <template slot-scope="scope">
                        <img class="table-item-img" :src="scope.row.newsId.img" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="newsId.title" width='160' label="新闻标题" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column sortable prop="create_time" width='160' label="创建时间" align='center'></el-table-column>
                <el-table-column sortable prop="sort" width='100' label="权重" align='center'></el-table-column>
                <el-table-column prop="status" width='100' label="显示与否" align='center'
                :filters="[{ text: '显示', value:1}, { text: '不显示', value:0 }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.status === 1 ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.status == 1 ?'显示':'不显示'}}</el-tag>
                    </template>
                </el-table-column>
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
// import  { Scrollbar } from 'element-ui';
import getDate from "../../unitls/date.js";
export default {
  name: "swiper",
//   components:{ scrollbar },
  data() {
    return {
      formData: []
    };
  },
  methods: {
      filterTag(value, row) {
        return row.status === value;
      },
    getData() {
      this.$axios
        .get("/swiper/getSwiper")
        .then(res => {
          console.log(res);
          if (res.code == 200) {
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
    this.getData();
  }
};
</script>

<style scoped>
</style>