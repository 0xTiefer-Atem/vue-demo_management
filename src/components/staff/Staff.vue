<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>排班日程</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图-->
    <el-card>
<!--      添加角色按钮区-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true">添加职工</el-button>
        </el-col>
      </el-row>

<!--      角色列表区域-->
      <el-table :data="staffInfoList" strip>
<!--        添加索引列-->
        <el-table-column type="index" label="序列" width="70px"></el-table-column>
        <el-table-column label="员工编号" prop="staffId" ></el-table-column>
        <el-table-column label="员工名称" prop="staffName" width="80px"></el-table-column>
        <el-table-column label="性别" prop="staffSex" width="70px"></el-table-column>
        <el-table-column label="联系方式" prop="staffTel"></el-table-column>
        <el-table-column label="员工职称" prop="staffPos" width="60px"></el-table-column>
        <el-table-column label="入职时间" prop="staffEntry"></el-table-column>
        <el-table-column label="操作" width="210px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.$index)">编辑信息</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--    添加职工对话框-->
      <el-dialog
              title="添加职员信息"
              :visible.sync="addDialogVisible"
              width="50%"
              :label-position="'left'">
        <!--      内容主体区-->
        <el-form :model="addStaffInfoForm"
                 :inline="true"
                 :rules="staffFormRules"
                 ref="addStaffInfoRef">
              <el-form-item label="职员编号" prop="staffId">
                <el-input v-model="addStaffInfoForm.staffId"></el-input>
              </el-form-item>

              <el-form-item  label="职员名称" prop="staffName">
                <el-input v-model="addStaffInfoForm.staffName"></el-input>
              </el-form-item>
          <br>
              <el-form-item label="职员性别" prop="staffSex">
                <el-radio-group v-model="addStaffInfoForm.staffSex">
                  <el-radio-button label="男"></el-radio-button>
                  <el-radio-button label="女"></el-radio-button>
                </el-radio-group>
              </el-form-item>
          <br>
              <el-form-item label="联系方式" prop="staffTel">
                <el-input v-model="addStaffInfoForm.staffTel"></el-input>
              </el-form-item>
              <el-form-item label="职员职位" prop="staffPos">
                <el-input v-model="addStaffInfoForm.staffPos"></el-input>
              </el-form-item>
              <el-form-item label="入职时间" prop="staffEntry">
                <el-date-picker
                        v-model="addStaffInfoForm.staffEntry"
                        format="yyyy-MM-d"
                        value-format="yyyy-MM-dd"
                        placeholder="选择时间">
                </el-date-picker>
              </el-form-item>
        </el-form>
        <!--      底部区域-->
        <span slot="footer">
          <el-button @click="cancelAdd">取 消</el-button>
          <el-button type="primary" @click="addStaff">确 定</el-button>
        </span>
      </el-dialog>

<!--      修改职员对话框-->
      <el-dialog
              title="修改职员信息"
              :visible.sync="editDialogVisible"
              width="50%">

        <el-form :model="editStaffInfoForm"
                 :inline="true"
                 :rules="staffFormRules"
                 ref="editStaffInfoRef">
          <el-form-item label="职员编号" prop="staffId">
            <el-input :disabled="true" v-model="editStaffInfoForm.staffId"></el-input>
          </el-form-item>

          <el-form-item  label="职员名称" prop="staffName">
            <el-input v-model="editStaffInfoForm.staffName"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="职员性别" prop="staffSex">
            <el-radio-group v-model="editStaffInfoForm.staffSex">
              <el-radio-button label="男"></el-radio-button>
              <el-radio-button label="女"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <br>
          <el-form-item label="联系方式" prop="staffTel">
            <el-input v-model="editStaffInfoForm.staffTel"></el-input>
          </el-form-item>
          <el-form-item label="职员职位" prop="staffPos">
            <el-input v-model="editStaffInfoForm.staffPos"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="staffEntry">
            <el-date-picker
                    v-model="editStaffInfoForm.staffEntry"
                    format="yyyy-MM-d"
                    value-format="yyyy-MM-dd"
                    placeholder="选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="upDateEdit">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>


  </div>
