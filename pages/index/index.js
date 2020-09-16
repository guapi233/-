//index.js
//获取应用实例
const app = getApp()

import {
  request
} from "../../request/index.js";

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类列表
    cateList: []
  },
  onLoad: async function () {
    // 获取轮播图数据
    await this.getSwiperList();
    // 获取分类数据
    await this.getCateList();

  },
  // 获取轮播方法
  async getSwiperList() {
    let result = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    });
    this.setData({
      swiperList: result.data.message
    });
  },
  // 获取轮播方法
  async getCateList() {
    let result = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    });
    this.setData({
      cateList: result.data.message
    });
  }
})