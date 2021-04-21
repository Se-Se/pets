// miniprogram/pages/main/main.js
import { cloudUpSingleFile, getDb, updateDb } from '../../utils/connectDb.js';
import { getStorage } from '../../utils/storage';
import { isLogin } from '../../utils/login';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'),
    petImg: '../../images/dog_cat.jpg',
    showCamera: false,
    petName: ''
  },
  // 初始话宠物头像
  initPetInfo() {
    wx.getStorage({
      key: 'pet_info',
      success: (res) => {
        let info = JSON.parse(res.data);
        this.setData({
          petImg: info.head_img,
          petName: info.pet_name
        })
      },
      fail: () => {
        getStorage('user').then(res => {
          console.log(res)
          let info = JSON.parse(res);
          getDb('users', info).then(res => {
            wx.setStorage({
              key: "pet_info",
              data: JSON.stringify(res[0]),
              success: () => {
                this.setData({
                  petImg: res[0].head_img,
                  petName: res[0].pet_name,
                });
              }
            });
          });
        });
      }
    })
  },
  // 变更宠物头像
  changePetImg() {
    cloudUpSingleFile('pet_header_img').then(res => {
      updateDb('users', { owner: 'zd', password: '123' }, 'head_img', res[0].fileID).then(() => {
        wx.setStorage({
          key: "pet_head_img",
          data: res[0].fileID,
          success: () => {
            this.setData({
              petImg: res[0].fileID
            }, () => {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                mask: true,
                duration: 1500,
              });
            });
          },
          complete: () => {
            wx.hideLoading({})
          }
        });

      });

    });

  },

  init() {
    isLogin().then(res => {
      if (res) {
        this.initPetInfo()
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'error',
          duration: 2000,
          complete: () => {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/home/home'
              });
            }, 1000)

          }
        })

      }
    })

  },
  bindViewTap() {
    wx.navigateTo({
      url: '.././login/login'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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