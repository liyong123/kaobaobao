// pages/user/myAddress/index.js
const app = getApp()
const _http = require('../../../utils/request.js');
const addressListUrl = app.globalData.serverUrl + app.globalData.addressListUrl;//用户地址列表
const updateAddressUrl = app.globalData.serverUrl + app.globalData.updateAddressUrl;//刷新使用地址
const addressDeleteUrl = app.globalData.serverUrl + app.globalData.addressDeleteUrl;//删除使用地址

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址，默认第一个地址就是默认地址
    addressDatas: [],
    goods_to_address: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const params = options.goods_to_address;//从商品页跳转过来
    const orderSeq = options.orderSeq //商品订单的流水号，从商品订单页面跳转过来， 
     if(params) {
       this.setData({
         goods_to_address: true
       })
     }
     this.setData({
       orderSeq: orderSeq
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
    
    this.getAddresList()
  },
  //获取地址列表
  getAddresList: function() {
    var _this = this;
    _http.requestPost({
      url: addressListUrl ,
      success: res => {
         const data = res.data;
         if(data.length < 1) {
            _this.setData({
               noAddressTip: true
            })
         }else {
           _this.setData({
             noAddressTip: false,
             addressDatas: data,
           })
         }
        

      }
    })
  },
  // 选择某个地址后，刷新使用地址
  updateAddress: function(e) {
    var _this = this;
    const orderSeq = _this.data.orderSeq,
          addressId =  e.currentTarget.dataset.addressid;
    let params = {
      orderSeq: orderSeq,
      addressId: addressId
    }      
    _http.requestPost({
      url: updateAddressUrl,
      data: params,
      success: res => {
       

        // var pagelist = getCurrentPages();
        // if (pagelist.length > 1) {
        //   //获取上一个页面实例对象 ,微信小程序wx.navigateTo层叠5次限制，特殊情况处理
        //   var prePage = pagelist[pagelist.length - 2];
        //   prePage.getBackData(orderSeq);
        //   wx.navigateBack({
        //     delta: 1
        //   })
        // }
        wx.navigateTo({
          url: '/pages/shop/confirmOrders/index?orderSeq=' + orderSeq,
        })

      },
      
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
  //删除地址
  deleteAddress: function(e) {
    const id = e.currentTarget.dataset.deleteid;
    var _this = this;
    _http.requestPost({
      url: addressDeleteUrl + id,
      success: res => {
        wx.showToast({
          title: '删除成功...',
          icon: 'none',
          duration: 2000
        });

        _this.getAddresList()
      }
    })

  }

})