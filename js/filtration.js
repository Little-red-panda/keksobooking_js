(() => {
  const {mapPins} = window.cityPlan
  const {getPins} = window.pins
  const {closeCard} = window.card

  const filters = document.querySelector('.map__filters')
  const filterSelects = filters.querySelectorAll('select')
  const housingType = filters.querySelector('#housing-type')
  const housingPrice = filters.querySelector('#housing-price')
  const housingRooms = filters.querySelector('#housing-rooms')
  const housingGuests = filters.querySelector('#housing-guests')
  const housingFeatures = filters.querySelector('#housing-features')

  const updateAds = (data) => {
    mapPins.append(getPins(data.slice(0, 5)))
  }
  
  let ads
  const onLoad = (data) => {
    ads = data
    updateAds(data)
  }
  
  const onChangeFilters = () => {
    let newAds = ads.filter((ad) => filterType(ad) && filterPrice(ad) && filterRooms(ad) && filterGuests(ad) && filterFeatures(ad))
    closeCard()
    window.main.clearPins()
    updateAds(newAds)
  }
  const filterType = (ad) => housingType.value === ad.offer.type || housingType.value === 'any'
  const filterPrice = (ad) => (housingPrice.value === 'low' && ad.offer.price < 10000)
  || (housingPrice.value === 'middle' && ad.offer.price <= 50000 && ad.offer.price >= 10000)
  || (housingPrice.value === 'high' && ad.offer.price > 50000)
  || housingPrice.value === 'any'
  const filterRooms = (ad) => +housingRooms.value === ad.offer.rooms || housingRooms.value === 'any'
  const filterGuests = (ad) => +housingGuests.value === ad.offer.guests || housingGuests.value === 'any'
  const filterFeatures = (ad) => {
    const checkedFeatures = housingFeatures.querySelectorAll('input:checked')
    return Array.from(checkedFeatures).every((checkedFeature) => ad.offer.features.includes(checkedFeature.value))
  }

  filters.addEventListener('change', onChangeFilters)

  window.filtration = {
    housingFeatures,
    filterSelects,
    onLoad
  }
})()