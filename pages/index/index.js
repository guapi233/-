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
      url: '/home/swiperdata'
    });

    // 遍历修改轮播跳转路径
    let swiperList = result.data.message.map(item => {
      item.navigator_url = "/pages/goods_detail/goods_detail?" 
        + item.navigator_url.split("?")[1];
      return item;
    })

    this.setData({
      swiperList
    });
  },
  // 获取分类方法
  async getCateList() {
    let result = await request({
      url: '/home/catitems'
    });
    this.setData({
      cateList: result.data.message
    });
  },
  // 获取楼层方法
  async getFloorList() {
    let result = await request({
      url: '/home/floordata'
    });

    // 遍历修正楼层跳转链接
    result.data.message.forEach(item => {
      item["product_list"].forEach(item2 => {
        item2.navigator_url = "/pages/goods_list/goods_list?" +
          item2.navigator_url.split("?")[1];
      });
    });

    this.setData({
      floorList: result.data.message
    });
  }
})