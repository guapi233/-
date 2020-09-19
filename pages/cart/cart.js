// pages/cart/cart.js
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
  handleChooseAddress() {
    // 获取权限状态
    wx.getSetting({
      success: (result) => {
        // 获取权限状态
        const scopeAddress = result.authSetting["scope.address"];

        if (scopeAddress || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1)
            },
          })
        } else {
          // 用户 以前拒绝过授予权限，先引导用户打开授予页面
          wx.openSetting({
            success: (result2) => {
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3)
                },
              })
            }
          })
        }
      }
    })
    
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