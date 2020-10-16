// pages/order/order.js
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../utils/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 根据标题索引来激活选中,标题数组
  changeTitleByIndex(index){
    // 2.修改数组
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    // 3.赋值到data中
    this.setData({
      tabs
    })
  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 1.获取被点击的标题索引
    const {index} =e.detail
    this.changeTitleByIndex(index)
    // 重新发送请求
    this.getOrders(index+1)
  },

  // 获取订单列表的方法
  async getOrders(type){
    const res=await request({
      url: '/my/orders/all',
      data: {
        type
      }
    })
    this.setData({
      orders: res.orders.map(v=>({...v,create_time_cn:v.create_time_cn(new Date(v.create_time*1000).toLocaleString())}))
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
    const token=wx.getStorageSync('token')
    if(!token){
      // wx.navigateTo({
      //   // url: '/pages/auth/auth',
      // })
      // return
    }
    let pages = getCurrentPages()
    let currentPage=pages[pages.length-1]
    const {type} = currentPage.options
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
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