Page({
  data: {
    inputValue: '',
  },
  onLoad() { },
  titleClick() {
    my.alert({
      title: 'onActionTap 回调',
      content: '标题后面操作区域点击',
    });
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  tapValidate(){
    // alert(this.data.inputValue)

  }
});
