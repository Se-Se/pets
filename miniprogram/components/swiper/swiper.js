// components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperInfo: {
      indicatorDots: false,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 2000,
      circular: true,
      
    },
    swiperArr: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      this.setData({
        swiperArr: test_swiper
      })
    }
  },
  ready() {
    this.init()
  }
})
const test_swiper = [
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food1.jpg?sign=8949fd99b2185daa082f3498dc13a39b&t=1615951070',
    name: '商品名1',
    price: '￥39.0',

  },
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food2.jpg?sign=1dc12821848e9a69ddc3b30c9156b09e&t=1615951103',
    name: '商品名',
    price: '￥39.0',

  },
  {
    img: 'https://7368-shops-6guf8y5z1a8e9bbb-1305216326.tcb.qcloud.la/shops-img/food3.jpg?sign=f8e8196e196862e7b8ce61f1db35a6f2&t=1615951122',
    name: '商品名',
    price: '￥39.0',

  },
]
