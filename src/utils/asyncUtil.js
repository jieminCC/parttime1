/**
 * 异步函数按顺序执行
 *
 * @param {Array<{func: function, args: Array<any>}>} funcsObjArray 异步函数对象数组
 * @param {object} context 绑定的this变量
 * @returns {Promise} 返回按顺序调用后的结果
 */
// async function composeAsync(funcsObjArray, context) {
//   const res = []
//   let preRs = null
//   for (let i = 0; i < funcsObjArray.length; i++) {
//     try {
//       let { func, args } = funcsObjArray[i]
//       args = args || [preRs]
//       console.log('执行第' + i + '个')
//       preRs = await func.call(context, ...args)
//       console.log('第' + i + '个执行完毕')
//       res.push(preRs)
//     } catch (ex) {
//       res.push(ex)
//     }
//   }
//   return res
// }

function composeAsync(context) {
  var params = []
  return {
    add(func, ...args) {
      params.push({
        func,
        args: args.length ? args : null
      })
      return this
    },
    clear() {
      params = []
      return this
    },
    async excute() {
      const res = []
      let preRs = null
      for (let i = 0; i < params.length; i++) {
        try {
          let { func, args } = params[i]
          args = args || [preRs]
          preRs = await func.call(context, ...args)
          res.push(preRs)
        } catch (ex) {
          res.push(ex)
        }
      }
      return res
    }
  }
}

export { composeAsync }
