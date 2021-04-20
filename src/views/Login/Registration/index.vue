<template>
  <el-dialog
    title="用户注册"
    :visible.sync="centerDialogVisible"
    width="600px"
    center
    style="z-index:2004"
  >
    <el-form
      :model="regForm"
      :rules="rules"
      ref="regForm"
      label-width="100px"
      label-position="left"
      class="demo-ruleForm"
    >
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          style="text-align: center"
          :show-file-list="false"
          :action="avatarUrl"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="avatarObj"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="呢称" prop="username">
        <el-input v-model="regForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="regForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="regForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="regForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row :gutter="13">
          <el-col :span="13"
            ><div class="grid-content bg-purple">
              <el-input v-model="regForm.code"></el-input></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <img
                style="width:100%;height:40px"
                :src="imgcaptchaURl"
                alt=""
                @click="getCode"
              /></div
          ></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row :gutter="13">
          <el-col :span="13"
            ><div class="grid-content bg-purple">
              <el-input v-model="regForm.rcode"></el-input></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-button @click="getRcode">获取手机验证码</el-button>
            </div></el-col
          >
        </el-row>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="registerUser">注 册</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imgcaptchaURl: process.env.VUE_APP_BASEURL + '/captcha?type=sendsms',
      centerDialogVisible: false,
      imageUrl: '',
      avatarUrl: process.env.VUE_APP_BASEURL + '/uploads',
      avatarObj: { image: null },
      regForm: {
        username: '',
        phone: '',
        email: '',
        avatar: '',
        password: '',
        code: '',
        rcode: ''
      },
      rules: {
        username: [{ required: true, message: '昵称不能空', trigger: 'blur' }],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) return callback(new Error('手机号不能为空'))
              const reg = /^1[3456789][0-9]{9}/
              if (!reg.test(value)) return callback(new Error('手机号格式错误'))
              return callback()
            },
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) return callback(new Error('邮箱不能为空'))
              const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
              if (!reg.test(value)) return callback(new Error('邮箱格式错误'))
              return callback()
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        rcode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        avatar: [{ required: true, message: '头像不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    centerDialogVisible (newValue) {
      if (!newValue) {
        this.imageUrl = ''
        this.$refs.regForm.resetFields()
      }
    }
  },
  methods: {
    /** 用户注册 */
    registerUser () {
      this.$refs.regForm.validate(async valid => {
        if (valid) {
          const userInfo = await this.$axios.registerUser(this.regForm)
          console.log(userInfo)
          if (userInfo.code === 200) {
            this.$message.success('注册成功')
            this.centerDialogVisible = false
          }
        } else {
          return false
        }
      })
    },
    // 获取手机验证码
    async getRcode () {
      let num = 0
      this.$refs.regForm.validateField(['phone', 'code'], errorMessage => {
        console.log(errorMessage)
        if (!errorMessage) {
          num += 1
        }
      })
      if (num === 2) {
        const result = await this.$axios.getRcode(
          this.regForm.phone,
          this.regForm.code
        )
        if (result.code === 200) {
          this.regForm.rcode = result.data.captcha
        } else {
          this.$message.error(result.message)
          this.getCode()
        }
      }

      // console.log(result)
    },
    // 获取图片验证吗
    getCode () {
      this.imgcaptchaURl =
        process.env.VUE_APP_BASEURL +
        '/captcha?type=sendsms&t=' +
        (new Date() - 1)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      if (res.code === 200) {
        // 成功
        this.regForm.avatar = res.data.file_path
      } else {
        this.$message.error(res.message)
      }
    },
    beforeAvatarUpload (file) {
      const isImage =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.avatarObj.image = file
      return isImage && isLt2M
    }
  }
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
</style>
