var app = getApp();

Page({
  data: {
    img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
    hasRecord: true,
    listData: [
      {
        avatar: '',
        nickName: "小红",
        createTime: "12月12日18：40"
      },
      {
        avatar: '',
        nickName: "小红",
        createTime: "12月12日18：40"
      }

    ]
  },
  onLoad() {
    my.hideShareMenu(); 
    //alert(app.globalData.userId);

    var that = this;
    var url = app.serverUrl + '/aliMember/myInvite';
    my.request({
      url: url,
      method: 'POST',
      data: { 
        memberId: app.globalData.memberId,
        page:1
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (resdata) {

        my.hideLoading();

        console.log(resdata)


        if (resdata.data.code == 0) {

          that.setData({
            listData: resdata.data.data.list
          });          

        } else {

          that.setData({
            needLogin: true
          });

        }

      },
      fail: function (resdata) {
        console.log(resdata);
        my.hideLoading();
      }
    });

  },
 


  onShareAppMessage() {
    return {
      title: '乐盟返利',
      desc: '专注生活服务，提供会员返利',
      path: '/pages/share-recv/share-recv?shareUserId=' + app.globalData.userId,
      searchTip: '乐盟返利小程序',
      content: '分享吱口令',
      imageUrl: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
      bgImgUrl: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
      success: function (res) {
        console.log('success', res)
      },
      fail: function (res) {
        console.log('fail', res)
      }
    }
  },


  shareToFriends() {
    my.showSharePanel();
  },

});
