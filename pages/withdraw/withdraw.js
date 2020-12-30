Page({
  data: {
    img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
    repayInput: ''
  },
  onLoad() { },

  /**
 * 监听还款金额输入
 */
  onMoneyInput(value) {
    this.setData({ repayInput: value });
  },

  tapWithDraw(){
    alert(this.data.repayInput)
  },
});
