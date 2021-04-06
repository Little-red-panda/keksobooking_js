'use strict'

const DATA_NOTICES = {
  COUNT_USERS: 8,
  // Диапозон цен
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  // Диапозон комнат
  MIN_ROOMS: 1,
  MAX_ROOMS: 5,
  // Диапозон гостей
  MIN_GUESTS: 1,
  MAX_GUESTS: 10,
  // Координаты 
  MIN_X: 300,
  MAX_X: 900,
  MIN_Y: 130,
  MAX_Y: 630,
  TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  TYPE_OF_ROOMS: ['palace', 'flat', 'house', 'bungalo'],
  TIME: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
}

// Функция, возвращающая случайное число из диапозона
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// Функция, возвращающая случайное значение массива 
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)]

// Функция, возвращающая перемешанный по алгоритму «Тасование Фишера — Йетса» массив
const shuffleArray = (array) => {
  let mixedArray = array.slice()
  for (let i = mixedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [mixedArray[i], mixedArray[randomIndex]] = [mixedArray[randomIndex], mixedArray[i]];
  }
  return mixedArray;
}

// Функция, возвращающая массив случайной длины
const getRandomArrayLength = (array) => array.slice(0, getRandomNumber(1, array.length))

// Функция, генерирующая массив аватарок
const generateAvatars = () => {
  const avatars = []
  for (let i = 0; i < DATA_NOTICES.COUNT_USERS; i++) {
    avatars.push(`img/avatars/user0${i+1}.png`)
  }
  return avatars
}

// Функция, возвращающая массив с объектами, описывающими похожие объявления
const generateNotices = () => {
  const notices = []
  const noticeAvatars = shuffleArray(generateAvatars())
  const noticeTitles = shuffleArray(DATA_NOTICES.TITLES)
  const noticeFeature = shuffleArray(DATA_NOTICES.FEATURES)
  for (let i = 0; i < DATA_NOTICES.COUNT_USERS; i++) {
    const locationX = getRandomNumber(DATA_NOTICES.MIN_X, DATA_NOTICES.MAX_X)
    const locationY = getRandomNumber(DATA_NOTICES.MIN_Y, DATA_NOTICES.MAX_Y)
    notices.push({
      author: {avatar: noticeAvatars[i]},
      offer:
      {
        title: noticeTitles[i],
        adress: (locationX + ', ' + locationY),
        price: getRandomNumber(DATA_NOTICES.MIN_PRICE, DATA_NOTICES.MAX_PRICE),
        type: getRandomElement(DATA_NOTICES.TYPE_OF_ROOMS),
        rooms: getRandomNumber(DATA_NOTICES.MIN_ROOMS, DATA_NOTICES.MAX_ROOMS),
        guests: getRandomNumber(DATA_NOTICES.MIN_GUESTS, DATA_NOTICES.MAX_GUESTS),
        checkin: getRandomElement(DATA_NOTICES.TIME),
        checkout: getRandomElement(DATA_NOTICES.TIME),
        features: getRandomArrayLength(noticeFeature),
        description: '',
        photos: shuffleArray(DATA_NOTICES.PHOTOS)
      },
      location:
      {
        x: locationX,
        y: locationY
      }
    })
  }
  return notices;
}
const getNotices = generateNotices()






// Делаем карту активной (временное решение)
const map = document.querySelector('.map')
// map.classList.remove('map--faded')

// Делаем метки
const mapPins = document.querySelector('.map__pins')

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

// mapPins.append(getPins(getNotices))

// Создаем карточку объявления 
const mapFilters = document.querySelector('.map__filters-container') // Элемент, перед которым будем вставлять карточку объявления

