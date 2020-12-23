var app = getApp();

Page({
  data: {},
  onLoad() {
    my.hideShareMenu();
    //alert(app.globalData.userId);
  },


  
  onShareAppMessage() {
    return {
      title: '老牛返利',
      desc: '专注生活服务，提供会员返利',
      path: 'pages/index/index?shareUserId='+app.globalData.userId,
      searchTip: '老牛返利小程序',
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


  shareToFriends(){
    my.showSharePanel();
  },

});
