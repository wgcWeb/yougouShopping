// pages/auth/auth.js
import {request} from '../../request/index.js'
import {
  login
} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../utils/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取用户信息
  async handleGetUserInfo(e){
    const {encryptedData,rawData,iv,signature} = e.detail
    console.log(encryptedData);
    console.log(rawData);
    console.log(iv);
    console.log(signature);
    
    // 获取小程序登录成功后的code
    const {code}=await login()
    const loginParams={encryptedData,rawData,iv,signature,code}
    // 发送请求
    const res=await request({
      url: "/users/wxlogin",
      data: loginParams,
      method: "POST"
    })
    console.log(res);
    // 存入缓存,跳转页面
    wx.setStorageSync('token', token)
    wx.navigateBack({
      delta: 1,
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