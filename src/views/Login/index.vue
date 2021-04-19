<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/img/login_icon.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item prop="code">
              <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="ruleForm.code"
                maxlength="8"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="8"
            ><img
              style="width:100%;height:40px"
              :src="imgcaptchaURl"
              @click="getCode"
              alt=""
          /></el-col>
        </el-row>
        <el-form-item prop="checked"
          ><el-checkbox v-model="ruleForm.checked" />
          &nbsp;我已阅读并同意<el-link
            href="https://element.eleme.io"
            target="_blank"
            type="primary"
          >
            用户协议</el-link
          >和
          <el-link
            type="primary"
            href="https://element.eleme.io"
            target="_blank"
          >
            隐私条款</el-link
          ></el-form-item
        >
        <el-form-item>
          <el-button
            type="primary"
            @click="login('ruleForm')"
            style="width:100%"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边区域 -->
    <div class="right">
      <img src="@/assets/img/login_bg.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgcaptchaURl: process.env.VUE_APP_BASEURL + '/captcha?type=login',
      ruleForm: {
        phone: '18511111111',
        password: '12345678',
        code: '',
        checked: false
      },
      rules: {
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) return callback(new Error('手机号不能为空'))
              const reg = /^1[3456789][0-9]{9}/
              if (!reg.test(value)) return callback(new Error('手机号格式错误'))
              return callback()
            },
            trigger: 'blur'
          }
        ],
        password: [
          { message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ],
        code: [
          { message: '验证码不能为空', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码应4个字符', trigger: 'blur' }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('请勾选用户协议'))
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    /** 用户登录 */
    login (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(valid)
        if (!valid) return false
        const info = await this.$axios.login(this.ruleForm)
        console.log(info)
        if (info.code === 200) {
          localStorage.setItem('token', info.data.token)
          this.$message.success('登录成功')
          this.$router.push({ name: 'Layout' })
        }
        if (info.code === 202) {
          this.$message.error(info)
        }
        this.getCode()
      })
    },
    /** 获取验证码 */
    getCode () {
      this.imgcaptchaURl =
        process.env.VUE_APP_BASEURL +
        '/captcha?type=login&t=' +
        (new Date() - 0)
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
