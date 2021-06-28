/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-06-25 17:24:30
 * @LastEditors: chenju
 * @LastEditTime: 2021-06-28 10:40:53
 */
import {UnionSet} from './UnionSet'
/**
 * 547. 省份数量
 * @param {*} isConnected 
 * @returns 
 */
var findCircleNum = function(isConnected) {
    let n = isConnected.length;
    const u = new UnionSet(n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (isConnected[i][j]) {
                u.merge(i, j);
            }
        }
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (u.get(i) === i) ans+=1;
    }
    return ans;
};