// component/popup.js
const app = getApp();
const _http = require('../../utils/request.js');
const getOpenIdByCodeUrl = app.globalData.serverUrl + app.globalData.getOpenIdByCodeUrl;
const addUserUrl = app.globalData.serverUrl + app.globalData.addUserUrl;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 内容从哪个方向弹出，方向：center top bottom left right
    type: {
      type: String,
      value: 'center'
    },
    show: {
      type: Boolean,
      value: false
    },
    //显示遮罩层
    maskLayoutShow: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMaskClick: function () {
      this.triggerEvent("close", {})
    },

    /**
   * 授权登录
   */
    authorLogin: function (e) {
      let _this = this;
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        return false;
      }
      wx.showLoading({
        title: "正在登录",
        mask: true
      });
    
      const userInfo = e.detail.userInfo;
      // 执行微信登录
      wx.login({
        success: function (res) {
          if( res.errMsg !== "login:ok") {
            return false
          }
          const code = res.code;
          _http.requestPost ({
            url: getOpenIdByCodeUrl  + code,
            success: (res)=> {
              const openId = res.data.openid;
              wx.setStorageSync("openid", openId)
                
              const params = {
                nickName: userInfo.nickName,
                headImg: userInfo.avatarUrl,
                province: userInfo.province,
                country: userInfo.country,
                city: userInfo.city,
                gender: userInfo.gender,
                agentId: ""
              };
              _http.requestPost({
                url: addUserUrl,
                data: params,
                success: res => {
                  
                  wx.showToast({
                    title: "登录成功",
                    icon: 'none',
                    duration: 2000
                  });
                  // wx.switchTab({
                  //   url: "/pages/index/index"
                  // })
                  wx.hideLoading();
                  _this.handleMaskClick()
                }
              })
            }
          })

         
         

          // wx.navigateTo({
          //   url: "/pages/temporary/index",
          // })


        },
      });
    },
  }
})
