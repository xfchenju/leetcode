/*
 * @Description: 
 * @Author: chenju
 * @Date: 2021-06-28 10:40:03
 * @LastEditors: chenju
 * @LastEditTime: 2021-06-28 10:40:35
 */
// 并查集
export class UnionSet {
  constructor(n) {
      this.fa = [];
      for (let i = 0; i <= n; i++) {
          this.fa[i] = i;
      }
  }

  get(x) {
      this.fa[x] = (this.fa[x] === x ? x : this.get(this.fa[x]));
      console.log('fa', x, this.fa[x])
      return this.fa[x]
  }

  merge(a, b) {
      this.fa[this.get(a)] = this.get(b)
      console.log('fa merge', this.fa)
  }
}