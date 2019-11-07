const App = getApp();
Component({

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    placeholder: String
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /**
     * 跳转到搜索页面
     */
    onTargetSearch(e) {
      wx.navigateTo({
        url: '',
      })
    },
  }

})