var app = getApp();

Page({
  data: {

  },
  onLoad() {},

  // .js 
  onGetAuthorize(res) {

    let memberId = app.globalData.memberId;

    console.log('=========memberId:' + memberId);

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
                    memberId:memberId
                  },
                  headers: {
                    'Content-Type': 'application/json'
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
