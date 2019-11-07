// pages/user/myAddress/newAddress/index.js
const app = getApp()
const _http = require('../../../../utils/request.js');
const addAddressUrl = app.globalData.serverUrl + app.globalData.addAddressUrl;//新增用户地址
const addressDetailUrl = app.globalData.serverUrl + app.globalData.addressDetailUrl;//回显地址
const modifyAddressUrl = app.globalData.serverUrl + app.globalData.modifyAddressUrl;//修改用户地址

Page({

  /**
   * 页面的初始数据
   */
  data: {
    editBool:false,
    region: ['北京市', '北京市', '东城区'],
    regionCode: ["110000", "110100", "110101"],
    switchChecked: false,
    goods_to_address: false,
    morenFalse: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const editBool = options.edit;
    const addressId = options.address_code;//地址编号，确认编辑哪个地址,
    const goods_to_address = options.goods_to_address;
    const orderSeq = options.orderSeq //商品订单的流水号，从商品订单页面跳转过来， 

    if(editBool) {
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      })
      this.setData({
        editBool: true,
        addressId: addressId
      })

      // 编辑地址，根据地址id ，回显地址数据
      _http.requestPost({
        url: addressDetailUrl + addressId,
        success: res => {
          const data = res.data;
          this.setData({
            personName: data.personName,
            phone: data.phone,
            address: data.address,
            morenFalse: data.isDefault == 1 ,
            region: [data.province, data.city, data.distict],
            
          })
        }
      })


    }else {
      wx.setNavigationBarTitle({
        title: '新增收货地址'
      })
      this.setData({
        editBool: false
      })
    }
    
    if (goods_to_address) {
      this.setData({
        goods_to_address: true,
        orderSeq: orderSeq
      })
    }else {
      this.setData({
        goods_to_address: false
      })
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
  //获取省市区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      region: e.detail.value,
      regionCode: e.detail.code
    })
  },
  //提交表单
  formSubmit: function (e) {
    var _this = this;
    const params = e.detail.value;
    console.log("params:", params)
    // todo：判断值是否为空
    if (params.personName == "" || params.phone == "" || params.address == "") {
      wx.showModal({
        title: '提示',
        content: '请完善您的信息！',
        showCancel: false,
      })
    }else {
        const region = _this.data.region;
        let valueAll = {}
      if (_this.data.editBool ) {
          valueAll = {
            id: _this.data.addressId,
            personName: params.personName,
            phone: params.phone,
            address: params.address,
            isDefault: params.morenAddress ? 1 : 0,
            province: region[0],
            city: region[1],
            distict: region[2],
          }
        }else {
          valueAll = {
            personName: params.personName,
            phone: params.phone,
            address: params.address,
            isDefault: params.morenAddress ? 1 : 0,
            province: region[0],
            city: region[1],
            distict: region[2],
          }
        }
        
        const goods_to_address = _this.data.goods_to_address,
          orderSeq = _this.data.orderSeq;
        if (goods_to_address) {
          //跳回到 地址列表页面  带上商品流水号orderSeq
          _http.requestPost({
            url: _this.data.editBool ? modifyAddressUrl : addAddressUrl,
            data: valueAll,
            success: res => {
               wx.navigateTo({
                 url: "/pages/user/myAddress/index?goods_to_address=1&&orderSeq=" + orderSeq
               })
            }
          })
        } else {
          //跳转到 "我的"页面
          _http.requestPost({
            url: _this.data.editBool ? modifyAddressUrl : addAddressUrl,
            data: valueAll,
            success: res => {
              wx.navigateTo({
                url: "/pages/user/myAddress/index"
              })
            }
          })
        }
    }
   
   
  }
})