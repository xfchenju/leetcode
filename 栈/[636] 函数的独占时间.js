/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-05-08 10:27:10
 * @LastEditors: chenju
 * @LastEditTime: 2021-05-08 14:55:35
 */
/*
 * [636] 函数的独占时间
 */
/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
// 自己写的方法
var exclusiveTime = function(n, logs) {
  let stack = []
  let stack2 = [];
  let res = []
  for (let i = 0; i < logs.length; i++) {
    let [progress, op, timestamp] = logs[i].split(':');
    if (op === 'start') {
      // 如果栈里有值，更新至最新并 增加时间
      if (stack.length) {
        let key = stack2[stack2.length - 1]
        let val = stack.pop()
        let time = timestamp - val
        if (res[key]) res[key] += time
        else res[key] = time
        stack.push(timestamp)
      }
      stack.push(timestamp)
      stack2.push(progress)
    } else {
      let val = stack.pop()
      let key = stack2.pop()
      let time = timestamp - val - 0 + 1;
      if (res[key]) res[key] += time
      else res[key] = time
      // 如果栈里有值，更新至最新的值
      if (stack.length) {
        stack.pop()
        stack.push(timestamp - 0 + 1)
      }
    }
  }
  return res
};
// 其他方法
var exclusiveTime = function(n, logs) {
  let stack = []
  let res = []
  for (let i = 0, pre = 0; i < logs.length; i++) {
    let [progress, op, timestamp] = logs[i].split(':');
    if (op === 'start') {
      if (stack.length) {
        if(res[stack[stack.length - 1]]) {
          res[stack[stack.length - 1]] += timestamp - pre
        } else {
          res[stack[stack.length - 1]] = timestamp - pre
        }
      }
      pre = timestamp
      stack.push(progress)
    } else {
      if (res[progress]) {
        res[progress] += timestamp - pre - 0 + 1;
      } else {
        res[progress] = timestamp - pre - 0 + 1;
      }
      pre = timestamp - 0 + 1;
      stack.pop()
    }
  }
  return res
};