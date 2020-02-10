<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>排号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--      用户叫号区域-->
      <el-table :data="registerList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="挂号单" prop="registerId"></el-table-column>
        <el-table-column label="患者姓名" prop="userName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="treatmentById(scope.row)" icon="el-icon-edit" size="small">就诊</el-button>
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
  export default {
    name: "Queue",
    data() {
      return {
        registerList: [
          {
            registerId: "001",
            userName: 'wq'
          },
          {
            registerId: "002",
            userName: 'wq',
          },
          {
            registerId: "003",
            userName: 'wq',
          },
          {
            registerId: "004",
            userName: 'wq',
          },
          {
            registerId: "005",
            userName: 'wq',
          },
          {
            registerId: "006",
            userName: 'wq',
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
    activated() {
      console.log("queue active");
    },
    methods: {
      treatmentById(row_data) {
        console.log(row_data)
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