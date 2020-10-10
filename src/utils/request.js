import axios from 'axios'
import qs from 'qs'
import store from '@/store'

// 定义请求失败的状态码
const responeCode = {
  NO_LOGIN: 1100,
  LOGIN_EXPIRED: 1101
}

// function getQueryString(key) {
//   const href = window.location.href
//   const reg = new RegExp(key + '=([^&^#]+)')
//   const march = reg.exec(href)
//   if (march != null) {
//     const value = march[1]
//     return value
//   }
//   return ''
// }

// eslint-disable-next-line no-unused-vars
const getToken = () => {
  console.log('token值' + store.state.layerData.token)
  return store.state.layerData.token
}

// 请求信息输出开关 localStorage.debug = 'true'
const isDebugging = () => localStorage.debug === 'true'

const request = axios.create({
  baseURL: window.baseUrl, // base url
  method: 'post',
  headers: {
    'Content-type': 'application/json'
  }
})

request.interceptors.request.use(
  config => {
    // post方法，用qs转换参数
    if (config.data && config.qs) {
      config.data = qs.stringify(config.data)
    }
    // 不需要验证，不带Authorization头部
    if (!config.noAuth) {
      config.headers['Authorization'] = getToken()
    }
    // 跨域需要带cookie
    if (config.corsCookie) {
      config.withCredentials = true
    }
    return config 
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    if (isDebugging()) {
      const config = response.config
      const url = config.url
      console.log(
        `%c${url}\n%c${JSON.stringify(res)}`,
        'color:blue',
        'color:green'
      )
    }
    if (response.status !== 200) {
      return Promise.reject(new Error('error'))
    } else {
      // 状态码判断与修改
      if (res.code === 0) {
        judgeApiCode(res)
      }
      switch (res.code) {
        case responeCode.NO_LOGIN:
        case responeCode.LOGIN_EXPIRED:
          window.location.href = window.oauthServerUrl + '/oauth/authorize?client_id=' + window.clientId + '&redirect_uri=' + window.returnUrl + '&response_type=code&scopr=all'
          break
        default:
          return res
      }
    }
  },
  error => {
    if (isDebugging()) {
      const config = error.config
      const url = config.url
      console.log(
        `%c${url}\n%c${error}`,
        'color:blue',
        'color:red'
      )
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Message.error('无获取数据资源权限')
          // store.commit('global/setUserInfo', {})
          // logout().then(r => {
          //   const loginUrl = window.oauthServer + '/oauth/authorize'
          //   const clientId = window.clientId
          //   const returnUrl = window.returnUrl
          //   const url = loginUrl + '?client_id=' + clientId + '&redirect_uri=' + returnUrl + '&response_type=code&scopr=all'
          //   setTimeout(() => {
          //     window.location.href = url
          //   }, 500)
          //   // 清空sesstionStorage
          //   window.sessionStorage.type = ''
          // })
          // // 清空保存的身份信息
          // store.commit('global/setUserInfo', {})
          // router.replace('/login')
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

// 状态码判断与修改
function judgeApiCode(res) {
  const prpo = 'status'
  res[prpo] = 1
}

export default request
