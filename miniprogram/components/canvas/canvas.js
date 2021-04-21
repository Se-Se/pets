// components/canvas/canvas.js
import { HEARTLOADING } from './heart';
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
  },
  ready: function () {
    this.init();
  },
  detached() {
    console.log(1111);
    HEARTLOADING.canvasInit();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      HEARTLOADING.init(this);
    },
  }
})
