/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-06-29 09:21:12
 * @LastEditors: chenju
 * @LastEditTime: 2021-06-29 10:10:40
 */
import { UnionSet } from "./UnionSet";
import { Heap } from '../05-堆与优先队列/heap.class.js'

/**
 * 1202. 交换字符串中的元素
 * @param {*} s 
 * @param {*} pairs 
 * @returns 
 */
var smallestStringWithSwaps = function(s, pairs) {
  const sArr = s.split('');
  const u = new UnionSet(sArr.length);
  const cmp = (a, b) => {
      return a[0] < b[0]
  }
  
  for (let i = 0; i < pairs.length; i++) {
      let [a, b] = pairs[i];
      u.merge(a, b);
  }
  
  let h = {}
  for (let i = 0; i < s.length; i++) {
      if (!h[u.get(i)]) {
          h[u.get(i)] = new Heap(cmp)
      }
      h[u.get(i)].push(s.charAt(i))
  }

  let ret = '';
  for (let i = 0; i < s.length; i++) {
      ret = ret + h[u.get(i)].pop();
  }
  return ret;
};