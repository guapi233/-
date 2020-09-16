// pages/category/category.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧的菜单数据
    rightContent: [], // 右侧的商品数据
    currentIndex: 0, // 选中的菜单索引
    rightScrollTop: 0, // 右侧滚动条滚动距离
  },
  // 分类数据
  categoryData: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },

  // 获取分类数据
  async getCates() {
    let result = await request({
      url: "/categories"
    });
    this.categoryData = result.data.message;
    
    this.setData({ leftMenuList: this.categoryData.map(v => v.cat_name) });
    this.setData({ rightContent: this.categoryData[0].children });
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    
    // 切换左侧选中菜单索引
    this.setData({ currentIndex: index });
    // 将右侧滚动条置顶
    this.setData({ rightScrollTop: 0 });
    // 切换右侧内容
    this.setData({ rightContent: this.categoryData[index].children });
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