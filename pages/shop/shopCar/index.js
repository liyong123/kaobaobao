// pages/shop/confirmOrders/index.js
const app = getApp()
const _http = require('../../../utils/request.js');
const goodsCartListUrl = app.globalData.serverUrl + app.globalData.goodsCartListUrl;//购物车清单
const goodsCartNumberUrl = app.globalData.serverUrl + app.globalData.goodsCartNumberUrl;//更新购物车某件商品的数量
const deleteGoodsCartUrl = app.globalData.serverUrl + app.globalData.deleteGoodsCartUrl; //删除购物车商品
const liBudyOrderUrl = app.globalData.serverUrl + app.globalData.liBudyOrderUrl;//去结算
const newAb = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    totalPrice: 0,
    totalNumber: 0,
    idPriceNumberArr: [],
    editIndex: 0,
    delBtnWidth: 60//删除按钮宽度单位（px）
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
    this.getGoodsList();
    
  },
   // 购物车商品列表
  getGoodsList: function() {
     var _this = this;
     _this.setData({
       goodsData: []
     })
     _http.requestPost({
       url: goodsCartListUrl,
       success: res => {
         const data = res.data;
         _this.setData({
           goodsData: data.items
         })

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
  // 选择商品
  checkboxChange: function(e) {
   
   var _this = this;
   // 每次点击，清空 idPriceNumberArr
   _this.setData({
     idPriceNumberArr: []
   })
   const choosedIdArr = e.detail.value,
   goodsData = _this.data.goodsData,
   idPriceNumberArr= _this.data.idPriceNumberArr;
  //  console.log("value:", choosedIdArr)
    // 每次点击 所有项的checked= false;
    for (var k = 0; k < goodsData.length; k++) {
      goodsData[k].checked = false;
    }
    _this.setData({
      goodsData: goodsData,
    })
    
   if(choosedIdArr.length > 0) {
      // 每次点击筛选出 所选项 及其主要数据
      for(var i= 0; i< choosedIdArr.length; i++) {
        for (var j = 0; j < goodsData.length; j++ ) {
           if (choosedIdArr[i] == goodsData[j].id) {

             let newObj = {
               id: goodsData[j].id,
               price: goodsData[j].price,
               number: goodsData[j].number,
               specIds: goodsData[j].specIds
             }
             idPriceNumberArr.push(newObj);
             goodsData[j].checked = true;//选中项 checked= true
           }
        }
      }
    
      _this.setData({
        goodsData: goodsData,
        idPriceNumberArr: idPriceNumberArr
      })
     

   }else {
     _this.setData({
       totalPrice: 0,
       idPriceNumberArr: choosedIdArr
     })
   }

  //  console.log("idPriceNumberArr:", _this.data.idPriceNumberArr) 
  //  console.log("goodsData:", goodsData)
   _this.getTotalPrice();
   
  },
  // 商品数量变化时也要改变idPriceNumberArr
  byNumberChange: function () {
    var _this = this;
    const idArr = _this.data.idPriceNumberArr,
    goodsData = _this.data.goodsData;
    if (idArr.length>0) {
      for (var i = 0; i < idArr.length; i++) {
         for (var j = 0; j < goodsData.length; j++) {
           if (idArr[i].id == goodsData[j].id) {
              idArr[i].number = goodsData[j].number
           }
         }
       }
      _this.setData({
        idPriceNumberArr: idArr,
      })
      //计算总价
      _this.getTotalPrice()
    }else {
      _this.setData({
        idPriceNumberArr: [],
      })
    }
   
  },
  // 计算总价,总量
  getTotalPrice: function() {
    var _this = this;
    _this.setData({
      totalPrice: 0,
      totalNumber: 0
    })
    const idArr = _this.data.idPriceNumberArr;
    var totalPrice = _this.data.totalPrice;
    var totalNumber = _this.data.totalNumber;
    for(var i = 0; i< idArr.length; i++) {
      // todo: 浮点数相乘 不精确问题
      var onePrice = (parseFloat(idArr[i].price)*100) * parseFloat(idArr[i].number);
      totalPrice += onePrice;
      totalNumber += idArr[i].number
    }
   totalPrice = (totalPrice/100).toFixed(2)
    _this.setData({
      totalPrice:totalPrice,
      totalNumber: totalNumber
    })
  },

  // 更新购物车某件商品的数量
  updateGoodsNumber: function(id,number) {
    var _this = this;
    _http.requestPost({
      url: goodsCartNumberUrl + id + "/" + number,
      success: res => {
       
      }
    })

  },
  /**
   * 增加商品数量
   */
  onIncGoodsNumber(e) {
    let _this = this;
    const id = e.currentTarget.dataset.goodsid;
    const goodsData = _this.data.goodsData; /*所有商品*/
    for (var i = 0; i < goodsData.length; i++) {
      if ((id == goodsData[i].id)) {
        ++goodsData[i].number;
        _this.updateGoodsNumber(id, goodsData[i].number)
        _this.setData({
          goodsData: goodsData
        })
      }
    }


    _this.byNumberChange();
  },

  /**
   * 减少商品数量
   */
  onDecGoodsNumber(e) {
    let _this = this;
    const id = e.currentTarget.dataset.goodsid;
    const goodsData = _this.data.goodsData; /*所有商品*/
    for(var i = 0; i < goodsData.length; i++) {
       if((id == goodsData[i].id) && goodsData[i].number > 1) {
          --goodsData[i].number ;
         _this.updateGoodsNumber(id, goodsData[i].number)
          _this.setData({
            goodsData: goodsData
          })  
       }
    }

    _this.byNumberChange()
   
  },

  /**
   * 自定义输入商品数量
   */
  onInputGoodsNum(e) {
    let _this = this,
      iptValue = parseInt(e.detail.value),
      id = e.currentTarget.dataset.goodsid,
      goodsData = _this.data.goodsData;
    for (var i = 0; i < goodsData.length; i++) {
      if (id == goodsData[i].id) {
        goodsData[i].number = /(^[1-9]\d*$)/.test(iptValue) ? iptValue : goodsData[i].number;
        _this.updateGoodsNumber(id, goodsData[i].number)
        _this.setData({
          goodsData: goodsData
        })
      }
    }

    _this.byNumberChange()
    //  console.log("idPriceNumberArr2:", _this.data.idPriceNumberArr) 
  },

  //手指刚放到屏幕触发
  touchS: function (e) {
    // console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    // console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.goodsData;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        goodsData: list
      });
    }
  },
  touchE: function (e) {
    // console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" + ";" + "right:" + delBtnWidth + "px" : "left:0";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.goodsData;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        goodsData: list
      });
    } 
  },
  // 点击 商品图片返回 商品详情页面
  backGoodsDetail :function(e) {
    const goodsId = e.currentTarget.dataset.imagegoodsid;
    wx.navigateTo({
      url: '/pages/shop/goodsDetail/index?id=' + goodsId,
    })
     
  },
  // 删除商品
  delAddress: function(e) {
    var _this = this;
    const id = e.currentTarget.dataset.goodsid;

    _http.requestPost({
      url: deleteGoodsCartUrl,
      data:[id],
      success: res => {
        wx.showToast({
          title: '删除成功...',
          icon: 'none',
          duration: 2000
        });
        //重新获取商品列表
        // _this.getGoodsList()
        // 注意异步问题，必须在获取列表成功后 ，success里面的代码才能执行！！！！
        _http.requestPost({
          url: goodsCartListUrl,
          success: result => {
            const dataList = result.data;
            _this.setData({
              goodsData: dataList.items
            })

            const goodsData = _this.data.goodsData;
            const idPriceNumberArr = _this.data.idPriceNumberArr

            if (idPriceNumberArr.length > 0) {
              for (var i = 0; i < idPriceNumberArr.length; i++) {
                if (id == idPriceNumberArr[i].id) {
                  idPriceNumberArr.splice(i, 1)
                }
              }

              _this.setData({
                idPriceNumberArr: idPriceNumberArr
              })
              _this.getTotalPrice();

            }
            // console.log("idPriceNumberArrDel:", _this.data.idPriceNumberArr);
            //删除某一项，重新获取商品列表后，之前选择的商品 还要保持选择状态
            let idPriceNumberArrNew = _this.data.idPriceNumberArr,
              goodsDataNew = _this.data.goodsData;

            for (var k = 0; k < idPriceNumberArrNew.length; k++) {
              for (var j = 0; j < goodsDataNew.length; j++) {
                if (idPriceNumberArrNew[k].id == goodsDataNew[j].id) {
                  goodsDataNew[j].checked = true;//选中项 checked= true
                }
              }
            }
            _this.setData({
              goodsData: goodsDataNew,
            })
            // console.log("goodsNew:", _this.data.goodsData)
          }
        })
      }
    })
  },

  // 去结算
  goBuyOrder: function() {
    var _this = this;
    const idPriceNumberArr = _this.data.idPriceNumberArr;
    if(idPriceNumberArr.length < 1) {
      wx.showToast({
        title: '请选择您想购买的商品！',
        icon: 'none',
        duration: 2000
      });
    }else {
      let arrNew = []
      for (var i = 0; i < idPriceNumberArr.length; i++) {
        let objectNew = {
          goodsId: idPriceNumberArr[i].id,
          number: idPriceNumberArr[i].number,
          specIds: idPriceNumberArr[i].specIds
        }
        arrNew.push(objectNew)
      }
      let params = {
        isCard: "1",
        items: arrNew
      }
      // console.log("params:",params)
      _http.requestPost({
        url: liBudyOrderUrl,
        data: params,
        success: res => {
          const orderSeq = res.data
          wx.navigateTo({
            url: '/pages/shop/confirmOrders/index?orderSeq=' + orderSeq,
            success() {
               _this.setData({
                 totalPrice: 0,
                 totalNumber: 0
               })
            }
          });
        }
      })
    }
    
  }


  
})