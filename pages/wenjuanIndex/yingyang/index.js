// pages/wenjuanIndex/yingyang/index.js
const app = getApp()
const _http = require('../../../utils/request.js');
const getTestInfoByTypeUrl = app.globalData.serverUrl + app.globalData.getTestInfoByTypeUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerLinkAll: [],

    expertAll: [
      {
        imgUrl: '../../../image/header_img.jpg',
        name: "张三",
        address: "郑州市",
        abstract: "著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，",
        goodField: ["孤独", "自尊自信", "信任问题"],
        value: "600"
      },
      {
        imgUrl: '../../../image/header_img.jpg',
        name: "张三",
        address: "郑州市",
        abstract: "著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，",
        goodField: ["孤独", "自尊自信", "信任问题"],
        value: "600"
      }
    ],
    solveGoodsData: [
      {
        goodsImg: "../../../image/header_img.jpg",
        sellNumber: "169",
        abstract: "保健枕芯超绒磨毛舒适健康枕头一只装绒磨毛舒适健康枕",
        value: "199",
        oldValue: "399"
      },
      {
        goodsImg: "../../../image/header_img.jpg",
        sellNumber: "169",
        abstract: "保健枕芯超绒磨毛舒适健康枕头一只装绒磨毛舒适健康枕",
        value: "199",
        oldValue: "399"
      }
    ],
    otherDatas: [
      {
        imgUrl: "../../../image/header_img.jpg",
        title: "学姐陪伴",
        abstract: "定制化家庭解决方案"
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