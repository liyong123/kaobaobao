// pages/wenjuan/index.js
// 答题要满足的功能：
// 1、可单选，可多选，2、可以回上一题回显，3、可以中途退出，下次进来接着上次地方从新做，4、每次点击下一题保存该题答案时，要把选中像的result和content返回，便于//及时修改testDatas便于回显

const app = getApp()
const _http = require('../../utils/request.js');
const getQuestionsUrl = app.globalData.serverUrl + app.globalData.getQuestionsUrl;
const finishSingleUrl = app.globalData.serverUrl + app.globalData.finishSingleUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    shiti_id: 0,
    lastOne: false,
    isFinished: false,
    testDatas: {},
    line_percent: 0,
    idArr: [], //记录 每一题的所选项的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const typeId = options.typeId;

    const type = options.testType;

    this.setData({
      typeId: typeId,
      testType: type
    })
    if (type == 1) {
      wx.setNavigationBarTitle({
        title: '心理调节测试'
      })
    } else if (type == 2) {
      wx.setNavigationBarTitle({
        title: '身体调节测试'
      })
    } else if (type == 3) {
      wx.setNavigationBarTitle({
        title: '学习规划测试'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '家长保障测试'
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
    var that = this;
    //todo: 访问试题接口...
    that.getTestDatas();
  },
  // 获取所有题目数据
  getTestDatas: function () {
    var _this = this;
    const typeId = _this.data.typeId;
    _http.requestPost({
      url: getQuestionsUrl + typeId,
      success: res => {
        const data = res.data,
          itemsAll = data.items,
          isFinish = data.isFinish;
        //  完成测试
        if (isFinish == 1) {
          _this.setData({
            isFinished: true
          })
          return false
        }
        for (var i = 0; i < itemsAll.length; i++) {

          if (itemsAll[i].result.length == 0) {
            _this.setData({
              shiti_id: i
            })
            break;
          }
        }
        _this.setData({
          testDatas: data,
        })
        _this.linePercent();

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //下一题
  nextQuestion: function () {
    var _this = this;
    const typeId = _this.data.typeId,
      questionId = _this.data.testDatas.items[_this.data.shiti_id].itemId,
      idArr = _this.data.idArr;
    if (idArr.length < 1) {
      wx.showToast({
        title: "请至少选择一个答案...",
        icon: 'none',
        duration: 2000
      });

      return false
    } else {
      const params = {
        typeId: typeId,
        questionId: questionId,
        result: idArr
      }
      // 每次做完一道题题 要把选项入库
      _http.requestPost({
        url: finishSingleUrl,
        data: params,
        success: res => {
          const data = res.data,//每次入库，要根据选项，返回 从新修改过的content和result，以便及时更改 testdatas，便于回显
            testType = _this.data.testType,
            testDatas = _this.data.testDatas;
          // data模拟数据如下:
          // data= {
          //    content: [
          //      { name: "尚好", checked: true, id: 5 },
          //      { name: "不好", checked: true, id: 6 },
          //      { name: "非常差", checked: true, id: 7 },
          //    ],
          //   result:["5", "6", "7"]
          // }
            
          //shiti_id 小于试题总数 才能点击下一题
          if (_this.data.shiti_id < testDatas.items.length - 1) {
            testDatas.items[_this.data.shiti_id].result = data.result;
            testDatas.items[_this.data.shiti_id].content = data.content;
            _this.setData({
              shiti_id: _this.data.shiti_id + 1,
              idArr: _this.data.testDatas.items[_this.data.shiti_id + 1].result,
              testDatas: testDatas
            });
          }
          if (data.isFinish && testType == 1) {
            wx.navigateTo({
              url: '/pages/wenjuanIndex/xinli/index?type=' + testType,
            })
          }
        }
      })
      _this.linePercent()
    }
  },
  //上一题 要回显值
  lastQuestion: function () {
    var _this = this;
    if (_this.data.shiti_id > 0) {
      _this.setData({
        shiti_id: _this.data.shiti_id - 1,
        idArr: _this.data.testDatas.items[_this.data.shiti_id - 1].result
      });
      _this.linePercent();
    }
  },
  //进度条
  linePercent: function () {
    var that = this;
    that.setData({
      line_percent: ((that.data.shiti_id + 1) / that.data.testDatas.items.length) * 100
    })
  },

  //点击表单
  formSubmit: function (e) {
    const params = e.detail.value;
  },
  // radio选择
  radioChange: function (e) {
    var _this = this;
    const choosedId = e.detail.value;
    console.log("radioChange choosedId:", choosedId)
    var idArr = new Array();
    idArr.push(choosedId)
    _this.setData({
      idArr: idArr
    })
  },

  // checkbox选择商品
  checkboxChange: function (e) {
    var _this = this;
    const choosedIdArr = e.detail.value;
    console.log("checkboxChange checkboxIdArr:", choosedIdArr)
    _this.setData({
      idArr: choosedIdArr
    })
  }
})