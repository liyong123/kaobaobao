//app.js

//腾讯地图SDK的key: HEHBZ-WH5W4-RFNU7-XCQOS-LQ46T-HTFF6
App({
  onLaunch: function () {
   
  },
  globalData: {
    serverUrl: 'https://www.sanqieryi.net/app',
    zjzlUrl: '/news/list/', /*专家专栏*/
    zjzlNewUrl: '/news/listDetail/',
    zjzlDetailUrl: '/news/detail/',
    getOpenIdByCodeUrl: '/user/getOpenIdByCode/',
    addUserUrl: '/user/addUser',
    userInfoUrl: '/user/getUser',
    goodsTypeUrl: '/goods/goodsType',
    goodsListUrl: '/goods/goodsList/',
    goodsDetailUrl: '/goods/goodsDetail/',
    addGoodsCartUrl: '/goods/addGoodsCart',
    goodsCartListUrl: '/goods/goodsCartList',
    goodsCartNumberUrl: '/goods/goodsCartNumber/',
    deleteGoodsCartUrl: '/goods/deleteGoodsCart',
    addressDefaultUrl: '/address/default',
    liBudyOrderUrl: '/order/add',
    orderDetailUrl: '/order/detail/',
    addAddressUrl: '/address/add',
    addressListUrl: '/address/list',
    updateAddressUrl: '/order/updateAddress',
    addressDeleteUrl: '/address/delete/',
    addressDetailUrl: '/address/detail/',
    modifyAddressUrl: '/address/modify',
    prepayUrl: '/pay/prepay/',
    addCommentUrl: '/order/addComment',
    orderListUrl: '/order/list/',
    orderCloseUrl: '/order/close/',
    orderConfirmUrl: '/order/confirm/',
    userAgentAgreeUrl: '/user/agentAgree',
    userApplyAgentUrl: '/user/applyAgent', 
    uploadOssFileUrl: '/user/uploadOssFile',
    userApplyExpertUrl: '/user/applyExpert',
    getTestInfoByTypeUrl: '/question/getTestInfoByType/',
    getQuestionsUrl: '/question/getQuestions/',
    finishSingleUrl: '/question/finishSingle',
   
    
    
    userInfo: null,
  }

})