
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'


Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/map',
      name: 'map',
      component: () => import('@/views/map')
    },
    {
      path: '/',
      name: '',
      redirect: '/map'
    }

  ]
})


// let hash = window.location.hash
// let index = hash.indexOf('?')
// let search = hash.slice(index + 1)
// let arr = search.split('&')
// console.log('获取token值')
// for (let i = 0; i < arr.length; i++) {
//   let myname = arr[i].split('=')
//   if (myname[0] === 'token') {
//     store.commit('layerData/setToken', (myname[1]).replace("%20", ' '))
//   } else if (myname[0] === 'bimid') {
//     store.commit('layerData/setBimid', myname[1])
//   } else if (myname[0] === 'syskey') {
//     store.commit('layerData/setSyskey', myname[1])
//   }

// }

let paramArr = window.location.search.split('&')
console.log(paramArr)
paramArr[0] = paramArr[0].replace('?', '')
for (let index = 0; index < paramArr.length; index++) {
  // BIMID
  if (paramArr[index].indexOf('bimid') > -1) {
    const BIMID = paramArr[index].replace('bimid=', '')
    store.commit('layerData/setBimid', BIMID)
  }
  // token
  if (paramArr[index].indexOf('token') > -1) {
    const token = paramArr[index].replace('token=', '')
    console.log('获取到的token值为：' + token)
    store.commit('layerData/setToken', token.replace("%20", ' '))
  }
  if (paramArr[index].indexOf('syskey') > -1) {
    const syskey = paramArr[index].replace('syskey=', '')
    console.log('获取到的syskey值为：' + syskey)
    store.commit('layerData/setSyskey', syskey)
  }
}


export default router