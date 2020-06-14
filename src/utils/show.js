export function showModal(title, content, fn=function () {
  console.log("默认啥也不做")
}) {
  wx.showModal({
    title,
    content,
    showCancel: false,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        fn()
      }
    }
  })
}
export function showSuccess() {
  wx.showToast({
    title: "成功",
    icon: "success",
    duration: 2000
  })
}
