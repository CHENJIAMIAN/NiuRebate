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
    needLogin: false,
    page: 1,
    //
    loadMore: "",
    loadContent: ["马不停蹄加载更多数据中...", "-- 已经到底了，加不了咯 --"]
  },

  onLoad() {
  },

  onShow() {
    // 页面显示

  },

  onReady() {

    if (app.globalData.memberId == '') {
      this.setData({
        needLogin: true
      });
      return;
    }

    var that = this;
    my.showLoading();

    var url = app.serverUrl + '/aliMember/login';

    my.request({
      url: url,
      method: 'POST',
      data: {
        memberId: app.globalData.memberId
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (resdata) {

        my.hideLoading();

        console.log(resdata)

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
              isVIP: false
            });
            that.loadRecord();
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
        memberId: app.globalData.memberId,
        page: page
      },

      headers: {
        'Content-Type': 'application/json'
      },

      success: (resdata) => {

        my.hideLoading();

        console.log(`requestFanliData page:${page}`, resdata);

        if (resdata.data.code == 0) {


          var bean = resdata.data.data;
          this.setData({
            hasContent: true,
            listData: this.data.listData.concat(bean.list),
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
      },
      complete: () => {
        this.setData({
          loadMore: "over"
        });
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

  gowithdraw() {
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
  },



  /**
   * scroll-view滑到底部触发事件
   * @method scrollMytrip
   */
  onScrollToLower() {
    try {
      const newPage = this.data.page + 1;
      this.setData({
        page: newPage,
        loadMore: "load"
      });
      console.log('newPage',newPage);
      this.requestFanliData(newPage);
    } catch (e) {
      this.setData({
        loadMore: "over"
      });
      console.log("scrollMytrip执行异常:", e);
    }
  }
});
