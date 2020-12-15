var app = getApp();

Page({
  data: {
    memberId:'',
    userId:'',
    nickName:'',
    avatar:'',
    memberFlag:''
  },

  onLoad() {
  },

  onReady() {

    var that = this;

    my.getAuthCode({
    scopes: 'auth_base', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
    success: (res) => {

    if (res.authCode) {
          // console.log(app.serverUrl + '/login/' + res.authCode);
          // 调用自己的服务端接口，让服务端进行后端的授权认证

          var url = app.serverUrl + '/aliMember/login';

          console.log(res.authCode);


          my.request({
            url: url,
            method: 'POST', 
            data: { 
              authCode: res.authCode 
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(resdata) {
              
               console.log(resdata)

              if (resdata.data.data.userId){

                app.globalData.userId = resdata.data.data.userId;

              }

              if (resdata.data.code == 0){

                that.setData({
                  memberId:resdata.data.data.id,
                  userId: resdata.data.data.userId,
                  nickName:resdata.data.data.nickName,
                  avatar:resdata.data.data.avatar,
                  memberFlag:resdata.data.data.memberFlag
                });

                if (resdata.data.data.memberFlag == 0){

                }

              }else if (resdata.data.code == 1){

                my.navigateTo({
                  url: '/pages/login/login'
                });

              }else if (resdata.data.code == 2){

                my.navigateTo({
                  url: '/pages/GetUserBase/GetUserBase'
                });

              }

            }, 
            fail: function(resdata) {
               console.log(resdata);
            }
          });

         
        }

      },
    });

  },


  buyCard(){

    var url = app.serverUrl + '/aliMember/buyCard';

    my.request({
      url: url,
      method: 'POST', 
      data: { 
        userId: app.globalData.userId 
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(resdata) {


        if (resdata.data.code == 0){

          var tradeNo = resdata.data.data.tradeNo;

          my.tradePay({
            tradeNO: tradeNo,  
            success: function(res) {            
                
            },
            fail: function(res) {  
                
            },
          });

        }else{

         my.showToast({
            type: 'fail',
            content: '会通会员失败，稍后重试',
            duration: 1000,
            success: () => {
            },
          });
        }

      }, 
      fail: function(resdata) {
          console.log(resdata);
      }
    });
      
  },

  alipayScan() {
    // 打开支付宝扫一扫
    my.ap.navigateToAlipayPage({
        appCode:'alipayScan',
        success:(res) => {
            // my.alert({content:'成功：'+JSON.stringify(res)});
        },
        fail:(res) => {
            // my.alert({content:'失败：'+JSON.stringify(res)});
        }
    });
  },

  payCode() {
    // 打开付款码
    my.ap.navigateToAlipayPage({
        appCode:'payCode',
        success:(res) => {
            // my.alert({content:'成功：'+JSON.stringify(res)});
        },
        fail:(res) => {
            // my.alert({content:'失败：'+JSON.stringify(res)});
        }
    });
  },


});
