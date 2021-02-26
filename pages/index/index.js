var app = getApp();
// mock列表数据
const mockData = [{
  name: "辣酱糊",
  price: "20",
  type: "便利店",
  position: "西湖区",
  distance: "8.1km",
  zhuan: "6.30",
  fanli: "10.50",
}, {
  name: "辣酱糊",
  price: "20",
  type: "便利店",
  position: "西湖区",
  distance: "8.1km",
  zhuan: "6.30",
  fanli: "10.50",
}, {
  name: "辣酱糊",
  price: "20",
  type: "便利店",
  position: "西湖区",
  distance: "8.1km",
  zhuan: "6.30",
  fanli: "10.50",
}, {
  name: "辣酱糊",
  price: "20",
  type: "便利店",
  position: "西湖区",
  distance: "8.1km",
  zhuan: "6.30",
  fanli: "10.50",
},];
// mock列表总数
const mockTotal = 60;

Page({
  lastClickTabBarTime: null,
  data: {
    position: '',
    imgs: [0, 1, 2, 3],
    img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
    list0: [],
    list1: [],
    list2: [],
    list3: [],
    cateList: [],
    tabChangedFlads: {
      page0: false,
      page1: false,
      page2: false,
      page3: false,
    },
    page0: 1,
    page1: 1,
    page2: 1,
    page3: 1,
    categoryId: 0,
    bannerList: [],
    showIndexPage: true,
    gotoLocation: false,
    showContent: false,
    locationFail: false,
    searchValue: "",
    show: false,
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
    tabContentHeight: ''
  },
  onLoad(query) {
    // 页面加载
  },
  onReady() {
    // 页面加载完成
    var that = this;
    my.showLoading();
    my.getLocation({
      type: 1,
      success: (res) => {

        // console.log(res);

        app.globalData.longitude = res.longitude;
        app.globalData.latitude = res.latitude;
        app.globalData.cityName = res.city;
        app.globalData.district = res.district;
        that.setData({
          position: res.city + res.district
        });

        that.requestBanner();

        let page = 1;
        that.requestMerchantData(res.longitude, res.latitude, res.city, page);

      },
      fail: (res) => {
        my.hideLoading();
        console.log("=====fail:" + res);
        that.setData({
          locationFail: true
        });
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


  requestBanner() {
    var url = app.serverUrl + "/aliActivity/list";

    my.request({
      url: url,
      method: "POST",
      data: {},
      headers: {
        'Content-Type': 'application/json'
      },
      success: resdata => {
        if (resdata.data.code == 0) {
          var dataList = resdata.data.data;
          this.setData({
            bannerList: dataList
          });
        }
      }
    });
  },

  requestMerchantData(longitude, latitude, cityName, page) {

    // console.log(longitude + '===' + latitude + '===' + cityName);

    let categoryId = this.data.categoryId;

    var url = app.serverUrl + '/aliShop/list';
    my.request({
      url: url,
      method: 'POST',
      data: {
        longitude: longitude,
        latitude: latitude,
        cityName: cityName,
        page: page,
        categoryId: categoryId
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: (resdata) => {
        my.hideLoading();

        if (resdata.data.code == 0) {
          this.setData({
            gotoLocation: false,
            locationFail: false,
            showContent: true
          });

          console.log(`requestMerchantData page:${page},categoryId:${categoryId}`, resdata);


          if (categoryId == 0) {
            let list = this.data.list0;
            var dataList = resdata.data.data;
            for (let i = 0; i < dataList.length; i++) {
              list.push(dataList[i]);
            }
            this.setData({
              list0: list,
              page0: page
            });

          } else if (categoryId == 1) {
            let list = this.data.list1;
            var dataList = resdata.data.data;
            for (let i = 0; i < dataList.length; i++) {
              list.push(dataList[i]);
            }
            this.setData({
              list1: list,
              page1: page
            });

          } else if (categoryId == 2) {

            let list = this.data.list2;
            var dataList = resdata.data.data;
            for (let i = 0; i < dataList.length; i++) {
              list.push(dataList[i]);
            }
            this.setData({
              list2: list,
              page2: page
            });

          } else if (categoryId == 3) {

            let list = this.data.list3;
            var dataList = resdata.data.data;
            for (let i = 0; i < dataList.length; i++) {
              list.push(dataList[i]);
            }
            this.setData({
              list3: list,
              page3: page
            });

          }



        } else if (resdata.data.code == 6) {
          this.setData({ 
            gotoLocation: true,
            showContent: false 
          });
          my.showToast({
            type: 'fail',
            content: resdata.data.msg,
            duration: 1000,
            success: () => {
            },
          });

        } else if (resdata.data.code == 7) {

          if (categoryId == 0) {
            let list = this.data.list0;
            this.setData({
              list0: list,
              page0: page,
              show: false
            });

          } else if (categoryId == 1) {
            let list = this.data.list1;
            this.setData({
              list1: list,
              page1: page,
              show: false
            });

          } else if (categoryId == 2) {

            let list = this.data.list2;
            this.setData({
              list2: list,
              page2: page,
              show: false
            });

          } else if (categoryId == 3) {

            let list = this.data.list3;
            this.setData({
              list3: list,
              page3: page,
              show: false
            });

          }

          my.showToast({
            type: 'none',
            content: resdata.data.msg,
            duration: 1000
          });
        }
      },
      fail: (resdata) => {
        my.hideLoading();
      },
      complete: () => {
        const { list0, list1, list2, list3 } = this.data;
        // 设置内容
        this.setData({
          cateList: [list0, list1, list2, list3],
        })
        // 适配高度
        my.createSelectorQuery()
          .select('.tab-content' + categoryId).boundingClientRect().exec((ret) => {
            if (!ret) return;
            const hei = ret[0].height;
            console.log('.tab-content' + categoryId, hei)
            console.log(this.data.cateList)
            this.setData({
              tabContentHeight: hei + 30,
            })
          })
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
          position: res.name,
          locationFail: false,
          gotoLocation: false,
          list0: [],
          list1: [],
          list2: [],
          list3: []
        });

        my.showLoading();


        let page = 1;
        let list = [];

        //清空列表数据
        this.setData({
          list0: list,
          page0: page
        });


        that.requestMerchantData(res.longitude, res.latitude, res.cityName, page);

      },
      fail: (error) => {

      },
    });
  },

  handleSearchSubmit(value) {

    console.log('===========' + value);

  },

  mine() {
    my.navigateTo({
      url: '/pages/mine/mine'
    });
  },
  // tab start
  handleTabChange({ index, tabsName }) {
    // console.log('handleTabChange', { index, tabsName });
    this.setData({
      [tabsName]: index,
      categoryId: index
    });
    
    if(this.data.tabChangedFlads['page'+index])
      return;

    var newPage = this.data['page'+index];
    this.data.tabChangedFlads['page'+index] = true;
    // 只有在第一次切换到该tab时，才请求列表数据，其他次由上拉触发请求
    this.requestMerchantData(app.globalData.longitude, app.globalData.latitude, app.globalData.cityName, newPage);
  },
  // tab end

  /**
 * scroll-view滑到底部触发事件
 * @method scrollMytrip 
 */
  async scrollMytrip() {
    console.log('scrollMytrip')
    try {
      let index = this.data.categoryId;
      var newPage = this.data.page0;
      if (index == 1) {
        newPage = this.data.page1;
      } else if (index == 2) {
        newPage = this.data.page2;
      } else if (index == 3) {
        newPage = this.data.page3;
      }

      newPage = newPage + 1;
      console.log(newPage);

      this.requestMerchantData(app.globalData.longitude, app.globalData.latitude, app.globalData.cityName, newPage);

    } catch (e) {
      this.setData({ show: false });
      console.log('scrollMytrip执行异常:', e);
    }
  },

  goShopDetail(e) {
    const { item } = e.target.dataset;
    my.navigateTo({
      url: `/pages/shop-home/shop-home?id=${item.id}`
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
        item.pagePath == 'pages/index/index' && my.pageScrollTo({
          scrollTop: 0,
        });
      }
    }
  },


  onImgSwiperChange(event) {
    // const { current, isChanging } = event.detail;
    //  其中 isChanging 需 acceleration 设置为 {{true}} 时才有值，
    //   当连续滑动多屏时，中间若干屏触发 onChange 事件时 isChanging 为 true，最后一屏返回 false
    // console.log('onImgSwiperChange', { current, isChanging, '当前': this.data.bannerList[current] });
  },

  tapBanerImg(e) {
    console.log('tapBanerImg', e.currentTarget.dataset);
    const { item } = e.currentTarget.dataset;
    console.log('tapBanerImg', item);

    my.navigateTo({
      url: '/pages/activity/activity?id=' + item.id
        + '&title=' + item.title
        + '&bannerImg=' + item.bannerImg
        + '&activityImg=' + item.activityImg
    });


  },


  //跳到搜索页面
  searchClick() {
    my.navigateTo({
      url: '/pages/search/search'
    });
  },

});


