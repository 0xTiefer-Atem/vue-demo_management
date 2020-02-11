<template>
  <div><!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>病例录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="illnessInfoRef" :model="illnessInfo" label-width="80px">
        <el-row>
<!--          基本信息-->
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
                    :disabled="flag"
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
              <el-select clearable :disabled="flag"  v-model="illnessInfo.selectedMedicId" placeholder="请选择药物">
                <el-option v-for="medic in illnessInfo.medicMenus"
                           :label="medic.medicName"
                           :value="medic.medicId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="数量">
              <el-input-number :disabled="flag" v-model="illnessInfo.currentNum" :min="1" :max="50"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="flag" class="add-medic" type="primary" @click="addMedic">添加</el-button>
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
            <el-button :disabled="flag" type="primary" @click="submitCase">提交</el-button>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-button type="info" :disabled="flag" >取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
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
          medicMenus:[
            {
              medicId: 1,
              medicName: '阿莫西林',
              medicPrice: 12
            },
            {
              medicId: 2,
              medicName: '六味地黄丸',
              medicPrice: 12
            },
            {
              medicId: 3,
              medicName: '999感冒灵',
              medicPrice: 12
            },
            {
              medicId: 4,
              medicName: '双黄连口服液',
              medicPrice: 12
            },
            {
              medicId: 5,
              medicName: '白加黑',
              medicPrice: 12
            },
            {
              medicId: 6,
              medicName: '消炎药',
              medicPrice: 12
            }
          ],
        },

        //控件可用不可用
        flag: false,

        //后台请求五个排队病人的队列,排序好的
        queueInfoList: [
          {
            registerId: '111123',
            userId: '001',
            userName: 'asd',
            staffId: '123124',
            staffName: 'asdasda'
          },
          {
            registerId: '121123',
            userId: 'qwe',
            userName: 'asd',
            staffId: '123124',
            staffName: 'asdasd',
          },
          {
            registerId: '123113',
            userId: 'qwe',
            userName: 'asd',
            staffId: '123124',
            staffName: 'asdasd',
          },
          {
            registerId: '123121',
            userId: 'qwe',
            userName: 'asd',
            staffId: '123124',
            staffName: 'asdasd',
          },

          {
            registerId: '122123',
            userId: 'qwe',
            userName: 'asd',
            staffId: '123124',
            staffName: 'asdasdasd',
          }
        ],


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

    //组件一活跃，就请求最多个六个排队患者，取第一个进行展示
    activated() {
      console.log("case active");
      // console.log(this.queueInfoList);
      this.currentUser = this.queueInfoList.shift();
      // console.log(this.queueInfoList);
    },
    methods: {
      //添加药物
      addMedic() {

        let medicObj = this.illnessInfo.medicMenus.find( item => item.medicId === this.illnessInfo.selectedMedicId);

        if(typeof medicObj === 'undefined'){
          this.$message.error('请先选择药物!');
          return
        }

        medicObj.medicNum = this.illnessInfo.currentNum;
        this.userIllnessInfo.medicList.unshift(medicObj);
        this.illnessInfo.currentNum = 1;
        console.log(this.userIllnessInfo.medicList);
      },

      //删除药物
      deleteByIndex(index){
        console.log(index);
        let vueInstance = this;
        this.$confirm('是否删除该药物?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        console.log(this.userIllnessInfo);;
        console.log(JSON.stringify(this.userIllnessInfo));


        // this.$refs.illnessInfoRef.resetFields();

        setTimeout(() => {
          this.getNextUser()
        },2000)
      },

      getNextUser() {
        this.userIllnessInfo.userIllness = '';
        this.illnessInfo.totalPrice = 0;
        this.userIllnessInfo.medicList = [];
        this.illnessInfo.currentNum = 1;
        if(this.queueInfoList.length === 0) {
          this.currentUser.registerId = '';
          this.currentUser.userName = '';
          this.currentUser.staffName = '';
          this.flag = true;
          this.$message({
            showClose: true,
            duration: 0,
            message: '今天的病人已看完，请注意休息',
            type: 'success'
          });
          return
        }
        this.currentUser = this.queueInfoList.shift();
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