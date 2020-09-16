//index.js
//获取应用实例
const app = getApp()

import { request } from "../../request/index.js";

Page({
  data: {
    // 轮播图数组
    swiperList: []
  },
  onLoad: async function () {
    // 获取轮播图数据
    let result = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    });
    this.setData({
      swiperList: result.data.message
    });

    
  }
})
