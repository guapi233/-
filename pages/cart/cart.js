// pages/cart/cart.js

import { getSetting, chooseAddress, openSetting, showModal } from "../../utils/asyncWx.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
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
      address.all = address.provinceName + address.cityName  +address.countyName + address.detailInfo ;
      
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
    // 设置收货信息
    this.setData({ address: wx.getStorageSync('address') });
    // 设置购物车信息
    this.setCart(wx.getStorageSync('cart') || []);
  },
  // 商品选中change
  handleItemChange(e) {
    const { id } = e.currentTarget.dataset;
    let { cart } = this.data;
    // 查找需要被修改的商品索引
    let index = cart.findIndex(v => v.goods_id === id);
    cart[index].checked = !cart[index].checked;

    // 重新设置data与缓存
    this.setCart(cart);
  },

  // 设置购物车状态 同时计算全选、总数量价格
  setCart(cart) {
    this.setData({ cart });
    wx.setStorageSync('cart', cart);

    // 计算是否全选
    this.setData({ allChecked: this.data.cart.length 
      ?this.data.cart.every(v => v.checked) :false });
    // 计算总价格、总数量
    let totalPrice = 0, totalNum = 0;
    this.data.cart.forEach(item => {
      if (item.checked) {
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
      }
    })
    this.setData({ totalPrice, totalNum });
  },

  // 商品的 全选 反选
  handleItemAllCheck() {
    let { cart, allChecked } = this.data;

    allChecked = !allChecked;

    cart.forEach(v => v.checked = allChecked);

    // 把修改后的设置填充回data和缓存
    this.setCart(cart);
  },

  // 商品数量控制
  async handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset;

    let { cart } = this.data;

    // 找到需要修改商品的索引 并修改
    const index = cart.findIndex(v => v.goods_id === id);

    // 判断是否需要删除
    if (cart[index].num === 1 && operation === "-1") {
      const res = await showModal({
        title: "提示",
        content: "是否要删除该商品"
      })

      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      } else if (res.cancel) {
        // noop
      }
    } else {
      cart[index].num += Number(operation);
    }

    this.setCart(cart);
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