//index.js
//获取应用实例，首页
import { pages } from '../../utils/tabbarContent.js';
const _http = require('../../utils/request.js');
const app = getApp();
const zjzlUrl = app.globalData.serverUrl + app.globalData.zjzlUrl;
const userInfoUrl = app.globalData.serverUrl + app.globalData.userInfoUrl;

Page({
  data: {
    pagesMenu: [],
    // 轮播数据
    bannerData:[ 
     '../../image/banner_01.png',
     '../../image/banner_01.png',
     '../../image/banner_01.png',
     '../../image/banner_01.png' 
    ],
    indicatorDots: true,
    borderRaduis: true,
    daibiaoModuleData:[
      { name: '抗压训练', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_01.png' },
      { name: '考试放松', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_02.png' },
      { name: '专注力训练', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_03.png' },
      { name: '答题技巧', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_04.png' },
      { name: '高分陪读', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_05.png' },
      { name: '学长陪伴', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_06.png' },
      { name: '适应力训练', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_07.png' },
      { name: '考场保障', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_08.png' },
      { name: '高中保障', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_09.png' },
      { name: '综合服务', linkUrl: '/pages/user/index', imgUrl: '../../image/daibiao_module_10.png' }
    ],
    // 专家专栏
    expertDatas:[
      
    ],
    zhuajiaMessageWidth: (wx.getSystemInfoSync().windowWidth - 120) + "px",
    scrollX: true,
    scrollList: [
      { imgUrl: "../../image/scroll_view_home_01.png", name: "心理调节", type: 1 },
      { imgUrl: "../../image/scroll_view_home_02.png", name: "学习规划", type: 2 },
      { imgUrl: "../../image/scroll_view_home_03.png", name: "身体状态", type: 3 },
      { imgUrl: "../../image/scroll_view_home_04.png", name: "家长保障", type: 4 },
    ],
  

  },
  onLoad: function () {
    var _this = this;
    const openId = wx.getStorageSync("openid");
    if(openId) {
      _http.requestPost({
        url: userInfoUrl,
        success: res => {
          const userType = res.data && res.data.userType && res.data.userType || 1;
          _this.setData({
            pagesMenu: pages[userType * 1 - 1]
          })

        }
      })
    }else {
      _this.setData({
        pagesMenu: pages[0]
      })
    }
    
    
    
  },
  onShow: function(){
    var _this =this;
    const params = 1 
    _http.requestPost({
      url: zjzlUrl + params ,
      success: res => {
        const data = res.data;
        _this.setData({
            expertDatas: data
        })
        
      }
    })
  },

  toCeshiModuleHome: function(e) {

    const type = e.currentTarget.dataset.type;
    if(type == 1) {
      wx.navigateTo({
        url: '/pages/wenjuanIndex/xinli/index?type=' + type,
      })
    }else if(type == 2) {
      wx.navigateTo({
        url: '/pages/wenjuanIndex/xueye/index?type=' + type,
      })
    } else if (type == 3) {
      wx.navigateTo({
        url: '/pages/wenjuanIndex/yingyang/index?type=' + type,
      })
    }
    
  }


 
 
})
