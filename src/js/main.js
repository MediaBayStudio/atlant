//polyfills
(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};let c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)})();
let lazy,
  menu,
  hdr,
  overlay,
  mask,
  contactsMap,
  faqPopup,
  thanksPopup,
  thanksPopupTimer,
  callbackPopup,
  fakeScrollbar,
  body = document.body,
  currentSlug = body.dataset.post,
  templateDir = body.dataset.directory,
  currentPostName = body.dataset.postName,
  // mobileRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  // mobile = mobileRegExp.test(navigator.userAgent),
  // IE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1,
  q = function(selector, element) {
    element = element || document.body;
    return element.querySelector(selector);
  },
  id = function(selector, element) {
    element = element || document;
    return element.getElementById(selector);
  },
  qa = function(selectors, element, toArray) {
    element = element || document.body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  reserQuiz,
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  matchesMedia = function(media) {
    return window.matchMedia(media).matches;
  },
  scrollToTarget  = function(target) {
    event.preventDefault();

    let wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2),
      start = null,
      V = .35,
      step = function(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (targetTop < 0 ? Math.max(wndwY - progress/V, wndwY + targetTop) : Math.min(wndwY + progress/V, wndwY + targetTop));

        window.scrollTo(0, r);

        if (r != wndwY + targetTop) {
          requestAnimationFrame(step);
        }
      }

    requestAnimationFrame(step);
  };

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
  
  //includes
let hdrNavServicesListItem = q('[href="#services"]').parentElement,
  setPositionForServicesListItem = function() {
    let pos = 'static';

    if (matchesMedia('(min-width:1023.98px)')) {
      pos = 'static';
    } else {
      pos = 'relative';
    }

    hdrNavServicesListItem.style.position = pos;

  };

window.addEventListener('resize', setPositionForServicesListItem);
setPositionForServicesListItem();


menu = new MobileMenu('.menu', {
  openButton: '.hdr__burger',
  closeButtons: '.hdr__burger',
  overlay: '.overlay',
  toRight: true,
  fixHeader: '.hdr'
});

let menuNav = q('.menu__nav', menu);

