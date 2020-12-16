var app = getApp();

Page({
  data: {
    gotLocation: false,
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
    var that = this;
    my.showLoading();
    my.getLocation({
      type: 1,
      success: (res) => {
        app.globalData.longitude = res.longitude;
        app.globalData.latitude = res.latitude;
        app.globalData.cityName = res.city;

        that.requestMerchantData(res.longitude, res.latitude, res.city);
        

      },
      fail() {
        my.hideLoading();

      },
    })
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },


  requestMerchantData(longitude, latitude, cityName){

    console.log(longitude + '===' + latitude + '===' + cityName);

    var url = app.serverUrl + '/aliShop/list';
        my.request({
          url: url,
          method: 'POST',
          data: {
            longitude: longitude,
            latitude: latitude,
            cityName: cityName
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: (resdata) => {
            my.hideLoading();

            if (resdata.data.code == 0) {
              this.setData({ gotLocation: true });
            } else {
              this.setData({ gotLocation: false });
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
            my.hideLoading();
          }
        });

  },


  chooseLocation() {
    var that = this
    my.chooseLocation({
         success:(res)=>{
          console.log(res)

          app.globalData.longitude = res.longitude;
          app.globalData.latitude = res.latitude;
          app.globalData.cityName = res.cityName;

          that.requestMerchantData(res.longitude, res.latitude, res.cityName);

          
        },
        fail:(error)=>{
          
        },
    });
  },



  mine() {
    my.navigateTo({
      url: '/pages/mine/mine'
    });
  },

});
