'use strict';
(() => {
  const {load, upload} = window.backend
  const {map, mapPins, onError} = window.cityPlan
  const {closeCard} = window.card
  const {getPins} = window.pins
  const {
    form, inputTitle, inputAddress, inputPrice, inputCapacity,
    mainPin, pinCenterPositionX, pinCenterPositionY, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT,
    newAddress, deleteRedBorder
  } = window.validation

  // Поля формы в неактивном состоянии
  const fieldsets = document.querySelectorAll('fieldset')
  fieldsets.forEach(el => el.setAttribute('disabled', 'disabled'))

  const activatePage = () => {
    map.classList.remove('map--faded')
    form.classList.remove('ad-form--disabled')
    fieldsets.forEach(el => el.removeAttribute('disabled'))
    const onLoad = (data) => {
      mapPins.append(getPins(data))
    }
    load(onLoad, onError)
    newAddress()
  }

  const inactivatePage = () => {
    map.classList.add('map--faded')
    form.classList.add('ad-form--disabled')
    fieldsets.forEach(el => el.setAttribute('disabled', 'disabled'))
    clearPins()
    closeCard()
  }
  const clearPins = () => {
    const samePins = map.querySelectorAll('.map__pin:not(.map__pin--main')
    if (samePins) {
      samePins.forEach(el => {
        el.parentNode.removeChild(el)
      })
    }
  }

  // Реализация функционала кнопки "очистить"
  const resetForm = () => {
    deleteRedBorder(inputTitle)
    deleteRedBorder(inputPrice)
    deleteRedBorder(inputCapacity)
    form.reset()
    inactivatePage()
    mainPin.style.top = (pinCenterPositionY - MAIN_PIN_WIDTH / 2) + 'px'
    mainPin.style.left = (pinCenterPositionX - MAIN_PIN_HEIGHT / 2) + 'px'
    inputAddress.value = `${pinCenterPositionX}, ${pinCenterPositionY}`
  }
  const btnReset = form.querySelector('.ad-form__reset')
  btnReset.addEventListener('click', () => resetForm())

// Реализация функционала кнопки "отправить"
  form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    upload(
      () => {
        showSuccessMessage()
        resetForm()
      },
      showErrorMessage,
      new FormData(form)
    )
  })
  const showSuccessMessage = () => {
    addMessage('success')
    document.addEventListener('click', bannerClick)
    document.addEventListener('keydown', bannerKeyDown)
  }
  const showErrorMessage = () => {
    addMessage('error')
    document.addEventListener('click', bannerClick)
    document.addEventListener('keydown', bannerKeyDown)
  }
  const addMessage = (submissionResult) => {
    const newTemplate = document.querySelector(`#${submissionResult}`).content.querySelector(`.${submissionResult}`)
    const el = newTemplate.cloneNode(true)
    map.appendChild(el)
  }
  const closeBanner = () => {
    let messege = document.querySelector(`.success`)
    if (messege) {
      messege.remove()
    } else {
      messege = document.querySelector(`.error`)
      messege.remove()
    }
    
    document.removeEventListener(`click`, bannerClick)
    document.removeEventListener(`keydown`, bannerKeyDown)
  }
  const bannerClick = () => {
    closeBanner()
  }
  const bannerKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeBanner()
    }
  }

  window.main = {
    fieldsets,
    activatePage
  }
})()