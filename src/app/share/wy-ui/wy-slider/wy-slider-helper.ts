function sliderEvent(e: Event) {
  // 阻止默认
  e.stopPropagation()
  e.preventDefault()
}
function getElementOffset(el: HTMLElement): { top: number; left: number } {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    }
  }
  const rect = el.getBoundingClientRect()
  // 取到元素的document节点,document所在的window
  const win = el.ownerDocument.defaultView
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  }
}


export { sliderEvent, getElementOffset }
