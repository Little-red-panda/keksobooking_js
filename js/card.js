'use strict';
;(() => {
  const {map, mapFilters} = window.cityPlan

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
    const housing = {
      FLAT: `flat`,
      BUNGALOW: `bungalow`,
      HOUSE: `house`,
      PALACE: `palace`,
    }
    switch (type) {
      case housing.PALACE:
        cardType.textContent = 'Дворец'
        break
      case housing.FLAT:
        cardType.textContent = 'Квартира'
        break
      case housing.HOUSE:
        cardType.textContent = 'Дом'
        break
      case housing.BUNGALOW:
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
    card.querySelector('.popup__text--address').textContent = adress
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

  // Функции открытия/закрытия карточки объявления
  const onMapEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeCard();
    }
  };
  const openCard = (object) => {
    closeCard()
    getCard(object)
    document.addEventListener('keydown', onMapEscPress)
  }
  const closeCard = () => {
    const card = document.querySelector('.map__card')
    if (card) {
      card.remove()
    }
    document.removeEventListener('keydown', onMapEscPress)
  }
  
  window.card = {
    openCard,
    closeCard
  }
})()