// miniprogram/pages/login/login.js
import {HEART} from '../../utils/heart';
Page({

  /**
   * 页面的初始数据
   */
   data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
test_canvas(taget){
  const query = wx.createSelectorQuery();
  query.select('#canvas_heart').fields({ node: true, size: true }).exec((res) => {
      console.log(res)
      const canvas = res[0].node;
      taget.canvas = canvas;
      taget.context = canvas.getContext('2d');
      const dpr = wx.getSystemInfoSync().pixelRatio;
      canvas.width = res[0].width * dpr;
      canvas.height = res[0].height * dpr;
      taget.ctx = canvas.getContext("2d");
      taget.width = canvas.width;
      taget.height = canvas.height;
      // size.
      taget.width < 768 ? taget.heartSize = 180 : taget.heartSize = 250;
      taget.mouseY = null;
      // sprite array and quantity.
      taget.hearts = [];
      taget.offHeartNum = 1;
      taget.offHearts = [];
      // offscreen data.
      taget.data = null;

      taget.render();
      taget.offInit();
    })
},
   onLoad:function() {
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      });
      HEART.canvasFun();
      // this.test_canvas(HEART);
  },
  goLogin(){
    console.log(111)
    wx.switchTab({
      url: '/pages/login/login'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserProfile()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserProfile()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})