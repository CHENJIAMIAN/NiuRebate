var app = getApp();

Page({
  data: {

  },
  onLoad() {},

  // .js 
  onGetAuthorize(res) {

    let userId = app.globalData.userId;

    console.log(userId);

    // 获取手机号
      my.getPhoneNumber({
          success: (result) => {
              let encryptedData = result.response;
              console.log(encryptedData);
              var url = app.serverUrl + '/aliMember/phoneNumber';
              my.request({
                  url: url,
                  method: 'POST', 
                  data: { 
                    encryptedData: encryptedData,
                    userId:userId
                  },
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  success: function(resdata) {

                    if (resdata.data.code == 0){
                      my.navigateTo({
                        url: '/pages/GetUserBase/GetUserBase'
                      });

                    }
                    
                  }, 
                  fail: function(resdata) {
                    
                  }
                });

          },
          fail: (result) => {
              console.log(result);
              console.log('getPhoneNumber_fail');
          },
      });
    },


    onAuthError(res){
         console.log(res);
    },

});
