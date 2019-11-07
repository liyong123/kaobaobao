// pages/user/sqjxs/index.js
const app = getApp()
const _http = require('../../../utils/request.js');
const wxParse = require('../../../utils/wxParse/wxParse.js')
const userAgentAgreeUrl = app.globalData.serverUrl + app.globalData.userAgentAgreeUrl;//注意事项
const userApplyAgentUrl = app.globalData.serverUrl + app.globalData.userApplyAgentUrl;//提交申请

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentFont: "",
    xieyiShow: true
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
    this.getAgree()
  },

  //申请经销商注意事项
  getAgree: function(){
    var _this = this;
    _http.requestPost({
      url: userAgentAgreeUrl,
      success: res => {
        const contentFont = res.data;
        if (contentFont) {
          wxParse.wxParse('contentFont', 'html', contentFont, _this, 15);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 表单提交
  formSubmit: function(e) {
    const params =  e.detail.value;
  
    var _this = this;
    _http.requestPost({
      url: userApplyAgentUrl,
      data: params,
      success: res => {
        wx.showToast({
          title: '提交成功！',
          icon: 'none',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/user/index',
        })

      }
    })
  },
  // 同意协议
  agreeXy: function(e) {
     this.setData({
       xieyiShow: false
     })
  }

})