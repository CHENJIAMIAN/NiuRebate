var app = getApp(); // mock列表数据
var intervalProcess;

Page({
  data: {
    title:'欢迎使用乐盟返利，正在授权...',
    goBtnFlag: false,
    loginBtnFlag: false,
    time:3
  },
  onLoad() {
  },

  onReady() {
    this.login();
  },

  
  login(){

    // my.showLoading();
    // 页面加载
    var that = this;

    my.getAuthCode({
      scopes: 'auth_base', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {

        if (res.authCode) {
          // console.log(app.serverUrl + '/login/' + res.authCode);
          // 调用自己的服务端接口，让服务端进行后端的授权认证

          var url = app.serverUrl + '/aliMember/check';

          console.log(res.authCode);

          my.request({
            url: url,
            method: 'POST',
            data: {
              authCode: res.authCode
            },
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (resdata) {

              // my.hideLoading();

              // console.log(resdata); 

              if (resdata.data.data){

                if (resdata.data.data.userId) {
                  app.globalData.userId = resdata.data.data.userId;
                }

                if (resdata.data.data.memberId) {
                  app.globalData.memberId = resdata.data.data.memberId;
                }

                that.setData({
                  goBtnFlag:true,
                  title: '授权成功, ' + that.data.time + '秒后进入'
                });

                that.setTime();

              }else{

                that.setData({
                  loginBtnFlag:true,
                  title: '授权失败, 请重试！'
                });
              }
            },

            fail: function (resdata) {
              // my.hideLoading();
              that.setData({
                loginBtnFlag:true,
                title: '授权失败, 请重试！'
              });

            }
          });

        }

      },

      fail: (res) => {
        // my.hideLoading();
        console.log("========auth fail");
        that.setData({
          loginBtnFlag:true,
          title: '授权失败, 请重试！'
        });
      },

    });

  },

  
  setTime() {
    var that = this;
    intervalProcess = setInterval(() => {
        var t = that.data.time;

        if (t > 0) {
            t--;
            that.setData({
                time: t,
                title: '授权成功, ' + t + '秒后进入'
            });
        } else {
            that.goIndex();
        }
    }, 1000);
  },

  goIndex() {
      clearInterval(intervalProcess);
      my.reLaunch({
          url: "/pages/index/index"
      }); 
  },

  relogin(){

    this.setData({
      title:'欢迎使用乐盟返利，正在授权...',
      loginBtnFlag: false
    });

    this.login();
  }

});
