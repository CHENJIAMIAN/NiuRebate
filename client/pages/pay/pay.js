Page({
  data: {
    id:0,
    name:'',
    discount:0.0,
    img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
    amountValue: "",
    discountValue: "",
    showBottom: false,
  },
  onLoad(query) { 
    console.log(query.id + '====' + query.name);
    this.setData({
      id: query.id,
      name: query.name,
      discount: query.discount,
      img: query.img
    });
  },
  onInput(e) {
    let val = e.detail.value;
    let dis = this.data.discount;
    var discountVal = '';
    if (val){
      discountVal = dis * val;
    }
    this.setData({
      amountValue: e.detail.value,
      discountValue: discountVal
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
