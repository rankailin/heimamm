import axios from 'axios'
console.log(process.env.VUE_APP_BASEURL)
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})
export default instance
