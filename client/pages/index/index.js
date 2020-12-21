var app = getApp();

Page({
  data: {
    position:'',
    img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
    tjListData: [
      {
        id:0,
        name: "辣酱糊",
        price: "20",
        type: "便利店",
        position: "西湖区",
        distance: "8.1km",
        zhuan: "6.30",
        fanli: "10.50",
      }, {
        id:0,
        name: "辣酱糊",
        price: "20",
        type: "便利店",
        position: "西湖区",
        distance: "8.1km",
        zhuan: "6.30",
        fanli: "10.50",
      },
    ],
    gotLocation: true,
    tabs: [
      {
        title: '推荐',
        subTitle: '优质商家',
        number: '6',
        // showBadge: true,
        badge: {
          stroke: true,
        },
      },
      {
        title: '美食',
        subTitle: '吃遍全城',
        number: '66',
        // showBadge: true,
        badge: {
          arrow: false,
          stroke: true,
        },
      },
      {
        title: '购物',
        subTitle: '商超便利',
        number: '99+',
        // showBadge: true,
        badge: {
          arrow: true,
        },
      },
      {
        title: '生活',
        subTitle: '休闲娱乐',
        // showBadge: true,
        number: 0,
      },
    ],
    activeTab: 0,
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    // my.pageScrollTo({
    //   scrollTop: parseInt(600),
    // });
  },
  onReady() {
    // 页面加载完成
    var that = this;
    my.showLoading();
    my.getLocation({
      type: 1,
      success: (res) => {

        console.log(res);

        app.globalData.longitude = res.longitude;
        app.globalData.latitude = res.latitude;
        app.globalData.cityName = res.city;
        app.globalData.district = res.district;
        that.setData({
          position: res.city + res.district
        });
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


  requestMerchantData(longitude, latitude, cityName) {

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

          console.log(resdata.data.data);

          var list = resdata.data.data.rows;
          for (var i=0; i<list.length; i++){
            
          }

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
      success: (res) => {
        console.log(res)

        app.globalData.longitude = res.longitude;
        app.globalData.latitude = res.latitude;
        app.globalData.cityName = res.cityName;
        app.globalData.district = res.name; 
        that.setData({
          position: res.name
        });

        that.requestMerchantData(res.longitude, res.latitude, res.cityName);

      },
      fail: (error) => {

      },
    });
  },



  mine() {
    my.navigateTo({
      url: '/pages/mine/mine'
    });
  },
  // tab start
  handleTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  // tab end
});


