// pages/shop/confirmOrders/index.js
const app = getApp()
const _http = require('../../../utils/request.js');
const addressDefaultUrl = app.globalData.serverUrl + app.globalData.addressDefaultUrl;//用户的默认地址
const orderDetailUrl = app.globalData.serverUrl + app.globalData.orderDetailUrl;//订单详情
const prepayUrl = app.globalData.serverUrl + app.globalData.prepayUrl;//提交订单
const addCommentUrl = app.globalData.serverUrl + app.globalData.addCommentUrl;//获取买家留言

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderSeq: '',
    orderDataAll: [],
    noAddress: false,
    youHui: "暂无优惠",
    fapiao: "本单不开具发票",
    goods_to_address: "/pages/user/myAddress/index?goods_to_address=1", //跳转到 收货地址管理 页面，带参数
    liuyan: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //todo:当从"收货地址管理"页面 从新选择地址时，带地址参数到此页面，从而带入参数从新访问接口，获取新的匹配的地址

    const orderSeq = options.orderSeq;
    this.setData({
      orderSeq: orderSeq
    })  
  },
  //获取下一页要传过来的参数
  // getBackData: function (name) {
  //   this.setData({
  //     orderSeq: name
  //   })
  // },
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
    //_this.getAddressDefault();
    _this.getOrderMes();
  },
  // 查询一个用户的默认地址
  getAddressDefault: function () {
    var _this = this;
    _http.requestPost({
      url: addressDefaultUrl,
      success: res => {
        
       
      }
    })
  },
  // 获取 商品信息
  getOrderMes: function() {
    var _this = this;
    const orderSeq = _this.data.orderSeq;
    _http.requestPost({
      url: orderDetailUrl + orderSeq,
      success: res => {
        const data = res.data,
          orderDataAll = data.orderAll,
          addressAll = data.addressAll;

        let totalPrice = 0 ,
            totalNumber = 0;
        for(var i = 0; i< orderDataAll.length; i++) {
          totalPrice += (parseFloat(orderDataAll[i].goodsSinglePrice)*100) * parseFloat(orderDataAll[i].goodsNumber);
          totalNumber += parseFloat(orderDataAll[i].goodsNumber)
        } 
        totalPrice = (totalPrice/100).toFixed(2)
        _this.setData({
          addressAll: data.addressAll,
          orderDataAll: data.orderAll ,
          totalPrice: totalPrice,
          totalNumber: totalNumber,
          name: addressAll.personName,
          telephone: addressAll.phone,
          adress: addressAll.province + addressAll.city + addressAll.distict + addressAll.address 
        })

        const ad = addressAll.address;
        if (!ad) {
          _this.setData({
            noAddress: true
          })
          wx.showModal({
            title: '提示',
            content: '您还未添加地址，请去新增地址！',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  // 新增地址带着此订单的orderSeq，新增地址后，再带此参数返回订单页面，以便查看订单
                  url: "/pages/user/myAddress/index?goods_to_address=1&&orderSeq=" + _this.data.orderSeq,
                })
              }
            }
          })

        } else {
          _this.setData({
            noAddress: false,
          })
        }

      }
    })
  },
  // 获取买家留言
  getLiuyanInput: function(e) {
    var _this = this;
    const v = e.detail.value;
    
    _this.setData({
      liuyan: v
    })
    
  },
  //提交订单 ，发起支付
  submitOrder: function() {

    // todo:地址，客户留言


    var _this = this;
    const orderSeq = _this.data.orderSeq,
          liuyan = _this.data.liuyan;
    //  提交 买家留言 成功后 访问支付接口
    _http.requestPost({
      url: addCommentUrl,
      data:{
        orderSeq: orderSeq,
        specialComment:  liuyan
      },
      success: res => {
        // 成功后 访问支付接口
        _http.requestPost({
          url: prepayUrl + orderSeq,
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
                // todo：跳转到订单列表
                wx.navigateTo({
                  url: '/pages/user/myOrder/index',
                })

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