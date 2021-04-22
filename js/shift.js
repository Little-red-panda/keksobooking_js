'use strict';
(() => {
  
  
  const {mainPin, newAddress, MAIN_PIN_HEIGHT, MAIN_PIN_WIDTH, MAIN_PIN_TIP} = window.validation
  

  const mapTop = 130
  const mapBottom = 630
  const mapLeft = 0
  const mapRight = 1200

  const dregLimit = {
    top: mapTop - (MAIN_PIN_HEIGHT - MAIN_PIN_TIP),
    right: mapRight - Math.ceil(MAIN_PIN_WIDTH / 2),
    bottom: mapBottom,
    left: mapLeft + Math.ceil(MAIN_PIN_WIDTH / 2) - MAIN_PIN_WIDTH
  }
  

  const onMainPinSetAddressMouseDown = (evt) => {
    evt.preventDefault()
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    }
    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      }
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      }
      let coordinate = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      }
      if (coordinate.x < dregLimit.left) {
        coordinate.x = dregLimit.left
      } else if (coordinate.x > dregLimit.right) {
        coordinate.x = dregLimit.right
      }

      if (coordinate.y < dregLimit.top) {
        coordinate.y = dregLimit.top
      } else if (coordinate.y > dregLimit.bottom) {
        coordinate.y = dregLimit.bottom
      }

      mainPin.style.top = `${coordinate.y}px`
      mainPin.style.left = `${coordinate.x}px`
      newAddress()
    }
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault
      newAddress()
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
  
  
  mainPin.addEventListener('mousedown', onMainPinSetAddressMouseDown)
})()