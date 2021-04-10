'use strict';
(() => {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins')
  const mapFilters = document.querySelector('.map__filters-container') // Элемент, перед которым будем вставлять карточку объявления
  window.cityPlan = {
    map,
    mapPins,
    mapFilters
  }
})()



