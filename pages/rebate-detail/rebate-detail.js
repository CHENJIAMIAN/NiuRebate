var app = getApp();

Page({
  data: {
    tradeNo:'',
    mctShopName: '',
    mctAvatar: '',
    amount: 0,
    fanli:0,
    realTime:0,
    bounty:0,
    requestTime:''
  },
  onLoad(query) {
    this.setData({
      tradeNo: query.tradeNo
    })
  },

  onReady() {

    var that = this;
    my.showLoading();
    var url = app.serverUrl + '/aliMember/fanliDetail';

    my.request({
      url: url,
      method: 'POST',
      data: {
        tradeNo: that.data.tradeNo
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(resdata) {

        my.hideLoading();
        
        console.log(resdata)

        if (resdata.data.code == 0) {

          var bean = resdata.data.data;

          that.setData({
            tradeNo: bean.tradeNo,
            mctShopName: bean.mctShopName,
            mctAvatar: bean.mctAvatar,
            amount: bean.amount,
            fanli: bean.fanli,
            realTime: bean.realTime,
            bounty: bean.bounty,
            requestTime: bean.requestTime
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
      fail: function (resdata) {
        console.log(resdata);
        my.hideLoading();
      }
    });

  },

});
