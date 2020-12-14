var app = getApp();

Page({

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
    my.showLoading();
    my.getLocation({
      type:1,
      success(res) {
       


        app.globalData.longitude = res.longitude;
        app.globalData.latitude = res.latitude;
        app.globalData.cityCode = res.cityAdcode;
        app.globalData.districtCode = res.districtAdcode;

        var url = app.serverUrl + '/aliShop/list';
        my.request({
            url: url,
            method: 'POST', 
            data: {
              cityCode:res.cityAdcode,
              districtCode:res.districtAdcode
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(resdata) {

               my.hideLoading();
              
              if (resdata.data.code == 0){

                

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
            fail: function(resdata) {
              my.hideLoading();
            }
          });
        
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

  

  mine(){
   my.navigateTo({
     url: '/pages/mine/mine'
   });
  },

});
