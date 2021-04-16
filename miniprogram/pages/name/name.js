// miniprogram/pages/name/name.js
import { CANVASTEXT } from '../../utils/canvas_text';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pointsArr: [],
    initCan:true
  },
  handleClick(ev) {
    this.initCanvas('Welcome');
    this.setData({
      initCan:false
    });
    CANVASTEXT.MOUSE.x = ev.detail.x;
    CANVASTEXT.MOUSE.y = ev.detail.y;
    for (var i = 0; i < this.data.pointsArr.length; i++) {
      this.data.pointsArr[i].scatter();
    }
  },
  handleTouchMove(ev) {
    // console.log(ev);
    CANVASTEXT.MOUSE.x = ev.touches[0].x;
    CANVASTEXT.MOUSE.y = ev.touches[0].y;
    for (var i = 0; i < this.data.pointsArr.length; i++) {
    
    }
    console.log(CANVASTEXT.MOUSE)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initCanvas('海   狮');
  },

  initCanvas(name){
    CANVASTEXT.MESSAGE=name;
    if(this.data.initCan){
      CANVASTEXT.canvasInit().then(res => {
        console.log(res);
        this.setData({
          pointsArr:[...res]
        });
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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