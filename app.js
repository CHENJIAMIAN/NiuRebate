App({

   //serverUrl:"http://192.168.50.176:9800",
  serverUrl: "https://www.lemengsc.com",
  rootImgPath:"",
  globalData: {
    hasLogin: false,
    memberId:'',
    userId: '',
    longitude: '',
    latitude: '',
    cityName: '',
    district: ''
  },

  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1} 
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },

});
