/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-07-22 14:16:12
 * @LastEditors: chenju
 * @LastEditTime: 2021-07-22 17:42:10
 */
function __quickSortV3(arr, l, r) {
  while(r - l > threshold) {
    let x = l, y = r, base = getMid(arr[l], arr[Math.floor((l + r) / 2)], arr[r]);
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

function getMid(a, b, c) {
  if (a > b) [b, a] = [a, b];
  if (a > c) [c, a] = [a, c];
  if (b > c) [c, b] = [b, c];
  return b;
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

let arr = [-74,48,-20,2,10,-84,-5,-9,11,-24,-91,2,-71,64,63,80,28,-30,-58,-11,-44,-87,-22,54,-74,-10,-55,-28,-46,29,10,50,-72,34,26,25,8,51,13,30,35,-8,50,65,-6,16,-2,21,-78,35,-13,14,23,-3,26,-90,86,25,-56,91,-13,92,-25,37,57,-20,-69,98,95,45,47,29,86,-28,73,-44,-46,65,-84,-96,-24,-12,72,-68,93,57,92,52,-45,-2,85,-63,56,55,12,-85,77,-39];
// let timestep = new Date().getTime()
quickSortV3(arr, 0, arr.length - 1);
// console.log(timestep - new Date().getTime())
console.log('arr', arr);