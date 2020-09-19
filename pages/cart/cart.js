// pages/cart/cart.js

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击收货地址
  async handleChooseAddress() {
    try {
      // 获取权限状态
      let res1 = await getSetting();

      let scopeAddress = res1.authSetting["scope.address"];

      // 判断权限状态
      if (scopeAddress === false) { 
        // 用户 以前拒绝过授予权限，先引导用户打开授予页面
        await openSetting();
      }
      
      let address = await chooseAddress();
      
      // 将收货地址存储到缓存中
      wx.setStorageSync('address', address)
    } catch (err) {
      console.log(err);
    }
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