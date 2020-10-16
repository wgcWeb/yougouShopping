// pages/goods_list/goods_list.js
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../utils/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList: []
  },
  QueryParams:{
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||""
    this.QueryParams.query=options.query||""
    this.getGoodsList()
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    // 获取总条数
    const total = res.total
    // 计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    // console.log(this.totalPages);
    
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh()
  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 1.获取被点击的标题索引
    const {index} =e.detail
    // 2.修改数组
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    // 3.赋值到data中
    this.setData({
      tabs
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
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum=1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断还有没有下页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下页数据
      wx.showToast({
        title: '没有下页数据'
      })
      
    }else{
      // 还有下页数据
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})