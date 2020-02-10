<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>排班日程</el-breadcrumb-item>
    </el-breadcrumb>

<!--    上传主体区-->
    <el-card>

      <el-upload
              class="upload-demo"
              action=""
              :on-change="handleChange"
              :on-remove="handleRemove"
              :auto-upload="false">
        <el-button size="small" type="primary">选择文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>

      <el-table
              :data="staffInfoList"
              border
              style="width: 100%">
        <el-table-column
                prop="staff_id"
                label="员工编号"
                width="180">
        </el-table-column>
        <el-table-column
                prop="staff_name"
                label="医生姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="work_time"
                label="上班时间">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Treatment",
    data() {
      return {
        fileList: [],
        staffInfoList: []
      };
    },

    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        this.staffInfoList = [];
        console.log(file, fileList);
      },
      //上传文件时处理方法
      handleChange(file, fileList){
        this.fileTemp = file.raw;
        if(this.fileTemp){
          if((this.fileTemp.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
              || (this.fileTemp.type === 'application/vnd.ms-excel')){
            this.importfxx(this.fileTemp);
          } else {
            this.$message({
              type:'warning',
              message:'附件格式错误，请删除后重新上传！'
            })
          }
        } else {
          this.$message({
            type:'warning',
            message:'请上传附件！'
          })
        }
      },

      importfxx(obj) {
        let _this = this
        // 通过DOM取文件数据
        this.file = event.currentTarget.files[0];

        let rABS = false; //是否将文件读取为二进制字符串
        let f = this.file;

        let reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          let binary = "";
          let rABS = false; //是否将文件读取为二进制字符串
          let pt = this;
          let wb; //读取完成的数据
          let outdata;
          let reader = new FileReader();
          reader.onload = function(e) {
            let bytes = new Uint8Array(reader.result);
            let length = bytes.byteLength;
            for (let i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            //此处引入，用于解析excel
            let XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            console.log(outdata);
            //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
            //此处可对数据进行处理
            let arr = [];
            _this.staffInfoList = outdata;
            // outdata.map(v => {
            //     let obj = {}
            //     obj.code = v['Code']
            //     obj.name = v['Name']
            //     obj.pro = v['province']
            //     obj.cit = v['city']
            //     obj.dis = v['district']
            //     arr.push(obj)
            // });
            // _this.da=arr;
            // _this.dalen=arr.length;
            return arr;
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }
    }
  }
</script>

<style scoped>
  .upload-demo {
    cursor: pointer;
  }
</style>