'use strict';
;(() => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg' , 'png']
  const ImageDefault = {
    width: '40px',
    height: '44px',
    src: `img/muffin-grey.svg`
  }
  const ImageEdited = {
    width: '70px',
    height: '70px'
  }

  const fileChooserAvatar = document.querySelector('#avatar')
  const previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img')
  const fileChooserPhotos = document.querySelector('.ad-form__input')
  const previewPhotos = document.querySelector('.ad-form__photo')

  // Проверка формата файла
  const fileChooser = (file, onCheckPassed) => {
    const fileName = file.name.toLowerCase()
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it))
    if (matches) {
      onCheckPassed()
    }
  }

  // Превью аватара
  const uploadAvatar = (file) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result
      previewAvatar.style.width = ImageEdited.width
      previewAvatar.style.height = ImageEdited.height
    })
    reader.readAsDataURL(file)
  }
  const onChangeAvatar = (file) => {
    fileChooser(file, () => uploadAvatar(file))
  }
  fileChooserAvatar.addEventListener('change', () => onChangeAvatar(fileChooserAvatar.files[0]))

  // Превью фотографий жилья
  const uploadPhotos = (file) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      let div = document.createElement('div')
      div.innerHTML = 'удалить'
      let img = document.createElement('img')
      img.src = reader.result
      div.appendChild(img)
      previewPhotos.appendChild(div)
      div.addEventListener('click', () => previewPhotos.removeChild(div))
    })
    reader.readAsDataURL(file)
  }
  const onChangePhotos = () => {
    for (let i = 0; i < fileChooserPhotos.files.length; i++) {
      let photo = fileChooserPhotos.files[i]
      fileChooser(photo, () => uploadPhotos(photo))
    }
  }
  fileChooserPhotos.addEventListener('change', onChangePhotos)

  // Пролистывание колесиком мыши превью фотографий жилья 
  const onScrollPhotos = (evt) => {
    evt.preventDefault();
    (evt.deltaY > 0) ? previewPhotos.scrollLeft +=50 :
    (evt.deltaY < 0 && previewPhotos.scrollLeft > 0) ? previewPhotos.scrollLeft -=50 :
    previewPhotos.scrollLeft = previewPhotos.scrollLeft
  }
  previewPhotos.addEventListener('wheel', (evt) => onScrollPhotos(evt))
  // Возврат превью в исходное состояние
  const defaultPreviews = () => {
    previewAvatar.src = ImageDefault.src
    previewAvatar.style.width = ImageDefault.width
    previewAvatar.style.height = ImageDefault.height
    previewPhotos.innerHTML = ''
  }

  window.imageUpload = {
    previewAvatar,
    previewPhotos,
    defaultPreviews
  }
})()