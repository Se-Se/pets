// components/camera/camera.js
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
    src: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    takePhoto() {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        resolution :'high',
        success: (res) => {
          this.setData({
            src: res.tempImagePath
          });
          this.triggerEvent('myevent', res.tempImagePath)
        }
      })
    },
    error(e) {
      console.log(e.detail)
    }
  }
})
