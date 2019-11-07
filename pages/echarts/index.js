// pages/echarts/index.js
import * as echarts from "../../ec-canvas/echarts.js";
import geoJson from "./echartsNanJingDatas.js";
var app = getApp();
var chart = null;
//南京市地图echarts配置
var series = [{
  type: 'map',
  mapType: 'nanjing',
  name: "南京云集",
  left: 10,
  right: 0,
  top: 0,
  bottom: 0,
  silent: true,
  label: {
    show: true,
    color: '#fff',
    fontSize: 12,
  },
  itemStyle: {
    borderWidth: 1,
    borderColor: '#fff',
    areaColor: '#E1E1EB',
  },
  emphasis: {
    label: {
      color: '#fff'
    },
    itemStyle: {
      // areaColor: '#3D43E8',
        areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#79C1FF'
      }, {
        offset: 1,
        color: '#3D43E8'
      }]),
      borderWidth: 0
    }
  },
  animation: false,
  data: [{
    name: "市直属",
    value: "320101"
  },
  {
    name: "玄武区",
    value: "320102",
    label: {
      show: true,
      fontSize: 10
    }
  },
  {
    name: "秦淮区",
    value: "320104",
    label: {
      show: true,
      fontSize: 10
    }

  },
  {
    name: "建邺区",
    value: "320105",
    label: {
      show: true,
      fontSize: 10
    }
  },
  {
    name: "鼓楼区",
    value: "320106",
    label: {
      show: true,
      fontSize: 10
    }
  },
  {
    name: "浦口区",
    value: "320111"
  },
  {
    name: "栖霞区",
    value: "320113"
  },
  {
    name: "雨花台区",
    value: "320114",
    label: {
      show: true,
      fontSize: 10
    }
  },
  {
    name: "江宁区",
    value: "320115"
  },
  {
    name: "六合区",
    value: "320116"
  },
  {
    name: "溧水区",
    value: "320117"
  },
  {
    name: "高淳区",
    value: "320118"
  }
  ]
}];
//南京市地图初始化
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  echarts.registerMap('nanjing', geoJson);
  const option = {
    series: series
  };
  chart.setOption(option);
  return chart;
}

var chartBar = null;
var optionBar = {

  tooltip: {
    trigger: 'item',

  },
  grid: [{
    left: 0,
    right: 0,
    top: '5%',
    bottom: '8%',
    containLabel: true,
  }],
  dataset:{
    source: [
      ['<100', 43],
      ['100~200', 83],
      ['200~300', 86],
      ['>300', 72]
    ]
  },

  xAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#e9ebee',
      }
    },
    axisLabel: {
      color: '#839ef2',
      interval: 0,
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
  },
  series: [{
    type: 'bar',
    label: {
      show: true,
      position: 'insideTop',
      color: 'white',
    },
    itemStyle: {
      color: '#839ef2',
      barBorderRadius: 8,
    }
  }],

  animationType: 'scale',
  animationEasing: 'elasticOut',
  animationDelay: function (idx) {
    return Math.random() * 200;
  }
};

function initChartBar(canvas, width, height) {
  chartBar = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chartBar);
  chartBar.setOption(optionBar);
  return chartBar;
}

//饼图
var chartPie = null;
var optionPie = {
  color: ['#ffe066', '#f25f5c', '#247ba0', '#70c1b3', '#50514f', '#f4f1de', '#e07a5f', '#3d405b', '#81b29a', '#f2cc8f'],
  title: {
    left: '6%',
    top: '10%',
    textStyle: {
      color: '#5a5a5a',
      fontSize: 14,
    }
  },
  // tooltip: {
  //   trigger: 'item',
  //   formatter: "{a} <br/>{b} : {c} ({d}%)"
  // },

  series: [{
    type: 'pie',
    radius: ['40%', '60%'],
    center: ['50%', '50%'],
    data: [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 274, name: '联盟广告' },
      { value: 235, name: '视频广告' },
      { value: 400, name: '搜索引擎' }
    ],
    label: {
      normal: {
        fontSize: 14,
        lineHeight: 14,
        formatter: '{count|{c}}{normal|家}\n{d}%\n{name|{b}}',
        rich: {
          count: {
            color: '#5a5a5a',
            fontSize: 12,
          },
          normal: {
            color: '#999999',
            fontSize: 12,
          },
          name: {
            color: '#5a5a5a',
            fontSize: 12,
          }
        }
      }
    },
    labelLine: {
      normal: {
        smooth: 0.2,
        length: 10,
        length2: 20
      }
    },

    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function (idx) {
      return Math.random() * 200;
    }
  }]
};

