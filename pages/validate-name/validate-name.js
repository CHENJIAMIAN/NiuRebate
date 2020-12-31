var app = getApp();

Page({
  data: {
    merchantId:'',
    inputName: '',
  },
  onLoad(query) {
    this.setData({
      merchantId: query.merchantId
    });
  },
  titleClick() {
    my.alert({
      title: 'onActionTap 回调',
      content: '标题后面操作区域点击',
    });
  },

  bindKeyInput(e) {
    this.setData({
      inputName: e.detail.value,
    });
  },

  tapValidate(){

    var that = this;
    
    if (!this.data.inputName){
         my.showToast({
            type: 'none',
            content: '请填写姓名',
            duration: 1000,
            success: () => {
            },
          });
          return;
    }


    var url = app.serverUrl + '/aliMember/validateName';
     my.request({
      url: url,
      method: 'POST',
      data: {
        memberId: app.globalData.memberId,
        merchantId: that.data.merchantId,
        name: that.data.inputName
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (resdata) => {

        if (resdata.data.code == 0) {

          my.showToast({
            type: 'success',
            content: '校验成功',
            duration: 1000,
            success: () => {
            },
          });

          my.navigateTo({
            url: '/pages/shop-home/shop-home?id=' + that.data.merchantId
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
        
      }
    });


  }
});
