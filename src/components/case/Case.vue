<template>
  <div><!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>病例录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="illnessInfoRef" :model="illnessInfo" label-width="80px">
        <el-row>
<!--          患者基本信息-->
          <el-col :span="8">
            <el-form-item class="register-id" label="挂号单:">
              <el-tag>{{currentUser.registerId}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="user-name" label="患者姓名:">
              <el-tag>{{currentUser.userName}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="staff-name" label="主治医生:">
              <el-tag>{{currentUser.staffName}}</el-tag>
            </el-form-item>
          </el-col>
        </el-row>

<!--          病症详情-->
        <el-row>
          <el-col >
          <el-form-item label="病症详情">
            <el-input
                    class="form-textarea"
                    type="textarea"
                    :disabled="isAble"
                    :autosize="{ minRows: 5, maxRows: 50}"
                    placeholder="请输入内容"
                    v-model="userIllnessInfo.userIllness">
            </el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item  label="药物名称">
              <el-select clearable :disabled="isAble"  v-model="illnessInfo.selectedMedicId" placeholder="请选择药物">
                <el-option v-for="medic in illnessInfo.medicMenusList"
                           :label="medic.medicName"
                           :key="medic.medicId"
                           :value="medic.medicId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="数量">
              <el-input-number :disabled="isAble" v-model="illnessInfo.currentNum" :min="1" :max="50"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="isAble" class="add-medic" type="primary" @click="addMedic">添加</el-button>
          </el-col>
          <el-col :span="4">
            <el-tag class="total-price">总价: {{this.totalPrice}}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-form-item label="药品名单">
              <el-table
                      :data="userIllnessInfo.medicList"
                      border>
                <el-table-column
                        prop="medicName"
                        label="药物名称">
                </el-table-column>
                <el-table-column
                        prop="medicNum"
                        label="数量">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="deleteByIndex(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-button :disabled="isAble" type="primary" @click="submitCase">提交</el-button>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-button type="info" :disabled="isAble" @click="cancelCase">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
      name: "Case",
      data() {
          return {
              illnessInfo: {
                  //当前下拉菜单选中的药物ID
                  selectedMedicId: '',

                  //数字框内的数字
                  currentNum: 1,

                  //最初展示的药品名单
                  medicMenusList: [],
              },

              //控件可用不可用状态
              isAble: false,

              //后台请求五个排队病人的队列,排序好的
              treatmentQueueInfoList: [],


              //界面展示的当前患者信息
              currentUser: {
                  registerId: '',
                  userId: '',
                  userName: '',
                  staffId: '',
                  staffName: ''
              },


              //向后台传输的患者病例单
              userIllnessInfo: {
                  registerId: '',
                  userId: '',
                  userIllness: '',
                  staffId: '',
                  //传给后台的数据
                  medicList: [],
                  totalPrice: 0
              }
          }
      },

      //组件一活跃，就请求最多个五个排队患者，并且取第一个进行展示
      activated() {
          console.log("case active");
          this.isAble = false
          //封装需要的数据，自动请求
          request({
              url: '/home/case/treatmentQueueInfoListInit',
              method: 'post',
              data: {
                  staffId: this.$store.state.staffId
              }
          }).then(responseData => {//请求成功后，处理函数
              let data = responseData.data;
              console.log(responseData);
              if (data.status === 200) {
                  //获取要看病的队列
                  this.treatmentQueueInfoList = data.result.data.caseQueueInfoList;

                  //获取药品列表
                  this.illnessInfo.medicMenusList = data.result.data.medicMenuList;

                  if (this.treatmentQueueInfoList.length === 0) {
                      this.getNextUser();
                  } else {
                      this.userIllnessInfo.userIllness = '';
                      this.illnessInfo.totalPrice = 0;
                      this.userIllnessInfo.medicList = [];
                      this.illnessInfo.currentNum = 1;
                      //弹出第一个患者
                      this.currentUser = this.treatmentQueueInfoList.shift();
                  }
                  this.$message({
                      type: 'success',
                      message: '就诊列表初始化查询成功!'
                  });
              } else {
                  this.$message({
                      type: 'error',
                      message: '就诊列表初始化查询失败!'
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


      methods: {
          //添加药物的方法
          addMedic() {
              //先获取想要添加的药物
              let medicObj1 = this.illnessInfo.medicMenusList.find(item => item.medicId === this.illnessInfo.selectedMedicId);

              if (typeof medicObj1 === 'undefined') {
                  this.$message.error('请先选择药物!');
                  return
              }

              let medicObj = {}

              medicObj.medicId = medicObj1.medicId
              medicObj.medicName = medicObj1.medicName
              medicObj.medicPrice = medicObj1.medicPrice

              //把药品数量赋值给medicObj
              medicObj.medicNum = this.illnessInfo.currentNum;

              //在medicList头部插入此时要添加的商品(头插法，后面还会有)
              this.userIllnessInfo.medicList.unshift(medicObj);

              //还原数据准备下一次的添加药物数量
              this.illnessInfo.currentNum = 1;
              console.log(this.userIllnessInfo.medicList);
          },

          //删除药物
          deleteByIndex(index) {
              console.log(index);
              let vueInstance = this;
              this.$confirm('是否删除该药物?', '提示', {
                  confirmButtonText: '删除',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  //splice函数一个用法就是删除index后面i个对象，1就代表删除index本身所指向的对象(后面还会有)
                  vueInstance.userIllnessInfo.medicList.splice(index, 1);
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消!'
                  });
              })
          },

          //提交病例信息
          submitCase() {
              this.getFormMessage();
              let caseData = JSON.stringify(this.userIllnessInfo);
              console.log(caseData);
              //封装需要的参数
              request({
                  url: '/home/case/insertCaseInfo',
                  method: 'post',
                  data: {
                      caseData: caseData
                  }
              }).then(responseData => {
                  let data = responseData.data;
                  console.log(data);
                  if (data.status === 200) {
                      this.$message({
                          type: 'success',
                          message: '病例信息更新成功!'
                      });
                      this.getNextUser()
                  } else {
                      this.$message({
                          type: 'success',
                          message: '病例信息更新失败!'
                      });
                  }
              }).catch(err => {
                  console.log(err);
                  this.$message({
                      type: 'error',
                      message: '因网络波动,操作失败!'
                  });
              });
              // this.$refs.illnessInfoRef.resetFields();
          },

          //取消按钮
          cancelCase() {
              //点击取消按钮，直接获取下一位患者信息
              this.getNextUser()
          },


          //获取下一个患者信息
          getNextUser() {
              this.userIllnessInfo.userIllness = '';
              this.illnessInfo.totalPrice = 0;
              this.userIllnessInfo.medicList = [];
              this.illnessInfo.currentNum = 1;
              //治疗列表为0，清空相关数据并是控件不可用
              if (this.treatmentQueueInfoList.length === 0) {
                  this.currentUser.registerId = '';
                  this.currentUser.userName = '';
                  this.currentUser.staffName = '';
                  this.isAble = true;
                  this.$message({
                      duration: 5000,
                      message: '今天的病人已看完，请注意休息',
                      type: 'success'
                  });
                  return
              }

              //还有患者，弹出队列里的第一个
              this.currentUser = this.treatmentQueueInfoList.shift();
          },


          getFormMessage() {
              //获取表单上的数据
              this.userIllnessInfo.registerId = this.currentUser.registerId;
              this.userIllnessInfo.userId = this.currentUser.userId;
              this.userIllnessInfo.staffId = this.currentUser.staffId;
              this.userIllnessInfo.totalPrice = this.totalPrice;
          }
      },
      computed: {
          totalPrice() {
              let total = 0;
              this.userIllnessInfo.medicList.forEach(medic => {
                  total += medic.medicPrice * medic.medicNum
              });
              return total
          }
      }
  }
</script>

<style scoped>
</style>
