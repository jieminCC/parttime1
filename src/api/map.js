/*
 * @Author: your name
 * @Date: 2020-08-17 19:03:46
 * @LastEditTime: 2020-09-18 14:00:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \xiangtan-app\src\api\map.js
 */
import request from '../utils/request'

/**
 * api用例测试
 *
 * @param {object} data
 * @returns {Promise}
 */
function getlayerData(data) {
  return request({
    method: 'get',
    url: '/oauthtokenapigateway/modelservice/api/User/ServiceResourceTree?syskey=' + data,
    corsCookie: true
  })
}

export default{
  getlayerData
}
