var app = getApp();

Page({
  data: {
    isVIP:false,
    listData: [
      {
        laizi: "小明",
        time: "12月11日18：40",
        fanli: "85.00",
        xiaofei: "98.00",
      },
      {
        laizi: "小红",
        time: "12月12日18：40",
        fanli: "45.00",
        xiaofei: "58.00",
      },
      {
        laizi: "小红",
        time: "12月12日18：40",
        fanli: "45.00",
        xiaofei: "58.00",
      },
      {
        laizi: "小红",
        time: "12月12日18：40",
        fanli: "45.00",
        xiaofei: "58.00",
      },
      {
        laizi: "小红",
        time: "12月12日18：40",
        fanli: "45.00",
        xiaofei: "58.00",
      },
      {
        laizi: "小红11",
        time: "12月12日18：40",
        fanli: "45.00",
        xiaofei: "58.00",
      },
      {
        laizi: "小红12",
        time: "12月12日18：40",
        fanli: "45.00",
        xiaofei: "58.00",
      },
      {
        laizi: "小红13",
        time: "12月12日18：40",
        fanli: "45.00",
        xiaofei: "58.00",
      },
      {
        laizi: "小红14",
        time: "12月12日18：40",
        fanli: "45.00",
        xiaofei: "58.00",
      }
    ],
    hasContent: false,
    showPayBtn: false,
    memberId: '',
    userId: '',
    phone:'',
    nickName: '',
    avatar: '',
    memberFlag: '',
    expiryDate: '',
    needLogin:false
  },

  onLoad() {
  }, 

  onReady() {

    var that = this;
    my.showLoading();
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

              my.hideLoading();
              
              console.log(resdata)

              if (resdata.data.data.userId) {

                app.globalData.userId = resdata.data.data.userId;

              }

              if (resdata.data.code == 0) {

                that.setData({
                  memberId: resdata.data.data.id,
                  userId: resdata.data.data.userId,
                  phone: resdata.data.data.phone,
                  nickName: resdata.data.data.nickName,
                  avatar: resdata.data.data.avatar,
                  memberFlag: resdata.data.data.memberFlag,
                  expiryDate: resdata.data.data.expiryDate
                });

                if (resdata.data.data.memberFlag == 0) {
                  that.setData({
                    isVIP:false,
                    hasContent:false
                  });
                }else if (resdata.data.data.memberFlag == 1){
                    that.setData({
                    isVIP:true
                  });
                }

              } else if (resdata.data.code == 1) {

                that.setData({
                  needLogin:true
                });

              } else if (resdata.data.code == 2) {

                my.navigateTo({
                  url: '/pages/GetUserBase/GetUserBase'
                });

              }

            },
            fail: function (resdata) {
              console.log(resdata);
              my.hideLoading();
            }
          });


        }

      },

      fail() {
        my.hideLoading();

      },

    });

  },

  tapShowPay() {
    this.setData({ showPayBtn: true })
  },

  tapHidePay() {
    this.setData({ showPayBtn: false })
  },


 

  alipayScan() {
    // 打开支付宝扫一扫
    my.ap.navigateToAlipayPage({
      appCode: 'alipayScan', 
      success: (res) => {
        // my.alert({content:'成功：'+JSON.stringify(res)});
      },
      fail: (res) => {
        // my.alert({content:'失败：'+JSON.stringify(res)});
      }
    });
  },

  payCode() {
    // 打开付款码
    my.ap.navigateToAlipayPage({
      appCode: 'payCode',
      success: (res) => {
        // my.alert({content:'成功：'+JSON.stringify(res)});
      },
      fail: (res) => {
        // my.alert({content:'失败：'+JSON.stringify(res)});
      }
    });
  },


  goPhoneNumber(){
    my.navigateTo({
      url: '/pages/GetPhoneNumber/GetPhoneNumber'
    });

  },


  goBuyCard(){
    my.navigateTo({
      url: '/pages/vip-invite/vip-invite'
    });
  },


});
