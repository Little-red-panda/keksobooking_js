'use strict';
(() => {
  const {mainPin, newAddress, MAIN_PIN_HEIGHT, MAIN_PIN_WIDTH, MAIN_PIN_TIP} = window.validation
  const {activatePage} = window.main

  const MOUSE_MAIN_BUTTON = 0

  const mapTop = 130
  const mapBottom = 630
  const mapLeft = 0
  const mapRight = 1200

  const limits = {
    top: mapTop - (MAIN_PIN_HEIGHT - MAIN_PIN_TIP),
    right: mapRight - Math.ceil(MAIN_PIN_WIDTH / 2),
    bottom: mapBottom,
    left: mapLeft + Math.ceil(MAIN_PIN_WIDTH / 2) - MAIN_PIN_WIDTH
  }

  mainPin.addEventListener('mousedown', (evt) => {
    evt.preventDefault()
    let isPageActive = false
    if (evt.button === MOUSE_MAIN_BUTTON && !isPageActive) {
      activatePage()
    }
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
      let coordinates = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      }
      if (coordinates.x < limits.left) {
        coordinates.x = limits.left
      } else if (coordinates.x > limits.right) {
        coordinates.x = limits.right
      }

      if (coordinates.y < limits.top) {
        coordinates.y = limits.top
      } else if (coordinates.y > limits.bottom) {
        coordinates.y = limits.bottom
      }

      mainPin.style.top = `${coordinates.y}px`
      mainPin.style.left = `${coordinates.x}px`
      newAddress()
    }
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault
      isPageActive = true
      newAddress()
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })
})()