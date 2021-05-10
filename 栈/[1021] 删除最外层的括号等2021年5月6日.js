/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-05-06 11:22:35
 * @LastEditors: chenju
 * @LastEditTime: 2021-05-06 12:02:16
 */
/*
 *
 * [1021] 删除最外层的括号
 */
/**
 * @param {string} S
 * @return {string}
 */
 var removeOuterParentheses = function(S) {
  let num = 0;
  let flag = 0;
  let newS = '';
  for(let i in S) {
    let char = S.charAt(i);
    if(char === '(') {
      num++;
    } else {
      num--
    }
    if(num === 0) {
      let str = S.slice(flag, Number(i) + 1)
      newS += str.slice(1, str.length - 1)
      flag = Number(i) + 1;
    }
  }
  return newS
};

/*
 * [1249] 移除无效的括号
 */

/**
 * @param {string} s
 * @return {string}
 */
// 自己的方法
var minRemoveToMakeValid = function(s) {
  let stack = [];
  let stack2 = [];
  for (let i in s) {
    let char = s.charAt(i);
    if(char === '(') {
      stack.push('(')
      stack2.push(i)
    } else if (char === ')') {
      if (stack[stack.length - 1] === '(') {
        stack.pop()
        stack2.pop()
      } else {
        stack.push(')')
        stack2.push(i)
      }
    } 
  }
  if(stack.length === 0) return s;
  let sArr = s.split("");
  sArr = sArr.filter((item, index) => {
    return !stack2.includes(String(index))
  })
  let S = sArr.join('')
  return S;
};
// 另外方法(正序遍历加逆序遍历)
var minRemoveToMakeValid = function(s) {
  let S = '';
  let cnt = 0;
  for (let i in s) {
      let char = s.charAt(i);
      if(char === '(') {
          cnt++;
          S += char
      } else if (char === ')') {
          // 删除不正确的) 
          if(cnt === 0) continue
          cnt--;
          S += char
      } else {
          S += char
      }
  }
  let newS = ''
  cnt = 0;
  for(let i = S.length - 1; i >= 0; i--) {
      let char = S.charAt(i);
      if(char === ')') {
          cnt++;
          newS = char + newS
      } else if (char === '(') {
          // 删除不正确的( 
          if(cnt === 0) continue
          cnt--;
          newS = char + newS
      } else {
          newS = char + newS
      }
  }
  return newS;
};

/**
 *  [145] 二叉树的后序遍历
 * @param {*} root 
 * @returns 
 */
// 递归方法
var postorderTraversal = function(root) {
  if (!root) return [];
  let ret = []
  if(root.left){
    ret = ret.concat(postorderTraversal(root.left))
  }
  if(root.right){
    ret = ret.concat(postorderTraversal(root.right))
  }
  ret.push(root.val)
  return ret;
};
// 遍历方法
var postorderTraversal = function(root) {
  if (!root) return [];
  let s1 = []
  let s2 = []
  let ans = []
  s1.push(root)
  s2.push(0)
  while(s1.length) {
    let status = s2[s2.length - 1];
    s2.pop()
    switch(status) {
      case 0:
        s2.push(1)
        if (s1[s1.length - 1].left) {
          s1.push(s1[s1.length - 1].left)
          s2.push(0)
        }
        break;
      case 1:
        s2.push(2)
        if (s1[s1.length - 1].right) {
          s1.push(s1[s1.length - 1].right)
          s2.push(0)
        }
        break;
      case 2:
        ans.push(s1[s1.length - 1].val)
        s1.pop()
    }
  }
  return ans
};
// 遍历方法
var postorderTraversal = function(root) {
  if (!root) { return []; }
  let stack = [ root ], list = [], n;
  while (stack.length) {
      n = stack.pop();
      if (n) { // 这里通过null来切分支，颜色标记通过WHITE或GRAY来切分支
          stack.push(n);
          stack.push(null);
          if (n.right) { stack.push(n.right); }
          // stack.push(n);  // 中序遍历
          // stack.push(null);
          if (n.left) { stack.push(n.left); }
          // stack.push(n);  // 前序遍历
          // stack.push(null);
      } else {
          list.push(stack.pop().val);
      }
  }
  return list;
};