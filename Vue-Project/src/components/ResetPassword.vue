<template>
  <div style="width:830px;min-width:600px;margin:0 auto;border:1px dotted #ccc;padding:25px">
    <h3 class="color-green">找回密码</h3>
    <el-steps :active="active" finish-status="success">
      <el-step title="账号验证"></el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="完成设置"></el-step>
    </el-steps>
    <div class="container">
      <!-- 账号验证 -->
      <div v-if="active==0">
        <el-form :model="form1" :rules="formRules" ref="form1">
          <el-form-item prop="mobile">
            <el-input v-model="form1.mobile" placeholder="请输入手机号" prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row style="border:1px solid #ccc;border-radius:5px;background-color:#eeeeee">
              <el-col :span="18">
                <el-input class="borderNone" v-model="form1.code"  placeholder="请输入验证码" prefix-icon="el-icon-edit"></el-input>
              </el-col>
              <el-col :span="4">
              <div class="codeShow">
                <div class="codeBox">
                 {{form1.code}}
                </div>
              </div>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-refresh refresh" @click="getRandomCode()"></i>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="mobileCode">
            <el-input v-model="form1.mobileCode" placeholder="请输入短信验证码" prefix-icon="el-icon-message"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:600px;" v-if="active!=2" @click="goNext">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 重置密码 -->
      <div v-if="active==1">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" >
          <el-form-item  prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item  prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" aria-placeholder="请输入确认密码"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:600px" @click="confirm">确认密码重置</el-button>
        </el-form-item>
      </el-form>
    </div>
      <!-- 完成设置 -->
      <div v-if="active==2">
        <i class="el-icon-check" style="font-size:80px;color:green;"></i>
        <div>
          <div class="conmonClass color-green">密码设置成功</div>
          <!-- <a class="linkTo conmonClass" href="http://" target="_blank" rel="noopener noreferrer">请重新登录</a> -->
           <el-link type="success" class="conmonClass" href="http://www.baidu.com" target="_blank"> 请登录</el-link>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    var validatePass = (rule,value,callback) =>{
      if(!value){
        callback(new Error('不能为空'))
      }  else {
        if(value.length<6) {
          callback(new Error('密码长度不能小于6'))
        } else {
          callback()
        }
      }
    }
    var validatePass2 = (rule,value,callback) =>{
      if(!value){
        callback(new Error('不能为空'))
      } else if(this.ruleForm.pass!=value) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    var validatemobile = (rule, value, callback) => {
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if(!reg.test(value)){
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      form1:{
        mobile:'',
        code:'',
        mobileCode:''
      },
     ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      formRules: {
        mobile:[
          { required: true,validator: validatemobile,trigger:'blur'}
        ],
        code:[
          { required: true, message:'请输入',trigger: 'blur'}
        ],
        mobileCode:[
          { required: true, message:'请输入', trigger: 'blur'}
        ]
      },
      rules: {
        pass: [
          { required: true, validator:validatePass,trigger:'blur'}
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  mounted(){
    this.getRandomCode()
  },
  methods:{
    getRandomCode(){
      var code= Math.floor(((Math.random())*10000))  //取0000-9999
      console.log(code.toString().length)
      if(code.toString().length==1){
        this.form1.code='000'+code
      }else if(code.toString().length==2){
         this.form1.code='00'+code
      } else if( code.toString().length==3){
         this.form1.code='0'+code
      } else {
        this.form1.code= code
      }
      console.log(this.form1)
    },
    next() {
        this.active++
    },
    goNext(){
     this.$refs.form1.validate(valid=>{
        if(valid){
          this.next()
        }
      })
    },
    confirm(){
      console.log('this',this)
      this.$refs.ruleForm.validate(valid=>{
        if(valid){
          this.next()
        }

      })
    }
  }
}
</script>
<style >
.borderNone .el-input__inner{
    border:none!important
  }
</style>
<style scoped>
.codeBox{
  margin:4px 5px;
  height:32px;
  line-height: 32px;
  background-color:#fefefe;
}
.refresh{
  font-size:20px;
  color:green;
  cursor: pointer;
}
.container{
  width:600px;
  margin:0 auto;
  padding:15px;
}

.color-green{
  color:green
}
.conmonClass{
  /* color:green; */
  font-size:16px;
  font-weight:bold;
  line-height: 30px
}
.linkTo{
  cursor: pointer;
  text-decoration: none
}

</style>
