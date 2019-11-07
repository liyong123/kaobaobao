//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {
   
    
  },
  onShow: function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })


    // if (!wx.getStorageSync("token")) {//此处判断不合适
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
    //this.getUserLocation();


    // const userRole = wx.getStorageSync("userRole") ;//获取用户角色，决定显示哪个tabbar
    // //判断跳转到哪个角色首页
    // switch(userRole){
    //   case '0':
    //     wx.reLaunch({
    //       url: '/pages/index/index',
    //     });
    //     break;
    //   case '1':
    //     wx.reLaunch({
    //        url: '/pages/index/index',
    //      });
    //      break;
    // }
  },

  //获取地理位置
  getUserLocation: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (t) {
        var e = t.latitude, a = t.longitude;
        t.speed, t.accuracy;
        console.log(e), console.log(a);
        var n = a + "," + e;
        
      }
    });
  },
 
})
