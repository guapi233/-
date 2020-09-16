// pages/category/category.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧的菜单数据
    rightContent: [] // 右侧的商品数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },

  // 获取分类数据
  async getCates() {
    let result = await request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    });
    result = result.data.message;
    
    this.setData({ leftMenuList: result.map(v => v.cat_name) });
    this.setData({ rightContent: result[0].children });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})