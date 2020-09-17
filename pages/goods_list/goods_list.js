// pages/goods_list/goods_list.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  // 数据请求参数
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: async function (options) {
    this.queryParams.cid = options.cid;

    await this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    let result = await request({url: "/goods/search", data: this.queryParams});
    
    this.totalPages = Math.ceil(result.data.message.total / this.queryParams.pagesize);
    console.log(this.totalPages)

    this.setData({ goodsList: [...this.data.goodsList, ...result.data.message.goods] });
  }, 

  // Tabs change事件处理
  handleTabsItemChange(e) {
    const { index } = e.detail;
    this.setData({ tabs: this.data.tabs.map(v => {
      v.id === index ?v.isActive = true :v.isActive = false;
      return v;
    }) })
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
  onPullDownRefresh: async function () {
    // 重置商品列表数据
    this.setData({ goodsList: [] });
    // 重置页码
    this.queryParams.pagenum = 1;
    // 重新发送请求
    await this.getGoodsList();
    // 手动关闭加载动画
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '已经加载完毕啦',
      })
    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})