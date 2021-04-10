'use strict';
(() => {
  const MAIN_PIN_HEIGHT = 62
  const MAIN_PIN_WIDTH = 62
  const MAIN_PIN_TIP = 22
  const mainPin = document.querySelector('.map__pin--main')
  const form = document.querySelector('.ad-form')
  const inputTitle = form.querySelector('#title')
  const inputAddress = document.querySelector('#address')
  const inputType = form.querySelector('#type')
  const inputPrice = form.querySelector('#price')
  const inputRooms = form.querySelector('#room_number')
  const inputCapacity = form.querySelector('#capacity')
  const optionsCapacity = inputCapacity.querySelectorAll('option')
  const inputTimein = form.querySelector('#timein')
  const inputTimeout = form.querySelector('#timeout')
  const btnSubmit = form.querySelector('.ad-form__submit')
  const btnReset = form.querySelector('.ad-form__reset')

  const addRedBorder = (input) => {
    input.style = 'border: 2px solid red'
  }
  const deleteRedBorder = (input) => {
    input.style = 'border: none'
  }
  const addErorrMessage = (input, text) => {
    return input.setCustomValidity(text)
  }
  const deleteErrorMessage = (input) => {
    return input.setCustomValidity(``)
  }

  // Заполнение поля адреса
  let pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  let pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);

  inputAddress.value = `${pinCenterPositionX}, ${pinCenterPositionY}`

  const newAddress = () => {
    const pinPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    const pinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2) + MAIN_PIN_HEIGHT / 2 + MAIN_PIN_TIP
    inputAddress.value = `${pinPositionX}, ${pinPositionY}`
  }

  // Валидация заголовка
  const validationTitle = () => {
    let minTitleLength = inputTitle.minLength
    let maxTitleLength = inputTitle.maxLength
    let valueLength = inputTitle.value.length
    if (valueLength < minTitleLength) {
      addErorrMessage(inputTitle, `Минимальная длина — 30 символов. Осталось ввести ${minTitleLength - valueLength} символов.`)
    } else if (valueLength > maxTitleLength) {
      addErorrMessage(inputTitle, `Максимальная длина — 100 символов. Удалите ${valueLength - maxTitleLength} символов`)
    } else {
      deleteErrorMessage(inputTitle)
    }
    inputTitle.reportValidity()
  }
  inputTitle.addEventListener('input', () => {
    validationTitle()
    deleteRedBorder(inputTitle)
  })

  // Зависимость цены от типа жилья
  const typeToPrice = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  }

  const setMinPrice = (num) => {
    inputPrice.setAttribute('min', num)
    inputPrice.setAttribute('placeholder', num)
  }

  const validationPrice = () => {
    if (inputPrice.validity.valueMissing) {
      addErorrMessage(inputPrice, `Обязательное поле`)
    } else if (inputPrice.validity.badInput) {
      addErorrMessage(inputPrice, `Пожалуйста, введите число`)
    } else if (inputPrice.validity.rangeUnderflow) {
      addErorrMessage(inputPrice, `Пожалуйста, не меньше ${inputPrice.min}`)
    } else if (inputPrice.validity.rangeOverflow) {
      addErorrMessage(inputPrice, `Пожалуйста, не больше ${inputPrice.max}`)
    } else {
      deleteErrorMessage(inputPrice)
    }
  }

  inputType.addEventListener('change', () => {
    let minPrice = typeToPrice[inputType.value]
    setMinPrice(minPrice)
  })
  inputPrice.addEventListener('change', () => {
    validationPrice()
    inputPrice.reportValidity()
    deleteRedBorder(inputPrice)
  })
  inputPrice.addEventListener('invalid', () => {
    validationPrice()
  })
  inputPrice.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 189 || evt.keyCode == 69 || evt.keyCode == 187) {
      evt.preventDefault()
    }
  })

  // Зависимость количества гостей от количества комнат
  const capacityValidValue = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  }

  const changeCapacityOptions = () => {
    const rooms = inputRooms.value
    optionsCapacity.forEach(option => {
      if (capacityValidValue[rooms].indexOf(option.value) === -1) {
        option.disabled = true
      } else {
        option.disabled = false
      }
    })
  }
  changeCapacityOptions()

  const validateCapacity = () => {
    if (optionsCapacity[inputCapacity.selectedIndex].disabled) {
      addErorrMessage(inputCapacity, 'Недопустимое значение гостей для выбранного количества комнат')
    } else {
      deleteErrorMessage(inputCapacity)
    }
    inputCapacity.reportValidity()
  }

  inputCapacity.addEventListener('change', () => {
    deleteErrorMessage(inputCapacity)
    deleteRedBorder(inputCapacity)
  })
  inputRooms.addEventListener('change', () => {
    changeCapacityOptions()
    validateCapacity()
    deleteRedBorder(inputCapacity)
  })

  // Зависимость времени заезда и выезда
  const timeinToTimeout = () => {
    inputTimeout.selectedIndex = inputTimein.selectedIndex
  }
  const timeoutToTimein = () => {
    inputTimein.selectedIndex = inputTimeout.selectedIndex
  }
  inputTimein.addEventListener('change', () => {
    timeinToTimeout()
  })
  inputTimeout.addEventListener('change', () => {
    timeoutToTimein()
  })

  //Реализация функционала кнопок отправить и очистить
  const submitForm = () => {
    if (!inputTitle.validity.valid) {
      addRedBorder(inputTitle)
    } else {
      deleteRedBorder(inputTitle)
    }
    if (!inputPrice.validity.valid) {
      addRedBorder(inputPrice)
    } else {
      deleteRedBorder(inputPrice)
    }
    if (!inputCapacity.validity.valid) {
      addRedBorder(inputCapacity)
    } else {
      deleteRedBorder(inputCapacity)
    }
  }
  btnSubmit.addEventListener('click', () => submitForm())

  const resetForm = () => {
    deleteRedBorder(inputTitle)
    deleteRedBorder(inputPrice)
    deleteRedBorder(inputCapacity)
    form.reset()
    window.main.inactivatePage()
    mainPin.style.top = (pinCenterPositionY - MAIN_PIN_WIDTH / 2) + 'px'
    mainPin.style.left = (pinCenterPositionX - MAIN_PIN_HEIGHT / 2) + 'px'
    inputAddress.value = `${pinCenterPositionX}, ${pinCenterPositionY}`
  }
  btnReset.addEventListener('click', () => resetForm())
  
  window.validation = {
    mainPin,
    form,
    MAIN_PIN_HEIGHT,
    MAIN_PIN_WIDTH,
    MAIN_PIN_TIP,
    newAddress
  }
})()