<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>排号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--      挂号之后等待叫号-->
      <el-table :data="registerList"
                stripe>
        <el-table-column type="index" label="序列" width="100px"></el-table-column>
        <el-table-column label="挂号时间" prop="createTime"></el-table-column>
        <el-table-column label="挂号单" prop="registerId"></el-table-column>
        <el-table-column label="患者姓名" prop="userName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="treatmentById(scope.$index, scope.row)" icon="el-icon-edit" size="small">就诊</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "Queue",
    data() {
      return {
        registerList: [],
      }
    },

    //进入排号界面初始化
    activated() {
      let staffId = this.$store.state.staffId
      let jsonData = {
        staffId
      }
      //http请求，获取已经挂号完成的队列
      request({
        url: '/home/queue/registerListInit',
        method: 'post',
        data: jsonData
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
          message: '因网络波动,操作失败!'
        });
      });
      console.log("queue active");
    },
    methods: {

      //叫号，进入就诊队列
      treatmentById(index, rowData) {
        console.log(rowData);

        // 点击就诊请求
        request({
          url: '/home/queue/treatmentById',
          method: 'post',
          data: {
            registerId: rowData.registerId
          }
        }).then(responseData => {
          let data = responseData.data;
          if(data.status === 200) {
            this.registerList.splice(index, 1);
            this.$message({
              type: 'success',
              message: '排号成功!'
            });
          }else  {
            this.$message({
              type: 'error',
              message: '排号失败!'
            });
          }
        }).catch(err => {
          console.log(err);
          this.$message({
            type: 'error',
            message: '因网络波动,操作失败!'
          });
        });

      },
    }
  }
</script>

<style scoped>

</style>