function initChartPie(canvas, width, height) {
  chartPie = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chartPie);
  chartPie.setOption(optionPie);
  return chartPie;
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearBoardShow: false,
    currentYear: '',
    yearGrps: [],
    eachAreaDatas: [],
    currentArea: -1,
    currentTab: 0,
    mainContentHight: (wx.getSystemInfoSync().windowHeight - 275 * (wx.getSystemInfoSync().windowWidth / 750)) + "px",
    boardShow: false,
    boardDatas: [],
    boardDataReady: false,
    boardAreaName: '',
    alreadyDeal: "--",
    totalBuild: "--",
    buildIn: "--",
    alreadyPass: "--",
    purchaseNum: "--",
    dealMoney: "--",
    proportion: "--",
    boardPositionLeft: 0 + "rpx",
    boardPositionTop: 0 + "rpx",
    boardArrowShow: true,
    boardArrowBottomShow: true,
    mapContentTop: ((wx.getSystemInfoSync().windowHeight - 275 * (wx.getSystemInfoSync().windowWidth / 750)  - 180 * (wx.getSystemInfoSync().windowWidth / 750)) / 2) + (180 * (wx.getSystemInfoSync().windowWidth / 750)) + "px",
    eachAreaTop: ((wx.getSystemInfoSync().windowHeight - 275 * (wx.getSystemInfoSync().windowWidth / 750)  - 180 * (wx.getSystemInfoSync().windowWidth / 750)) / 2) + (180 * (wx.getSystemInfoSync().windowWidth / 750)),
    ec: {
      onInit: initChart
    },
    ecBar: {
      onInit: initChartBar,
    },
    ecPie: {
      onInit: initChartPie,
    },
    ecPie: {
      onInit: initChartPie,
    },
    totalCount: {
      allCount: "21",
      auditCount: "32",
      govCount: "43"
    },
    staffData: [
      { name: 'sss', count: '223' }
    ],
    
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
    var that = this;
    //进入页面滚到页面顶部
    wx.pageScrollTo({
      scrollTop: 0,
    });
    that.setData({
      cityTabDatas: [{
        title: "全市总投入"
      },
      {
        title: "全市总建设"
      },
      {
        title: "供应商概览"
      }
      ],
      yearGrps: [
        { year: "2019" }
      ],
      eachAreaDatas: [{
        name: "市直属",
        value: "320101",
        namePinyin: "SHIZHISHU"
      },
      {
        name: "玄武区",
        value: "320102",
        namePinyin: "XUANWU"
      },
      {
        name: "秦淮区",
        value: "320104",
        namePinyin: "QINHUAI"
      },
      {
        name: "建邺区",
        value: "320105",
        namePinyin: "JIANYE"
      },
      {
        name: "鼓楼区",
        value: "320106",
        namePinyin: "GULOU"
      },
      {
        name: "浦口区",
        value: "320111",
        namePinyin: "PUKOU"
      },
      {
        name: "栖霞区",
        value: "320113",
        namePinyin: "QIXIA"
      },
      {
        name: "雨花台区",
        value: "320114",
        namePinyin: "YUHUATAI"
      },
      {
        name: "江宁区",
        value: "320115",
        namePinyin: "JIANGNING"
      },
      {
        name: "六合区",
        value: "320116",
        namePinyin: "LIUHE"
      },
      {
        name: "溧水区",
        value: "320117",
        namePinyin: "LISHUI"
      },
      {
        name: "高淳区",
        value: "320118",
        namePinyin: "GAOCHUN"
      }
      ],
    });
    
    var date = new Date();
    var currentYear = date.getFullYear();
    var yearGrpsCopy = that.data.yearGrps.slice();
    that.setData({
      currentYear: currentYear
    });

    for (var i = 0; i < parseInt(that.data.currentYear - 2018); i++) {
      yearGrpsCopy.push({ year: (2019 + i + 1).toString() })
    }
    that.setData({
      yearGrps: yearGrpsCopy
    })

    if (that.data.currentTab == 0) {
      that.getCityLeaderIndexTotalMoneyDatas(that);
      that.getDityLeaderIndexAreaDatas(that);
    } else if (that.data.currentTab == 1) {
      that.getCityLeaderIndexTotalBuildDatas(that);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.resetMap()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.resetMap()
  },
 
  resetMap() {
    this.setData({
      currentArea: -1,
    })
    //恢复地图
    var mapDatas = series[0].data;
    for (var i = 0; i < mapDatas.length; i++) {
      mapDatas[i].selected = false
    }
    chart.setOption({
      series: series
    })
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
  //选择年份
  chooseYearEvent: function (e) {
    var that = this;
    var yearBoardShow = that.data.yearBoardShow;
    yearBoardShow = !yearBoardShow;
    that.setData({
      yearBoardShow: yearBoardShow
    })
  },
  //年份切换
  clickYearEvent: function (e) {
    var that = this;
    that.setData({
      currentYear: e.currentTarget.dataset.yearindex
    })
    if (that.data.currentTab == 0 || that.data.currentTab == 1) {
      that.setData({
        boardDatas: [],
        totalMoney: "--",
        totalBuild: "--",
        purchaseIn: "--",

        buildIn: "--",
        alreadyDeal: "--",
        alreadyPass: "--",

        purchaseNum: "--",
        dealMoney: "--",
        proportion: "--",
        boardShow: false,
      });

      // 根据currentTab 值，访问相应的接口
      if (that.data.currentTab == 0) {
        that.getCityLeaderIndexTotalMoneyDatas(that);
        that.getDityLeaderIndexAreaDatas(that);
      } else if (that.data.currentTab == 1) {
        that.getCityLeaderIndexTotalBuildDatas(that);
      } else {
        that.setData({
          boardDatas: []
        })
      }
    } else if (that.data.currentTab == 2) {
      that.fetchOverviewData();
    }
  },
  //“全市总投入”...tab切换
  tabChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.citytab,
      currentArea: -1,
      boardShow: false,
    })
    //tab切换恢复地图
    this.resetMap();
    if (that.data.currentTab == 0 || that.data.currentTab == 1) {
      that.setData({
        boardDatas: [],
        totalMoney: "--",
        totalBuild: "--",
        purchaseIn: "--",

        buildIn: "--",
        alreadyDeal: "--",
        alreadyPass: "--",

        purchaseNum: "--",
        dealMoney: "--",
        proportion: "--",
      });

      // 根据currentTab 值，访问相应的接口
      if (that.data.currentTab == "0") {
        that.getCityLeaderIndexTotalMoneyDatas(that);
        that.getDityLeaderIndexAreaDatas(that);
      } else if (that.data.currentTab == "1") {
        that.getCityLeaderIndexTotalBuildDatas(that);
      } else {
         that.setData({
           boardDatas: []
         })
      }
    } else if (that.data.currentTab == 2) {
      //that.fetchOverviewData();
    }
  },
  //currentTab==0时，获取全市总投入接口
  getCityLeaderIndexTotalMoneyDatas: function (that) {
    let moneyParams = {
      flagYear: that.data.currentYear
    }
    wx.stopPullDownRefresh();
    that.setData({
      totalMoney: 1000,
      purchaseIn: 2000,
      alreadyDeal: 3000
    })
    
  },
  //currentTab==0时，获取弹出面板上要展示的各区的数据
  getDityLeaderIndexAreaDatas: function (that) {
    let dataTotal = [
      {
        pcount: "12",
        purchase_dea_price: "7867",
        area_pur_dea_per: "30",
        area_code: "320101",
        total: "43",
        proportion: "18"
      },
      {
        pcount: "13",
        purchase_dea_price: "4532",
        area_pur_dea_per: "30",
        area_code: "320102",
        total: "33",
        proportion: "18"
      },
      {
        pcount: "15",
        purchase_dea_price: "467",
        area_pur_dea_per: "30",
        area_code: "320104",
        total: "13",
        proportion: "18"
      },
      {
        pcount: "42",
        purchase_dea_price: "67",
        area_pur_dea_per: "30",
        area_code: "320105",
        total: "63",
        proportion: "18"
      },
      {
        pcount: "17",
        purchase_dea_price: "7567",
        area_pur_dea_per: "30",
        area_code: "320106",
        total: "63",
        proportion: "18"
      },
      {
        pcount: "34",
        purchase_dea_price: "3333",
        area_pur_dea_per: "30",
        area_code: "320111",
        total: "83",
        proportion: "18"
      },
      {
        pcount: "45",
        purchase_dea_price: "12",
        area_pur_dea_per: "30",
        area_code: "320113",
        total: "93",
        proportion: "18"
      },
      {
        pcount: "43",
        purchase_dea_price: "12",
        area_pur_dea_per: "30",
        area_code: "320114",
        total: "46",
        proportion: "18"
      },
      {
        pcount: "67",
        purchase_dea_price: "7867",
        area_pur_dea_per: "30",
        area_code: "320115",
        total: "56",
        proportion: "18"
      },
      {
        pcount: "56",
        purchase_dea_price: "7867",
        area_pur_dea_per: "30",
        area_code: "320116",
        total: "76",
        proportion: "18"
      },
      {
        pcount: "24",
        purchase_dea_price: "7867",
        area_pur_dea_per: "30",
        area_code: "320117",
        total: "3",
        proportion: "18"
      },
      {
        pcount: "57",
        purchase_dea_price: "7867",
        area_pur_dea_per: "30",
        area_code: "320118",
        total: "44",
        proportion: "18"
      }
    ];
   
    that.setData({
      boardDatas: dataTotal,
      boardDataReady: true
    })
    
  },
  //currentTab==1时，获取总建设接口
  getCityLeaderIndexTotalBuildDatas: function (that) {
    that.setData({
      totalBuild:"100",
      buildIn: "80",
      alreadyPass: "20"
    });


    let dataTotal = [
      {
        area_code: "320101",
        total: "43",
        proportion: "18"
      },
      {
        area_code: "320102",
        total: "33",
        proportion: "18"
      },
      {
        area_code: "320104",
        total: "13",
        proportion: "18"
      },
      {
        area_code: "320105",
        total: "63",
        proportion: "18"
      },
      {
        area_code: "320106",
        total: "63",
        proportion: "18"
      },
      {
        area_code: "320111",
        total: "83",
        proportion: "18"
      },
      {
        area_code: "320113",
        total: "93",
        proportion: "18"
      },
      {
        area_code: "320114",
        total: "46",
        proportion: "18"
      },
      {
      
        area_code: "320115",
        total: "56",
        proportion: "18"
      },
      {
     
        area_code: "320116",
        total: "76",
        proportion: "18"
      },
      {
     
        area_code: "320117",
        total: "3",
        proportion: "18"
      },
      {
     
        area_code: "320118",
        total: "44",
        proportion: "18"
      }
    ];

    that.setData({
      boardDatas: dataTotal,
      boardDataReady: true
    })
  },

  //点击屏幕其他位置，面板消失
  hideMapBoardModal: function (e) {
    var that = this;
    that.setData({
      boardShow: false
    })
    this.resetMap()
  },
  hideMapBoardModal2: function (e) {
    console.log("e2:", e)
  },
  // 点击各区域
  areaTabChange: function (e) {
    if (this.data.boardDataReady) {
      this._areaTabChange(e);
    } else {
      setTimeout(() => {
        this.areaTabChange(e)
      }, 100)
    }
  },
  _areaTabChange: function (e) {
    
    var that = this;
    that.setData({
      currentArea: e.currentTarget.dataset.areatab
    });
    var currentArea = that.data.currentArea;
    console.log(currentArea)
    var eachAreaDatas = that.data.eachAreaDatas;
    var mapDatas = series[0].data;
  
    for (var i = 0; i < eachAreaDatas.length; i++) {
      if (currentArea == i) {
        mapDatas[i].selected = true
      } else {
        mapDatas[i].selected = false
      }
    }
    chart.setOption({
      series: series
    })
   
    var choosedCode = eachAreaDatas[currentArea].value;
    var choosedName = eachAreaDatas[currentArea].name;
    var choosedNamePinyin = eachAreaDatas[currentArea].namePinyin;
    var boardDataAll = that.data.boardDatas;
    //弹出面板
    that.setData({
      boardShow: true,
      boardAreaName: choosedName + " " + choosedNamePinyin,
    });
    //匹配弹框位置
    switch (choosedName) {
      case "市直属":
        that.setData({
          boardArrowShow: false,
          boardArrowBottomShow: false,
          boardPositionLeft: 380 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 150 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "玄武区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 240 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 150 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "秦淮区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 236 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 180 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "建邺区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 192 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 170 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "鼓楼区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 200 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 140 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "浦口区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 160 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 160 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "栖霞区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 350 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 110 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "雨花台区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 210 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 190 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "江宁区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 320 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 175 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "六合区":
        that.setData({
          boardArrowShow: true,
          boardArrowBottomShow: false,
          boardPositionLeft: 310 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 35 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "溧水区":
        that.setData({
          boardArrowShow: false,
          boardArrowBottomShow: true,
          boardPositionLeft: 364 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 80 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      case "高淳区":
        that.setData({
          boardArrowShow: false,
          boardArrowBottomShow: true,
          boardPositionLeft: 364 + "rpx",
          boardPositionTop: (that.data.eachAreaTop + 170 * (wx.getSystemInfoSync().windowWidth / 750)) + "px"
        });
        break;
      default:
        break;
    }
    if (boardDataAll.length > 0) {
      
      for (let eachData of boardDataAll) {
        if (that.data.currentTab == 0) {
          if (eachData.area_code == choosedCode) {
            that.setData({
              purchaseNum: eachData.pcount ? (eachData.pcount + "家") : "暂无",
              dealMoney: eachData.purchase_dea_price ? (eachData.purchase_dea_price + "元") : "暂无",
              proportion: eachData.area_pur_dea_per ? (eachData.area_pur_dea_per + "%") : "暂无"
            })
            return
          } else {
            that.setData({
              purchaseNum: "暂无",
              dealMoney: "暂无",
              proportion: "暂无"
            })
          }
        } else if (that.data.currentTab == 1) {
          if (eachData.area_code == choosedCode) {
            that.setData({
              purchaseNum: eachData.total && eachData.total != "" ? (eachData.total + "个") : eachData.total === 0 ? "0" : "暂无",
              proportion: eachData.proportion && eachData.proportion != "" ? (eachData.proportion + "%") : eachData.proportion === 0 ? "0%" : "暂无"
            })
            return
          } else {
            that.setData({
              purchaseNum: "暂无",
              proportion: "暂无"
            })
          }
        }
      }
    } else {
      that.setData({
        purchaseNum: "暂无",
        dealMoney: "暂无",
        proportion: "暂无"
      })
    }
  },

  coloseBoard: function () {
    // var that = this;
    // if (this.data.currentTab == 2) return;
    // var index = that.data.currentArea; //选中的区
    // var currentTab = that.data.currentTab; //头部tab值
    // var currentYear = that.data.currentYear;
    // if (index == -1) {
    //   index = 0
    // }
    // if (that.data.currentTab == 0 || that.data.currentTab == 1) {
    //   wx.navigateTo({
    //     url: './cityLeaderArea?index=' + index + "&currentTab=" + currentTab + "&currentYear=" + currentYear
    //   })
    // }
    // that.setData({
    //   boardShow: false,
    //   yearBoardShow: false
    // })
  },
})