// component/ascdes/ascdes.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pro:String
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
    listSort: {
      registeredAssetsDefault: {
        type: 'desc'
      },
      registeredAssets: {
        type: 'desc'
      },
      staffSize: {
        type: 'icon'
      },
      annualSales: {
        type: 'icon'
      }
    },
    sortStatusList: {
      registeredAssetsDefault: true,
      registeredAssets: true,
      staffSize: false,
      annualSales: false
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 专家排序   registeredAssets2:默认排序  staffSize2:职称  annualSales2:综合得分
    // 供应商排序   registeredAssets2:注册资本  staffSize2:人员规模  annualSales2:年营业额
    sortRegisteredAssets: function (event) {
      const that = this;
      const sortType = event.currentTarget.dataset.sortType;
      let currentType;

      if (this.data.listSort[sortType].type === 'icon') {
        currentType = 'desc';
      } else if (this.data.listSort[sortType].type === 'desc') {
        currentType = 'asc';
      } else if (this.data.listSort[sortType].type === 'asc') {
        currentType = 'desc';
      };
      //判断升降序图标
      this.data.listSort[sortType].type = currentType;
      // console.log(sortType); currentType
      if (sortType === 'registeredAssets') {
        that.setData({
          listSort: {
            registeredAssetsDefault: {
              type: 'desc'
            },
            registeredAssets: {
              type: currentType
            },
            staffSize: {
              type: 'icon'
            },
            annualSales: {
              type: 'icon'
            }
          },
        });
      } else if (sortType === 'staffSize') {
        that.setData({
          listSort: {
            registeredAssetsDefault: {
              type: 'desc'
            },
            registeredAssets: {
              type: 'icon'
            },
            staffSize: {
              type: currentType
            },
            annualSales: {
              type: 'icon'
            }
          },
        });
      } else if (sortType === 'annualSales') {
        that.setData({
          listSort: {
            registeredAssetsDefault: {
              type: 'desc'
            },
            registeredAssets: {
              type: 'icon'
            },
            staffSize: {
              type: 'icon'
            },
            annualSales: {
              type: currentType
            }
          },
        });
      } else if (sortType === 'registeredAssetsDefault') {
        that.setData({
          listSort: {
            registeredAssetsDefault: {
              type: currentType
            },
            registeredAssets: {
              type: 'icon'
            },
            staffSize: {
              type: 'icon'
            },
            annualSales: {
              type: 'icon'
            }
          },
        });
      }

      let sortStatusList = this.data.sortStatusList;
      let itemStatus;
      for (itemStatus in sortStatusList) {
        if (itemStatus === sortType) {
          sortStatusList[itemStatus] = true;
        } else {
          sortStatusList[itemStatus] = false;
        }
      }
      that.setData({
        sortStatusList
      });
      //判断点击的是哪个排序,访问接口，获取列表数据
      // var rank = "";
      // if (sortType == "registeredAssets") {
      //   rank = "0";
      // } else if (sortType == "staffSize") {
      //   rank = "1"
      // } else if (sortType == "annualSales") {
      //   rank = "2"
      // } else if (sortType == "registeredAssetsDefault") {
      //   //点击专家的默认排序，搜素框清空
      // if (that.data.currentTab == 1) {
      //     that.setData({
      //       keyWord: ""
      //     })
      //   }
      // }
      // var order = "";
      // var orderNow = this.data.listSort[sortType].type;
      // if (orderNow == "desc") {
      //   order = "1";
      // } else if (orderNow == "asc") {
      //   order = "0"
      // }
      // that.setData({
      //   order: order,
      //   rank: rank,
      //   pageNum: 1
      // })
      //this.byUrlLoadData()
    },
  }
})