const getCard = (data) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.map__card')
  const card = cardTemplate.cloneNode(true)
  const {title, adress, price, type, rooms, guests, checkin, checkout, features, description, photos} = data.offer
  const {avatar} = data.author

  // Плюрализация комнат и гостей
  const pr = new Intl.PluralRules('ru');
  const suffixesForGuests = new Map([
    ['one', 'гостя'],
    ['many', 'гостей'],
    ['few', 'гостей'],
  ])
  const suffixesForRooms = new Map([
    ['one', 'комната'],
    ['many', 'комнат'],
    ['few', 'комнаты'],
  ])
  
  const formatGuests = (n) => {
    const rule = pr.select(n);
    const suffix = suffixesForGuests.get(rule);
    return `${n} ${suffix}`;
  };
  const getGuests = formatGuests(guests)
  
  const formatRooms = (n) => {
    const rule = pr.select(n);
    const suffix = suffixesForRooms.get(rule);
    return `${n} ${suffix}`;
  };
  const getRooms = formatRooms(rooms)
  // Вывод удобств жилья
  const getFeatures =  (array) => {
    const cardFragment = document.createDocumentFragment()
    card.querySelector('.popup__features').innerHTML = ''
    array.forEach(element => {
      const cardFeature = document.createElement('li')
      cardFeature.className = `popup__feature popup__feature--${element}`
      cardFragment.appendChild(cardFeature)
    });
    return cardFragment
  }
  // Перевод типа жилья на русский язык
  const cardType = card.querySelector('.popup__type')
  const Housing = {
    FLAT: `flat`,
    BUNGALO: `bungalo`,
    HOUSE: `house`,
    PALACE: `palace`,
  }
  switch (type) {
    case Housing.PALACE:
      cardType.textContent = 'Дворец'
      break
    case Housing.FLAT:
      cardType.textContent = 'Квартира'
      break
    case Housing.HOUSE:
      cardType.textContent = 'Дом'
      break
    case Housing.BUNGALO:
      cardType.textContent = 'Бунгало'
      break
  }
  // Вывод фотографий жилья
  const getPhotos = (array) => {
    const cardPhoto = card.querySelector('.popup__photos').querySelector('img')
    const cardFragment = document.createDocumentFragment()
    card.querySelector('.popup__photos').innerHTML = ''
    array.forEach(element => {
      const newCardPhoto = cardPhoto.cloneNode(true)
      newCardPhoto.src = element
      cardFragment.append(newCardPhoto)
    })
    return cardFragment
  }
  // Собираем карточку
  card.querySelector('.popup__title').textContent = title
  card.querySelector('.popup__text--address').textContent = adress // ?
  card.querySelector('.popup__text--price').textContent = `${price}₽/ночь`
  card.querySelector('.popup__text--capacity').textContent = `${getRooms} для ${getGuests}`
  card.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`
  card.querySelector('.popup__features').append(getFeatures(features))
  card.querySelector('.popup__description').textContent = description
  card.querySelector('.popup__photos').append(getPhotos(photos))
  card.querySelector('.popup__avatar').src = avatar
  map.insertBefore(card, mapFilters)
  const closeButton = card.querySelector('.popup__close')
  closeButton.addEventListener('click', closeCard)
  return card

}
// map.insertBefore(getCard(getNotices[0]), mapFilters)






// ------------------------------- Задание 2 ------------------------------------

const MOUSE_MAIN_BUTTON = 0

// Поля формы в неактивном состоянии
const fieldsets = document.querySelectorAll('fieldset')
fieldsets.forEach(el => el.setAttribute('disabled', 'disabled')) 

// Активация карты и полей формы при нажатии на метку
const mainPin = document.querySelector('.map__pin--main')
const form = document.querySelector('.ad-form')
const mapActivation = () => {
  map.classList.remove('map--faded')
  form.classList.remove('ad-form--disabled')
  fieldsets.forEach(el => el.removeAttribute('disabled'))
  newAddress()
  mapPins.append(getPins(getNotices))
}
mainPin.addEventListener('mouseup', (evt) => {
  if (evt.button === MOUSE_MAIN_BUTTON) {
    mapActivation()
  }
})


// Заполнение поля адреса
const MAIN_PIN_HEIGHT = 62
const MAIN_PIN_WIDTH = 62
const MAIN_PIN_TIP = 22
const inputAddress = document.querySelector('#address')
const pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
const pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);

inputAddress.value = `${pinCenterPositionX}, ${pinCenterPositionY}`

const newAddress = () => {
  const pinPositionX = pinCenterPositionX;
  const pinPositionY = pinCenterPositionY + MAIN_PIN_HEIGHT / 2 + MAIN_PIN_TIP
  inputAddress.value = `${pinPositionX}, ${pinPositionY}`
}

const onMapCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    closeCard();
  }
};

const openCard = (object) => {
  closeCard()
  getCard(object)
  document.addEventListener('keydown', onMapCardEscPress)
}

const closeCard = () => {
  const card = document.querySelector('.map__card')
  if (card) {
    card.remove()
  }
  document.removeEventListener('keydown', onMapCardEscPress)
}


// ------------------------  ВАЛИДАЦИЯ --------------------------


