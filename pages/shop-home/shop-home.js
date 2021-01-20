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
    discount:'',
    realTimeRate:'',
    bountyRate:'',
    shopImgList:[],
    prodImgList:[],
    showModal: false,
    showAlert: false,
    buttons: [
      { text: '跳过',  extClass: 'redBtn'},
      { text: '去校验', extClass: 'buttonBold' },
    ],
    alertbuttons: [
            {
                text: "取消",
                extClass: "redBtn"
            },
            {
                text: "去登录",
                extClass: "buttonBold"
            }
        ]

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
        merchantId: query.id
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: (resdata) => {
        my.hideLoading();

        if (resdata.data.code == 0) {

          
          var bean = resdata.data.data;
          console.log(resdata);
           
          this.setData({
            id: bean.id,
            img: bean.img,
            name: bean.name, 
            price: bean.price,
            position: bean.position,
            type: bean.type,
            discount: bean.discount,
            fanli: bean.fanli,
            zhuan: bean.zhuan,
            realTimeRate: bean.realTimeRate,
            bountyRate: bean.bountyRate,
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

    if (app.globalData.memberId == ''){
        this.setData({
            showAlert: true
        });
        return;
    }

     var url = app.serverUrl + '/aliMember/queryById';
     my.request({
      url: url,
      method: 'POST',
      data: {
        memberId: app.globalData.memberId
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: (resdata) => {

        if (resdata.data.code == 0) {

          var bean = resdata.data.data;
          if (bean.name){

            my.navigateTo({
              url: '/pages/pay/pay?id=' + this.data.id 
                  + '&name=' + this.data.name 
                  + '&discount=' + this.data.discount
                  + '&realTimeRate=' + this.data.realTimeRate
                  + '&bountyRate=' + this.data.bountyRate
                  + '&img=' + this.data.img
                  + '&fanli=' + this.data.fanli
            });

          }else{
            this.setData({
              showModal: true,
            });

          }
         
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
        
      }
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


  onModalButtonClick(e) {
    const { target: { dataset } } = e;
    this.setData({
      showModal: false,
    });

    if (dataset.index == 0){
      my.navigateTo({
        url: '/pages/pay/pay?id=' + this.data.id 
            + '&name=' + this.data.name 
            + '&discount=' + this.data.discount
            + '&realTimeRate=' + this.data.realTimeRate
            + '&bountyRate=' + this.data.bountyRate
            + '&img=' + this.data.img
            + '&fanli=' + this.data.fanli
        });

    }else if (dataset.index == 1){
      my.navigateTo({
        url: '/pages/validate-name/validate-name?merchantId=' + this.data.id
      });
    }
    
  },

  //门店照幼灯
  previewImageShop(e){
    var index=e.target.dataset.index;
    var list=this.data.shopImgList;
    this.previewImage(list,index);
  },
  //产品照幼灯
  previewImageGoods(e){
    var index=e.target.dataset.index;
    var list=this.data.prodImgList;
    this.previewImage(list,index); 
  },


  previewImage(list,index) {
    console.log("previewImage:list:",list);
    console.log("previewImage:index:",index);

    var listArry;
    if(Array.isArray(list)&&list.length>0){
      var vArray = new Array(list.length);
       //console.log("list.length:"+list.length);
       for(var i=0;i<list.length;i++){
          vArray[i]=list[i].imgUrl;
       }
       listArry=vArray;
    }

    my.previewImage({
      current: index,
      urls: listArry
    });
  },


  onAlertButtonClick:function(e) {
        const { target: { dataset } } = e;
        this.setData({
            showAlert: false
        });

        if (dataset.index == 1) {
            my.navigateTo({
                url: "/pages/GetPhoneNumber/GetPhoneNumber"
            });
        } 
    }

});
