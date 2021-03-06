const app = getApp()
const pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
import Address from '../../../api/address.js'
Page({
  data: {

  },
  onLoad: function (options) {

  },
  getInput(e){
    let k = e.currentTarget.dataset.key,
        v = e.detail.value,
        o = {};
    o[k] = v;
    this.setData(o);
  },
  chooseGender(e){
    this.setData({
      gender:e.detail.value
    })
  },
  showToast(str){
    wx.showToast({
      title: str,
      icon:'none'
    })
  },
  exam(){
    let data = this.data;
    if(!data.name){
      this.showToast('请输入姓名')
      return false;
    }
    if (!data.phone) {
      this.showToast('请输入手机号码')
      return false;
    }
    if (!data.gender) {
      this.showToast('请选择性别')
      return false;
    }
    if (!pattern.test(data.phone)){
      this.showToast('请输入正确的手机号码')
      return false;
    }
    if (!data.addr) {
      this.showToast('请输入收货地址')
      return false;
    }
    return true;
  },
  addAddr(){
    let valid = this.exam();
    if(!valid){
      return false;
    }
    let data = this.data;
    
    let param = {
      addr:data.addr,
      phone:data.phone,
      name:data.name,
      gender:data.gender,
      uid:app.globalData.userInfo.id
    };
    (new Address()).add(param).then((res)=>{
      this.showToast('添加地址成功');
      wx.redirectTo({
        url: '../list/list'
      })
    })
  }
})