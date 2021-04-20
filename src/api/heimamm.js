import _axios from './intercept'
export default {
  /** 用户登录  */
  async login (info) {
    const useInfo = await _axios.post('/login', { ...info })
    return useInfo
  },
  /** 发送验证码 /sendsms  */
  async getRcode (phone, code) {
    const rcode = await _axios.post('/sendsms', { phone, code })
    console.log(rcode)
    return rcode
  },
  /** 用户注册 /register  */
  async registerUser (options) {
    const userInfo = await _axios.post('/register', { ...options })
    console.log(userInfo)
    if (userInfo.code === 200) {
      return userInfo
    }
    return userInfo
  }
}
