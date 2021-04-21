// miniprogram/pages/register/register.js
import {
  getDb,
  addDbCloudInfo
} from '../../utils/connectDb';
import {
  setStorage
} from '../../utils/storage';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reg_name: null,
    reg_pw: null,
    reg_pet: null
  },
  handleInput(ev) {
    let attr = ev.currentTarget.dataset.type;
    this.setData({
      [attr]: ev.detail.value
    });
  },
  handleRegister() {
    if (this.data.reg_name.trim() === '') {
      wx.showToast({
        title: '请填写铲屎官名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (this.data.reg_pw.trim() === '') {
      wx.showToast({
        title: '请填写密码',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    let obj = {
      name: this.data.reg_name,
    }
    getDb('users', obj).then(res => {
      console.log(res)
      if (res.length) {
        wx.showToast({
          title: '用户名已存在',
          icon: 'error',
          duration: 2000
        })
      } else {
        let info = {
          name: this.data.reg_name,
          pw: this.data.reg_pw,
          pet: this.data.reg_pet
        }
        addDbCloudInfo('users', info).then(res => {
          console.log(res)
          if (res.errMsg && res.errMsg.search('ok') !== -1) {
            let data = JSON.stringify(info);
            setStorage('user', data);
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000,
              success: () => {
                wx.switchTab({
                  url: '/pages/home/home'
                })
              }
            })
          }
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