/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-07-22 16:03:39
 * @LastEditors: chenju
 * @LastEditTime: 2021-07-22 16:04:19
 */

// 912. 排序数组
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 快速排序
function quickSortV1(arr, l, r) {
  if (l >= r) return;
  
  let [x, y, base] = [l, r, arr[l]];
  while(x < y) {
      while(x < y && arr[y] > base) y--;
      if (x < y) arr[x++] = arr[y];
      while(x < y && arr[x] < base) x++;
      if (x < y) arr[y--] = arr[x];
  }

  arr[x] = base;
  quickSortV1(arr, x + 1, r);
  quickSortV1(arr, l, x - 1);
}

// 快速排序 优化 左递归
function quickSortV2 (arr, l, r) {
while (l < r) {
  let x = l, y = r, base = arr[l];
  while(x < y) {
    while(x < y && arr[y] > base) y--;
    if (x < y) arr[x++] = arr[y];
    while(x < y && arr[x] < base) x++;
    if (x < y) arr[y--] = arr[x];
  }
  arr[x] = base;
  quickSortV2(arr, x + 1, r);
  r = x - 1;
}
}

// 内省排序
function __quickSortV3(arr, l, r) {
while(r - l > threshold) {
  let x = l, y = r, base = getMid(arr[l], arr[(l + r) / 2], arr[r]);
  do{
    while(arr[x] < base) x++;
    while(arr[y] > base) y--;
    if (x <= y) {
      swap(arr, x, y);
      x++, y--;
    } 
  } while(x <= y);
  __quickSortV3(arr, x, r);
  r = y;
}
}

let threshold = 16;

function getMid(arr, l, r) {
if (arr[l] > arr[(l + r) / 2]) swap(arr, l, (l + r) / 2);
if (arr[l] > arr[r]) swap(arr, l, r);
if (arr[(l + r) / 2] > arr[r]) swap(arr, (l + r) / 2, r);
return arr[(l + r) / 2];
}

function swap(arr, a, b) {
let temp = arr[a];
arr[a] = arr[b];
arr[b] = temp;
}

/**
* 插入排序
* @param {} arr 
* @param {*} l 
* @param {*} r 
*/
function final_insert_sort(arr, l, r) {
let ind = l;
for (let i = l + 1; i <= r; i++) {
  if (arr[i] < arr[ind]) ind = i;
}
while(ind > l) {
  swap(arr, ind, ind - 1);
  ind--;
}
for (let i = l + 2; i <= r; i++) {
  let j = i;
  while(arr[j] < arr[j - 1]) {
    swap(arr, j, j - 1);
    j--
  }
}
}

function quickSortV3(arr, l, r) {
__quickSortV3(arr, l, r);
final_insert_sort(arr, l, r)
}
var sortArray = function(nums) {
  quickSortV1(nums, 0, nums.length - 1)
  return nums
};


// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
/** 
 * @param {number[]} nums
 * @return {number[]}
 */
 var exchange = function(nums) {
  if (!nums.length) return nums;
  let [x, y] = [0, nums.length - 1];
  do{
    while (x < nums.length && nums[x] % 2) x++;
    while (y >= 0 && nums[y] % 2 === 0) y--;
    if (x <= y) {
        [nums[x], nums[y]] = [nums[y], nums[x]];
        x++, y--;
    } 
  } while (x <= y);
  return nums;
};