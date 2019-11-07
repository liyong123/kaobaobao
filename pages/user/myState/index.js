// pages/user/myState/index.js
import * as echarts from "../../../ec-canvas/echarts.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecBar: {
      lazyLoad: true,
    },
    barData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.echartsComponnet = this.selectComponent('#mychart-volume-bar');
    this.getBarData(); //获取数据
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

  //获取数据
  getBarData: function(){
      var that = this;
      //todo 获取数据
      var datas= ["43", "83", "86", "75", "86"];
      that.data.barData= datas;
      that.initChartBar()
  },
  //初始化
  initChartBar: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption: function() {
    //柱状图配置
    var that = this;
    var optionBar = {
      tooltip: {
        trigger: 'item',
        show: false
      },
      grid: [{
        left: 0,
        right: 0,
        top: '5%',
        bottom: '8%',
        containLabel: true,
      }],
      xAxis: {
        type: 'category',
        data: ["睡眠", "精力", "压力", "焦虑", "心态"],
        axisLine: {
          lineStyle: {
            color: '#e9ebee',
          }
        },
        axisLabel: {
          color: '#000',
          interval: 0,
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
           lineStyle: {
             color: "#eee"
           }
        },
        splitNumber: '11',
        max:'100',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#000',
          interval: 0,
        }
      },
      series: [{
        type: 'bar',
        data: that.data.barData,
        barWidth: 15,//柱图宽度
        label: {
          show: true,
          position: 'insideTop',
          color: 'white',
          fontSize: "10"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            offset: 0,
            color: '#fd7134'
          }, {
            offset: 1,
              color: '#f83748'
          }]),
          barBorderRadius: 0,
        }
      }],

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    };
    return optionBar
  },
  // 刷新数据
  updateBar: function() {
    this.getBarData()
  }
})