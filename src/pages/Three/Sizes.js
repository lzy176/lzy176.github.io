/**
 * 屏幕尺寸
*/
export default class Sizes {
  /**
   * Constructor
   */
  constructor(options) {

    // Viewport size
    this.$sizeViewport = options.dom

    this.viewport = {
      width: 0,
      height: 0
    }

    // Resize event
    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    this.resize()
  }

  /**
   * 目前用于监听历史记录执行 historyChange
   * @param event 事件
   * @param fun 执行
   */
  $on(event, fun) {
    this.emitter.on(
      event,
      () => {
        fun()
      }
    )
  }

  /**
   * Resize
   */
  resize() {
    // 可视区域大小
    this.viewport.width = this.$sizeViewport.offsetWidth
    this.viewport.height = this.$sizeViewport.offsetHeight

    this.changeSize();
  }
  changeSize() { }
}