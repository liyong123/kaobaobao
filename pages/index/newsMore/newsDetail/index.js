// pages/index/newsMore/newsDetail/index.js
const _http = require('../../../../utils/request.js');
const app = getApp();
const zjzlDetailUrl = app.globalData.serverUrl + app.globalData.zjzlDetailUrl;
const wxParse = require('../../../../utils/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '热烈祝贺中华人民共和国成立70周年',
    origin: '腾讯网',
    headImg: 'http://kaobaobaotest.oss-cn-qingdao.aliyuncs.com/f4d7ffba4e27414ab197f08373146a16.jpg?Expires=1886918215&OSSAccessKeyId=LTAIbgEq2YbBUscL&Signature=LorPC9oNngzTXnfU%2FkH2hgn%2BHTI%3D',
    createDate: '2019-09-08',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
    var _this = this;
    const id = _this.data.id;
    _http.requestPost({
      url: zjzlDetailUrl + id,
      success: res => {
        const data = res.data
        _this.setData({
          title: data.title,
          origin: data.origin,
          createDate: data.createDate,
          headImg: data.headImg
        })
        const contentStr = data.contentStr;
        if (contentStr) {
          wxParse.wxParse('contentStr', 'html', contentStr, _this, 15);
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

  }
})