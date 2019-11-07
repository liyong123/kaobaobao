// pages/zjfa/index.js
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      { name: "城市", value: '1' },
      { name: "价格", value: '2' },
      { name: "选择预约时间", value: '3' },
      { name: "咨询师性别", value: '4' },
      { name: "咨询方式", value: '5' },
    ],
    scrollX: true,
    selectedValue: '0',
    valueEqual: false,
    expertAll: [
      {
        imgUrl: '../../image/header_img.jpg',
        name: "张三",
        address: "郑州市",
        abstract: "著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，",
        goodField: [ "孤独", "自尊自信", "信任问题" ],
        value: "600"
      },
      {
        imgUrl: '../../image/header_img.jpg',
        name: "张三",
        address: "郑州市",
        abstract: "著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，",
        goodField: ["孤独", "自尊自信", "信任问题"],
        value: "600"
      },
      {
        imgUrl: '../../image/header_img.jpg',
        name: "张三",
        address: "郑州市",
        abstract: "著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，著名心理学家，心理学博士，",
        goodField: ["孤独", "自尊自信", "信任问题"],
        value: "600"
      }
    ],

    province: '',
    city: '',
    modalShow: false,
    cityAll: [
      { name: "北京", city_id: "01" },
      { name: "上海", city_id: "02" },
      { name: "深圳", city_id: "03" }
    ],
    sexAll: [
      { sexType: "不限", id: '0' },
      { sexType: "男性", id: '1' },
      { sexType: "女性", id: '2' }
    ],
    consultationAll: [
      { consultationType: "不限" },
      { consultationType: "面对面" },
      { consultationType: "视频" },
    ],
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
      
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'HEHBZ-WH5W4-RFNU7-XCQOS-LQ46T-HTFF6' //这里自己的key秘钥进行填充
    });

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
    // this.getUserLocation()
  },

  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log("location_jw:",JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log("location:", JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
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

  // scroll-view 每项点击
  swichNav: function(e) {
    const that = this;
    const oldV = that.data.selectedValue;
    const current = e.currentTarget.dataset.current;
    
    if( oldV == current ) {
      that.setData({
        valueEqual: !that.data.valueEqual
      })
    }
    that.setData({
      selectedValue: current,
      modalShow: true
    })
  },
  //选择其他城市
  chooseOtherCity: function(e) {

  },
  //刷新定位城市
  updateCity: function() {
    this.getLocation()
  },
  sliderChange: function(e) {
    const v = e.detail.value;
  }
})