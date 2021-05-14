/*
 * @Description: 堆
 * @Author: chenju
 * @Date: 2021-05-14 13:29:21
 * @LastEditors: chenju
 * @LastEditTime: 2021-05-14 15:48:25
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

// let heap = new Heap()
// let startTime = new Date().getTime();


// const arr = [9, 6, 8, 4, 5, 2, 1, 3];

// for (let i = 0; i < arr.length; i++) {
//   heap.push(arr[i]);
// }

// console.log('heap', heap)

// let arr2 = []
// for (let i = 0; i < arr.length; i++) {
//   arr2.push(heap.pop())
// }

// console.log(arr2);

let arr = [0,0,1,2,4,2,2,3,1,4], k = 8;
let heap = new Heap()
for (let i = 0; i < arr.length; i++) {
    heap.push(arr[i])
    if (heap.size() >k) heap.pop(); 
}
console.log(heap);