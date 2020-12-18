Page({
  data: {
    img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
    amountValue: "",
    showBottom: false,
  },
  onLoad() { },
  onInput(e) {
    this.setData({
      amountValue: e.detail.value,
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
});
