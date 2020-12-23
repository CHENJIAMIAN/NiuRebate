Component({
  mixins: [],
  data: {
    showPayBtn: false,
  },
  props: {
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    tapShowPay() {
      this.setData({ showPayBtn: true })
    },
    tapHidePay() {
      this.setData({ showPayBtn: false })
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
    alipayScan() {
      // 打开支付宝扫一扫
      my.ap.navigateToAlipayPage({
        appCode: 'alipayScan',
        success: (res) => {
          // my.alert({content:'成功：'+JSON.stringify(res)});
        },
        fail: (res) => {
          // my.alert({content:'失败：'+JSON.stringify(res)});
        }
      });
    },

  },
});
