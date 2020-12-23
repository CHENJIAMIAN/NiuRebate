if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/PayButton/PayButton?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/badge/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/am-icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/tabs/index?hash=4a98b35daa3eee1b62960d4d5bbcbf254cbf11e3');
require('../../node_modules/mini-ali-ui/es/tabs/tab-content/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/search-bar/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/popup/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/error-tip/error-tip?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/success-tip/success-tip?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/shop-home/shop-home?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/mine?hash=89d39956a366795796912506e0eaad66b49b3a5e');
require('../../pages/index/index?hash=3b86f4aa94363c6cd40ecc6a6d28ab1a171f79ab');
require('../../pages/vip-invite/vip-invite?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/GetUserBase/GetUserBase?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/GetPhoneNumber/GetPhoneNumber?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/pay/pay?hash=436c167f82f36f09d71fbd106bb283607b26b1c3');
require('../../pages/UserInfo/UserInfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/home/home?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/share/share?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/error-tip/error-tip?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/pay-success-tip/pay-success-tip?hash=5158fa18297db3fbaac119609b168d20fcdf1eea');
require('../../pages/success-tip/success-tip?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}