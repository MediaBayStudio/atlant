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
          id('quiz').resetQuiz();
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

  let $quizBlock = id('quiz'),
    $quizForm = $quizBlock && id('quiz-form'),
    $quizResult = $quizForm && q('.quiz__form-result', $quizForm),
    $quizImg = $quizBlock && q('.quiz__img');


  if ($quizBlock) {
    window.Quiz = (function() {
      Quiz = (function() {
        return function(element, options) {
          let _ = this;

          _.assign = function(inserted, obj) {
            for (let key in inserted) {
              if (obj[key] === undefined) {
                obj[key] = inserted[key];
              } else if (typeof obj[key] === 'object') {
                _.assign(inserted[key], obj[key]);
              }
            }
          }

          _.createEl = function(block) {
            return document.createElement(block);
          }

          _.q = function(selector, target) {
            target = target || document;
            return target.querySelector(selector);
          }

          if (typeof element === 'string') {
            _.$quiz = _.q(element);
          } else {
            _.$quiz = element;
          }

          if (typeof options.$form === 'string') {
            _.$form = _.q(options.$form);
          } else {
            _.$form = options.$form;
          }

          if (typeof options.$result === 'string') {
            _.$result = _.q(options.$result);
          } else {
            _.$result = options.$result;
          }

          _.options = options || {}

          _.defaults = {
            headerTag: 'div',
            bodyTag: 'div',
            footerTag: 'div',
            stepTitletag: 'span',
            fieldTag: 'label',
            fieldTitleTag: 'span',
            prevBtnTag: 'button',
            nextBtnTag: 'button',
            dotsTag: 'div',
            dotTag: 'div',
            stepsCounterNumTag: 'div',
            currentStepNumTag: 'span',
            totalStepNumTag: 'span',

            dots: false,
            counter: false,
            prev: true,
            next: true,

            headerClass: 'quiz__header',
            bodyClass: 'quiz__body',
            footerClass: 'quiz__footer',
            stepTittleClass: 'quiz__step-title',
            prevBtnClass: 'quiz__prev',
            nextBtnClass: 'quiz__next',
            dotsClass: 'quiz__dots',
            dotClass: 'quiz__dot',
            stepsCounterNumClass: 'quiz__steps-counter',
            currentStepNumClass: 'quiz__current-steps-number',
            totalStepNumClass: 'quiz__total-steps-number',
            gropupInputsClass: 'quiz__group-inputs',
            groupInputsTitleClass: 'quiz__group-title',

            prevBtnText: 'Назад',
            nextBtnText: 'Следующий шаг',

            fieldClasses: {
              radio: 'quiz__radio',
              checkbox: 'quiz__checkbox',
              text: 'quiz__text',
              textarea: 'quiz__text',
              select: 'quiz__select'
            }
          }

          _.$dots = [];
          _.$steps = [];
          _.$filledSteps = []; // шаги, которые уже были заполненны (для движения назад)
          _.radioCount = 0;
          _.checkboxCount = 0;

          _.assign(_.defaults, _.options);

          _.stepsLength = options.steps.length + 1;
          _.currentStep = 0;

          _.inputHandler = _.input.bind(_);
          _.nextStepHandler = _.nextStep.bind(_);
          _.prevStepHandler = _.prevStep.bind(_);

          _.init();

          _.$prevStep = _.$steps[_.currentStep - 1];
          _.$currentStep = _.$steps[_.currentStep];
          _.$nextStep = _.$steps[_.currentStep + 1];


          _.$filledFieldsOnThisStep = [];
          _.$fieldsOnThisStep = null;
          _.result = [];

          _.printStep(_.currentStep);

          _.$quiz.resetQuiz = _.resetQuiz;

          _.dispatchEvent(_.$quiz, 'init', _.setEventDetails());

          return _.$quiz;
          // return _;
        }
      })();

      Quiz.prototype.init = function() {
        let _ = this,
          options = _.options;

        _.$form.parentElement.style.display = 'none';

        _.buildInsides();
        _.buildSteps();
        _.$steps.push(_.$form);

        _.$next.classList.add('disabled');
        _.$prev.classList.add('disabled');
        _.$dots[_.currentStep].classList.add('active');

        _.$quiz.addEventListener('input', _.inputHandler);
        // _.$next.addEventListener('click', _.nextStepHandler);
      };

      Quiz.prototype.dispatchEvent = function(element, eventName, argumentsObj) {
        if (typeof window.CustomEvent === "function") {
          argumentsObj = argumentsObj || {}
          let evt = new CustomEvent(eventName, argumentsObj);
          element.dispatchEvent(evt);
        }
      };

      Quiz.prototype.buildInsides = function() {
        let _ = this,
          options = _.options,
          setButtonType = function(tag, el) {
            if (tag === 'button') {
              el.setAttribute('type', 'button');
            }
          };

        _.$header = _.createEl(options.headerTag);
        _.$body = _.createEl(options.bodyTag);
        _.$footer = _.createEl(options.footerTag);
        _.$stepsTitle = _.createEl(options.stepTitletag);

        _.$header.className = options.headerClass;
        _.$body.className = options.bodyClass;
        _.$footer.className = options.footerClass;
        _.$stepsTitle.className = options.stepTittleClass;

        if (options.counter) {
          _.$stepsCounter = _.createEl(options.stepsCounterNumTag);
          _.$counterCurrentNum = _.createEl(options.currentStepNumTag);
          _.$counterTotalNum = _.createEl(options.totalStepNumTag);

          _.$stepsCounter.className = options.stepsCounterNumClass;
          _.$counterCurrentNum.className = options.currentStepNumClass;
          _.$counterTotalNum.className = options.totalStepNumClass;

          _.$counterCurrentNum.textContent = _.currentStep + 1;
          _.$counterTotalNum.textContent = _.stepsLength;

          _.$stepsCounter.innerHTML = '<span>Шаг</span> ';
          _.$stepsCounter.appendChild(_.$counterCurrentNum);
          _.$stepsCounter.insertAdjacentHTML('beforeend', ' <span>из</span> ');
          _.$stepsCounter.appendChild(_.$counterTotalNum);

        }

        if (options.dots) {
          _.$dotsBlock = _.createEl(options.dotsTag);

          _.$dotsBlock.className = options.dotsClass;

          for (let i = 0; i < _.stepsLength; i++) {
            let dot = _.createEl(options.dotTag);
            dot.className = options.dotClass;
            setButtonType(options.dotTag, dot);
            _.$dots[i] = dot;
            _.$dotsBlock.appendChild(dot);
          }
        }

        if (options.prev) {
          _.$prev = _.createEl(options.prevBtnTag);
          _.$prev.className = options.prevBtnClass;
          setButtonType(options.prevBtnTag, _.$prev);
          _.$prev.textContent = options.prevBtnText;
        }

        if (options.next) {
          _.$next = _.createEl(options.nextBtnTag);
          _.$next.className = options.nextBtnClass;
          setButtonType(options.nextBtnTag, _.$next);
          _.$next.textContent = options.nextBtnText;
        }

        _.$header.appendChild(_.$stepsCounter);
        _.$header.appendChild(_.$dotsBlock);
        _.$header.appendChild(_.$stepsTitle);

        _.$footer.appendChild(_.$prev);
        _.$footer.appendChild(_.$next);

        _.$quiz.appendChild(_.$header);
        _.$quiz.appendChild(_.$body);
        _.$quiz.appendChild(_.$footer);

      };

      Quiz.prototype.setEventDetails = function() {
        let _ = this;

        return {
          'detail': {
            prevStep: _.currentStep - 1,
            currentStep: _.currentStep,
            nextStep: _.currentStep + 1,
            stepsLength: _.stepsLength,
            currentStepObject: _.$currentStep,
            quizObject: _
          }
        }
      };

      Quiz.prototype.buildSteps = function() {
        let _ = this,
          options = _.options,
          steps = options.steps;
        /*
          Перебираем все шаги и формируем удобный объект с щагами
          Будет содержать заголовок шага
          И уже готовые элементы для вставки
        */
        for (let step in steps) {
          let curStep = steps[step], // берем текущий шаг в переменную (для сокр. записи)
            fields = curStep['fields'], // поля шага
            options = curStep.options, // переданные доп. опции (для действий на переключении шагов, например, менять картинки)
            extrafields = curStep['extrafields'], // дополнительные поля
            stepObject = {}; // объект одного шага, который будем вставлять в массив шагов

          // Если есть голые поля, т.е. без ветвления ответов
          if (fields) {
            let stepTitle = curStep['step-title'], // текст заголовка шага
              parsedFields = _.parseFields(fields); // разбираем поля, создаем html объекты

            // Если есть дополнительные поля, то разбираем их
            if (extrafields) {
              extrafields = _.parseExtraFields(extrafields);
            }

            stepObject['step-title'] = stepTitle; // текст для заголовка шага
            stepObject.fields = parsedFields.fieldsArray; // массив разобранных полей
            stepObject.extrafields = extrafields; // вставляем дополнительные поля (могут быть undefined)
            stepObject.html = parsedFields.html; // элементы для вставки на страницу
            stepObject.options = options; // доп. опции, переданные в json, для использования на событиях nextstep, prevstep

            // Если поля есть ветвление ответов
          } else {
            /*
              Разбираем ветвления ответов
              значение овета: [поле, поле, поле]
            */
            for (let key in curStep) {
              let parsedFields = _.parseFields(curStep[key].fields),
                extrafields = curStep[key].extrafields,
                stepTitle = curStep[key]['step-title'],
                options = curStep[key].options;

              // Если есть дополнительные поля, то разбираем и их
              if (extrafields) {
                extrafields = _.parseExtraFields(extrafields);
              }

              stepObject[key] = {
                options: options,
                'step-title': stepTitle,
                fields: parsedFields.fieldsArray,
                extrafields: extrafields,
                html: parsedFields.html
              }

            }
          }

          _.$steps.push(stepObject); // вставляем сформированный объект шага в массив

        }
      };

      Quiz.prototype.parseFields = function(fields, isExtraFields) {
        let _ = this,
          options = _.options,
          obj = {
            fieldsArray: [],
            html: []
          },
          fieldsType;

        // Если мы создаем доп. поле, то добавим ему соотв. дата-атрибут
        // Всем title зададим соотв. дата-атрибут, чтобы было потом легко найти их через q

        for (let field in fields) {
          let curField = fields[field],
            fieldType = curField.type,
            groupTitle = curField['group-title'],
            fieldTitle = curField.title,
            required = curField.required,
            values = curField.values,
            placeholder = curField.placeholder,
            fieldTag = fieldType === 'textarea' ? 'textarea' : 'input',
            fieldClass = options.fieldClasses[fieldType];

          fieldsType = fieldType;

          // Разбираем обычное поле с текстом или числом
          if (fieldType === 'text' || fieldType === 'number' || fieldType === 'textarea') {
            let $field = _.createEl(options.fieldTag),
              $title = _.createEl(options.fieldTitleTag),
              $input = _.createEl(fieldTag),
              inputClassPostfix = fieldType === 'textarea' ? '-textarea' : '-inp',
              fieldObject = {};

            if (isExtraFields) {
              $field.setAttribute('data-extra-field', '')
            }

            $input.type = fieldType;

            if (placeholder) {
              $input.placeholder = placeholder;
            }

            $title.textContent = fieldTitle;
            $title.setAttribute('data-field-title', '');

            $field.className = fieldClass;
            $input.className = fieldClass + inputClassPostfix + (required ? ' required' : '');
            $title.className = fieldClass + '-title';

            $field.appendChild($title);
            $field.appendChild($input);

            fieldObject.input = $input;
            fieldObject.field = $field;
            fieldObject.title = $title;

            obj.fieldsArray.push(fieldObject);
            obj.html.push($field);

          } else if (values && values.length > 0) {
            // Если есть group-title, то помещаем в общий блок
            let $groupBlock,
              $groupTitle,
              $selectBlock,
              $selectLabel,
              $selectBlockTitle;

            if (groupTitle) {
              $groupBlock = _.createEl('div');
              $groupTitle = _.createEl('span');

              $groupBlock.className = options.gropupInputsClass;
              $groupTitle.className = options.groupInputsTitleClass;
              $groupTitle.textContent = groupTitle;
              $groupTitle.setAttribute('data-field-title', ''); // присваиваем тайтлу атрибут для облегчения его поиска
              $groupBlock.appendChild($groupTitle);
            }

            if (fieldType === 'select') {
              $selectLabel = _.createEl(options.fieldTag); // создаем блок-обертку
              $selectBlock = _.createEl('select'); // создаем сам селект
              $selectBlockTitle = _.createEl(options.fieldTitleTag); // создаем татйл

              $selectLabel.appendChild($selectBlockTitle); // вставляем тайтл в блок-обертку
              $selectLabel.appendChild($selectBlock); // вставляем селект в блок-обертку
              $selectBlockTitle.className = fieldClass + '-title'; // присваиваем тайтлу класс
              $selectBlockTitle.textContent = fieldTitle; // присваиваем тайтлу текст
              $selectBlockTitle.setAttribute('data-field-title', ''); // присваиваем тайтлу атрибут для облегчения его поиска
              $selectLabel.className = fieldClass; // присваиваем блоку-обертке класс
              $selectBlock.className = fieldClass + '-inp' + (required ? ' required' : ''); // класс для селекта
            }

            /*
              Перебираем все значения и для селекта создаем options,
              а для radio и checkbox создаем input с классами, значениями и др. атрибутами
            */
            for (let i = 0, len = values.length; i < len; i++) {
              let $field,
                $title,
                $input,
                $pseudoInp,
                fiteldsNameAttr,
                fieldObject = {};

              if (fieldType === 'select') {
                $input = _.createEl('option');
                $input.value = $input.textContent = values[i];
                $field = $selectBlock;
              } else {
                $field = _.createEl(options.fieldTag);
                $title = _.createEl(options.fieldTitleTag);
                $input = _.createEl(fieldTag);
                $pseudoInp = _.createEl('span');

                // Создаем атрибут name (radio-0, radio-1 и т.д.)
                if (fieldType === 'radio') {
                  fiteldsNameAttr = 'radio-' + _.radioCount;
                } else {
                  fiteldsNameAttr = 'checkbox-' + _.checkboxCount;
                }

                $input.value = values[i];
                $input.name = fiteldsNameAttr;
                $input.type = fieldType;

                $title.textContent = values[i];
                $pseudoInp.className = fieldClass + '-pseudo-inp';
                $field.className = fieldClass;
                $input.className = fieldClass + '-inp' + (required ? ' required' : '');
              }

              if ($title) {
                $title.className = fieldClass + '-title';
                fieldObject.title = $title;
              }

              fieldObject.input = $input;
              fieldObject.field = $field;

              $field.appendChild($input);

              if ($pseudoInp) {
                $field.appendChild($pseudoInp);
              }

              if ($title) {
                $field.appendChild($title);
              }

              if ($groupBlock && fieldType !== 'select') {
                $groupBlock.appendChild($field);
              }

              obj.fieldsArray.push(fieldObject);
            } // endfor values


            if ($groupBlock) {
              if ($selectLabel) {
                $groupBlock.appendChild($selectLabel);
              }
              obj.html.push($groupBlock);
              // obj.html = $groupBlock;
              // _.$body.appendChild($groupBlock);
            } else if ($selectLabel) {
              obj.html.push($selectLabel);
              // obj.html = $selectLabel;
              // _.$body.appendChild($selectLabel);
            }
          }

        } // endfor fields

        if (fieldsType === 'radio') {
          _.radioCount++;
        }

        if (fieldsType === 'checkbox') {
          _.checkboxCount++;
        }

        return obj;
      };

      Quiz.prototype.parseExtraFields = function(extrafields) {
        let _ = this,
          extrafieldsObject = {};

        for (let value in extrafields) {
          let extrafield = extrafields[value],
            parsedExtrafields = _.parseFields(extrafield, true);

          extrafieldsObject[value] = parsedExtrafields;
        }

        return extrafieldsObject;
      };

      Quiz.prototype.clearPrevStep = function() {
        let _ = this,
          quizBody = _.$body,
          prevStep = _.$prevStep;
        formParent = _.$form.parentElement;

        if (prevStep) {
          // Если предыдущий шаг это форма заявки
          if (prevStep === _.$form) {
            formParent.style.display = 'none';
            _.$quiz.replaceChild(quizBody, formParent);
            // _.$body.removeChild(_.$form); // Удалим форму из боди
            _.$result.value = ''; // Чистим ответы
          } else {
            let prevHtml = prevStep.html, // Массив полей предыдущего шага
              prevExtrafields = prevStep.extrafields; // Доп. поля предыдушего шага

            for (let i = 0, len = prevHtml.length; i < len; i++) {
              quizBody.removeChild(prevHtml[i]); // Удаляем со страницы поля предыдущего шага
            }

            if (prevExtrafields) {
              for (let key in prevExtrafields) {
                let prevExtrafieldsHtml = prevExtrafields[key].html; // Массив html доп. полей предыдущего шага
                for (let i = 0, len = prevExtrafieldsHtml.length; i < len; i++) {
                  if (quizBody.contains(prevExtrafieldsHtml[i])) {
                    quizBody.removeChild(prevExtrafieldsHtml[i]);
                  }
                }
              }
            }
          }
        }

      };

      Quiz.prototype.printStep = function(num) {
        let _ = this,
          options = _.options,
          quizBody = _.$body,
          prevStep = _.$prevStep,
          currentHtml = _.$currentStep['html'], // html если нет ветвления ответов или шаг 1
          prevStepObject = prevStep && prevStep.value,
          prevStepValue; // Будем искать значение предыдущего шага для ветвления ответов
        formParent = _.$form.parentElement;

        // Если финальный шаг
        if (_.$currentStep === _.$form) {
          // console.log('final step');
          // quizBody.appendChild(_.$form); // Добавляем форму
          formParent.style.display = 'block';
          _.$quiz.replaceChild(formParent, quizBody);
          _.$quiz.classList.add('final-step');

          // Заполняем поле с результатом
          for (let i = 0, len = _.result.length; i < len; i++) {
            let item = _.result[i];

            for (let key in item) {
              let value = item[key].join(', ');
              _.$result.value += key + ': ' + value + '\n';
            }

          }
          // Убираем поля предыдущего шага, если они есть
          _.clearPrevStep();
          return;
        }
        // console.log('_.$prevStep', _.$prevStep);
        // console.log('_.$currentStep', _.$currentStep);
        // console.log('_.$nextStep', _.$nextStep);
        // Если нет готового html для вставки, значит есть ветвление
        if (!currentHtml) {
          if (prevStepObject) {
            // Перебираем ответы, которые были даны в предыдущем шаге
            for (let key in prevStepObject) {
              let values = prevStepObject[key], // Массив ответов предыдущего шага
                doBreak = false; // Для прерывания цикла в дочерних циклах

              // Если в массиве всего 1 значение, то преобразуем его в строку
              if (values.length === 1) {
                values = '' + values;
                //  console.log(values, 'один в массиве, ищу');
                // Пробуем найти внутри вариантов текущего шага
                if (_.$currentStep[values]) {
                  prevStepValue = values; // Подставляем значение
                  //  console.log('есть совпадение с ', values);
                  //  console.log('Общий цикл прерван на ', values);
                  break; // Прерываем цикл

                  // Если значение не найдено, то ищем его в каждом варианте текущего шага
                } else {
                  //  console.log('нет совпадения с', values);
                  for (let currentStepValue in _.$currentStep) {
                    //  console.log('ищу', values, 'в', currentStepValue);
                    if (currentStepValue.indexOf(values) !== -1) {
                      prevStepValue = currentStepValue;
                      doBreak = true;
                      //  console.log('есть совпадение', values, 'в', currentStepValue);
                      break;
                    }
                  }
                  //  if (!prevStepValue) {
                  //  console.log(values, 'не найдено вообще');
                  //  }
                }
                // Если в массиве несколько значений, то нужно перебирать их
              } else {
                //  console.log(values, 'не один в массиве, перебираю');
                for (let i = 0, len = values.length; i < len; i++) {
                  for (let currentStepValue in _.$currentStep) {
                    //  console.log('ищу', values[i], 'в', currentStepValue);
                    if (currentStepValue.indexOf(values[i]) !== -1) {
                      prevStepValue = currentStepValue;
                      doBreak = true;
                      //  console.log('есть совпадение', values[i], 'в', currentStepValue);
                      break;
                    }
                  }
                  if (doBreak) {
                    //  console.log('Цикл прерван на', values[i]);
                    break;
                  }
                }
              }

              if (doBreak) {
                //  console.log('Общий цикл прерван на ', values);
                break;
              }

            }

          } // endif prevStepObject

          if (prevStepValue) {
            _.$currentStep = _.$currentStep[prevStepValue]; // Подставляем значение в текущий шаг
            currentHtml = _.$currentStep['html']; // Подставляем значение html
          }

        } // endelse

        // Убираем поля предыдущего шага, если они есть
        _.clearPrevStep();
        // Вставляем html на страницу
        for (let key in currentHtml) {
          let block = currentHtml[key];
          quizBody.appendChild(block);
        }

        _.$stepsTitle.textContent = _.$currentStep['step-title']; // устанавливаем заголовок для шага

        _.$fieldsOnThisStep = qa('select, input, textarea', quizBody, true); // Собираем все поля с шага

        // Приводим все поля в изначальное состояние
        for (var i = _.$fieldsOnThisStep.length - 1; i >= 0; i--) {
          let $field = _.$fieldsOnThisStep[i],
            fieldType = $field.type;

          if ($field.checked) {
            $field.checked = false; // снимаем выделение
          }

          if (fieldType === 'text' || fieldType === 'textarea' || fieldType === 'number') {
            $field.value = ''; // Чистим поля ввода
          }

          if ($field.tagName === 'SELECT') {
            $field.selectedIndex = 0; // Устанавливаем селект в изначальное положение 0
          }

        }
      };

      Quiz.prototype.input = function(evt) {
        let _ = this,
          target = evt.target,
          extrafields = _.$currentStep.extrafields, // доп. поля на текущем шаге

          $radioButtons = [],
          $checkboxes = [],
          $select = [],
          $requiredFields = [], // список обязательных полей
          $emptyRequiredFields = [], // пустые обязательные к заполнению поля (val === '')
          $filledRequiredFields = [], // не пустые обязательные к заполнению поля (val !== '')
          $filledFields = [], // все не пустые поля (val !== '')

          radioGroupIsChecked = true, // выбрана хотя бы одна радиокнопка
          checkboxesGroupIsChecked = true; // выбран хотя бы один чекбокс

        /*
          Будем перебирать все поля в текущем шаге
          И искать обязательные, заполненные, чекнутые и т.д.
          Потом проверять, чтобы кол-во обязательных === кол-во заполненных
          И хотя бы одна радиокнопка и хотя бы один чекбокс выбран
          И тогда разблокировать кнопку далее, иначе блокировать
        */
        for (let i = _.$fieldsOnThisStep.length - 1; i >= 0; i--) {
          // Переменные для сокращения записи
          let $field = _.$fieldsOnThisStep[i],
            type = $field.type,
            value = $field.value,
            tagName = $field.tagName,
            checked = $field.checked;

          if (type === 'radio') {
            $radioButtons[$radioButtons.length] = $field;
            /*
              Если есть доп. поля и есть доп. поле у текущего значения
              Перебираем эти поля и если радиокнопка выбрана
              Вставялем доп. поле и обновляем массив существующих полей в шаге
              Иначе, удаляем
            */
            if (extrafields && extrafields[value]) {
              extrafields[value].html.forEach(function($field) {
                let bodyContainsField = _.$body.contains($field), // переменная для сокр. записи
                  $fieldInput = q('input', $field); // ищем инпут внутри доп поля, для добавления в массив полей

                if (checked) {
                  if (!bodyContainsField) {
                    $fieldInput.value = ''; // Очищаем поле
                    _.$body.appendChild($field); // Добавляем доп. поле на страницу
                    _.$fieldsOnThisStep.push($fieldInput); // Добавляем в массив текущего шага

                    // Если доп. поле обязательное, то добавляем его в массив обязательных полей
                    if ($fieldInput.classList.contains('required')) {
                      $requiredFields.push($fieldInput);
                    }
                  }
                } else {
                  if (bodyContainsField) {
                    $fieldInput.value = ''; // Очищаем поле
                    _.$body.removeChild($field); // Удаляем доп. поле со страницы

                    // Ищем номер поля в массивах, для его удаления оттуда
                    let indxInFieldsOnThisStep = _.$fieldsOnThisStep.indexOf($fieldInput),
                      indxInRequiredFields = $requiredFields.indexOf($fieldInput),
                      indxInFilledFields = $filledRequiredFields.indexOf($fieldInput);


                    // Удаляем доп. поле из массива текущего шага
                    if (indxInFieldsOnThisStep !== -1) {
                      _.$fieldsOnThisStep.splice(indxInFieldsOnThisStep, 1);
                    }
                    // Удаляем доп. поле из массива обязательных полей
                    if (indxInRequiredFields !== -1) {
                      $requiredFields.splice(indxInRequiredFields, 1);
                    }
                    // Удаляем доп. поле из массива заполненных полей
                    if (indxInFilledFields !== -1) {
                      $filledRequiredFields.splice(indxInFilledFields, 1);
                    }
                  }
                }
              }); // endforeach
            }
          } else if (type === 'checkbox') {
            $checkboxes[$checkboxes.length] = $field;
          } else if (tagName === 'select') {
            $select[$select.length] = $field;
          }

          if ($field.classList.contains('required')) {
            $requiredFields[$requiredFields.length] = $field;
            if (value === '') {
              $emptyRequiredFields[$emptyRequiredFields.length] = $field;
            } else {
              $filledRequiredFields[$filledRequiredFields.length] = $field;
            }
          }

          if (value !== '') {
            // Убираем не выбранные радиокнопки и чекбоксы из массива заполненных полей
            if ((type === 'radio' || type === 'checkbox') && !checked) {
              continue;
            }
            $filledFields[$filledFields.length] = $field;
          }

        } //endfor

        // если есть радиокнопки, то проверяем выбрана хотя бы одна или нет
        if ($radioButtons.length > 0) {
          radioGroupIsChecked = $radioButtons.some($field => $field.checked);
        }

        // если есть чекбоксы, то проверяем выбран хотя бы один или нет
        if ($checkboxes.length > 0) {
          checkboxesGroupIsChecked = $checkboxes.some($field => $field.checked);
        }

        // console.log('radio', $radioButtons);
        // console.log('checkboxes', $checkboxes);
        // console.log('select', $select);
        // console.log('required', $requiredFields);
        // console.log('empty', $emptyRequiredFields);
        // console.log('filled', $filledRequiredFields);
        // console.log('fieldsOnThisStep', _.$fieldsOnThisStep);

        // console.log('radio group checked is', radioGroupIsChecked);
        // console.log('checkboxes group checked is', checkboxesGroupIsChecked);

        // Если все обязательные поля заполнены
        // и хотя бы одна радиокнопка выбрана
        // и хотя бы один чекбокс выбран
        // то разрешаем идти дальше (делаем кнопку активной)
        if ($requiredFields.length === $filledRequiredFields.length &&
          radioGroupIsChecked && checkboxesGroupIsChecked) {
          _.$next.classList.remove('disabled');
          _.$next.addEventListener('click', _.nextStepHandler);
        } else {
          // иначе, делаем кнопку не активной
          _.$next.classList.add('disabled');
          _.$next.removeEventListener('click', _.nextStepHandler);
        }

        // Глобальная переменная с заполненными полями на этом шаге
        _.$filledFieldsOnThisStep = $filledFields;

      };

      /*
        При нажатии на кнопку next (срабатывании функции nextStep)
        Будем перебирать все заполненные поля из массива _.$filledFieldsOnThisStep
        Будем искать в их родителе тайтл для полей (data-field-title)
        И сформируем объект ответов:
          obj = {
            key: [value, value, value, ...]
          }
      */
      Quiz.prototype.nextStep = function() {
        let _ = this,
          options = _.options,
          object = {}, // ключи-значения инпутов (title: [values])
          $filledFields = _.$filledFieldsOnThisStep;

        // Собираем в массив значения всех заполненных полей
        for (let i = 0, len = $filledFields.length; i < len; i++) {
          let $field = $filledFields[i], // текущее поля (для сокр. записи)
            fieldType = $field.type, // тип поля (для сокр. записи)
            $fieldParent = fieldType === 'radio' || fieldType === 'checkbox' ? $field.parentElement.parentElement : $field.parentElement, // родитель полей для поиска тайтла
            fieldTtile = q('[data-field-title]', $fieldParent).textContent; // текст-заголовок полей

          // Если ключа нет, то создаем его
          if (object[fieldTtile] === undefined) {
            object[fieldTtile] = [];
          }

          object[fieldTtile].push($field.value); // Добавляем значение в массив
        }

        _.result[_.result.length] = object; // вставляем пару ключ-значения в результат

        _.$prevStep = _.$currentStep; // Устанавливаем предыдущим шагом текущий
        _.$prevStep.value = object; // Вставляем в него объект собранных значений

        _.currentStep++; // Увеличиваем индекс (делаем шаг вперед)

        _.$currentStep = _.$steps[_.currentStep]; // Делаем текущим шагом текущий шаг по индексу
        _.$nextStep = _.$steps[_.currentStep + 1]; // Делаем следующим шагом ща по индексу + 1

        _.printStep(_.currentStep); // Выводим поля

        // Делаем активной кнопку назад
        if (options.prev) {
          if (_.currentStep > 0) {
            _.$prev.classList.remove('disabled');
            _.$prev.addEventListener('click', _.prevStepHandler);
          }
        }

        // Делаем не активной кнопку дальше
        if (options.next) {
          _.$next.classList.add('disabled');
          _.$next.removeEventListener('click', _.nextStepHandler);
        }

        // Меняем активность точек-счетчиков
        if (options.dots) {
          _.$dots[_.currentStep - 1].classList.remove('active');
          _.$dots[_.currentStep].classList.add('active');
        }

        // Увеличиваем значение цифры счетчика
        if (options.counter) {
          _.$counterCurrentNum.textContent = _.currentStep + 1;
        }

        // Добавляем пройденный шаг в массив пройденных шагов
        // для контроля шагов назад
        _.$filledSteps.push(_.$prevStep);

        _.dispatchEvent(_.$quiz, 'nextstep', _.setEventDetails());

      };

      Quiz.prototype.prevStep = function() {
        let _ = this,
          options = _.options;

        _.$prevStep = _.$currentStep; // Устанавливаем предыдущим шагом текущий

        _.currentStep--; // Уменьшаем индекс текущего шага (делаем шаг назад)

        _.$currentStep = _.$filledSteps[_.currentStep]; // Уст. текущим шагом предыдущий пройденный шаг

        _.$nextStep = _.$filledSteps[_.currentStep - 1]; // Уст. следующим шагом еще более ранний пройденный шаг

        // Убираем последнюю пару ключ-значение из результата
        _.result.pop();

        _.printStep(_.currentStep); // Выводим на экран необходимые шаги

        // Делаем активной или не активной кнопку назад
        if (options.prev) {
          _.$prev.classList.toggle('disabled', _.currentStep === 0);
          if (_.currentStep === 0) {
            _.$prev.removeEventListener('click', _.prevStepHandler);
          }
        }

        // Делаем не активной кнопку дальше
        if (options.next) {
          _.$next.classList.add('disabled');
          _.$next.removeEventListener('click', _.nextStepHandler);
        }

        // Меняем активность точек-счетчиков
        if (options.dots) {
          _.$dots[_.currentStep].classList.add('active');
          _.$dots[_.currentStep + 1].classList.remove('active');
        }

        // Уменьшаем значение цифры счетчика
        if (options.counter) {
          _.$counterCurrentNum.textContent = _.currentStep + 1;
        }

        _.$quiz.classList.remove('final-step');

        // Убираем последний пройденный шаг из массива пройденных шагов
        _.$filledSteps.pop();


        _.dispatchEvent(_.$quiz, 'prevstep', _.setEventDetails());

      };

      Quiz.prototype.resetQuiz = function() {
        let _ = this;

        _.$prevStep = _.$currentStep;

        _.currentStep = 0;

        _.$currentStep = _.$steps[_.currentStep];
        _.$nextStep = _.$steps[_.currentStep + 1];

        _.printStep(_.currentStep);

        _.$filledSteps = [];
        _.$filledFieldsOnThisStep = [];
        _.$fieldsOnThisStep = null;
        _.result = [];

        console.log('reset');
      };

      return Quiz;
    })();

    let xhr = new XMLHttpRequest(),
      imagePath = templateDir + '/img/',
      changeQuizImage = function(event) {
        let details = event.detail,
          currentStepOptions = details.currentStepObject.options;

        if (currentStepOptions) {
          let image = currentStepOptions.img,
            imageSrc = imagePath + image;
          if (image) {
            if ($quizImg.src !== imageSrc) {
              $quizImg.src = imagePath + image;             
            }
          }
        }

        if (details.nextStep === details.stepsLength) {
          $quizImg.src = imagePath + 'quiz-final-step.png';
        }
      };

    xhr.open('post', templateDir + '/quiz-' + currentSlug + '.json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();

    $quizBlock.addEventListener('init', function(event) {
      changeQuizImage(event);
    });

    $quizBlock.addEventListener('nextstep', function(event) {
      changeQuizImage(event);

      scrollToTarget($quizBlock);
    });

    $quizBlock.addEventListener('prevstep', function(event) {
      changeQuizImage(event);

      scrollToTarget($quizBlock);
    });

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.response);

        let quiz = new Quiz($quizBlock, {
          steps: response,
          dots: true,
          counter: true,
          nextBtnClass: 'quiz__next btn',
          $form: $quizForm,
          $result: $quizResult
        });

        console.log(quiz);
      }
    });
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

});