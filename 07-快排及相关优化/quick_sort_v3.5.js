/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-07-22 17:32:55
 * @LastEditors: chenju
 * @LastEditTime: 2021-07-22 17:42:31
 */
function quickSortV35(arr, l, r) {
  while(l < r) {
    let x = l, y = r, base = getMid(arr[l], arr[Math.floor((l + r) / 2)], arr[r]);
    do{
      while(arr[x] < base) x++;
      while(arr[y] > base) y--;
      if (x <= y) {
        [arr[y], arr[x]] = [arr[x], arr[y]]
        x++, y--;
      } 
    } while(x <= y);
    quickSortV35(arr, x, r);
    r = y;
  }
}

function getMid(a, b, c) {
  if (a > b) [b, a] = [a, b];
  if (a > c) [c, a] = [a, c];
  if (b > c) [c, b] = [b, c];
  return b;
}

let arr = [1,3,5,7,2,4,6,8]

quickSortV35(arr, 0, arr.length - 1);

console.log('arr', arr);