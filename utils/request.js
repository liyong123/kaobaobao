module.exports = {
  //post请求
	requestPost: function (obj) {
    let copy = {};
    Object.assign(copy, obj);
    copy.method = 'POST';
    copy.header = obj.header || {
      'content-type': 'application/json'
    };
    //TODO 前端判断token是否存在
    try {
      const openId = wx.getStorageSync('openid');
      if (openId) {
        copy.header.openId = openId;
      }
    } catch (e) {
      console.log("openIdError：", e)
    }
    copy.success = function (res) {

      let title = res.data.message || '出错...';
      //接口状态判断
      switch (res.statusCode) {
        case 200:
          if (res.data.code === "200") {
            obj.success(res.data);
          } else if (res.data.code === "403") {
            wx.showToast({
              title: '请登录...',
              icon: 'none',
              duration: 2000
            });
          } else if (res.data.code === "404") {
            wx.showToast({
              title: '接口未找到...',
              icon: 'none',
              duration: 2000
            });
          } else if (res.data.code === '500') {
            if (obj.fail) {
              obj.fail(res)
            } else {
              wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000
              });
            }
          }
          break;
        case 403:
          wx.showToast({
            title: '请登录...',
            icon: 'none',
            duration: 2000
          });
          break;
        case 500:
          wx.showToast({
            title: '服务器500',
            icon: 'none',
            duration: 2000
          });
          break;
        default:
          wx.showToast({
            title: '请求失败，请重试...',
            icon: 'none',
            duration: 2000
          });
      }
    };
    copy.fail = function (err) {
      if (obj.fail) {
        obj.fail && obj.fail(err);
      } else {
        if (err.data && err.data.message) {
          wx.showToast({
            title: err.data.message,
            icon: 'none',
            duration: 2000
          });
        }
      }
    };

    wx.request(copy);
  },

  //上传
  requestUpload: function (obj) {
    wx.showLoading({
      title: '上传中...'
    });
    let copy = {};
    Object.assign(copy, obj);
    copy.header = obj.header || {
     
    };

    try {
      const openId = wx.getStorageSync('openid');
      if (openId) {
        copy.header.openId = openId;
      }
    } catch (e) {
      console.log("openIdError：", e)
    }
    copy.success = function (res) {
      wx.hideLoading();
      switch (res.statusCode) {
        case 200:
        
          let data = JSON.parse(res.data);
          let title = data.message;
          if (data.code === "200") {
            obj.success(data);
          } else if (data.code === "403") {
            wx.showToast({
              title: '请登录...',
              icon: 'none',
              duration: 2000
            });
          } else if (data.code === "404") {
            wx.showToast({
              title: '接口未找到...',
              icon: 'none',
              duration: 2000
            });
          } else if (data.code === '500') {
            if (obj.fail) {
              obj.fail(res)
            } else {
              wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000
              });
            }
          }
          break;
        case 403:
          wx.showToast({
            title: '请登录...',
            icon: 'none',
            duration: 2000
          });
          break;
        case 500:
          wx.showToast({
            title: '服务器500',
            icon: 'none',
            duration: 2000
          });
          break;
        default:
          wx.showToast({
            title: '请求失败，请重试...',
            icon: 'none',
            duration: 2000
          });
      }
    };
    copy.fail = function (err) {
      wx.hideLoading();
      wx.showToast({
        title: '上传失败',
        icon: 'none',
        duration: 2000
      });
      obj.fail && obj.fail(err);
    };

    const uploadTask = wx.uploadFile(copy);
    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度' + res.progress);
      console.log('已经上传的数据长度' + res.totalBytesSent);
      console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
    });
  }
}