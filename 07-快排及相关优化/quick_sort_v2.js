/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-07-22 13:57:46
 * @LastEditors: chenju
 * @LastEditTime: 2021-07-22 14:07:01
 */
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

let arr = [3, 1, 4, 5, 9, 10, 100, 99, 66, 77, 88, 99, 20, 21, 23, 11, 73, 64, 31];
let timestep = new Date().getTime()
quickSortV2(arr, 0, arr.length - 1);
console.log(timestep - new Date().getTime())
console.log('arr', arr);