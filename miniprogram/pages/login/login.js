// miniprogram/pages/login/login.js
import { getDb } from '../../utils/connectDb';
import{setStorage}from '../../utils/storage';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    pw: null,
  },
  goToRegister() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  handleNameInout(ev) {
    this.setData({
      name: ev.detail.value
    });
  },
  handlePwInout(ev) {
    this.setData({
      pw: ev.detail.value
    });
  },
  handleLogin() {
    console.log(wx)
    let obj = {
      name: this.data.name,
      pw: this.data.pw
    }
    getDb('users', obj).then(res => {
      console.log(res)
      let obj = {
        name:res[0].name,
        pet:res[0].pet
      };
      if(res.length){
        
        setStorage('user',JSON.stringify(obj))
        wx.switchTab({
          url: '/pages/home/home'
        });
      }else{
        wx.showToast({
          title: '名字或密码错误',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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