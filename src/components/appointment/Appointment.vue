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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
<!--      用户列表区域-->
      <el-table :data="appointmentList" border stripe>
        <el-table-column label="预约号" prop="reserveId"></el-table-column>
        <el-table-column label="患者姓名" prop="userName"></el-table-column>
        <el-table-column label="科室" prop="cliName"></el-table-column>
        <el-table-column label="医生" prop="staffName"></el-table-column>
        <el-table-column label="预约时间" prop="reserveTime"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
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
            reserveId: 1,
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00'
          },
          {
            reserveId: 1,
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          },
          {
            reserveId: 1,
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          },
          {
            reserveId: 1,
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          },
          {
            reserveId: 1,
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          },
          {
            reserveId: 1,
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            reserveTime: '2020-2-19 8:00:00',
            status: 'SUCCESS',
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>