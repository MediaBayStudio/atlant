;
(function() {

  let $quizBlock = q('#quiz');

  if ($quizBlock) {
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
      nextStep = function() {
        if (event && event.type === 'keyup' && event.key !== 'Enter') {
          return;
        }
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
          if ($currentStep === $finalStep) {
            $quizFooter.classList.add('hidden');
            $quizSteps.forEach(function($step) {
              if ($step !== $finalStep) {
                $quizResult.value += '<br>' + $step.dataset.value;
              }
            });

            console.log($quizResult.value);
          }

        }
        setQuizBodyHeight();
      },
      setQuizBodyHeight = function() {
        $quizBody.style.maxHeight = $currentStep.scrollHeight + 'px';
      },
      getData = function() {
        let $currentStepFields = qa('input, textarea, select', $currentStep, true),
          value = '';


        $currentStepFields.forEach(function($field) {
          let fieldValue = $field.value,
            fieldType = $field.type,
            fieldIsChecked = $field.checked,
            fieldHasExtraField = $field.hasAttribute('data-extra-field'),
            $fieldParent = $field.parentElement;

          if (fieldType === 'radio' && fieldIsChecked) {
            let $fieldTitle = q('.quiz__input-label', $currentStep);
            if (!$fieldTitle) {
              $fieldTitle = q('.quiz__radio-label', $fieldParent);
            }

            value += '\n' + $fieldTitle.textContent + ' ' + fieldValue;

            if (fieldHasExtraField) {
              let $extraField = q('[data-radio="' + fieldValue + '"] > input', $currentStep);
              if ($extraField.value === '') {
                value = '';
              }
            }

          } else if ((fieldType === 'text' || fieldType === 'number') && fieldValue !== '') {
            $fieldTitle = q('.quiz__text-label', $fieldParent);
            value += '\n' + $fieldTitle.textContent + ' ' + fieldValue;

          } else if ($field.tagName === 'SELECT') {
            $fieldTitle = q('.quiz__text-label', $fieldParent);
            value += '\n' + $fieldTitle.textContent + ' ' + fieldValue;
          }

        });

        return value;
      },
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

    tail.select('.quiz__select-select').on('change', function(item, state) {
      quizInput(item.option.parentElement);
    });
  }

})();