var app = getApp();

Page({
  data: {
    merchantId:'',
    inputName: '',
  },
  onLoad(query) {
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
        name: that.data.inputName
      },
      headers: {
        'Content-Type': 'application/json'
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

          my.reLaunch({
            url: '/pages/mine/mine'
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
