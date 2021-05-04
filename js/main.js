'use strict';
(() => {
  const {load} = window.backend
  const {upload} = window.backend
  const {map, onError} = window.cityPlan
  const {closeCard} = window.card
  const {
    form, inputTitle, inputAddress, inputPrice, inputCapacity,
    mainPin, pinCenterPositionX, pinCenterPositionY, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT,
    deleteRedBorder, newAddress
  } = window.validation
  const {housingFeatures, filterSelects, onLoad} = window.filtration
  const {previewAvatar, previewPhotos} = window.imageUpload
  
  const MOUSE_MAIN_BUTTON = 0

  // Поля формы и фильтрации в неактивном состоянии
  const formFieldsets = form.querySelectorAll('fieldset')
  formFieldsets.forEach(el => el.setAttribute('disabled', 'disabled'))
  housingFeatures.setAttribute('disabled', 'disabled')
  filterSelects.forEach(el => el.setAttribute('disabled', 'disabled'))

  // Функции активации и деактивации страницы
  const activatePage = () => {
    map.classList.remove('map--faded')
    form.classList.remove('ad-form--disabled')
    window.main.formFieldsets.forEach(el => el.removeAttribute('disabled'))
    filterSelects.forEach(el => el.removeAttribute('disabled'))
    housingFeatures.removeAttribute('disabled')
    load(onLoad, onError)
    newAddress()
    mainPin.removeEventListener('mousedown', onMainPinActivateMouseDown)
  }
  const onMainPinActivateMouseDown = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      activatePage()
    }
  }
  mainPin.addEventListener('mousedown', onMainPinActivateMouseDown)

  const inactivatePage = () => {
    map.classList.add('map--faded')
    form.classList.add('ad-form--disabled')
    formFieldsets.forEach(el => el.setAttribute('disabled', 'disabled'))
    filterSelects.forEach(el => el.setAttribute('disabled', 'disabled'))
    housingFeatures.setAttribute('disabled', 'disabled')
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
    previewAvatar.src = 'img/muffin-grey.svg'
    previewPhotos.innerHTML = ''
    inactivatePage()
    mainPin.addEventListener('mousedown', onMainPinActivateMouseDown)
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
    formFieldsets,
    clearPins
  }
})()