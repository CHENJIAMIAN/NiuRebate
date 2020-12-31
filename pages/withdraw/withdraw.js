var app = getApp();
Page({
  data: {
    walletMoney: '',
    repayInput:'',
    list:[]
  },
  onLoad() { },
  onReady() {
    // 页面加载完成
    var that = this;
    that.requestMemberData();
  },
  
  //获取余额
  requestMemberData() {
    var url = app.serverUrl + '/cardMemberCashOut/getMemberWallet';
    var that=this;
    my.showLoading();
    my.request({
      url: url,
      method: 'POST',
      data: {
        id: app.globalData.memberId
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: (resdata) => { 
        my.hideLoading();
        console.log("###"+JSON.stringify(resdata));
        console.log("###"+JSON.stringify(resdata.data.code));
        if (resdata.data.code == 0) {
          that.setData({ 
            walletMoney: resdata.data.data,
            repayInput:'',
            list:[]
          });
          that.getMoneyListByNet(1);
        } 
      },
      fail: (resdata) => {
        my.hideLoading();
      }
    });
  },

  /**
 * 监听金额输入
 */
  onMoneyInput(value) {
    console.log("####"+value);
    var reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
    if (reg.test(value)) { //正则匹配通过，提取有效文本
      value = value.replace(reg, '$2$3$4'); 
    }
    else { //正则匹配不通过，直接清空
      value = '';
    }
    if (value.indexOf(".") < 0 && value != "") { 
		value = parseFloat(value);
	  }
    
    this.setData({ repayInput: value });
    if(value>this.data.walletMoney){
      my.showToast({
          type: 'none',
          content: '余额不足',
          duration: 1000,
          success: () => {
          },
        });
        return;
    }

  },

  //申请提现
  tapWithDraw(){
    let that=this;
    console.log(that.data.repayInput);
     var url = app.serverUrl + '/cardMemberCashOut/blank';
     my.showLoading();
    my.request({
      url: url,
      method: 'POST',
      data: {
        userId: app.globalData.memberId,
        wallet:that.data.repayInput
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: (resdata) => { 
        my.hideLoading();
        console.log("###"+JSON.stringify(resdata));
        console.log("###"+JSON.stringify(resdata.data.code));
        if (resdata.data.code == 0) {
          that.requestMemberData();
        }  
        my.showToast({
          type: 'none',
          content: resdata.data.msg,
          duration: 1000,
          success: () => {
          },
        });
      },
      fail: (resdata) => {
        my.hideLoading();
        my.showToast({
          type: 'none',
          content: '申请提现失败 ！！！',
          duration: 1000,
          success: () => {
          },
        });
      }
    });
  },


//获取提现记录列表,接口带分页
/**
 * 返回的数据格式
 *  {{"pageNo":1,"current_page":1,"pageSize":10,
 * "per_page":10,"total":0,"totalPage":0,"last_page":0,
 * "lastVisitTime":1609396525230,"rows":[]}} 
 */
getMoneyListByNet(pageNo){
   var url = app.serverUrl + '/cardMemberCashOut/loadPage';
    my.request({
      url: url,
      method: 'POST',
      data: {
        userId: app.globalData.memberId,
        pageNo:pageNo,
        pageSize:10
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: (resdata) => { 
        my.hideLoading();
        console.log("###"+JSON.stringify(resdata));
        console.log("###"+JSON.stringify(resdata.data.code));
        if (resdata.data.code == 0) {
          this.setData({list: resdata.data.data.rows});
        } 
      },
      fail: (resdata) => {
        my.hideLoading();
      }
    });


}




});
