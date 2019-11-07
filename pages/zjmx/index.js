// pages/zjmx/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jifen: '888',
    date: '2019-09-01',
    date2: '2020-01-24',
    itemDatas: [
      {
        userName: '购买放松球',
        date: "2019-12-01",
        money: "-300.99",
        jifen: "+10"
      },
      {
        userName: '购买放松球',
        date: "2019-12-01",
        money: "-300.99",
        jifen: "+10"
      },
      {
        userName: '购买放松球',
        date: "2019-12-01",
        money: "-300.99",
        jifen: "+10"
      },
      {
        userName: '购买放松球',
        date: "2019-12-01",
        money: "-300.99",
        jifen: "+10"
      },
    ],

    tabData: [ //tab切
      { title: "销售明细" },
      { title: "下级销售额" }
    ],
    tabqieCurrentTab: 0,
    xjLinkData: [
      { linkUrl: '/pages/user/xsmx/index', name: '销售明细' },
      { linkUrl: '/pages/user/xsmx/index', name: '提现记录' },
    ]
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
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
     
    })

  },
  bindDateChange2(e) {
    let that = this;
    that.setData({
      date2: e.detail.value,
     
    })
    
  },
  //获取tabqie子组件的 currentTab值
  onMyEvent: function (e) {
    this.setData({
      tabqieCurrentTab: e.detail
    })
    var cTab = this.data.tabqieCurrentTab;
    //todo: 访问接口，cTab 为参数。
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