/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-06-28 10:39:36
 * @LastEditors: chenju
 * @LastEditTime: 2021-06-28 16:03:55
 */
import { UnionSet } from './UnionSet'
// 200. 岛屿数量
var numIslands = function (grid) {
    const n = grid.length;
    const m = grid[0].length;
    // 技巧：把所有点都编号1、2、3 ... n*m
    const u = new UnionSet(n * m);

    // 计算点的编号
    const ind = (i, j) => {
        return i * m + j;
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '0') continue;
            if (i > 0 && grid[i - 1][j] === '1') {
                u.merge(ind(i, j), ind(i - 1, j));
            }

            if (j > 0 && grid[i][j - 1] === '1') {
                u.merge(ind(i, j), ind(i, j - 1));
            }
        }
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 获取根节点的数量就是岛屿的数量
            if (grid[i][j] === '1' && u.get(ind(i, j)) === ind(i, j)) ans++;
        }
    }

    return ans;
};


// 990. 等式方程的可满足性
var equationsPossible = function (equations) {
    const u = new UnionSet(26);
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const n = equations.length;
    for (let i = 0; i < n; i++) {
        let item = equations[i];
        if (item.charAt(1) === '!') continue;
        const a = arr.indexOf(item.charAt(0));
        const b = arr.indexOf(item.charAt(3));
        u.merge(a, b);
    }

    for (let i = 0; i < n; i++) {
        let item = equations[i];
        if (item.charAt(1) === '=') continue;
        const a = arr.indexOf(item.charAt(0));
        const b = arr.indexOf(item.charAt(3));
        if (u.get(a) === u.get(b)) return false;
    }
    return true;
};

// 684. 冗余连接
var findRedundantConnection = function (edges) {
    const n = edges.length;
    const u = new UnionSet(n);
    for (let i = 0; i < n; i++) {
        let [a, b] = edges[i];
        if (u.get(a) === u.get(b)) {
            return [a, b]
        } else {
            u.merge(a, b)
        }
    }
};

/**
 * 1319. 连通网络的操作次数
 * @param {*} n 
 * @param {*} connections 
 * @returns 
 */
var makeConnected = function (n, connections) {
    const u = new UnionSet(n);
    let leftLines = 0
    for (let i = 0; i < connections.length; i++) {
        let [a, b] = connections[i];
        if (u.get(a) === u.get(b)) {
            leftLines++;
        } else {
            u.merge(a, b);
        }
    }
    let time = -1;
    for (let i = 0; i < n; i++) {
        if (u.get(i) === i) time++;
    }
    if (leftLines < time) return -1;
    return time;
};
// 另一种方法
var makeConnected = function (n, connections) {
    if (connections.length < n - 1) return -1
    const u = new UnionSet(n);
    for (let i = 0; i < connections.length; i++) {
        let [a, b] = connections[i];
        u.merge(a, b);
    }
    let time = -1;
    for (let i = 0; i < n; i++) {
        if (u.get(i) === i) time++;
    }
    return time;
};

/**
 * 新的并查集，能统计出每个集合的长度
 */
class UnionSet {
    constructor(n) {
        this.fa = [];
        this.cnt = [];
        for (let i = 0; i <= n; i++) {
            this.fa[i] = i;
            this.cnt[i] = 1;
        }
    }

    get(x) {
        this.fa[x] = (this.fa[x] === x ? x : this.get(this.fa[x]));
        return this.fa[x]
    }

    merge(a, b) {
        if (this.get(a) === this.get(b)) return
        this.cnt[this.get(b)] += this.cnt[this.get(a)];
        this.fa[this.get(a)] = this.get(b)
    }
}
/**
 * 128. 最长连续序列
 * @param {*} nums 
 * @returns 
 */
var longestConsecutive = function (nums) {
    const u = new UnionSet(nums.length);
    let hashobj = {}
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if (hashobj[num] > -1) continue;
        hashobj[num] = i;
        if (hashobj[num - 1] > -1) {
            u.merge(hashobj[num], hashobj[num - 1]);
        }
        if (hashobj[num + 1] > -1) {
            u.merge(hashobj[num], hashobj[num + 1]);
        }
    }

    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        if (u.get(i) === i && u.cnt[i] > ans) ans = u.cnt[i]
    }

    return ans
};

/**
 * 947. 移除最多的同行或同列石头
 * @param {*} stones 
 * @returns 
 */
// 时间复杂度较高
var removeStones = function(stones) {
    const u = new UnionSet(stones.length);
    for (let i = 0; i < stones.length; i++) {
        for (let j = 0; j < stones.length; j++) {
            if (i === j) continue;
            let [a, b] = stones[i];
            let [aj, bj] = stones[j];
            if (aj == a || bj == b) {
                u.merge(j, i);
            }
        }
    }
    
    let ans = 0;
    for (let i = 0; i < stones.length; i++) {
        if (u.get(i) === i) ans++;
    }
    return stones.length - ans
};
// 更好的方法
var removeStones = function(stones) {
    const u = new UnionSet(stones.length);
    let objX = {};
    let objY = {};
    for (let i = 0; i < stones.length; i++) {
        let [x, y] = stones[i];
        if (objX[x] > -1) {
            u.merge(objX[x], i);
        }
        if (objY[y] > -1) {
            u.merge(objY[y], i)
        }
        objX[x] = i
        objY[y] = i
    }
    
    let ans = 0;
    for (let i = 0; i < stones.length; i++) {
        if (u.get(i) === i) ans++;
    }
    return stones.length - ans
};
