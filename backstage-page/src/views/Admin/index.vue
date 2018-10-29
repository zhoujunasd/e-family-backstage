<template>
  <div class="admin-wrap">
    <el-card v-loading="loading">
      <div slot="header" class="header-card">管理员列表</div>
      <el-table :data="userInfor">
        <!-- <el-table-column prop="username" label="姓名"></el-table-column> -->
        <el-table-column prop="avatar" width='100' label="头像" align='center'>
          <template slot-scope="scope">
            <img class="table-item-img" :src="scope.row.avatar" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="nickname" width='100' label="昵称" align='center' show-overflow-tooltip></el-table-column>
        <el-table-column prop="des" width='300' label="个性签名" align='center' show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" width='180' label="创建时间" align='center'></el-table-column>
        <el-table-column prop="phone" width='100' label="电话" align='center' show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" width='80' label="性别" align='center'>
          <template slot-scope="scope">
            <div>{{scope.row.sex == 1 ? '男': '女' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width='200' align='center'>
          <template slot-scope="scope">
            <el-button type="primary" size='mini' @click="editclick(scope.row._id)">编辑</el-button>
            <el-button type="danger" size='mini' @click="delclick(scope.row.username)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="flr pagination" background small layout="prev, pager, next" @current-change='handleCurrentChange' :page-size="4" :total="total">
        <!-- :pager-count="11"  最多显示页码数               
              size-change pageSize 改变时会触发    回调参数:每页条数
              prev-click  用户点击上一页按钮改变当前页后触发    回调参数:当前页
              next-click-->
      </el-pagination>
    </el-card>
  </div>
</template>
   
<script>
export default {
  name: "admin",
  data() {
    return {
      userInfor: [],
      loading: true,
      total: null,
      page: 1,
      size: 4
    };
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getData();
    },
    delclick(username) {
      // 通过验证密码删除
      this.$prompt("请输入用户密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          this.$axios.del(`/admine/delete?username=${username}&password=${value}`)
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.msg,
                  center: true
                });
                setTimeout(() => { this.getData(); }, 1000);
              } else {
                this.$message({
                  type: "error",
                  message: "error:" + res.msg,
                  center: true
                });
              }
            });
        })
        .catch(error => {
          this.$message({
            type: "info",
            message: "取消删除！！！" + error,
            duration: 1000
          });
        });
      // 直接确认是否删除
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   });
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });
    },
    editclick(e) {
      // console.log(e);
      this.$router.push({ name: "editAdmine", params: { id: e } });
    },
    getData() {
      this.loading = true;
      this.$axios.get(`/admine/adminUser?pn=${this.page}&size=${this.size}`)
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            res.data.forEach(item => {
              item.create_time = item.create_time.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/,"$1年$2月$3日$4点$5分");
              return item;
            });
            this.loading = false;
            this.userInfor = res.data;
            this.total = res.count;
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
        .catch(err => {
          this.loading = false;
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

<style scoped lang='scss'>
/deep/ .el-card {
  overflow: hidden;
}
.pagination {
  margin: 15px 40px;
}
/deep/ .el-table td {
  padding: 8px 0;
}
</style>