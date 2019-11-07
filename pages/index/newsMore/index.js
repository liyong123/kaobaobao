// pages/index/newsMore/index.js
const _http = require('../../../utils/request.js');
const app = getApp();
const zjzlNewUrl = app.globalData.serverUrl + app.globalData.zjzlNewUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 专家专栏
    expertDatas: [],
    page: 1,
    pageSize: 10,
    dataIsEnd: false,
    zhuajiaMessageWidth: (wx.getSystemInfoSync().windowWidth - 122) + "px",
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
    this.getZjzlData()
  },
  //获取专家专栏数据
  getZjzlData: function() {
    var _this = this;
    let {
      page,
      pageSize,
    } = _this.data;
    _http.requestPost({
      url: zjzlNewUrl + page,
      success: res => {
        const data = res.data;
        if (page == 1) {
          _this.setData({
            expertDatas: data,
            dataIsEnd: data.length < pageSize
          }, () => {

          })
        } else {
          _this.setData({
            expertDatas: _this.data.expertDatas.concat(data),
            dataIsEnd: data.length < pageSize
          })
        }
      }
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
    //todo：分页处理，触底page +1，访问接口，得到的数据contact到旧数据上。
    var _this = this;
    if (_this.data.dataIsEnd) return
    _this.setData({
      page: _this.data.page + 1
    }, () => {
      _this.getZjzlData()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})