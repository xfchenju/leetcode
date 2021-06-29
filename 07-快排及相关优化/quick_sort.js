/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-06-29 10:48:05
 * @LastEditors: chenju
 * @LastEditTime: 2021-06-29 10:58:05
 */
function quickSortV1(arr, l, r) {
  if (l >= r) return;

  let x = l, y = r, base = arr[l];
  
  while(x < y) {
    while(x < y && arr[y] > base) y--;
    if (x < y) arr[x++] = arr[y];
    while(x < y && arr[y] < base) x++;
    if (x < y) arr[y--] = arr[x];
  }
  arr[x] = base;
  quickSortV1(arr, l, x - 1);
  quickSortV1(arr, x + 1, r);
}

let arr = [3, 1, 4, 5, 9, 10];

quickSortV1(arr, 0, arr.length - 1);

console.log('arr', arr);