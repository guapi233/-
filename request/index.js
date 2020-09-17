// 同时发送请求的数量
let ajaxTimes = 0;

export const request = (params) => {
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";

  ajaxTimes++;

  // 打开加载动画
  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;

        // 关闭加载动画
        ajaxTimes === 0 && wx.hideLoading();
      }
    })
  })
}