//filter.js
const app = getApp();
const appData = app.globalData;

function identityFilter(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow;
    pageObj.onShow = function () {
      

      //  不同权限跳转不同登录页
      const userData = wx.getStorageSync("userRole") || "0";
      switch (userData) {
       
        case "0":
          
            wx.redirectTo({
              url: '/pages/index/index',
            })
            return;
        
          break;
       
      }

    
    }
  }
  return pageObj;
}


exports.identityFilter = identityFilter;