var app = getApp();

Page({
  lastClickTabBarTime: null,
  data: {
    isVIP: false,
    stat: {},
    listData: [
      {
        mctAvatar: '',
        mctShopName: "小红",
        requestTime: "12月12日18：40",
        fanli: "45.00",
        amount: "58.00",
      },
      {
        mctAvatar: '',
        mctShopName: "小红",
        requestTime: "12月12日18：40",
        fanli: "45.00",
        amount: "58.00",
      },
      {
        mctAvatar: '',
        mctShopName: "小红",
        requestTime: "12月12日18：40",
        fanli: "45.00",
        amount: "58.00",
      }
    ],
    hasContent: false,
    showPayBtn: false,
    memberId: '',
    userId: '',
    phone: '',
    nickName: '',
    avatar: '',
    memberFlag: '',
    expiryDate: '',
    needLogin: false
  },

  onLoad() {
  },

  onShow() {
    // 页面显示

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
            success: function (resdata) {

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
                    isVIP: false,
                    hasContent: false
                  });
                } else if (resdata.data.data.memberFlag == 1) {
                  that.setData({
                    isVIP: true
                  });

                  that.loadRecord();
                }

              } else if (resdata.data.code == 1) {

                that.setData({
                  needLogin: true
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


  loadRecord() {

    let page = 1;
    this.requestFanliData(page);

  },


  requestFanliData(page) {

    my.showLoading();

    var url = app.serverUrl + '/aliMember/fanliList';

    my.request({
      url: url,
      method: 'POST',
      data: {
        userId: app.globalData.userId,
        page: page
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (resdata) => {

        my.hideLoading();

        console.log(resdata);

        if (resdata.data.code == 0) {


          var bean = resdata.data.data;
          this.setData({
            hasContent: true,
            listData: bean.list,
            stat: bean.stat
          });



        } else if (resdata.data.code == 10) {

          this.setData({
            hasContent: false
          });


        } else if (resdata.data.code == 7) {
          my.showToast({
            type: 'none',
            content: resdata.data.msg,
            duration: 1000,
            success: () => {
            },
          });
        } else {
          my.showToast({
            type: 'fail',
            content: resdata.data.msg,
            duration: 1000,
            success: () => {
            },
          });
        }
      },
      fail: (resdata) => {
        console.log(resdata);
        my.hideLoading();
      }
    });

  },


  goPhoneNumber() {
    my.navigateTo({
      url: '/pages/GetPhoneNumber/GetPhoneNumber'
    });

  },


  goBuyCard() {
    my.navigateTo({
      url: '/pages/vip-invite/vip-invite'
    });
  },

  shareToFriends() {
    my.navigateTo({
      url: '/pages/my-invite/my-invite'
    });
  },

  goDetail(e) {

    const { item } = e.target.dataset;

    my.navigateTo({
      url: '/pages/rebate-detail/rebate-detail?tradeNo=' + item.tradeNo
    });


  }, 

  gowithdraw(){
     my.navigateTo({
      url: '/pages/withdraw/withdraw' 
    });
  },


  // 实现双击回到顶部
  onTabItemTap(item) {
    if (!this.lastClickTabBarTime) {
      this.lastClickTabBarTime = +new Date();
      return;
    } else {
      const current = +new Date();
      const gap = current - this.lastClickTabBarTime;
      this.lastClickTabBarTime = current;//用完即取新
      console.log(gap)
      if (gap < 500) {
        item.pagePath == 'pages/mine/mine' && my.pageScrollTo({
          scrollTop: 0,
        });
      }
    }
  }
});
