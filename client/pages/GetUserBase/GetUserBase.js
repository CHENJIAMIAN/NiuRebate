var app = getApp();

Page({
  data: {},
  onLoad() {},

  // .js 
  onGetAuthorize(res) {

    let userId = app.globalData.userId;

    console.log(userId);

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
                    userId:userId
                  },
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  success: function(resdata) {

                    if (resdata.data.code == 0){
                      my.navigateTo({
                        url: '/pages/mine/mine'
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
