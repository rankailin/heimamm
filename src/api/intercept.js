import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  withCredentials: true
})
instance.interceptors.request.use(config => {
  console.log(config, instance.baseURL)
  console.log(process.env.VUE_APP_BASEURL)
  return config
})
instance.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data
  }
})
export default instance
