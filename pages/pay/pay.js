// pages/pay/pay.js

import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
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
    // 设置收货信息
    this.setData({ address: wx.getStorageSync('address') });
    // 过滤并设置购物车信息
    this.setCart(wx.getStorageSync('cart').filter(v => v.checked) || []);
  },

  // 设置购物车状态 同时计算全选、总数量价格
  setCart(cart) {
    this.setData({ cart });
    // wx.setStorageSync('cart', cart);

    // 计算总价格、总数量（onShow 中已经过滤过了）
    let totalPrice = 0, totalNum = 0;
    this.data.cart.forEach(item => {
      totalPrice += item.num * item.goods_price;
      totalNum += item.num;
    })
    this.setData({ totalPrice, totalNum });
  },

  // 处理点击支付按钮
  async handleOrderPay() {
    // 1. 判断有没有缓存中有无token
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return ;
    }

    // 伪造支付成功
    await showToast({ title: "支付成功" });

    // 将伪造商品信息存入本地缓存中
    const fakeOrderInfo = {
      number: "HMDD" + Date.now() + Math.floor(Math.random() * 10000),
      price: this.data.totalPrice,
      time: Date.now()
    }

    const orderList = wx.getStorageSync('orderlist') || [];
    orderList.push(fakeOrderInfo);
    wx.setStorageSync('orderlist', orderList);

    // 手动删除缓存中 已经支付的商品
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v => !v.checked);
    wx.setStorageSync('cart', newCart);

    // 跳转页面
    wx.navigateTo({
      url: '/pages/order/order'
    })
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