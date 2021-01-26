var app = getApp();

Page({
  data: {},
  onLoad(query) {

    console.log("#####shareId:"+ query.shareUserId);

    var shareUserId = query.shareUserId;

    var that = this;
    my.getAuthCode({
      scopes: 'auth_base', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {

        if (res.authCode) {
          // console.log(app.serverUrl + '/login/' + res.authCode);
          // 调用自己的服务端接口，让服务端进行后端的授权认证

          var url = app.serverUrl + '/aliMember/shareRecv';

          console.log(res.authCode);

          my.request({
            url: url,
            method: 'POST', 
            data: {
              authCode: res.authCode,
              shareUserId: shareUserId 
            },
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (resdata) {

              my.navigateTo({
                url: '/pages/loading/loading' 
              });

            },
            fail: function (resdata) {

            }
          });


        }

      },

      fail() {
        console.log('==========');
      },

    });

  },
});
