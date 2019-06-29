import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import JSONbig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Vue.prototype.$axios = axios
axios.defaults.transformResponse = [function (data) {
  // data 是未经处理的后端响应数据：JSON 格式字符串
  // Do whatever you want to transform the data

  // JSONbig.parse 类似于 JSON.parse，它的作用也是将 JSON 格式字符串转换为 JavaScript 对象
  // 唯一的区别就是：JSONbig.parse 会检测被转换数据中的数字是否超出了 JavaScript 安全整数范围，如果超出，它会做特殊处理
  // 如果 data 不是一个 JSON 格式字符串，会导致 JSONbig.parse 转换失败并异常
  // 例如我们执行删除操作，后端返回一个 204 状态码，但是没有返回任何数据，也就是空字符串
  // 那这里 JSONbig.parse(空字符串) 就报错了
  // return JSONbig.parse(data)
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    let token = JSON.parse(window.localStorage.getItem('user_infor'))
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data.data
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        window.localStorage.removeItem('user_infor')
        router.replace('/login')
      }
    }

    return Promise.reject(error)
  }
)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
