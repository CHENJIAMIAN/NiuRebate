
Page({
  data: {
    shopName:'',
    avatar:'',
    tradeNo:'',
    amount:'',
    time:10
  },
  onLoad() {
    // this.setTime();
  },

  setTime(){
      var that = this;
      var intervalProcess  = setInterval(() => {

        var t = that.data.time;
 
        if (t > 0){
 
          t--;

          this.setData({
             time: t
          });

          
        }else{ 
          clearInterval(intervalProcess);
          that.go();
        } 
        
      }, 1000);
  },

  go(){
      my.reLaunch({
        url: '/pages/index/index'
      });
  }

});
