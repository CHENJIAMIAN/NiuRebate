var app = getApp();

Page({
  data: {
    dpListData: [{
      img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
      dianming: "辣椒胡",
      type: "火锅烧烤",
      position: "余杭区",
      distance: "14.6",
      price: "54.5",
    },
    {
      img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
      dianming: "辣椒胡",
      type: "火锅烧烤",
      position: "余杭区",
      distance: "14.6",
      price: "54.5",
    }],
    hdListData: [
      {
        img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
        name: "向西系：中秋国庆限时特惠",
      }, {
        img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
        name: "向西系：中秋国庆限时特惠",
      },
    ],
    gmListData: [
      {
        img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
        name: '小王',
        job: '电商运营',
        month: '1',
        monney: '２００',
        desc: '真的很划算，一年才１９.９元，和朋友出去吃一顿饭就能赚回来',
      }, {
        img: 'https://gw.alipayobjects.com/mdn/rms_eb2664/afts/img/A*bFuBQZuNErMAAAAAAAAAAABkARQnAQ',
        name: '小王',
        job: '电商运营',
        month: '1',
        monney: '２００',
        desc: '真的很划算，一年才１９.９元，和朋友出去吃一顿饭就能赚回来',
      },
    ],
  },
  onLoad() {
    // my.pageScrollTo({
    //   scrollTop: parseInt(600),
    // });
  },


   buyCard() {

    var url = app.serverUrl + '/aliMember/buyCard';

    my.request({
      url: url,
      method: 'POST',
      data: {
        memberId: app.globalData.memberId
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (resdata) {


        if (resdata.data.code == 0) {

          var tradeNo = resdata.data.data.tradeNo;

          my.tradePay({
            tradeNO: tradeNo,
            success: function (res) {

              

              my.reLaunch({
                url: '/pages/mine/mine'
              })
              
            },
            fail: function (res) {

              my.reLaunch({
                url: '/pages/mine/mine'
              })

            },
          });

        } else {

          my.showToast({
            type: 'fail',
            content: '会通会员失败，稍后重试',
            duration: 1000,
            success: () => {
            }, 
          });


          my.reLaunch({
            url: '/pages/mine/mine'
          })
        }

      },
      fail: function (resdata) {
        console.log(resdata);
      }
    });

  },

});
