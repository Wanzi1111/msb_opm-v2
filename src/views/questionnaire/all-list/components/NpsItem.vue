<!--
 * @Descripttion: NPS题样式
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-05 14:40:21
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-05 16:16:26
-->
<template>
  <div class="nps">
    <div class="tips d-flex a-center justify-b">
      <p>非常不愿意推荐</p>
      <p>非常愿意推荐</p>
    </div>
    <ul class="d-flex">
      <li v-for="item in 10" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nps{
  margin: 0 0 20px 50px;
  width: 300px;
  p{
    color: #606266;
    font-size: 14px;
  }
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid #999;
    li{
      padding: 5px 10px;
      border-right: 1px solid #999;
      &:last-child{
        border-right: 0;
      }
    }
  }
}
</style>
