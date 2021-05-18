/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-05-17 13:06:22
 * @LastEditors: chenju
 * @LastEditTime: 2021-05-17 14:35:43
 */

/** 373. 查找和最小的K对数字
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
// 大顶堆
class Heap {
  constructor() {
    this.data = [];
    this.cnt = 0;
  }
  // 向上调整
  shiftUp(ind) {
    // (ind - 1) / 2 需要向下取整，防止小数
    while (ind && this.data[Math.floor((ind - 1) / 2)] < this.data[ind]) {
      [this.data[Math.floor((ind - 1) / 2)], this.data[ind]] = [this.data[ind], this.data[Math.floor((ind - 1) / 2)]];
      ind = Math.floor((ind - 1) / 2);
    }
  }
  // 向下调整
  shiftDown(ind) {
    let n = this.cnt - 1;
    while (ind * 2 + 1 <= n) {
      let temp = ind;
      // 和左子树比
      if (this.data[temp] < this.data[ind * 2 + 1]) temp = ind * 2 + 1;
      // 和右子树比
      if (ind * 2 + 2 <= n && this.data[temp] < this.data[ind * 2 + 2]) temp = ind * 2 + 2;
      // 如果没有交换，说明已经完成
      if (temp === ind) break;
      // 交换
      [this.data[ind], this.data[temp]] = [this.data[temp], this.data[ind]]
      ind = temp;
    }
  }
  // 入队
  push(x) {
    this.data[this.cnt++] = x;
    this.shiftUp(this.cnt - 1)
    return this.data;
  }
  // 出队
  pop() {
    if (this.size === 0) return false;
    // 第一位和最后一位交换
    [this.data[0], this.data[this.cnt - 1]] = [this.data[this.cnt - 1], this.data[0]];
    // 将最后一位pop出数组
    const popData = this.data.pop()
    this.cnt--;
    this.shiftDown(0);
    return popData;
  }
  top() {
    return this.data[0];
  }
  size() {
    return this.cnt;
  }
}
var kSmallestPairs = function(nums1, nums2, k) {
    let heap = new Heap();
    let arr = [];
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            let sum = nums1[i] + nums2[j];
            if (heap.size() >= k && heap.top() <= sum) break;
            // 这个obj在比较的时候会首先执行valueOf方法，用这个可以记录x，y的值
            let obj = {
                x: nums1[i],
                y: nums2[j],
                sum: sum,
                valueOf: function() {
                    return sum;
                }
            }
            heap.push(obj);
            if (heap.size() > k) heap.pop() 
        }
    }
    let res = heap.data.map(item => {
        return [item.x, item.y]
    })
    return res
};


/** 703. 数据流中的第 K 大元素
 * @param {number} k
 * @param {number[]} nums
 */
// 小顶堆
class LessHeap {
  constructor() {
    this.data = [];
    this.cnt = 0;
  }
  // 向上调整
  shiftUp(ind) {
    // (ind - 1) / 2 需要向下取整，防止小数
    while (ind && this.data[Math.floor((ind - 1) / 2)] > this.data[ind]) {
      [this.data[Math.floor((ind - 1) / 2)], this.data[ind]] = [this.data[ind], this.data[Math.floor((ind - 1) / 2)]];
      ind = Math.floor((ind - 1) / 2);
    }
  }
  // 向下调整
  shiftDown(ind) {
    let n = this.cnt - 1;
    while (ind * 2 + 1 <= n) {
      let temp = ind;
      // 和左子树比
      if (this.data[temp] > this.data[ind * 2 + 1]) temp = ind * 2 + 1;
      // 和右子树比
      if (ind * 2 + 2 <= n && this.data[temp] > this.data[ind * 2 + 2]) temp = ind * 2 + 2;
      // 如果没有交换，说明已经完成
      if (temp === ind) break;
      // 交换
      [this.data[ind], this.data[temp]] = [this.data[temp], this.data[ind]]
      ind = temp;
    }
  }
  // 入队
  push(x) {
    this.data[this.cnt++] = x;
    this.shiftUp(this.cnt - 1)
    return this.data;
  }
  // 出队
  pop() {
    if (this.size === 0) return false;
    // 第一位和最后一位交换
    [this.data[0], this.data[this.cnt - 1]] = [this.data[this.cnt - 1], this.data[0]];
    // 将最后一位pop出数组
    const popData = this.data.pop()
    this.cnt--;
    this.shiftDown(0);
    return popData;
  }
  top() {
    return this.data[0];
  }
  size() {
    return this.cnt;
  }
}

var KthLargest = function(k, nums) {
    this.k = k;
    this.lessheap = new LessHeap();
    for (let i = 0; i < nums.length; i++) {
        this.lessheap.push(nums[i]);
        if (i >= this.k) {
            this.lessheap.pop()
        }
    }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    this.lessheap.push(val);
    if (this.lessheap.size() > this.k) {
        this.lessheap.pop()
    }
    return this.lessheap.top()
};

// 692. 前K个高频单词
// 这里没有用堆的方式，用堆的话需要重写堆中比较的方法
var topKFrequent = function(words, k) {
  let arr = {};
  for (let i = 0; i < words.length; i++) {
      if (arr[words[i]]) arr[words[i]]++;
      else arr[words[i]] = 1;
  }
  let newList = [];
  for (let i in arr) {
      newList.push([i, arr[i]])
  }
  let res = newList.sort((a, b) => {
      if (a[1] !== b[1]) {
          return b[1] - a[1]
      } else {
          return a[0].localeCompare(b[0])
      }
  })
  console.log('res', res)
  let ress = [];
  for (let i = 0; i < k; i++) {
      ress.push(res[i][0])
  }
  return ress;
};
