'use strict';
(() => {
  const {openCard} = window.card
  const getPins = (data) => {
    const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin')
    const fragment = document.createDocumentFragment()
    data.forEach(pinData => {
      const pin = pinTemplate.cloneNode(true)
      const pinImg = pin.querySelector('img')
      pin.style = `left: ${pinData.location.x - pinImg.width / 2}px; top: ${pinData.location.y - pinImg.height / 2}px`
      pinImg.src = pinData.author.avatar
      pinImg.alt = pinData.offer.title
      fragment.append(pin)
      pin.addEventListener(`click`, () => openCard(pinData))
    })
    return fragment
  }
  window.pins = {
    getPins
  }
})()