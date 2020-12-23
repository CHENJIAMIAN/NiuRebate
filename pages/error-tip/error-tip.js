Page({
  data: {},
  onLoad() {
    this.setTime();
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
