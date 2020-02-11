<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
    </el-breadcrumb>

<!--    卡片视图区域-->
    <el-card>
      <el-row>
        <el-col :span="15">
          <!--      搜索区域-->
          <el-input placeholder="请患者预约号" v-model="appointmentId">
            <el-button slot="append" icon="el-icon-search" @click="searchByAppointmentId"></el-button>
          </el-input>
        </el-col>
      </el-row>
<!--      用户列表区域-->
      <el-table
              :data="appointmentList"
              :default-sort = "{prop: 'appointmentTime', order: 'descending'}"
              stripe>
        <el-table-column type="index" label="序列"></el-table-column>
        <el-table-column label="预约时间" sortable prop="appointmentTime"></el-table-column>
        <el-table-column label="预约号" prop="appointmentId"></el-table-column>
        <el-table-column label="患者姓名" prop="userName" ></el-table-column>
        <el-table-column label="科室" prop="cliName" ></el-table-column>
        <el-table-column label="医生" prop="staffName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="registerById(scope.$index, scope.row)" icon="el-icon-edit" size="small">挂号</el-button>
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
            appointmentId: "001",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            appointmentTime: '2020-1-19 8:00:00'
          },
          {
            appointmentId: "002",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            appointmentTime: '2020-2-13 8:00:00'
          },
          {
            appointmentId: "003",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            appointmentTime: '2020-2-14 8:00:00'
          },
          {
            appointmentId: "004",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            appointmentTime: '2020-2-11 8:00:00'
          },
          {
            appointmentId: "005",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            appointmentTime: '2020-1-10 12:00:00'
          },
          {
            appointmentId: "006",
            userName: 'wq',
            cliName: '内科',
            staffName: '华佗',
            appointmentTime: '2020-1-10 8:00:00'
          }
        ],
        queryInfo: {
          totalNumber: 40,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40],
          currentPage:1
        },
        appointmentId: "",
      }
    },

    activated() {
      //组件一活跃就进行http请求
      console.log("appointment active");
    },

    methods: {

      //根据搜索id进行http请求
      searchByAppointmentId() {
        //网络请求接口,给appointmentList
        console.log(this.appointmentId);
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

      registerById(index, data) {
        console.log(data);
        //进行网络请求
        this.appointmentList.splice(index, 1);
        this.$message({
          type: 'success',
          message: '挂号成功!'
        });
      }
    }
  }
</script>

<style scoped>

</style>