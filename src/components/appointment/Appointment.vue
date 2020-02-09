<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
    </el-breadcrumb>

<!--    卡片视图区域-->
    <el-card>

      <el-row>
        <el-col :span="15">
          <!--      搜索区域-->
          <el-input placeholder="请输入内容" v-model="reserveId">
            <el-button slot="append" icon="el-icon-search" @click="searchByReserveId"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
<!--      用户列表区域-->
      <el-table :data="appointmentList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="预约号" prop="reserveId"></el-table-column>
        <el-table-column label="患者姓名" prop="userName"></el-table-column>
        <el-table-column label="科室" prop="cliName"></el-table-column>
        <el-table-column label="医生" prop="staffName"></el-table-column>
        <el-table-column label="预约时间" prop="reserveTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="registerById(scope)" icon="el-icon-edit" size="small">挂号</el-button>
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
    name: "Appointment",
    data() {
      return {
        appointmentList: [
          {
            reserveId: "001",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00'
          },
          {
            reserveId: "002",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          },
          {
            reserveId: "003",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          },
          {
            reserveId: "004",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          },
          {
            reserveId: "005",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          },
          {
            reserveId: "006",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          }
        ],
        queryInfo: {
          totalNumber: 40,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40],
          currentPage:1
        },
        reserveId: "",
      }
    },
    methods: {
      searchByReserveId() {
        //网络请求接口,给appointmentList
        console.log(this.reserveId);
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
      registerById(data) {
        console.log(data.row.reserveId);
      }
    }
  }
</script>

<style scoped>

</style>