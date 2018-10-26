<template>
    <div class="admin-wrap">
        <el-card>
            <div slot="header">管理员列表</div>
            <el-table :data="userInfor">
                <!-- <el-table-column prop="username" label="姓名"></el-table-column> -->
                <el-table-column prop="avatar" width='100' label="头像" align='center'>
                    <template slot-scope="scope">
                        <img class="table-item-img" :src="scope.row.avatar" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" width='100' label="昵称" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column prop="des" width='300' label="个性签名" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column prop="create_time" width='180' label="创建时间" align='center' ></el-table-column>
                <el-table-column prop="phone" width='100' label="电话" align='center'></el-table-column>
                <el-table-column prop="sex" width='80' label="性别" align='center'>
                  <template slot-scope="scope">
                    <div>{{scope.row.sex == 1 ? '男': '女' }}</div>
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
export default {
  name: "admin",
  data() {
    return {
      userInfor: []
    };
  },
  methods: {
    getData() {
      this.$axios
        .get("/admine/adminUser")
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
              res.data.forEach(item => {
                item.create_time = item.create_time.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z/,'$1年$2月$3日$4点$5分')
                return item
              })
            this.userInfor = res.data;
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

<style scoped lang='scss'>
/deep/ .el-card{
  overflow: hidden;
}
</style>