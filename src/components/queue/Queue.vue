<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>排号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--      用户叫号区域-->
      <el-table :data="registerList"
                :default-sort = "{prop: 'registerTime', order: 'descending'}"
                stripe>
        <el-table-column type="index" label="序列" width="100px"></el-table-column>
        <el-table-column label="挂号时间" sortable prop="createTime"></el-table-column>
        <el-table-column label="挂号单" prop="registerId"></el-table-column>
        <el-table-column label="患者姓名" prop="userName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="treatmentById(scope.$index, scope.row)" icon="el-icon-edit" size="small">就诊</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="queryInfo.pageSizes"
              :page-size="queryInfo.pageSize"
              :current-page="queryInfo.currentPage"
              layout="total, sizes, prev, pager, next, jumper"
              :total="queryInfo.totalNumber">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "Queue",
    data() {
      return {
        registerList: [
          {
            registerId: "001",
            userName: 'wq',
            createTime: '2020-1-11 8:00:00'
          },
          {
            registerId: "002",
            userName: 'wq',
            createTime: '2020-1-12 8:00:00'
          },
          {
            registerId: "003",
            userName: 'wq',
            createTime: '2020-1-13 8:00:00'
          },
          {
            registerId: "004",
            userName: 'wq',
            createTime: '2020-1-13 11:00:00'
          },
          {
            registerId: "005",
            userName: 'wq',
            createTime: '2020-1-14 8:00:00'
          },
          {
            registerId: "006",
            userName: 'wq',
            createTime: '2020-1-15 8:00:00'
          }
        ],
        queryInfo: {
          totalNumber: 40,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40],
          currentPage:1
        },
      }
    },

    //进入排号界面初始化
    activated() {
      request({
        url: '/home/queue/registerListInit',
        method: 'post',
        params: {
          staffId: this.$store.state.staffId
        }
      }).then( responseData => {
        let data = responseData.data;
        if(data.status === 200){
          this.registerList = data.result.data;
          this.$message({
            type: 'success',
            message: '挂号列表查询成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '挂号列表查询失败!'
          });
        }
      }).catch( err => {
        this.$message({
          type: 'error',
          message: '网络错误!'
        });
      });
      console.log("queue active");
    },
    methods: {
      treatmentById(index, row_data) {
        console.log(row_data);
        this.registerList.splice(index, 1);
        this.$message({
          type: 'success',
          message: '叫号成功!'
        });
      },
      //监听pagesize的改变
      handleSizeChange(newSize) {
        console.log(newSize);
        this.queryInfo.pageSize = newSize
      },
      //监听新的页码值的改变
      handleCurrentChange(newPage) {
        console.log(newPage);
      },
    }
  }
</script>

<style scoped>

</style>