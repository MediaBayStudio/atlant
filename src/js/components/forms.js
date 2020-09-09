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
