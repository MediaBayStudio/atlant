//polyfills
//=include intersectionObserverPolyfill.js
//=include customEventsPolyfill.js
//=include utils.js

document.addEventListener('DOMContentLoaded', function() {

  // делаем глобальный lazy, чтобы потом можно было обновлять его
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  // фикс vh для элементов с 100vh
  window.addEventListener('resize', function() {
    setVh();
    // mobile = mobileRegExp.test(navigator.userAgent);
  });
  setVh();

  svg4everybody();


  // Запретим стандариное действие при нажатии на ссылки с подменю
  hdr = q('.hdr');

  hdr.addEventListener('click', function() {
    let target = event.target,
      targetHref = target.getAttribute('href');

    if (target.tagName === 'A' && targetHref[0] === '#') {
      event.preventDefault();
    }
  });

  // let preloader = id('preloader');

  // if (preloader) {
  //   window.addEventListener('load', function() {
  //     preloader.classList.add('loaded');
  //     preloader.addEventListener('animationend', function() {
  //       preloader.classList.add('hidden');
  //     });
  //   });
  // }
  
  //includes
//=include menu.js
//=include popups.js
//=include forms.js
//=include sliders.js
//=include telMask.js
//=include quiz.js
//=include dropdownText.js

});