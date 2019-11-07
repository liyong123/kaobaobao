// pages/user/sqzj/index.js
const App = getApp();
// 工具类
const _http = require('../../../utils/request.js');
const uploadUrl = App.globalData.serverUrl + App.globalData.uploadUrl;
const uploadOssFileUrl = App.globalData.serverUrl + App.globalData.uploadOssFileUrl;
const userApplyExpertUrl = App.globalData.serverUrl + App.globalData.userApplyExpertUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    zszm: "",
    zszm_add_show: true,
    zsfm: "",
    zsfm_add_show: true,
    grjl: "",
    grjl_add_show: true,
    jqzjz: "",
    jqzjz_add_show: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  uploadPic: function(e) {
    var that = this;
    const index = e.currentTarget.dataset.index
    
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {

          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _http.requestUpload({
            url: uploadOssFileUrl,
            filePath: tempFilePaths[0],
            name: "Img",
            // formData: {},
            success: (res) => {
              wx.showToast({
                title: '上传成功',
                icon: 'none',
                duration: 2000
              });

              if (index == 1) {
                that.setData({
                  zszm: res.data,
                  zszm_add_show: false
                })
              }else if (index == 2 ) {
                that.setData({
                  zsfm: res.data,
                  zsfm_add_show: false
                })
              } else if (index == 3) {
                that.setData({
                  grjl: res.data,
                  grjl_add_show: false
                })
              }else {
                that.setData({
                  jqzjz: res.data,
                  jqzjz_add_show: false
                })
              }
              
          
            }
          })
        }
      })
   
  },
  // 表单提交
  formSubmit: function (e) {
    var _this = this;
    const name = e.detail.value.userName,
      zszm = _this.data.zszm,
      zsfm = _this.data.zsfm,
      grjl = _this.data.grjl,
      jqzjz = _this.data.jqzjz
    if (name == "" || zszm == "" || zsfm == "" || grjl == "" || jqzjz == "" ) {
      wx.showToast({
        title: '请完善您的资料',
        icon: 'none',
        duration: 2000
      })

      return false 
    } 
    const params = {
      userName: name,
      certs: [ zszm, zsfm ],
      resumes: [ grjl ],
      idPhotos: [ jqzjz ]
    }
    
    _http.requestPost({
      url: userApplyExpertUrl,
      data: params,
      success: res => {
        wx.showToast({
          title: '提交成功！',
          icon: 'none',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/user/index',
        })

      }
    })
  },
})