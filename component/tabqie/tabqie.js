// component/tabqie/tabqie.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabData: Array,
    iconImageShow: Object
  },
  options: {
    addGlobalClass: true,
  },

  ready() {
    
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabChange: function(e){
       this.setData({
         currentTab: e.currentTarget.dataset.tab
       });
      //向父页面传值：currentTab
      this.triggerEvent('myEvent', this.data.currentTab)
    }
  }
})
