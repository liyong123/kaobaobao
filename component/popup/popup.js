// component/popup.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMaskClick: function() {
      this.triggerEvent("close", {})
    }
  }
})
