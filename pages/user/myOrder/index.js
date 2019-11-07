// pages/user/myOrder/index.js;
const app = getApp()
const _http = require('../../../utils/request.js');
const orderListUrl = app.globalData.serverUrl + app.globalData.orderListUrl;//订单列表
const prepayUrl = app.globalData.serverUrl + app.globalData.prepayUrl;//支付
const orderCloseUrl = app.globalData.serverUrl + app.globalData.orderCloseUrl;//关闭订单
const orderConfirmUrl = app.globalData.serverUrl + app.globalData.orderConfirmUrl;//确认收货

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabqieCurrentTab: -1,
    orderStatusAll: -1,
    tabData: [ //tab切
      { title: "全部" },
      { title: "待支付" },
      { title: "待发货" },
      { title: "待收货" },
      { title: "已完成" },
    ],
    orderDatas: [
      // { 
      //   orderSeq: "021-0880 7888 6775 8989",
      //   orderType: "产品",
      //   state: "0",
      //   thumbnailImg: "https://kaobaobaotest.oss-cn-qingdao.aliyuncs.com/tt.webp",
      //   description: "欧诗漫OSM美白化妆品套装 营养美肤晶彩无暇补水保湿护肤品",
      //   price: "399",
      //   number: "2",
      //   specRemark:"颜色：白色/尺寸：100g",
      //   totalPrice: 399,
      //   yunfei: 0
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const orderStatus = options.orderStatus;
    if(orderStatus) {
      if (orderStatus == 0) {
        _this.setData({
          tabqieCurrentTab: 0,
          orderStatusAll: 0,
        })
        _this.getOrderDatas()
      }else if (orderStatus == 1) {
        _this.setData({
          tabqieCurrentTab: 1,
          orderStatusAll: 1,
        })
        _this.getOrderDatas()
      } else if (orderStatus == 2) {
        _this.setData({
          tabqieCurrentTab: 2,
          orderStatusAll: 2,
        })
        _this.getOrderDatas()
      } else if (orderStatus == 3) {
        _this.setData({
          tabqieCurrentTab: 3,
          orderStatusAll: 3,
        })
        _this.getOrderDatas()
      }
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
    this.getOrderDatas()
  },

  getOrderDatas: function() {
    var _this = this;
    const tabqieCurrentTab = _this.data.tabqieCurrentTab;
    _http.requestPost({
      url: orderListUrl + tabqieCurrentTab,
      success: res => {
        const data = res.data;
        if(data.length < 1) {
          _this.setData({
            noData: true
          })
        }
        _this.setData({
          orderDatas: data
        })


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

  //获取tabqie子组件的 currentTab值
  onMyEvent: function (e) {
    var _this = this;
    _this.setData({
      noData:false
    })
    let eIndex = e.detail;
    if(eIndex == 0) {
      _this.setData({
        tabqieCurrentTab: -1
      })
    }else if (eIndex == 1) {
      _this.setData({
        tabqieCurrentTab: 0
      })
    } else if (eIndex == 2) {
      _this.setData({
        tabqieCurrentTab: 1
      })
    } else if (eIndex == 3) {
      _this.setData({
        tabqieCurrentTab: 2
      })
    }else {
      _this.setData({
        tabqieCurrentTab: 3
      }) 
    }
    
    console.log("tab:", _this.data.tabqieCurrentTab)
    var cTab = _this.data.tabqieCurrentTab;
    //todo: 访问接口，cTab 为参数。
    _this.getOrderDatas()
  },

  //支付

  finishOrderType: function(e) {
    var _this = this;
    const status = e.currentTarget.dataset.status,
       orderSeq = e.currentTarget.dataset.orderseq,
       orderType = e.currentTarget.dataset.ordertype,
       id = e.currentTarget.dataset.id,
       goodsId = e.currentTarget.dataset.goodsid;
  
     if(status == 0) {
        _http.requestPost({
            url: prepayUrl + orderSeq + "?orderId=" + id,
            success: res => {
              const data = res.data;
              wx.requestPayment({
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: 'MD5',
                paySign: data.paySign,
                success(res) {
                  wx.showToast({
                    title: '支付成功...',
                    icon: 'none',
                    duration: 2000
                  });
                 
                  _this.getOrderDatas() 
                },
                fail(res) {
                  wx.showToast({
                    title: '支付失败...',
                    icon: 'none',
                    duration: 2000
                  });

                }
              })
            }
        })
     }else if( status == 2) {
       _http.requestPost({
         url: orderConfirmUrl + orderType + "/" + id ,
         success: res => {
           const data = res.data;
           wx.showToast({
             title: '收货成功！',
             icon: 'none',
             duration: 2000
           });

           _this.getOrderDatas()
         }
       })
     }else if( status == 3) {
         wx.navigateTo({
           url: '/pages/shop/goodsDetail/index?id=' + goodsId
         })
     }
  },
  // 关闭订单
  closeOrder: function(e) {
    var _this = this;
    const orderType = e.currentTarget.dataset.ordertype,
      id = e.currentTarget.dataset.id;
    _http.requestPost({
      url: orderCloseUrl + orderType + "/" + id,
      success: res => {
        const data = res.data;
        wx.showToast({
          title: '关闭成功！',
          icon: 'none',
          duration: 2000
        });
        _this.getOrderDatas()

      }
    })

  }
})