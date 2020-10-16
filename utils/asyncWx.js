/**
 * promise形式的showModal
 * @param {object} param0 参数 
 */
export const showModal=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      content: content,
      title: '提示',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success:res=>{
        resolve(res)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}

export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...pay,
      success: res=>{
        resolve(res)
      },
      fail: err=>{
        reject(err)
      }
    })
  })
}