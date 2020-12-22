Page({
  data: {
    id:0,
    name:'',
    discount:0.0,
    realTimeRate:0.0,
    bountyRate:0.0,
    img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
    amountValue: "",
    discountValue: "",
    realValue: "",
    bountyValue: "",
    showBottom: false,
  },
  onLoad(query) { 
    console.log(query);
    this.setData({
      id: query.id,
      name: query.name,
      discount: query.discount,
      realTimeRate: query.realTimeRate,
      bountyRate: query.bountyRate,
      img: query.img
    });
  },
  onInput(e) {
    let val = e.detail.value;
    let dis = this.data.discount;
    var discountVal = '', realValue = '', bountyValue = '';
    if (val){
      let dv = dis * val;
      let rate = parseFloat(this.data.realTimeRate) + parseFloat(this.data.bountyRate);
      discountVal = this.getnum(dv * rate);
      realValue = this.getnum(dv * parseFloat(this.data.realTimeRate));
      bountyValue = this.getnum(dv * parseFloat(this.data.bountyRate));
    }
    this.setData({ 
      amountValue: e.detail.value,
      discountValue: discountVal,
      realValue: realValue,
      bountyValue: bountyValue
    });
  },
  showDetail() {
    this.setData({
      showBottom: !this.data.showBottom,
    });
  },
  onPopupClose() {
    this.setData({
      showBottom: false,
    });
  },

  getnum(num){
    return Math.round(num*100)/100;
  },

  payCode() {
      // 打开付款码
      my.ap.navigateToAlipayPage({
        appCode: 'payCode',
        success: (res) => {
          // my.alert({content:'成功：'+JSON.stringify(res)});
        },
        fail: (res) => {
          // my.alert({content:'失败：'+JSON.stringify(res)});
        }
      });
    },
});
