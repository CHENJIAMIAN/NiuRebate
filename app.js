App({

  // serverUrl:"http://192.168.50.158:9800",
  serverUrl: "http://www.lemengsc.com:9800",

  globalData: {
    hasLogin: false,
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
