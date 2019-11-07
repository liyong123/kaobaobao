// pages/wenjuanIndex/xueye/index.js
const app = getApp()
const _http = require('../../../utils/request.js');
const getTestInfoByTypeUrl = app.globalData.serverUrl + app.globalData.getTestInfoByTypeUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerLinkAll: [],

    expertAll: [],
    solveGoodsData: [],
    otherDatas: [
      {
        imgUrl: "../../../image/header_img.jpg",
        title: "学习方法指导",
        abstract: "超级学霸学习法 不用死记硬背 轻松学习"
      },
      {
        imgUrl: "../../../image/header_img.jpg",
        title: "选科服务",
        abstract: "合理规划职业生涯 选择自己的优势学科"
      },
      {
        imgUrl: "../../../image/header_img.jpg",
        title: "高考志愿填报",
        abstract: "为其制定个性化的高考志愿填报方案"
      },
      {
        imgUrl: "../../../image/header_img.jpg",
        title: "高考陪读",
        abstract: "160万家长的选择 精英老师在线1对1"
      },
      {
        imgUrl: "../../../image/header_img.jpg",
        title: "教学服务",
        abstract: "为其定制个性化的高考志愿填报方案"
      },
      {
        imgUrl: "../../../image/header_img.jpg",
        title: "整体服务",
        abstract: "全方位数据分析，教学效果一目了然"
      },
     
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ceshiType: options.type
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
    this.getTestInfoByType()
  },

  //根据测算类型 获取答题类型
  getTestInfoByType: function () {
    var _this = this;
    const type = _this.data.ceshiType;
    _http.requestPost({
      url: getTestInfoByTypeUrl + type,
      success: res => {
        const data = res.data;
        _this.setData({
          headerLinkAll: data
        })
      }
    })
  },
  toTest: function (e) {
    const id = e.currentTarget.dataset.id,
      testType = e.currentTarget.dataset.testtype
    wx.navigateTo({
      url: '/pages/wenjuan/index?typeId=' + id + "&&testType=" + testType,
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