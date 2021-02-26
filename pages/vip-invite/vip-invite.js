var app = getApp();

Page({
  data: {
    rootImgPath:'',
    avatar:'/assets/img/yh.png',
        phone:'',
        tip:'您还不是会员',
        btnLabel:'19.9元/年 开通VIP会员',
        memberFlag:0,
    dpListData: [{
      img: '/static/wxAliImg/shop1.jpg',
      dianming: "表嫂小厨",
      type: "粤菜",
     // position: "海珠区",
     // distance: "14.6km",
      price: "68",
      fanli:'6'
    },
    {
      img: '/static/wxAliImg/shop2.jpg',
      dianming: "八哥酸菜鱼",
      type: "火锅烧烤",
      //position: "荔湾区",
      //distance: "21.8km",
      price: "54.5",
      fanli:"5"
    },
    {
      img: '/static/wxAliImg/shop3.jpg',
      dianming: "猪腰一家",
      type: "火锅烧烤",
     // position: "越秀区",
     // distance: "14.6km",
      price: "59.9",
      fanli:"4.5"
    }
  ],
    hdListData: [
      {
        img: '/static/wxAliImg/activity1.jpg',
        name: "会员限时特惠",
      }, {
        img: '/static/wxAliImg/activity2.jpg',
        name: "超级会员日",
      },
    ],
    gmListData: [
      {
        img: '/static/wxAliImg/head1.jpg',
        name: '老王',
        job: '电商运营',
        month: '3',
        monney: '２００',
        desc: '真的很划算，一年才１９.９元，和朋友出去吃一顿饭就能赚回来',
      }, {
        img: '/static/wxAliImg/head2.jpg',
        name: '小李',
        job: '程序员',
        month: '1',
        monney: '160',
        desc: '超划算，平时随便买点水果吃就已经省回来了',
      },
       {
        img: '/static/wxAliImg/head3.jpg',
        name: '小张',
        job: '室内设计',
        month: '1',
        monney: '138',
        desc: '真的很划算，即付即返,比其它的平台的优惠卷红包之类来得更实在',
      },
    ],
  },
  onLoad() {
    // my.pageScrollTo({
    //   scrollTop: parseInt(600),
    // });
    var that = this;

    that.setData({
      rootImgPath:app.rootImgPath
      //rootImgPath:'http://127.0.0.1:9800/'
    });

    
    var url = app.serverUrl + '/aliMember/login';

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

         var bean = resdata.data.data;
          if (bean.memberFlag == 0){
              that.setData({
                  avatar: bean.avatar,
                  phone: bean.phone,
                  tip:'您还不是会员',
                  btnLabel:'19.9元/年 开通VIP会员',
                  memberFlag:0
              });
          }else if (bean.memberFlag > 0){
              that.setData({
                  avatar: bean.avatar,
                  phone: bean.phone,
                  tip:'您已经是会员',
                  btnLabel:'返回会员界面',
                  memberFlag:1
              });
          }

        } else {

        }

      },
      fail: function (resdata) {
        console.log(resdata);
      }
    });

  },


   buyCard() {

    if (this.data.memberFlag == 1){
         my.reLaunch({
            url: '/pages/mine/mine'
          })
        return;
    }

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
