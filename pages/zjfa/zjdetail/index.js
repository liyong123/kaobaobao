// pages/zjfa/zjdetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImg: '../../../image/header_img.jpg',
    zjName: "张三",
    zjAddress: "郑州市金水区天伦路二十一世纪社区",
    zjValue: 600,
    serviceNum: 1000,
    score: 98,
    zxfsAll: [
      { type: "图文咨询" },
      { type: "视频咨询" },
      { type: "线下咨询" },
    ],
    // 选择时间
    timeAll: [
      {
        weekDay: "明天",
        date: '09.03',
        hourAll: [
          { startTime: '09:00', endTime: '09:50' },
          { startTime: '09:00', endTime: '09:50' }
        ]
      },
      {
        weekDay: "明天",
        date: '09.03',
        hourAll: [
          { startTime: '09:00', endTime: '09:50' },
          { startTime: '09:00', endTime: '09:50' }
        ]
      },
      {
        weekDay: "明天",
        date: '09.03',
        hourAll: [
          { startTime: '09:00', endTime: '09:50' },
          { startTime: '09:00', endTime: '09:50' }
        ]
      },
      {
        weekDay: "明天",
        date: '09.03',
        hourAll: [
          { startTime: '09:00', endTime: '09:50' },
          { startTime: '09:00', endTime: '09:50' }
        ]
      },

      {
        weekDay: "明天",
        date: '09.03',
        hourAll: [
          { startTime: '09:00', endTime: '09:50' },

        ]
      },
      {
        weekDay: "明天",
        date: '09.03',
        hourAll: [
          { startTime: '09:00', endTime: '09:50' },

        ]
      },
      {
        weekDay: "明天",
        date: '09.03',
        hourAll: [
          { startTime: '09:00', endTime: '09:50' },

        ]
      },

    ],

    tabData: [ //tab切
      { title: "简介" },
      { title: "评价" },
    ],
    tabqieCurrentTab: 0,
    iconImageShow: {
      show: true,
      url: "../../image/shop_detail_qie.png"
    },
    // 所有评价数据
    allPjDatas: [
      { headerImg: "../../../image/shop_goods_bg.png", name: "西门吹雪", date: "2019-08-30 12:30", pjFontContent: "东西很好用，也很实惠，东西很好用，也很实惠东西很好用，也很实惠东西很好用，也很实惠东西很好用，也很实惠" },
      { headerImg: "../../../image/shop_goods_bg.png", name: "西门吹雪", date: "2019-08-30 12:30", pjFontContent: "东西很好用，也很实惠" },
      { headerImg: "../../../image/shop_goods_bg.png", name: "西门吹雪", date: "2019-08-30 12:30", pjFontContent: "东西很好用，也很实惠" }, { headerImg: "../../../image/shop_goods_bg.png", name: "西门吹雪", date: "2019-08-30 12:30", pjFontContent: "东西很好用，也很实惠" }
    ],
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

  //获取tabqie子组件的 currentTab值
  onMyEvent: function (e) {
    this.setData({
      tabqieCurrentTab: e.detail
    })
    console.log(this.data.tabqieCurrentTab)
    var cTab = this.data.tabqieCurrentTab;
    //todo: 访问接口，cTab 为参数。
  },
})