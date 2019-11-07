//index.js
//获取应用实例，专家首页
import { pages } from '../../../utils/tabbarContent.js'
const app = getApp()

Page({
  data: {
     pagesMenu: []
  },
  onLoad: function () {
    const userRole = wx.getStorageSync("userRole") || '1';//获取用户角色，决定显示哪个tabbar
    this.setData({
      pagesMenu : pages[userRole * 1]
    })
  },
 
 
})
