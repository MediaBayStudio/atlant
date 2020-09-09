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
      $quizSteps = qa('.quiz__step', $quizBody, true),
      $quizFooter = q('.quiz__footer', $quizBlock),
      $quizNextBtn = q('.quiz__next', $quizFooter),
      $quizResult = q('.quiz__form-result', $quizBody),
      currentStep = 0,
      $currentStep = $quizSteps[currentStep],
      $nextStep = $quizSteps[currentStep + 1],
      $finalStep = q('.quiz__final-step', $quizBody),
      sumRegExp = /(\d{1,3})(?=((\d{3})*)$)/g,
      nextStep = function() {
        if (event && event.type === 'keyup' && event.key !== 'Enter') {
          return;
        }
        // Если есть следующий шаг
        if ($nextStep) {
          $quizBlock.removeEventListener('keyup', nextStep);

          $quizNextBtn.removeEventListener('click', nextStep);
          $quizNextBtn.classList.add('disabled');

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
                $quizResult.value += $step.dataset.value;
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
          value = '';

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

            value += serializeValue($fieldTitle.textContent, fieldValue);

            // Если рядом с радиокнопкой должно появиться еще поле, то
              // если его значение пустое, ничего не возвращаем
            if (fieldHasExtraField) {
              let $extraField = q('[data-radio="' + fieldValue + '"] > input', $currentStep);
              if ($extraField.value === '') {
                value = '';
              }
            }
          // Если поле с текстом, числом или поле ввода и не пустое
          } else if ((fieldType === 'text' || fieldType === 'number' || fieldTagName === 'TEXTAREA') && fieldValue !== '') {
            $fieldTitle = q('.quiz__text-label', $fieldParent);
            value += serializeValue($fieldTitle.textContent, fieldValue);
          // Если поле это селект
          } else if (fieldTagName === 'SELECT') {
            $fieldTitle = q('.quiz__text-label', $fieldParent);
            value += serializeValue($fieldTitle.textContent, fieldValue);
          }

        });

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

        $currentStep.dataset.value = currentStepValue;

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