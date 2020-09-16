//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图数组
    swiperList: []
  },
  onLoad: function () {
    // 获取轮播图数据
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        this.setData({
          swiperList: result.data.message
        })
      }
    })
  }
})
