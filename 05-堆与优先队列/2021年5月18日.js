/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-05-18 11:24:33
 * @LastEditors: chenju
 * @LastEditTime: 2021-05-18 16:45:18
 */
// 295. 数据流的中位数
var MedianFinder = function() {
  this.maxHeap = new Heap();
  this.minHeap = new Heap((a, b) => a < b);
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function(num) {
  this.maxHeap.push(num);
  this.minHeap.push(this.maxHeap.pop());
  
  if (this.maxHeap.size() < this.minHeap.size()) {
      this.maxHeap.push(this.minHeap.pop())
  }
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function() {
  if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.top();
  } else {
      return (this.maxHeap.top() + this.minHeap.top()) / 2;
  }
};


// 1753. 移除石子的最大得分
var maximumScore = function(a, b, c) {
  // 正序排列
  let arr = [a, b, c].sort((a, b) => a - b); 
  let ans = 0;
  // b - c
  let cnt1 = arr[2] - arr[1]
  if (arr[0] > cnt1) {
      ans = arr[1] + cnt1 + Math.floor((arr[0] - cnt1) / 2);
  } else {
      ans = arr[1] + arr[0];
  }
  return ans;
};


// 1801. 积压订单中的订单总数
var getNumberOfBacklogOrders = function(orders) {
  // 购买 最大堆
  let maxHeap = new Heap((x, y) => x[0] > y[0]);
  // 销售 最小堆
  let minHeap = new Heap((x, y) => x[0] < y[0]);
  for(let i = 0; i < orders.length; i++) {
      let order = orders[i];
      // console.log('order', order)
      // 购买
      if (order[2] === 0) {
          // maxHeap.push(order)
          let minSell = minHeap.top();
          // 销售堆有数据，并且在购买订单的预算内（金额小于购买订单金额）
          if (minSell && minSell[0] <= order[0]) {
              let buyNum = order[1], sellNum = minSell[1];
              // console.log(`购买 买的数量：${buyNum}，卖的数量：${sellNum}`)
              while (buyNum && sellNum && minSell[0] <= order[0]) {
                  // console.log(`购买while 买的数量：${buyNum}，卖的数量：${sellNum}`)
                  // 购买数量大于最低价的销售数量
                  if (buyNum > sellNum) {
                      buyNum = buyNum - sellNum;
                      // console.log('购买大于销售1', minHeap.container)
                      minHeap.pop()
                      minSell = minHeap.top();
                      sellNum = minSell ? minSell[1] : 0
                      // console.log('购买大于销售', minHeap.container)
                  } else if (buyNum === sellNum) {
                      minHeap.pop();
                      sellNum = buyNum = 0
                  } else {
                      let resMinSell = [minSell[0], sellNum - buyNum, 1];
                      minHeap.pop();
                      minHeap.push(resMinSell)
                      buyNum = 0;
                  }
              }
              // 如果有没买到的
              if (buyNum) {
                  maxHeap.push([order[0], buyNum, 0])
              }
          } else {
              maxHeap.push(order)
          }
          // console.log('购买后两个堆', maxHeap.container, minHeap.container)
      } else {
          // minHeap.push(order)
          // 销售
          let maxBuy = maxHeap.top();
          if (maxBuy && maxBuy[0] >= order[0]) {
              let sellNum = order[1], buyNum = maxBuy[1];
              // console.log(`销售 买的数量：${buyNum}，卖的数量：${sellNum}`)
              while (sellNum && buyNum && maxBuy[0] >= order[0]) {
                  if (sellNum === buyNum) {
                      maxHeap.pop();
                      sellNum = buyNum = 0
                  } else if (sellNum > buyNum) {
                      // 购买堆顶卖完了，但是还没销售完
                      sellNum = sellNum - buyNum;
                      maxHeap.pop();
                      maxBuy = maxHeap.top();
                      buyNum = maxBuy ? maxBuy[1] : 0;
                  } else {
                      // 销售完了，但购买堆顶没卖完
                      let resMaxBuy = [maxBuy[0], buyNum - sellNum, 0]
                      maxHeap.pop();
                      maxHeap.push(resMaxBuy);
                      sellNum = 0
                  }
              }
              if (sellNum) {
                  minHeap.push([order[0], sellNum,1])
              }
          } else {
              minHeap.push(order)
          }
          // console.log('销售后两个堆', maxHeap.container, minHeap.container)
      }
  }
  // console.log('maxHeap', maxHeap.container)
  // console.log('minHeap', minHeap.container)
  let cnt = 0
  let maxHeapSize = maxHeap.size();
  let minHeapSize = minHeap.size();
  for (let i = 0; i < maxHeapSize; i++) {
      cnt += maxHeap.pop()[1]
  }
  for (let i = 0; i < minHeapSize; i++) {
      cnt += minHeap.pop()[1]
  }
  return cnt % (Math.pow(10, 9) + 7)
};


// 313. 超级丑数
var nthSuperUglyNumber = function(n, primes) {
  let p = new Array(primes.length).fill(0);
  let data = [1];
  let ans = 1;
  while (data.length !== n) {
      ans = primes[0] * data[p[0]];
      for(let i = 1; i < primes.length; i++){
          ans = Math.min(ans, data[p[i]] * primes[i])
      }
      for(let i = 0; i < primes.length; i++){
          if(data[p[i]] * primes[i] === ans) p[i]++;
      }
      data.push(ans)
  }
  return ans;
};
// 使用堆
var nthSuperUglyNumber = function(n, primes) {
  let sortPrimes = primes.sort((a, b) => b - a);
  let heap = new Heap((x, y) => x < y), ans = 0;
  heap.push(1);
  while(n--) {
      ans = heap.pop();
      if (ans === 1) {
          for (let i = 0; i < sortPrimes.length; i++) {
              heap.push(sortPrimes[i]);
          }
      } else {
          for (let i = 0; i < sortPrimes.length; i++) {
              if (ans % sortPrimes[i] === 0) {
                  j = i;
                  while (j >= 0) {
                      heap.push(ans * sortPrimes[j])
                      j--;
                  }
                  break;
              }
          }
      }
  }
  return ans;
};


// 264. 丑数 II
// 通用丑数解法
var nthUglyNumber = function(n) {
  let primes = [5, 3, 2]
  let heap = new Heap((x, y) => x < y);
  let ans = 0;
  heap.push(1);
  while(n--) {
      ans = heap.pop();
      if (ans === 1) {
          for (let i = 0; i < primes.length; i++) {
              heap.push(primes[i]);
          }
      } else {
          for (let i = 0; i < primes.length; i++) {
              if (ans % primes[i] === 0) {
                  j = i;
                  while (j >= 0) {
                      heap.push(ans * primes[j])
                      j--;
                  }
                  break;
              }
          }
      }
  }
  return ans;
};
// 固定质因数时
var nthUglyNumber = function(n) {
  let heap = new Heap((x, y) => x < y);
  let ans = 0;
  heap.push(1);
  while(n--) {
      ans = heap.pop();
      if (ans % 5 === 0) {
          heap.push(ans * 5);
      } else if (ans % 3 === 0) {
          heap.push(ans * 5);
          heap.push(ans * 3);
      } else  {
          heap.push(ans * 5);
          heap.push(ans * 3);
          heap.push(ans * 2);
      } 
      
  }
  return ans;
};