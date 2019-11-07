// pages/shop/index.js
import { pages } from '../../utils/tabbarContent.js'
const app = getApp()
const _http = require('../../utils/request.js');
const goodsTypeUrl = app.globalData.serverUrl + app.globalData.goodsTypeUrl;
const userInfoUrl = app.globalData.serverUrl + app.globalData.userInfoUrl;
const goodsListUrl = app.globalData.serverUrl + app.globalData.goodsListUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagesMenu: [],
    tabqieCurrentTab: 0,
    scrollData:[],
    currentTab: 0,
    dictType: "1",
    keyWords: "",
    page: 1,
    pageSize: 6,
    dataIsEnd: false,
    goodsData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    const openId = wx.getStorageSync("openid");
    if (openId) {
      //获取用户角色接口
      _http.requestPost({
        url: userInfoUrl,
        success: res => {
          const userType = res.data && res.data.userType && res.data.userType || 1;
          _this.setData({
            userType: userType,
            pagesMenu: pages[userType * 1 - 1]
          })

        }
      })
    } else {
      _this.setData({
        pagesMenu: pages[0]
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
    var _this = this;
    // 商品类型
    _http.requestPost({
      url: goodsTypeUrl,
      success: res => {
        const scrollData = res.data;
        _this.setData({
          scrollData: scrollData
        })

      }
    })


    _this.getGoodsList()
  },

  //商品列表
  getGoodsList: function () {
    var _this = this;
    const pageSize = _this.data.pageSize;
    let {
      page,
      keyWords,
    } = _this.data;

    let params = {
      keyWords,
      type: _this.data.dictType,
    }
    _http.requestPost({
      url: goodsListUrl + page,
      data: params,
      success: res => {
        const dataList = res.data;
        if(page == 1) {
          _this.setData({
            goodsData: dataList,
            dataIsEnd: dataList.length < pageSize
          },()=>{

          })
        }else {
          _this.setData({
            goodsData: _this.data.goodsData.concat(dataList),
            dataIsEnd: dataList.length < pageSize
          })
        }

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
      //todo：分页处理，触底page +1，访问接口，得到的数据contact到旧数据上。
     var _this =this;
    if (_this.data.dataIsEnd) return
     _this.setData({
       page: _this.data.page +1
     },()=> {
       _this.getGoodsList()
     })

     


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取tabqie子组件的 currentTab值
  onMyEvent: function(e) {
    this.setData ({
      tabqieCurrentTab: e.detail
    })
    console.log(this.data.tabqieCurrentTab)
    var cTab = this.data.tabqieCurrentTab;
    //todo: 访问接口，cTab 为参数;
  },

  tabChange: function (e) {
    const dictType = e.currentTarget.dataset.dicttype;
    var _this = this;
    _this.setData({
      currentTab: e.currentTarget.dataset.tab,
      dictType: dictType,
      page: 1
    },()=> {
      _this.getGoodsList()
    });
  }
})