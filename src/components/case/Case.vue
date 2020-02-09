<template>
  <div><!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>病例录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>

<!--          基本信息-->
          <el-col :span="8">
            <el-form-item class="register-id" label="挂号单:">
              <el-tag>{{userInfo.registerId}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="user-name" label="患者姓名:">
              <el-tag>{{userInfo.userName}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="staff-name" label="主治医生:">
              <el-tag>{{userInfo.staffName}}</el-tag>
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
                    :autosize="{ minRows: 5, maxRows: 50}"
                    placeholder="请输入内容"
                    v-model="userInfo.userIllness">
            </el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item  label="药物名称">
              <el-select v-model="form.medic" placeholder="请选择药物">
                <el-option v-for="medic in form.medicMenus"
                           :label="medic.medicName"
                           :key="medic.medicName"
                           :value="medic">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="数量">
              <el-input-number  v-model="form.currentNum" :min="1" :max="10"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button size="small" type="primary" @click="addMedic">添加</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-form-item label="药品名单">
              <el-table
                      :data="form.medicList"
                      border>
                <el-table-column
                        prop="medicName"
                        label="药物名称">
                </el-table-column>
                <el-table-column
                        prop="medicNum"
                        label="数量">
                </el-table-column>
              </el-table>
            </el-form-item>
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
        form: {
          medic: '',
          currentNum: 1,
          medicMenus:[
            {
              medicId: 1,
              medicName: '阿莫西林'
            },
            {
              medicId: 2,
              medicName: '六味地黄丸'
            },
            {
              medicId: 3,
              medicName: '999感冒灵'
            },
            {
              medicId: 4,
              medicName: '双黄连口服液'
            },
            {
              medicId: 5,
              medicName: '白加黑'
            },
            {
              medicId: 6,
              medicName: '消炎药'
            }
          ],
          medicList: []
        },

        userInfo: {
          registerId: '123123',
          userName: 'qwe',
          userIllness: '',
          staffName: 'asd'
        }
      }
    },
    methods: {
      //添加药物
      addMedic() {
        let medic_temp = this.form.medic;
        console.log(medic_temp);
        let medicName = medic_temp.medicName;
        let medicId = medic_temp.medicId;
        let medicNum = this.form.currentNum;
        let medicObj = {
          medicName,
          medicId,
          medicNum,
        };
        this.form.medicList.push(medicObj)
        console.log(this.form.medicList);
      }
    }
  }
</script>

<style scoped>
</style>