</template>

<script>
  export default {
    name: "Staff",
    data() {
      //验证职员电话
      let checkTel = (rule, value, callback) => {
        const mobileReg = /^1[3|4|5|7|8][0-9]{9}$/
        if(mobileReg.test(value)){
          return callback();
        }
        callback(new Error("请输入正确的号"))
      };
      return {
        staffInfoList: [
          {
            staffId: '123190',
            staffName: 'cde',
            staffSex: '男',
            staffPos: '专家',
            staffTel: '15810227777',
            staffEntry: '2020-1-20 8:00:00'
          },
          {
            staffId: '123124',
            staffName: 'zcx',
            staffSex: '男',
            staffPos: '专家',
            staffTel: '15810227777',
            staffEntry: '2020-1-20 8:00:00'
          },
          {
            staffId: '123123',
            staffName: 'dfg',
            staffSex: '男',
            staffPos: '专家',
            staffTel: '15810227777',
            staffEntry: '2020-1-20 8:00:00'
          },
          {
            staffId: '123131',
            staffName: 'bmn',
            staffSex: '男',
            staffPos: '专家',
            staffTel: '15810227777',
            staffEntry: '2020-1-20 8:00:00'
          },
          {
            staffId: '123145',
            staffName: 'dvg',
            staffSex: '男',
            staffPos: '专家',
            staffTel: '15810227777',
            staffEntry: '2020-1-20 8:00:00'
          },
          {
            staffId: '123167',
            staffName: 'dfg',
            staffSex: '男',
            staffPos: '专家',
            staffTel: '15810227777',
            staffEntry: '2020-1-20 8:00:00'
          },
          {
            staffId: '123167',
            staffName: 'rgb',
            staffSex: '男',
            staffPos: '专家',
            staffTel: '15810227777',
            staffEntry: '2020-1-20 8:00:00'
          }
        ],
        //添加职员控制变量
        addDialogVisible: false,

        //修改职员控制变量
        editDialogVisible: false,
        //添加数据的表单对象
        addStaffInfoForm: {
          staffId: '',
          staffName: '',
          staffSex: '',
          staffPos: '',
          staffTel: '',
          staffEntry: ''
        },

        //修改数据的表单对象
        editStaffInfoForm: {
          staffId: '',
          staffName: '',
          staffSex: '',
          staffPos: '',
          staffTel: '',
          staffEntry: ''
        },

        //添加表单的验证规则对象
        staffFormRules: {
          staffId: [
            { required: true, message: '请输入职员编号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          staffName: [
            { required: true, message: '请输入职员名称', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          staffSex: [
            { required: true, message: '选择职员性别', trigger: 'blur' },
          ],
          staffTel: [
            { required: true, message: '请输入号码', trigger: 'blur' },
            { validator: checkTel, trigger: 'blur' }
          ],
          staffPos: [
            { required: true, message: '请输入职位', trigger: 'blur' },
          ],
          staffEntry: [
            { required: true, message: '请选择时间', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      //取消添加职员
      cancelAdd() {
        this.$confirm('确认取消添加操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.addStaffInfoRef.resetFields();
          this.addDialogVisible = false;
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

      //添加职员
      addStaff() {
        console.log(this.addStaffInfoForm);
      },

      //展示编辑职员的对话框
      showEditDialog(index) {
        this.editDialogVisible = true;
        this.editStaffInfoForm = this.staffInfoList[index];
        console.log(this.editStaffInfoForm)
      },

      //确认更新职员
      upDateEdit() {
        this.editDialogVisible = false
      },

      //取消职员编辑
      cancelEdit() {
        this.$confirm('确认取消修改职员操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.editStaffInfoRef.resetFields();
          this.editDialogVisible = false;
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>