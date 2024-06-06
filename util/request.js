import axios from 'axios'
import { DOMAIN } from './constant'

const axiosInstance = axios.create({
  baseURL: DOMAIN,
  timeout: 100000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json; charset=utf-8'
  },
  // URL QUeryString parameters
  params: {},
  // `data` is the data to be sent as the request body
  data: {}
})
axiosInstance.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

axiosInstance.interceptors.response.use(
  response => {
    if (response && response.data && response.data.status === 'success') {
      return [null, response.data.data]
    }
    return [response.data, null]
  },
  error => {
    return Promise.reject(error)
  }
)
const protoGet = axiosInstance.get
const protoPost = axiosInstance.post

axiosInstance.get = async function() {
  try {
    const [error, data] = await protoGet.apply(axiosInstance, arguments)
    return [error, data]
  } catch (error) {
    return [{
      message: '系统繁忙，请稍后再试',
      code: 500
    }, null]
  }
}

axiosInstance.post = async function() {
  try {
    const [error, data] = await protoPost.apply(axiosInstance, arguments)
    return [error, data]
  } catch (error) {
    return [{
      message: '系统繁忙，请稍后再试',
      code: 500
    }, null]
  }
}

export const fetchApi = function({ url, method = 'GET', keepalive = false, body = {}}) {
  return window.fetch(url, {
    method,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'application/json; charset=utf-8'
    },
    body,
    referrer: window.location.href,
    keepalive
  })
}

export default axiosInstance
