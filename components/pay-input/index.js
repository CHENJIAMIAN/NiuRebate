Component({
  data: {
    // repayAmount: '',
    focus: false,
    hasClickedClear: false,
  },
  props: {
    className: '',
    focus: false,
    placeholder: '',
    extraText: '',
    disabled: false,
    hasExtraText: true,
    hasMoneySymbol: true,
    maxLength: 99,
    hasClear: true,
    titleTip: '',
    repayAmount: '',
    onTapExtra: f => f,
    onInput: f => f,
    onBlur: () => {},
    onFocus: () => {},
  },
  didUpdate() {
  },
  methods: {
    onTapExtra() {
      this.props.onTapExtra();
    },
    onInput(e) {
      const { cursor, value: rawValue } = e.detail;
      this.props.onInput(rawValue);

      if (cursor !== undefined) return { cursor };
    },
    onConfirm(e) {
      const value = e.detail.value;
      this.props.onConfirm && this.props.onConfirm(value);
    },
    onFocus() {
      this.setData({
        focus: true,
      });
      this.props.onFocus();
    },
    handleBlur(e) {

    },
    onClearTap() {
      this.setData({
        focus: true,
        hasClickedClear: true,
      });
      this.props.onInput && this.props.onInput('');
    },
  },
});