menuNav.addEventListener('click', function() {
  let target = event.target,
    targetParent = target.parentElement;

  if (target.classList.contains('nav__link') && targetParent.classList.contains('contains-submenu')) {
    let targetHeightElement,
      borderCoeff = 0;

    if (target.classList.contains('active')) {
      targetHeightElement = target;
      borderCoeff = 2;
      target.classList.remove('active');
    } else {
      targetHeightElement = targetParent;
      target.classList.add('active');
    }

    targetParent.style.maxHeight = targetHeightElement.scrollHeight + borderCoeff + 'px';
  }

});
(function() {
  thanksPopup = new Popup('#thanks-popup', {
    closeButtons: '.thanks-popup__close'
  });

  callbackPopup = new Popup('#callback-popup', {
    openButtons: '.callback-btn',
    closeButtons: '.callback-popup__close'
  });

  if (id('faq-popup')) {
    faqPopup = new Popup('#faq-popup', {
      openButtons: '#opening-faq-popup-btn',
      closeButtons: '.faq-popup__close'
    });
  }

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
;
(function() {
  $('form').each(function() {
    $(this).validate({
      rules: {
        'user-name': {
          required: true,
          userName: true,
          minlength: 2
        },
        'user-tel': {
          required: true,
          userPhone: true
        },
        'user-email': {
          email: true
        },
        'user-msg': {
          required: true,
          userMsg: true
        },
        'policy': {
          required: true,
          minlength: 1
        }
      },
      messages: {
        'user-name': {
          required: 'Укажите полное имя',
          minlength: jQuery.validator.format('Имя не может быть таким коротким'),
          userName: 'Допустимы только буквы'
        },
        'user-tel': {
          required: 'Укажите телефон',
          userPhone: 'Укажите верный номер телефона'
        },
        'user-email': {
          email: 'Укажите верный E-mail'
        },
        'user-msg': {
          required: 'Напишите что-нибудь',
          userMsg: 'Введены недопустимые символы'
        },
        'policy': {
          required: 'Согласитель с условиями политики конфиденциальности'
        }
      },
      // onfocusout: false,
      errorClass: 'invalid',
      submitHandler: function(form, event) {
        event.preventDefault();

        let $form = $(form);

        $form.find('.page-field').val(currentPostName);

        $form.find('.field__inp, .field__textarea, .field').removeClass('filled error');

        if ($form.hasClass('quiz__form')) {
          resetQuiz();
        }

        $(this)[0].resetForm();

        thanksPopup.openPopup();
        thanksPopupTimer = setTimeout(function() {
          thanksPopup.closePopup();
        }, 3000);

      }
    });
  });

  // form beforesubmit validate
  $('form .btn').on('click', function() {
    let parentForm = $(event.target).parents('form');
    if (!parentForm.valid()) {
      event.preventDefault();

      // ищем лэйблы, ипнуты в которых содержат ошибку
      parentForm.find('.field__inp.invalid, .field__textarea.invalid')
        .parents('label')
        .addClass('error');
    }
  });

})();


$('.field__inp, .field__textarea').on('input', function() {

  let thisInput = $(this);

  if (thisInput.val() !== '') {
    thisInput.addClass('filled');
  } else {
    thisInput.removeClass('filled');
  }

  if (thisInput.hasClass('invalid')) {
    thisInput.parents('.field')
      .addClass('error');
  } else {
    thisInput.parents('.field')
      .removeClass('error');
  }


});

$.validator.methods.userName = function(value, element) {
  return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
};

$.validator.methods.userPhone = function(value, element) {
  return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
};

$.validator.methods.userMsg = function(value, element) {
  return /[^\<\>\[\]'`]+$/.test(value);
};

;
(function() {
  let nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    arrowSvg = '<svg class="arrow__svg" width="35" height="64" viewBox="0 0 35 64" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M1.61232 59.6024C0.618114 60.6145 0.618114 62.2405 1.61232 63.2451C2.60653 64.2498 4.21285 64.2535 5.20706 63.2451L34.2543 33.8207C35.2486 32.816 35.2486 31.19 34.2543 30.1779L5.20706 0.753472C4.21285 -0.251157 2.60653 -0.251157 1.61232 0.753472C0.618114 1.76182 0.618114 3.39155 1.61232 4.39618L28.1036 32.0012L1.61232 59.6024Z" fill="inherit"/></svg>',
    dot = '<button type="button" class="dot"></button>',

    heroSlider = id('hero-sect__slider'),
    heroSlides = heroSlider && qa('.hero-sect__slide', heroSlider),

    partnersSlider = id('partners'),
    partnersSlides = partnersSlider && qa('.partners__img', partnersSlider),

    createArrow = function(className, inside) {

      className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;

      return `<button type="button" class="arrow arrow__${className}">${inside}</button>`;
    },
    buildSliders = function(functions) {
      for (let i = functions.length - 1; i >= 0; i--) {
        functions[i]();
      }
    },
    buildSlidersFunctions = [];

  if (heroSlider && heroSlides.length && heroSlides.length > 1) {
    $(heroSlider).slick({
      accessibility: false,
      appendDots: $('.hero-sect__form-wrapper'),
      dots: true,
      dotsClass: 'hero-sect__dots dots',
      appendArrows: $('.hero-sect__arrows'),
      prevArrow: createArrow('hero-sect__prev', arrowSvg),
      nextArrow: createArrow('hero-sect__next', arrowSvg),
      infinite: false,
      fade: true,
      draggable: false,
      slide: '.hero-sect__slide',
      customPaging: function() {
        return dot;
      }
    });
  }


  if (partnersSlider && partnersSlides.length && partnersSlides.length > 1) {
    let $partnersSlider = $(partnersSlider),
      buildPartnersSlider = function() {
      // если ширина экрана больше 576px и слайдов меньше 3, то слайдера не будет
        // показываем по 2 слайда
      if (matchesMedia('(min-width: 575.98px)') && partnersSlides.length < 3) {
        if (partnersSlider.classList.contains('slick-slider')) {
          $partnersSlider.slick('unslick');
        }
        // если ширина экрана больше 1024px и слайдов меньше 5, то слайдера не будет
          // показываем по 4 слайда
      } else if (matchesMedia('(min-width: 1023.98px)') && partnersSlides.length < 5) {
        if (partnersSlider.classList.contains('slick-slider')) {
          $partnersSlider.slick('unslick');
        }
        // в других случаях делаем слайдер
      } else {
        if (partnersSlider.classList.contains('slick-slider')) {
          // слайдер уже создан
          return;
        }
        $partnersSlider.slick({
          appendArrows: $('.partners__nav'),
          prevArrow: createArrow('partners__prev', arrowSvg),
          nextArrow: createArrow('partners__next', arrowSvg),
          slide: '.partners__img',
          accessibility: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          mobileFirst: true,
          variableWidth: true,
          centerMode: true,
          centerPadding: '0px',
          responsive: [{
            breakpoint: 575.98,
            settings: {
              centerMode: false,
              initialSlide: 0,
              slidesToScroll: 1,
              slidesToShow: 2,
            }
          }, {
            breakpoint: 1024.98,
            settings: {
              centerMode: false,
              slidesToScroll: 1,
              slidesToShow: 4
            }
          }]
        });
      }
    }

    buildSlidersFunctions[0] = buildPartnersSlider;
  }

  if (buildSlidersFunctions.length > 0) {
    window.addEventListener('resize', buildSliders);
    buildSliders(buildSlidersFunctions);
  }

  // buildSlider = function() {
  //   // если ширина экрана больше 578px и слайдов меньше 4, то слайдера не будет
  //   if (matchMedia('(min-width: 575.98px)').matches && slides.length < 4) {
  //     if (slidesSect.hasClass('slick-slider')) {
  //       slidesSect.slick('unslick');
  //     }
  //   // если ширина экрана больше 1440px и слайдов меньше 7, то слайдера не будет
  //   } else if (matchMedia('(min-width: 1439.98px)').matches && slides.length < 7) {
  //     if (slidesSect.hasClass('slick-slider')) {
  //       slidesSect.slick('unslick');
  //     }
  //   // в других случаях делаем слайдер
  //   } else {
  //     if (slidesSect.hasClass('slick-slider')) {
  //       // слайдер уже создан
  //       return;
  //     }
  //     if (slides.length && slides.length > 2) {
  //       slidesSect.slick({
  //       // appendDots: $('element'),
  //       // appendArrows: $('element'),
  //       // autoplay: true,
  //       // autoplaySpeed: 3000,
  //       // adaptiveHeight: false,
  //       // asNavFor: $('element'),
  //       // centerMode: false,
  //       // centerPadding: '50px',
  //       // cssEase: 'ease',
  //       // draggable: true,
  //       // slide: 'selector',
  //       accessibility: false,
  //       slidesToShow: 2,
  //       slidesToScroll: 1,
  //       infinite: true,
  //       arrows: false, // true by default
  //       dots: true,
  //       dotsClass: 'partners__dots dots',
  //       customPaging: function() {
  //         return dot;
  //       },
  //         mobileFirst: true,
  //         responsive: [{
  //           breakpoint: 575.98,
  //           settings: {
  //             slidesToScroll: 1,
  //             slidesToShow: 3
  //           }
  //         }, {
  //           breakpoint: 1439.98,
  //           settings: {
  //             slidesToScroll: 1,
  //             slidesToShow: 5
  //           }
  //         }]
  //       });
  //     }
  //   }
  // };

  // if (slides.length && slides.length > 0) {
  //   window.addEventListener('resize', buildSlider);
  //   buildSlider();
  // }

  // настройки grab курсора на всех слайдерах
  $('.slick-list.draggable').on('mousedown', function() {
    $(this).addClass('grabbing');
  });

  $('.slick-list.draggable').on('beforeChange', function() {
    $(this).removeClass('grabbing');
  });

  $(document).on('mouseup', function() {
    $('.slick-list.draggable').removeClass('grabbing');
  });


})();
;(function() {
  let setCursorPosition = function(pos, inputElement) {
    inputElement.focus();
    if (inputElement.setSelectionRange) {
      inputElement.setSelectionRange(pos, pos);
    } else if (inputElement.createTextRange) {
      let range = inputElement.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  mask = function() {
    let pattern = '+7(___)___-__-__',
      i = 0,
      def = pattern.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = pattern.replace(/./g, function(match) {
      return /[_\d]/.test(match) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : match;
    });

    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
        this.classList.remove('filled');
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  };

  let input = qa('[name=user-tel]');

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('input', mask);
    input[i].addEventListener('focus', mask);
    input[i].addEventListener('blur', mask);
  }

})();
;
(function() {

  let $quizBlock = q('#quiz');

  if ($quizBlock) {

    resetQuiz = function() {
      $dots[currentStep].classList.remove('active');
      $quizFooter.classList.remove('hidden');
      $quizNextBtn.classList.remove('disabled');
      $currentStep.classList.remove('visible');

      currentStep = 0;
      $currentStep = $quizSteps[currentStep];
      $nextStep = $quizSteps[currentStep + 1];
      $quizResult.value = 0;

      $currentStepNumber.textContent = currentStep + 1;
      $dots[currentStep].classList.add('active');
      $currentStep.classList.add('visible');

      // Чистим инпуты внутри шагов
      for (let i = $quizSteps.length - 1; i >= 0; i--) {
        let $stepFields = qa('.quiz__radio-inp, .quiz__check-inp, .quiz__text-inp, .quiz__extra-field, .quiz__text-area, .quiz__select-select', $quizSteps[i]);

        $quizSteps[i].removeAttribute('data-value');

        for (let j = $stepFields.length - 1; j >= 0; j--) {
          let $currentField = $stepFields[j];
          if ($currentField.classList.contains('quiz__extra-field')) {
            $currentField.classList.remove('visible');
          } else if ($currentField.classList.contains('quiz__select-select')) {
            $currentField.selectedIndex = 0;
          } else {
            let type = $currentField.type;
            if (type === 'radio' || type === 'checkbox') {
              $currentField.checked = false;
            } else {
              $currentField.value = '';
            }
          }
        }
      }

      selects.reload();
      selects.updateLabel(selects.e[0].textContent);

      $quizBlock.addEventListener('input', quizInput);

      setQuizBodyHeight();
      setQuizImage();
    };

    let $quizImg = q('.quiz__img', $quizBlock),
      imagePath = templateDir + '/img/' + currentSlug,
      $currentStepNumber = q('.quiz__current-steps-number', $quizBlock),
      $dotsWrap = q('.quiz__dots', $quizBlock),
      $dots = $dotsWrap.children,
      $quizBody = q('.quiz__body', $quizBlock),
      // $quizSteps = qa('.quiz__step', $quizBody, true),
      $quizSteps = qa('.quiz__step', $quizBody, true)
        .filter(el => !/quiz__step-\d\w/.test(el.className)),
      $quizFooter = q('.quiz__footer', $quizBlock),
      $quizNextBtn = q('.quiz__next', $quizFooter),
      $quizResult = q('.quiz__form-result', $quizBody),
      currentStep = 0,
      $currentStep = $quizSteps[currentStep],
      $nextStep = $quizSteps[currentStep + 1],
      $prevStep = null,
      $finalStep = q('.quiz__final-step', $quizBody),
      sumRegExp = /(\d{1,3})(?=((\d{3})*)$)/g,
      prevStep = function() {

      },
      findNextStep = function() {
        let $stepElement,
          nextSubStepClassName = '.' + $currentStep.className.match(/quiz__step-\d/)[0] + 'a',
          nextSubStepSelector = nextSubStepClassName + '[data-step="' + $currentStep.dataset.value + '"]',
          $nextSubStep = q(nextSubStepSelector, $quizBody);

        if ($nextSubStep) {

        } else {

        }

        
      },
      nextStep = function() {
        if (event && event.type === 'keyup' && event.key !== 'Enter') {
          return;
        }
        // Если есть следующий шаг
        if ($nextStep) {
          $quizBlock.removeEventListener('keyup', nextStep);

          $quizNextBtn.removeEventListener('click', nextStep);
          $quizNextBtn.classList.add('disabled');

          $nextStep = findNextStep();
          
          $prevStep = $currentStep;

          $currentStep.classList.remove('visible');
          $nextStep.classList.add('visible');
          currentStep++;
          $currentStep = $nextStep;
          $nextStep = $quizSteps[currentStep + 1];
          $currentStepNumber.textContent = currentStep + 1;
          $dots[currentStep].classList.add('active');
          $dots[currentStep - 1].classList.remove('active');
          setQuizImage();
          // Если финальный шаг
          if ($currentStep === $finalStep) {
            $quizBlock.removeEventListener('input', quizInput);
            $quizFooter.classList.add('hidden');
            $quizSteps.forEach(function($step) {
              if ($step !== $finalStep) {
                $quizResult.value += $step.dataset.text;
              }
            });

            console.log($quizResult.value);
          }

        }
        setQuizBodyHeight();
      },
      // Устновка высота тела вопроса (анимация)
      setQuizBodyHeight = function() {
        $quizBody.style.maxHeight = $currentStep.scrollHeight + 'px';
      },
      // Приведение значения полей к читабельному виду (двоеточение, br и т.д.)
      serializeValue = function(question, answer) {
        if (question[question.length - 1] !== ':') {
          question += ':';
        }
        return '\n' + question + ' ' + answer;
      },
      // Получение данных из полей форм
      getData = function() {
        let $currentStepFields = qa('input, textarea, select', $currentStep, true),
          value = '',
          curretnValue = [];

        $currentStepFields.forEach(function($field) {
          let fieldTagName = $field.tagName,
            fieldValue = $field.value,
            fieldType = $field.type,
            fieldIsChecked = $field.checked,
            fieldHasExtraField = $field.hasAttribute('data-extra-field'),
            $fieldParent = $field.parentElement;
          // Если поле это радиокнопка
          if (fieldType === 'radio' && fieldIsChecked) {
            let $fieldTitle = q('.quiz__input-label', $currentStep);
            if (!$fieldTitle) {
              $fieldTitle = q('.quiz__radio-label', $fieldParent);
            }
            console.log(fieldValue);
            value += serializeValue($fieldTitle.textContent, fieldValue);
            curretnValue.push(fieldValue);

            // Если рядом с радиокнопкой должно появиться еще поле, то
              // если его значение пустое, ничего не возвращаем
            if (fieldHasExtraField) {
              let $extraField = q('[data-radio="' + fieldValue + '"] > input', $currentStep);
              if ($extraField.value === '') {
                value = '';
                curretnValue = [];
              }
            }
          // Если поле с текстом, числом или поле ввода и не пустое
          } else if ((fieldType === 'text' || fieldType === 'number' || fieldTagName === 'TEXTAREA') && fieldValue !== '') {
            $fieldTitle = q('.quiz__text-label', $fieldParent);
            value += serializeValue($fieldTitle.textContent, fieldValue);
            curretnValue.push(fieldValue);
          // Если поле это селект
          } else if (fieldTagName === 'SELECT') {
            $fieldTitle = q('.quiz__text-label', $fieldParent);
            value += serializeValue($fieldTitle.textContent, fieldValue);
            curretnValue.push(fieldValue);
          }

        });

        // установка текущего значения для шага
        $currentStep.dataset.value = curretnValue.join('|&|');

        return value;
      },
      // Взаимодействие с формой
      quizInput = function($elem) {
        let $target = $elem instanceof Event ? $elem.target : $elem,
          fieldValue = $target.value,
          fieldType = $target.type,
          fieldIsChecked = $target.checked,
          fieldHasExtraField = $target.hasAttribute('data-extra-field'),
          currentStepValue = getData();

        if (fieldType === 'radio' && fieldIsChecked) {
          if (fieldHasExtraField) {
            let $extraFields = qa('[data-radio]', $currentStep, true);

            $extraFields.forEach(function($field) {
              if ($field.dataset.radio === fieldValue) {
                $field.classList.add('visible');
              } else {
                $field.classList.remove('visible');
              }
              $field.value = '';
            });

            $quizBody.style.transition = 'max-height 0s';

            setQuizBodyHeight();

          } else {
            $quizBody.style.transition = 'max-height .5s .25s';
          }
        } else {
          $quizBody.style.transition = 'max-height .5s .25s';
        }

        if ($target.dataset.mask === ' руб') {
          
        }

        $currentStep.dataset.text = currentStepValue;

        if (currentStepValue === '') {
          $quizNextBtn.classList.add('disabled');
          $quizBlock.removeEventListener('keyup', nextStep);
          $quizNextBtn.removeEventListener('click', nextStep);
        } else {
          $quizNextBtn.classList.remove('disabled')
          $quizBlock.addEventListener('keyup', nextStep);
          $quizNextBtn.addEventListener('click', nextStep);
        }
      },
      setQuizImage = function() {
        $quizImg.src = imagePath + '-quiz-' + (currentStep + 1) + '.png';
      };

    console.log($quizSteps);
    setQuizBodyHeight();
    setQuizImage();

    $quizBlock.addEventListener('input', quizInput);
    window.addEventListener('resize', setQuizBodyHeight);

    let selects = tail.select('.quiz__select-select').on('change', function(item, state) {
      quizInput(item.option.parentElement);
    });

    selects.updateLabel(selects.e[0].textContent);
  }

})();
;(function() {
  let faqBlock = id('faqs');

  if (faqBlock) {
    let faqBlocks = faqBlock.children,
      initDropdown = function() {
        let childs = faqBlocks[0].children;

        hideText(1);
        faqBlocks[0].style.maxHeight = childs[0].scrollHeight + childs[1].scrollHeight + 'px';
        faqBlocks[0].classList.add('active');

        faqBlock.addEventListener('click', dropdownText);
        window.addEventListener('resize', initDropdown);
      },

      dropdownText = function(element) {
        if (element instanceof Event) {
          let eventTarget = element.target;

          if (eventTarget.tagName === 'BUTTON') {
            element = eventTarget;
          } else {
            return;
          }

        } else {
          element = element || faqBlocks[0]; // если элемент не передали, то открываем первый
        }

        let minHeight = element.scrollHeight,
          parent = element.parentElement,
          answer = element.nextElementSibling,
          answerHeight = answer.scrollHeight;

        if (parent.classList.contains('active')) {
          if (faqBlocks.length > 1) {
            parent.style.maxHeight = minHeight + 'px';
            parent.classList.remove('active');
          }
        } else {
          hideText(0);

          parent.classList.add('active');
          parent.style.maxHeight = minHeight + answerHeight + 'px';
        }
      },
      
      hideText = function(start) {
        for (let i = start; i < faqBlocks.length; i++) {
          faqBlocks[i].classList.remove('active');
          faqBlocks[i].style.maxHeight = faqBlocks[i].children[0].scrollHeight + 'px';
        }
      };


    window.addEventListener('load', initDropdown);

  }

})();
//=include contacts-map.js

});