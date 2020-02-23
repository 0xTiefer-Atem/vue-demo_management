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
  import {request} from "../../network/request";

  export default {
    name: "Appointment",
    data() {
      return {
        appointmentList: [],
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
      request({
        url: '/home/appointment/appointmentListInit'
      }).then(responseData => {
        let data = responseData.data;
        if(data.status === 200){
          console.log(data);
          this.appointmentList = data.result.data;
          this.$message({
            type: 'success',
            message: '预约列表查询成功!'
          });
        }else {
          this.$message({
            type: 'error',
            message: '预约列表查询失败!'
          });
        }
      }).catch(err =>{
        console.log(err);
        this.$message({
          type: 'error',
          message: '因网络波动,操作失败!'
        });
    });
    },

    methods: {

      //根据搜索id进行http请求
      searchByAppointmentId() {
        //网络请求接口,给appointmentList
        console.log(this.appointmentId);
        request({
          url: '/home/appointment/searchByAppointmentId',
          method: 'post',
          data: {
            appointmentId: this.appointmentId
          }
        }).then(responseData => {
          let data = responseData.data;
          if(data.status === 200){
            console.log(data);
            this.appointmentList = data.result.data;
            this.$message({
              type: 'success',
              message: '预约列表查询成功!'
            });
          }else {
            this.$message({
              type: 'error',
              message: '预约列表查询失败!'
            });
          }
        }).catch(err =>{
          console.log(err);
          this.$message({
            type: 'error',
            message: '因网络波动,操作失败!'
          });
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

      registerById(index, data) {
        console.log(data);
        request({
          url: '/home/queue/registerById',
          method: 'post',
          data: {
            appointmentId: data.appointmentId,
            staffId: data.staffId,
            userId: data.userId
          }
        }).then(responseData => {
          let data = responseData.data;
          if(data.status === 200){
            //进行网络请求
            this.appointmentList.splice(index, 1);
            this.$message({
              type: 'success',
              message: '挂号成功!'
            });
          }else {
            this.$message({
              type: 'error',
              message: '挂号操作失败!'
            });
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '因网络波动,操作失败'
          });
        });

      }
    }
  }
</script>

<style scoped>

</style>