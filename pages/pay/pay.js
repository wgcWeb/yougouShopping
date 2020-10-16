// pages/pay/pay.js
import {
  request
} from '../../request/index.js'
import {
  requestPayment, showToast
} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../utils/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击 支付
  async handleOrderPay() {
    try {
      // 1.判断缓存中有没有token
      const token = wx.getStorageSync('token')
      // 2.判断
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        })
        return
      }
      // 3.创建订单 请求头参数
      // const header = {
      //   Authorization: token
      // }
      // 请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address
      const cart = this.data.cart
      let goods = []
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      }
      // 创建订单 获取订单编号
      const {
        order_number
      } = await request({
        url: '/my/orders/create',
        method: 'POST',
        data: orderParams,
        // header: header
      })
      // 预支付接口
      const {
        pay
      } = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        // header,
        data: {
          order_number
        }
      })
      // 发起微信支付
      await requestPayment(pay)
      // 查询后台 订单状态
      const res = await request({
        url: '/my/orders/chkOrder',
        method: 'POST',
        // header,
        data: {
          order_number
        }
      })
      await showToast({title:"支付成功"})
      // 手动删除已支付商品
      let newCart=wx.getStorageSync('cart')
      newCart=newCart.filter(v=>!v.checked)
      wx.setStorageSync('cart', newCart)
      wx.navigateTo({
        url: '/pages/order/order',
      })
    } catch (error) {
      await showToast({title:"支付失败"})
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
    // 1.获取缓存中的收货地址
    const address = wx.getStorageSync('address')
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart') || []
    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked)
    // 计算全选
    // every() 空数组返回true
    // const allChecked=cart.length?cart.every(v=>v.checked):false
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
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