(() => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg' , 'png']


  const fileChooserAvatar = document.querySelector('#avatar')
  const previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img')
  const fileChooserPhotos = document.querySelector('.ad-form__input')
  const previewPhotos = document.querySelector('.ad-form__photo')

  // Превью аватара
  const onChangeAvatar = () => {
    let file = fileChooserAvatar.files[0]
    let fileName = file.name.toLowerCase()
    let matches = FILE_TYPES.some((it) => fileName.endsWith(it))
    if (matches) {
      var reader = new FileReader()
      reader.addEventListener('load', () => {
        previewAvatar.src = reader.result
        console.log(previewAvatar)
      })
    }
    reader.readAsDataURL(file)
  }
  fileChooserAvatar.addEventListener('change', onChangeAvatar)

  // Превью фотографий жилья
  const onChangePhotos = () => {
    for (i = 0; i < fileChooserPhotos.files.length; i++) {
      let file = fileChooserPhotos.files[i]
      let fileName = file.name.toLowerCase()
      let matches = FILE_TYPES.some((it) => fileName.endsWith(it))
      if (matches) {
        let reader = new FileReader()
        reader.addEventListener('load', () => {
          let div = document.createElement('div')
          div.innerHTML = 'удалить'
          let img = document.createElement('img')
          img.src = reader.result
          div.appendChild(img)
          previewPhotos.appendChild(div)
          div.addEventListener('click', () => {
            previewPhotos.removeChild(div)
          })
        })
        reader.readAsDataURL(file)
      }
    }
  }
  fileChooserPhotos.addEventListener('change', onChangePhotos)

  const onScrollPhotos = (evt) => {
    evt.preventDefault()
    if (evt.deltaY > 0) {
      previewPhotos.scrollLeft +=50
    }
    if (evt.deltaY < 0 && previewPhotos.scrollLeft > 0) {
      previewPhotos.scrollLeft -=50
    }
  }
  previewPhotos.addEventListener('wheel', (evt) => onScrollPhotos(evt))

  window.imageUpload = {
    previewAvatar,
    previewPhotos
  }
})()