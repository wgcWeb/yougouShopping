// pages/feedback/feedback.js
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
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    // 被选中的图片路径数组
    chooseImgs:[],
    // 文本域的内容
    textVal:""
  },
  UpLoadImgs: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
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

  // 选择图片
  handleChooseImg(){
    // 小程序内置选择图片api
    wx.chooseImage({
      // 同时选中图片数量
      count: 0,
      // 图片格式 原图 压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 照相机
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          // 图片数组拼接
          chooseImgs: [...this.data.chooseImgs,...res.tempFilePaths]
        })
      }
    })
  },

  // 文本域输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },

  // 提交按钮点击事件 
  handleFormSubmit(){
    const {textVal,chooseImgs}=this.data
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      })
      return
    }
    // 显示正在等待的图标
    wx.showLoading({
      title: '正在上传中',
      mask: true
    })

    if(chooseImgs.length !=0){
      chooseImgs.forEach((v,i)=>{
        wx.uploadFile({
          filePath: v,
          name: 'file',
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          success:res=>{
            console.log(res);
            let url=JSON.parse(res.data).url
            this.UpLoadImgs.push(url)
  
            // 所有图片上传完毕才触发
            if(i===chooseImgs.length-1){
              // 
              console.log("把文本的内容和外网的图片数组 提交到后台中");
              // 提交成功
              // 重置页面
              this.setData({
                textVal:"",
                chooseImgs:[]
              })
            }
          }
        })
      })
    }
    wx.hideLoading()
    console.log("提交了文本");
    wx.navigateBack({
      delta: 1,
    })
  },

  // 点击自定义图片组件
  handleRemoveImg(e){
    const {index}=e.currentTarget.dataset
    let {chooseImgs}=this.data
    chooseImgs.splice(index,1)
    this.setData({
      chooseImgs
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