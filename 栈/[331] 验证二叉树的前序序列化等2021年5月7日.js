/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-05-07 14:29:07
 * @LastEditors: chenju
 * @LastEditTime: 2021-05-08 10:08:15
 */
/*
 * [331] 验证二叉树的前序序列化
 */
/**
 * @param {string} preorder
 * @return {boolean}
 */
 var isValidSerialization = function(preorder) {
  let arr = preorder.split(',')
  let s = []
  for (let i in arr) {
    let item = arr[i];
    s.push(item)
    let last = s.length - 1;
    while(s.length >= 3 && s[last] === '#' && s[last - 1] === '#' && s[last - 2] !== '#') {
      s[last - 2] = '#';
      s.pop();
      s.pop();
      last = s.length - 1;
    }
  }
  return s.length === 1 && s[0] === '#'
};

/*
 * [227] 基本计算器 II
 */

/**
 * @param {string} s
 * @return {number}
 */
// 自己写的
 var calculate = function(s) {
  let stack = []
  let tmpStr = ''
  for(let i in s) {
    let item = s.charAt(i);
    if (item === '+' || item === '-') {
      stack.push(tmpStr)
      stack.push(item)
      tmpStr = ''
    } else if(item === ' ') {
      continue
    } else {
      tmpStr += item
    }
  }
  if (tmpStr) {
    stack.push(tmpStr)
  }
  let stack2 = []
  for(let i in stack) {
    let char = stack[i]
    if (stack2[stack2.length - 1] === '*') {
      stack2.pop()
      let res = stack2.pop()
      console.log(`一次计算${res} * ${char} = ${res * char}`)
      stack2.push(res * char)
    } else if (stack2[stack2.length - 1] === '/') {
      stack2.pop()
      let res = stack2.pop()
      console.log(`一次计算${res} / ${char} = ${parseInt(res / char)}`)
      stack2.push(parseInt(res / char))
    } else {
      stack2.push(char)
    }
  }
  console.log('stack2', stack2);
  let stack3 = []
  for(let i in stack2) {
    let char = stack2[i]
    if (stack3[stack3.length - 1] === '+') {
      stack3.pop()
      let res = stack3.pop()
      console.log(`一次计算${res} + ${char} = ${Number(res) + Number(char)}`)
      stack3.push(Number(res) + Number(char))
    } else if (stack3[stack3.length - 1] === '/') {
      stack3.pop()
      let res = stack3.pop()
      console.log(`一次计算${res} - ${char} = ${res - char}`)
      stack3.push(res - char)
    } else {
      stack3.push(char)
    }
  }
  console.log('stack3', stack3);
  return stack3[0]
};
// 更好的解法，效率相差2倍以上
var calculate = function(s) {
  let n = s.length, res = 0, num = 0, curRes = 0, op = '+';
  for (let i = 0; i < n; i++) {
      let char = s[i];
      // 判断是否是数字
      if (char >= '0' && char <= '9') {
          // char - '0' 是将char字符串转成数字
          // 这行代码目的是找出位数大于1位的数字，比如23 + 20 时 第一次遍历出来num = 2, 第二次遍历出来num = 23
          num = num * 10 + (char - '0');
      }
      // 当遍历的字符是运算符号，或者是最后一位时
      if (char === '+' || char === '-' || char === '*' || char === '/' || i === n - 1) {
          // 这里将num运算到暂存的结果中去
          switch (op) {
              case '+': curRes += num; break;
              case '-': curRes -= num; break;
              case '*': curRes *= num; break;
              // 这里取整用的是按位或的方式
              case '/': curRes = curRes / num | 0; break;
          }
          // 如果是+ - 运算或者是最后一位，将暂存的结果加到最终结果中去
          if (char === '+' || char === '-' || i === n - 1) {
              res += curRes;
              curRes = 0;
          }
          // 运算符改变
          op = char;
          // 重置num
          num = 0;
      }
  }
  return res;
};