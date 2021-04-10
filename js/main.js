'use strict';
(() => {
  const {generateNotices} = window.dataNotices
  const {map, mapPins} = window.cityPlan
  const {closeCard} = window.card
  const {getPins} = window.pins
  const {form, newAddress} = window.validation
  // Поля формы в неактивном состоянии
  const fieldsets = document.querySelectorAll('fieldset')
  fieldsets.forEach(el => el.setAttribute('disabled', 'disabled'))

  const activatePage = () => {
    map.classList.remove('map--faded')
    form.classList.remove('ad-form--disabled')
    fieldsets.forEach(el => el.removeAttribute('disabled'))
    mapPins.append(getPins(generateNotices))
    newAddress()
  }

  const clearPins = () => {
    const samePins = map.querySelectorAll('.map__pin:not(.map__pin--main')
    if (samePins) {
      samePins.forEach(el => {
        el.parentNode.removeChild(el)
      })
    }
  }
  const inactivatePage = () => {
    map.classList.add('map--faded')
    form.classList.add('ad-form--disabled')
    fieldsets.forEach(el => el.setAttribute('disabled', 'disabled'))
    clearPins()
    closeCard()
  }

  window.main = {
    fieldsets,
    activatePage,
    inactivatePage
  }
})()