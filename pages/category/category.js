// pages/category/category.js
import {
  request
} from "../../request/index.js"
const regeneratorRuntime = require('../../utils/runtime/runtime.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取本地存储中的数据
    const Cates = wx.getStorageSync('cates');
    // 2.判断
    if (!Cates) {
      // 不存在 发送请求数据
      this.getCates();
    } else {
      // 有旧的数据 定义过期时间 10秒改成5分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates();
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },

  // 获取分类数据
  async getCates() {
    // request({
    //   url: '/categories'
    // }).then(res => {
    //   this.Cates = res.data.message;
    //     // 把接口的数据存入到本地存储中
    //     wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});

    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    // })

    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
    //   success: (res) => {

    //   }
    // })

    // 使用es7的async await来发送请求
    const res = await request({
      url: '/categories'
    });
    this.Cates = res
    // 把接口的数据存入到本地存储中
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    });

    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  // 左侧菜单的点击事件
  handleItemTap(e) {
    // 1.获取被点击的标题身上的索引
    // 2.给data中的currentInde赋值就可以了
    // 3.根据不同的索引来渲染右侧的商品内容
    const {
      index
    } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })

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