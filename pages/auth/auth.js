// pages/auth/auth.js

import { login } from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 获取用户信息
  async handleUserInfo(e) {
    // 1. 获取授权信息
    const { encryptedData, rawData, iv, signature } = e.detail;

    // 2. 获取小程序登录成功后的code
    const { code } = await login({ timeout: 10000 });

    // 3. 发送请求，获取用户的token（如果appid没有开通支付权限，这步会失败）
    const params = { encryptedData, rawData, iv, signature, code };
    const res = await request({ url: "/users/wxlogin", data: params, method: "post" });
    
    // 4. 伪造一个token
    wx.setStorageSync('token', "haiyasuibianxiexiela");
    
    // 5. 返回上一级
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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