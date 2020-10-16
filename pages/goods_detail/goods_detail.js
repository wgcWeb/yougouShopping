// pages/goods_detail/goods_detail.js
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../utils/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
    goodsObj:{},
    isCollect: false
  },
  // 商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getDetailList(goods_id)
  },

  // 获取商品详情
  async getDetailList(goods_id){
    const goodsObj = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    this.GoodsInfo=goodsObj
    // 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync('collect')||[]
    // 判断当前商品是否被收藏了
    let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.setData({
      goodsObj:{
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机,不识别webp图片格式
        // 找后端工程师修改
        // 自己临时修改
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: goodsObj.pics
      },
      isCollect
    })
  },

  // 点击轮播图放大预览
  handlePrevewImage(e){
    // 1.先构造要预览的图片数组
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },

  // 点击加入购物车
  handleCartAdd(){
    // 1.获取缓存中的购物车数组
    let cart=wx.getStorageSync('cart')||[]
    // 2.判断 商品对象是否存在与购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index===-1){
      // 不存在 第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo)
    }else{
      // 已经存在购物车数据 执行 num++
      cart[index].num++
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart)
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户手抖,疯狂点击
      mask: true
    })
  },

  // 点击商品收藏图标
  handleCollect(){
    let isCollect = false
    // 获取缓存中的商品收藏数组
    let collect =wx.getStorageSync('collect')||[]
    // 判断该商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index!==-1){
      collect.splice(index,1)
      isCollect=false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    }else{
      collect.push(this.GoodsInfo)
      isCollect=true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 存入缓存
    wx.setStorageSync('collect', collect)
    // 修改data中 isCollect
    this.setData({
      isCollect
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
    let pages = getCurrentPages()
    let currentPage=pages[pages.length-1]
    let options = currentPage.options
    const {goods_id} = options
    this.getDetailList(goods_id)
    
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