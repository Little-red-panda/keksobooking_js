'use strict';
;(() => {
  window.debounce = (func, wait) => {
    let timeout
    return function() {
      const context = this
      const args = arguments
      const later = () => {
        timeout = null
        func.apply(context, args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
})()