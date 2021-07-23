/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-07-22 17:08:44
 * @LastEditors: chenju
 * @LastEditTime: 2021-07-22 17:30:16
 */
function quickSortV25(arr, l, r) {
  while(l < r) {
    let x = l, y = r, base = arr[l];
    do{
      while(arr[x] < base) x++;
      while(arr[y] > base) y--;
      if (x <= y) {
        [arr[y], arr[x]] = [arr[x], arr[y]]
        x++, y--;
      } 
    } while(x <= y);
    quickSortV25(arr, x, r);
    r = y;
  }
}

let arr = [1,3,5,7,2,4,6,8]
quickSortV25(arr, 0, arr.length - 1);

console.log('arr', arr);