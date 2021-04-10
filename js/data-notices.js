'use stricst';
(() => {
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
    TYPE_OF_ROOMS: ['palace', 'flat', 'house', 'bungalow'],
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
  window.dataNotices = {
    generateNotices: generateNotices()
  }
})()