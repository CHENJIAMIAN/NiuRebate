var app = getApp();

Page({
  data: {},
  onLoad() {},

  // .js 
  onGetAuthorize(res) {

    let memberId = app.globalData.memberId;

    console.log('======memberId:' + memberId);

     my.getOpenUserInfo({
      fail: (res) => {
      },
      success: (res) => {
        let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
        console.log(userInfo);
        

         var url = app.serverUrl + '/aliMember/baseInfo';
              my.request({
                  url: url,
                  method: 'POST', 
                  data: { 
                    userInfo:  JSON.stringify(userInfo),
                    memberId:memberId
                  },
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  success: function(resdata) {

                    if (resdata.data.code == 0){
                      // my.navigateTo({
                      //   url: '/pages/mine/mine'
                      // });

                      // my.switchTab({
                      //   url: '/pages/mine/mine'
                      // })

                      my.navigateTo({
                        url: '/pages/vip-invite/vip-invite'
                      });

                    
 
                    }
                    
                  }, 
                  fail: function(resdata) {
                    
                  }
                });

       
      }
    });
    },

    onAuthError(res){
         console.log(res);
    },

});
