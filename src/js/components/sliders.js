;
(function() {
  let nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    arrowSvg = '<svg class="arrow__svg" width="35" height="64" viewBox="0 0 35 64" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M1.61232 59.6024C0.618114 60.6145 0.618114 62.2405 1.61232 63.2451C2.60653 64.2498 4.21285 64.2535 5.20706 63.2451L34.2543 33.8207C35.2486 32.816 35.2486 31.19 34.2543 30.1779L5.20706 0.753472C4.21285 -0.251157 2.60653 -0.251157 1.61232 0.753472C0.618114 1.76182 0.618114 3.39155 1.61232 4.39618L28.1036 32.0012L1.61232 59.6024Z" fill="inherit"/></svg>',
    dot = '<button type="button" class="dot"></button>',
    heroSlider = q('.hero-sect__slider'),
    heroSlides = heroSlider && qa('.hero-sect__slide', heroSlider),
    createArrow = function(className, inside) {
      return `<button type="button" class="arrow ${className}">${inside}</button>`;
    };

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