// pages/cart/cart.js
import {
  showModal,
  showToast
} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../utils/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击收货按钮
  handleChooseAddress() {
    // 获取权限状态
    // wx.getSetting({
    //   success: (res)=>{
    //     console.log(res);

    //     const scopeAddress = res.authSetting["scope.address"]
    //     console.log(scopeAddress);

    //     if(scopeAddress===true|| scopeAddress===undefined){
    //       wx.chooseAddress({
    //         success: (res1) => {
    //           console.log(res1);
    //         },
    //       })
    //     }else{
    //       console.log("4124214214214");

    //       // 用户拒绝过授权页面, 先诱导用户到开授权页面
    //       wx.openSetting({
    //         success: (res2) => {
    //           console.log(res2);

    //           wx.chooseAddress({
    //             success: (res3) => {
    //               console.log(res3);

    //             },
    //           })
    //         } 
    //       })
    //     }
    //   },
    // })
    wx.chooseAddress({
      success: (res) => {
        let address = res
        address.all = res.provinceName + res.cityName + res.countyName + res.detailInfo
        wx.setStorageSync('address', address)
      }
    })


  },


  handleItemChange(e) {
    // 获取被修改商品的id
    const goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let {
      cart
    } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },

  // 设置购物车状态
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  },

  // 商品全选功能
  handleItemAllCheck() {
    let {
      cart,
      allChecked
    } = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },

  // 商品数量编辑功能
  async handleItemNumEdit(e) {
    const {
      operation,
      id
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    const index = cart.findIndex(v => v.goods_id === id)

    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({content:"您是否要删除?"})
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },

  // 点击结算
  async handlePay(){
    // 1.判断收获地址
    const {address,totalNum} = this.data
    if(!address.userName){
      await showToast({
        title: '您还没选择收货地址'
      })
      return 
    }
    // 2.判断用户有没有选购商品
    if(totalNum===0){
      await showToast({
        title: '您还没有选购商品'
      })
      return
    }
    // 3.跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay'
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
    // 1.获取缓存中的收货地址
    const address = wx.getStorageSync('address')
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart') || []
    // 计算全选
    // every() 空数组返回true
    // const allChecked=cart.length?cart.every(v=>v.checked):false
    this.setData({
      address
    })
    this.setCart(cart)
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