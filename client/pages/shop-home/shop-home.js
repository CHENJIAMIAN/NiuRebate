var app = getApp();

Page({
  data: {
    id:0,
    img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
    name: '辣酱糊',
    price:85,
    position:'余杭区',
    type:'江浙菜',
    fanli:10,
    zhuan:1.2,
    operTime:'9:00-22:00',
    distance:'3km',
    longitude:'',
    latitude:'',
    address:'',
    shopImgList:[],
    prodImgList:[]

  },
  onLoad(query) {
    console.log('====:' + query.id);

    var that = this;
    my.showLoading();

    this.setData({id:query.id});


    var url = app.serverUrl + '/aliShop/query';
    my.request({
      url: url,
      method: 'POST',
      data: {
        longitude: app.globalData.longitude,
        latitude: app.globalData.latitude,
        id: query.id
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (resdata) => {
        my.hideLoading();

        if (resdata.data.code == 0) {

          var bean = resdata.data.data;
          this.setData({
            id: bean.id,
            img: bean.img,
            name: bean.name,
            price: bean.price,
            position: bean.position,
            type: bean.type,
            fanli: bean.fanli,
            zhuan: bean.zhuan,
            operTime: bean.operTime,
            distance: bean.distance,
            address: bean.address,
            longitude: bean.longitude,
            latitude: bean.latitude,
            shopImgList: bean.shopImgList,
            prodImgList: bean.prodImgList
          });

        }else{
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

  payBill(){

    const { id } = this.data.id;
    my.navigateTo({
      url: `/pages/pay/pay?id=${id}` 
    });

  },

  openLocation() {
    my.openLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      name: this.data.name,
      address: this.data.address,
    })
  },

});
