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
    tjListData: [

    ],
    showIndexPage: true,
    gotoLocation: true,
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
              'Content-Type': 'application/json'
            },
            success: function (resdata) {

              console.log(resdata); 

              if (resdata.data.data.userId) {
                app.globalData.userId = resdata.data.data.userId;
              }

              if (resdata.data.data.memberId) {
                app.globalData.memberId = resdata.data.data.memberId;
              }

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

        let page = 1;
        that.requestMerchantData(res.longitude, res.latitude, res.city, page);

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


  requestMerchantData(longitude, latitude, cityName, page) {

    console.log(longitude + '===' + latitude + '===' + cityName);


    var url = app.serverUrl + '/aliShop/list';
    my.request({
      url: url,
      method: 'POST',
      data: {
        longitude: longitude,
        latitude: latitude,
        cityName: cityName,
        page: page
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: (resdata) => { 
        my.hideLoading();

        if (resdata.data.code == 0) {
          this.setData({ gotoLocation: false });

          console.log(resdata);

          let list = this.data.tjListData;
          var dataList = resdata.data.data;
          // for (var i=0; i<dataList.length; i++){
          //   list.push(dataList[i]);
          // }

          setTimeout(() => {
            for (let i = 0; i < dataList.length; i++) {
              let newObj = { ...dataList[i], remarksa: `我是第${page}页` };
              list.push(newObj);
            }
            this.setData({
              list,
              page,
              show: false
            });
          }, 1000);



          // this.setData({
          //   tjListData: this.data.tjListData.concat(dataList)
          // });


        } else if (resdata.data.code == 6) {
          this.setData({ gotoLocation: true });
          my.showToast({
            type: 'fail',
            content: resdata.data.msg,
            duration: 1000,
            success: () => {
            },
          });

        } else if (resdata.data.code == 7) {
          this.setData({ show: false });
          my.showToast({
            type: 'none',
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

        my.showLoading();


        let page = 1;
        let list = []; 

        //清空列表数据
        this.setData({
              list, 
              page,
              show: false
            });


        that.requestMerchantData(res.longitude, res.latitude, res.cityName, page);

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

  /**
 * scroll-view滑到底部触发事件
 * @method scrollMytrip 
 */
  async scrollMytrip() {
    console.log('scrollMytrip')
    try {
      const { page, list, } = this.data;
      // 判断是否还有数据需要加载 
      // if (list.length < mockTotal) {
      this.setData({ show: true });
      const newPage = page + 1;

      console.log(newPage);

      this.requestMerchantData(app.globalData.longitude, app.globalData.latitude, app.globalData.cityName, newPage);

      // this.mySchedulde(newPage);
      // }
    } catch (e) {
      this.setData({ show: false });
      console.log('scrollMytrip执行异常:', e);
    }
  },
  /**
   * 模拟请求服务端查询数据并渲染页面
   * @method mySchedulde
   * @param {int} page 分页,默认第1页
   */
  async mySchedulde(page = 1) {
    try {
      let list = this.data.tjListData;
      // 模拟请求拿到数据进行更新data
      setTimeout(() => {
        let data = mockData;
        for (let i = 0; i < data.length; i++) {
          let newObj = { ...data[i], remarksa: `我是第${page}页` };
          list.push(newObj);
        }
        this.setData({
          list,
          page,
          show: false
        });
      }, 1000);
    } catch (e) {
      console.log('mySchedulde执行异常:', e);
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
  }

});


