// pages/goods_detail/goods_detail.js

import { request } from "../../request/index.js";
import { showToast } from "../../utils/asyncWx.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    isCollect: false,
  },
  // 商品信息
  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);

    // 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync('collect') || [];
    // 判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id == options.goods_id);

    this.setData({ isCollect });
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    let result = await request({ url: "/goods/detail", data: { goods_id } });
    result = result.data.message;
    
    this.goodsInfo = result;

    this.setData({ goodsDetail: {
      goods_name: result.goods_name,
      goods_id: result.goods_id,
      goods_price: result.goods_price,
      // iphone部分手机不支持webp图片格式， 最好找后台修改
      goods_introduce: result.goods_introduce.replace(/\.webp/g, ".jpg"),
      pics: result.pics
    } });
  },

  // 点击轮播图，图片预览
  handlePreviewImage(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.goodsDetail.pics.map(v => v.pics_mid),
    })
  },
  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];

    let index = cart.findIndex(v => v.goods_id === this.data.goodsDetail.goods_id);

    if (index === -1) {
      // 不存在 第一次添加
      cart.push({ ...this.goodsInfo, num: 1, checked: true });
    } else {
      // 已经存在 执行num++
      cart[index].num++;
    }

    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      mask: true
    })
  },

  // 点击商品收藏图标
  handleCollect() {
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id);

    if (index !== -1) {
      collect.splice(index, 1);
      showToast({ title: "取消成功", mask: true });
    } else {
      collect.push(this.goodsInfo);
      showToast({ title: "收藏成功", mask: true });
    }

    wx.setStorageSync('collect', collect);
    this.setData({ isCollect: !this.data.isCollect });
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