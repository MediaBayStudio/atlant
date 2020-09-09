(function() {
  thanksPopup = new Popup('.thanks-popup', {
    closeButtons: '.thanks-popup__close'
  });

  callbackPopup = new Popup('.callback-popup', {
    openButtons: '.callback-btn',
    closeButtons: '.callback-popup__close'
  });

  thanksPopup.addEventListener('popupbeforeopen', function() {
    clearTimeout(thanksPopupTimer);
  });

  // Закрытие всех попапов вместе с закрытием окна спасибо
  thanksPopup.addEventListener('popupbeforeclose', function() {
    let otherPopups = [callbackPopup];

    for (let i = 0; i < otherPopups.length; i++) {
      if (otherPopups[i].classList.contains('active')) {
        otherPopups[i].closePopup();
      }
    }
  });


})()