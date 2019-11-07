// pages/jiaqun/index.js
import { pages } from '../../utils/tabbarContent.js'
const app = getApp()
const _http = require('../../utils/request.js');
const userInfoUrl = app.globalData.serverUrl + app.globalData.userInfoUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagesMenu: [],
    qunDatas: [
      { erweiUrl: '../../image/header_img.jpg', qunName: '家长群1', abstract: "学习成功的教育方式,沟通孩子的问题" },
      { erweiUrl: '../../image/header_img.jpg', qunName: '家长群2', abstract: "学习成功的教育方式,沟通孩子的问题" },
      { erweiUrl: '../../image/header_img.jpg', qunName: '家长群3', abstract: "学习成功的教育方式,沟通孩子的问题" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const openId = wx.getStorageSync("openid");
    if (openId) {
      _http.requestPost({
        url: userInfoUrl,
        success: res => {
          const userType = res.data.userType;
          _this.setData({
            pagesMenu: pages[userType * 1 - 1]
          })

        }
      })
    } else {
      _this.setData({
        pagesMenu: pages[0]
      })
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