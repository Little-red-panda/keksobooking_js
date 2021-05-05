'use strict';
;(() => {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins')
  const mapFilters = document.querySelector('.map__filters-container') // Элемент, перед которым будем вставлять карточку объявления

  // Сообщение об ошибке отправке данных на сервер
  const onError = (errorMessege) => {
    const errorBox = document.createElement('div')
    errorBox.textContent = errorMessege
    errorBox.style = `z-index: 100;`
    errorBox.style.width = '1200px'
    errorBox.style.height = '50px'
    errorBox.style.backgroundColor = 'rgba(100, 100, 100, 0.9)'
    errorBox.style.fontSize = '30px'
    errorBox.style.lineHeight = '50px'
    errorBox.style.textAlign = 'center'
    errorBox.style.color = '#ff6547'
    errorBox.style.position = 'absolute'
    errorBox.style.top = '200px'
    errorBox.style.left = '50%'
    errorBox.style.transform = 'translateX(-50%)'
    document.body.insertAdjacentElement(`afterbegin`, errorBox)
    document.addEventListener(`mousedown`, () => {
      errorBox.remove()
    })
  }
  window.cityPlan = {
    map,
    mapPins,
    mapFilters,
    onError
  }
})()



