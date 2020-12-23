Page({
  data: {},
  onLoad() {},
  payCode() {
    // 打开付款码
    my.ap.navigateToAlipayPage({
        appCode:'payCode',
        success:(res) => {
            my.alert({content:'成功：'+JSON.stringify(res)});
        },
        fail:(res) => {
            my.alert({content:'失败：'+JSON.stringify(res)});
        }
    });
  },

});
