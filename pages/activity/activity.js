Page({
  data: {
    id:0,
    title:'',
    bannerImg: '',
    activityImg:''
  },
  onLoad(query) {

    this.setData({
          id: query.id,
          title: query.title,
          bannerImg: query.bannerImg,
          activityImg: query.activityImg
    });

  },
});
