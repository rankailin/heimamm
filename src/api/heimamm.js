import _axios from './intercept'
export default {
  /** 用户登录  */
  async login (info) {
    console.log(info)
    const useInfo = await _axios.post('/login', { ...info })
    console.log(useInfo)
    return useInfo
  }
}
