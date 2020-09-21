// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      },
    ],
  },

  // 点击＋号 选择图片
  handleChooseImg() {
    // 调用小程序内置的选择图片api
    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: result => {
        this.setData({ imgs: [...this.data.imgs, ...result.tempFilePaths] });
      }
    })
  },

  // 点击自定义图片组件 删除
  handleRemoveImg(e) {
    // 点击图片的索引
    const { index } = e.currentTarget.dataset;

    let { imgs } = this.data;

    // 从数组中删除元素
    imgs.splice(index, 1);
    this.setData({ imgs });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

    // Tabs change事件处理
    handleTabsItemChange(e) {
      const { index } = e.detail;
  
      this.changeTitleByIndex(index);
    },
  
    // 根据标题索引来激活选中 标题数组
    changeTitleByIndex(index) {
      this.setData({ tabs: this.data.tabs.map(v => {
        v.id == index ?v.isActive = true :v.isActive = false;
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