//index.js
//获取应用实例，家长首页
import { pages } from '../../utils/tabbarContent.js';
const app = getApp();
const _http = require('../../utils/request.js');
const userInfoUrl = app.globalData.serverUrl + app.globalData.userInfoUrl;

Page({
  data: {
    pagesMenu: [],
    serviceNumber: "-",
    serviceScore: "-",
    userOrderMes: [
      { linkUrl: '/pages/user/myOrder/index', imgUrl: "../../image/user_order_message01.png", name: '全部订单'},
      { linkUrl: '/pages/user/myOrder/index?orderStatus=0', imgUrl: "../../image/user_order_message02.png", name: '待支付' },
      { linkUrl: '/pages/user/myOrder/index?orderStatus=1', imgUrl: "../../image/user_order_message03.png", name: '待发货' },
      { linkUrl: '/pages/user/myOrder/index?orderStatus=2', imgUrl: "../../image/user_order_message04.png", name: '待收货' },
    ],
    userStateDatas: [
      { linkUrl: '/pages/user/myState/index',imgUrl: "../../image/user_state01.png", name: '我的状态'},
      { linkUrl: '/pages/user/myMessage/index',imgUrl: "../../image/user_state02.png", name: '我的消息' },
      { linkUrl: '/pages/user/myAddress/index',imgUrl: "../../image/user_state03.png", name: '收货地址管理' },
      { linkUrl: '/pages/user/xsmx/index',imgUrl: "../../image/user_state04.png", name: '销售明细' },
    ],
    tipNum:'0',
    showBottomPopup: false,
    userType: 1,
    headImg: "",
    applyAgentStatus: -1,
    applyExpertStatus: -1,
  

  },
  onLoad: function () {
    var _this = this;
    const openId = wx.getStorageSync("openid");
    if (openId) {
      //获取用户角色接口
      _http.requestPost({
        url: userInfoUrl,
        success: res => {
   
          const userType = res.data && res.data.userType && res.data.userType || 1,
             datas = res.data;
          _this.setData({
            userType: userType,
            pagesMenu: pages[userType * 1 - 1]
          })
         if(datas){
           _this.setData({
             headImg: datas.headImg,
             applyAgentStatus: datas.applyAgentStatus,
             applyExpertStatus: datas.applyExpertStatus,
             serviceNumber: datas.serviceNumber,
             serviceScore: datas.serviceScore
           })

         }
          
       
        }
      })
        _this.setData({
          showBottomPopup: false
        })

      
    } else {
      _this.setData({
        showBottomPopup: true,
        pagesMenu: pages[0]
      })
    }
  },
  onShow: function () {

  },
  //获取用户信息
  getUserMes: function() {
     
  },
  //popup点击事件
  popToggle: function () {
    this.setData({
      showBottomPopup: !this.data.showBottomPopup
    })
  },


})
