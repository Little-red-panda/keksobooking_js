'use strict';
(() => {
  const TIMEOUT_IN_MS = 3000
  const URL_TO_GET = `https://21.javascript.pages.academy/keksobooking/data`
  const URL_TO_POST = `https://21.javascript.pages.academy/keksobooking`


  const sendRequest = (method, url, onLoad, onError, body = null) => {

    const xhr = new XMLHttpRequest()
    xhr.responseType = `json`
    xhr.timeout = TIMEOUT_IN_MS

    xhr.open(method, url)
    
    xhr.onload = () => {
      if (xhr.status >= 400) {
        onError(`Произошла ошибка. Статус ответа: ${xhr.status} ${xhr.statusText}`)
      } else {
        onLoad(xhr.response)
      }
    };
    xhr.onerror = () => {
      onError(`Произошла ошибка соединения`)
    }
    xhr.ontimeout = () => {
      onError(`Время ожидания запроса истекло`)
    }

    xhr.send(body)
  }

  window.backend = {
    load(onLoad, onError) {
      sendRequest('GET', URL_TO_GET, onLoad, onError)
    },
    upload(onLoad, onError, body) {
      sendRequest('POST', URL_TO_POST, onLoad, onError, body)
    }
  }
})()