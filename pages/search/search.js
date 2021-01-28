var app = getApp();
var searchKey = "";
Page({
  data: {
    searchTip: '历史搜索',
    searchValue: '',
    swiper_height: '500px',
    position: "",
    showContent: false,
    tjListData: [],
    historyList: ''
  },

  onLoad(query) {
    var cache = my.getStorageSync({ key: 'SearchHistoryKey' });
    if (cache != null && cache != '' && cache != '查无此key') {
      this.setData({
        historyList: cache.data
      });
      this.autoHeight();
      console.log('historyList', this.data.historyList)
    }
    
  },
  onReady() { },

  requestMerchantData(longitude, latitude, cityName, page, searchKey) {
    console.log(longitude + "===" + latitude + "===" + cityName + "===" + page + "===" + searchKey);
    var url = app.serverUrl + "/aliShop/list";
    my.request({
      url: url,
      method: "POST",
      data: {
        longitude: longitude,
        latitude: latitude,
        cityName: cityName,
        page: page,
        searchKey: searchKey
      },
      success: resdata => {
        my.hideLoading();
        if (resdata.data.code == 0) {
          this.setData({
            gotoLocation: false,
            showContent: true
          });
          console.log(resdata);
          let list = this.data.tjListData;
          var dataList = resdata.data.data;
          this.setData({
            list: list.concat(dataList),
            page
          });
        }
      },
      fail: resdata => {
        my.hideLoading();
      },
      complete: () => {
        this.setData({
          show: false
        });
      }
    });
  },

  /**
   * scroll-view滑到底部触发事件
   * @method scrollMytrip
   */
  async scrollMytrip() {
    console.log("scrollMytrip");
    try {
      const {
        page,
        list
      } = this.data; // 判断是否还有数据需要加载
      this.setData({
        show: true
      });
      const newPage = page + 1;
      console.log(newPage);
      this.requestMerchantData(
        app.globalData.longitude,
        app.globalData.latitude,
        app.globalData.cityName,
        newPage,
        searchKey
      );
    } catch (e) {
      this.setData({
        show: false
      });
      console.log("scrollMytrip执行异常:", e);
    }
  },

  onSearchBarInput(value) {
    console.log('onSearchBarInput', value)
    searchKey = value;
    this.setData({
      searchValue: searchKey
    })
  },


  onSubmit(value) {
    console.log("onSubmit::",value);
    searchKey=value;
    this.goToSearchData();
  },
  onClear() {
    this.setData({
      searchValue: this.data.searchValue.slice(0, -1)
    })
  },

  goToSearchData() {
    if (searchKey == '' || searchKey == null) {
      return;
    }

    var cacheGet = my.getStorageSync({ key: 'SearchHistoryKey' });
    if (cacheGet != null && cacheGet != '' && cacheGet != undefined && cacheGet != '查无此key') {
      var isExist = false;
      var arr = [];
      var cache=cacheGet.data;
      if(cache!=null){
          for (var i = 0; i < cache.length; i++) {
                  var name = cache[i]
                  if (i >= 12) {
                    break;
                  }

                  if (name == searchKey) {
                    isExist = true;
                    arr.unshift(searchKey);
                    continue;
                  } else {
                    arr[i] = name;
                  }
                }
                if (!isExist) {
                  arr.unshift(searchKey);
                }
                my.setStorageSync({key:"SearchHistoryKey",data:arr});
                this.setData({
                  historyList: arr
                })
                //console.log('historyList', this.data.historyList)
      }else{
        var arr = [];
              arr[0] = searchKey;
              my.setStorageSync({key:"SearchHistoryKey",data:arr});
              this.setData({
                historyList: arr
              })
      } 
    } else {
      var arr = [];
      arr[0] = searchKey;
      my.setStorageSync({key:"SearchHistoryKey",data:arr});
      this.setData({
        historyList: arr
      })
    }

    this.setData({
      list: [],
    });
    this.autoHeight();
    this.requestMerchantData(app.globalData.longitude, app.globalData.latitude,
      app.globalData.cityName, 1, searchKey);
  },

  autoHeight() {
    my.createSelectorQuery()
      .select('#top').boundingClientRect().exec((rect) => {
        this.setData({
          btmHeight: rect[0].height
        })
      })
  },

  hisItemClick(e) {
    var item = e.currentTarget.dataset.item;
    console.log("hisItemclike", item);
    searchKey = item;
    this.setData({
      searchValue: searchKey
    });
    this.goToSearchData();
  },


  goShopDetail(e) {
    const {
      item
    } = e.currentTarget.dataset;

    my.navigateTo({
      url: `/pages/shop-home/shop-home?id=${item.id}`
    });
  },



});