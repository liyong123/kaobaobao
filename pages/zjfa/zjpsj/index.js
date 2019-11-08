// pages/zjfa/zjpsj/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择时间
    weekAll: [
      {
        weekDay: "星期六",
        date: '09.03',
        
      },
      {
        weekDay: "星期日",
        date: '09.04',
       
      },
      {
        weekDay: "星期一",
        date: '09.05',
       
      },
      {
        weekDay: "星期二",
        date: '09.06',
       
      },

      {
        weekDay: "星期三",
        date: '09.07',
       
      },
      {
        weekDay: "星期四",
        date: '09.08',
       
      },
      {
        weekDay: "星期五",
        date: '09.09',
       
      },

    ],
    hourAll: [
      { startTime: '09:00', endTime: '09:50' },
      { startTime: '10:00', endTime: '10:50' },
      { startTime: '11:00', endTime: '11:50' },
      { startTime: '12:00', endTime: '12:50' },
      { startTime: '09:00', endTime: '09:50' },
      { startTime: '10:00', endTime: '10:50' },
      { startTime: '11:00', endTime: '11:50' },
      { startTime: '12:00', endTime: '12:50' },
      { startTime: '09:00', endTime: '09:50' },
      { startTime: '10:00', endTime: '10:50' },
      { startTime: '11:00', endTime: '11:50' },
      { startTime: '12:00', endTime: '12:50' },
      { startTime: '09:00', endTime: '09:50' },
      { startTime: '10:00', endTime: '10:50' },
      { startTime: '11:00', endTime: '11:50' },
      { startTime: '12:00', endTime: '12:50' },
    ],
    choosedDay: 0,
    choosedTime: 1
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

  //选择日期
  choosedDate: function (e) {
    
    var _this = this;
    const index = e.currentTarget.dataset.index;
    
    _this.setData({
      choosedDay: index
    })

  }
})