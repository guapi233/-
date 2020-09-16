//index.js
//获取应用实例
const app = getApp()

import {
  request
} from "../../request/index.js";

Page({
  data: {
    swiperList: [], // 轮播图数组
    cateList: [], // 分类列表
    floorList: [] // 楼层列表
  },
  onLoad: async function () {
    // 获取轮播图数据
    await this.getSwiperList();
    // 获取分类数据
    await this.getCateList();
    // 获取楼层数据
    await this.getFloorList();

  },
  // 获取轮播方法
  async getSwiperList() {
    let result = await request({
      url: '/swiperdata'
    });
    this.setData({
      swiperList: result.data.message
    });
  },
  // 获取轮播方法
  async getCateList() {
    let result = await request({
      url: '/catitems'
    });
    this.setData({
      cateList: result.data.message
    });
  },
  // 获取楼层方法
  async getFloorList() {
    let result = await request({
      url: '/floordata'
    });
    this.setData({
      floorList: result.data.message
    });
  }
})