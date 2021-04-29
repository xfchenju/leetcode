/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-04-29 16:44:01
 * @LastEditors: chenju
 * @LastEditTime: 2021-04-29 18:08:30
 */

// [682] 棒球比赛
/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
  let arr = []
  for(let i in ops) {
    let op = ops[i];
    if(op === "C") {
      arr.pop();
    } else if(op === "D") {
      let lastTime = arr.pop();
      let thisTime = lastTime * 2;
      arr.push(lastTime)
      arr.push(thisTime)
    } else if(op === "+") {
      let lastTime = arr.pop();
      let last2Time = arr.pop();
      let thisTime = Number(lastTime) + Number(last2Time);
      arr.push(last2Time)
      arr.push(lastTime)
      arr.push(thisTime)
    } else {
      arr.push(op)
    }
  }
  return arr.reduce((n, m) => Number(n) + Number(m));
};

/*
 * [844] 比较含退格的字符串
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var backspaceCompare = function(s, t) {
  let trueS = []
  for(let i in s) {
    let charS = s.charAt(i)
    if (charS === '#') {
      trueS.pop()
    } else {
      trueS.push(charS)
    }
  }
  let trueT = []
  for(let i in t) {
    let charT = t.charAt(i)
    if (charT === '#') {
      trueT.pop()
    } else {
      trueT.push(charT)
    }
  }
  return trueS.join('') === trueT.join('')
};

/** [946] 验证栈序列
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
// 自己做的方法
var validateStackSequences = function(pushed, popped) {
  let stack = [];
  while(pushed.length) {
    stack.push(pushed.pop())
  }
  let stackPopStack = []
  for(let item of popped) {
    while(stack.length && item !== stackPopStack[stackPopStack.length - 1]) {
      stackPopStack.push(stack.pop())
    }
    if((stack.length || stackPopStack.length) && item !== stackPopStack.pop()) {
      return false
    }
  }
  return true;
};
// 其他方法
var validateStackSequences = function(pushed, popped) {
  let stack = [];
  let cur = 0;
  for (let item of popped) {
      while(cur < pushed.length && (stack.length === 0 || item !== stack[stack.length - 1])) {
          stack.push(pushed[cur])
          cur++;
      }
      if(stack[stack.length - 1] !== item) return false
      stack.pop()
  }
  return true;
};