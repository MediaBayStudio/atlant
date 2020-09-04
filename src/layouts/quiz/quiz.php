<!-- 

 -->
<section class="quiz-sect container"> <?php
  $sect_title = $section['sect_title'];
  $sect_subtitle = $section['sect_subtitle'] ?>
  <h1 class="quiz-sect__title"><?php echo $sect_title ?></h1>
  <span class="quiz-sect__subtitle"><?php echo $sect_subtitle ?></span>

  <div class="quiz-sect__quiz quiz" id="quiz">
    <div class="quiz__header">
      <div class="quiz__heading-block">
        <div class="quiz__steps-counter">
          <span>шаг</span>
          <span class="quiz__current-steps-number">1</span>
          <span>из</span>
          <span class="quiz__total-steps-number">5</span>
        </div>
        <div class="quiz__dots">
          <div class="quiz__dot active"></div>
          <div class="quiz__dot"></div>
          <div class="quiz__dot"></div>
          <div class="quiz__dot"></div>
          <div class="quiz__dot last"></div>
        </div>
      </div>
    </div>
    <div class="quiz__body">

      <div class="quiz__step quiz__step-1 visible">
        <span class="quiz__step-title">Информация по кредиту</span>
        <div class="quiz__inputs">
          <span class="quiz__radio-group-title quiz__input-label">Под какой залог у вас открыт кредит?</span>
          <label class="quiz__radio">
            <input type="radio" name="radio-1" class="quiz__radio-inp"value="Авто">
            <span class="quiz__radio-pseudo-inp"></span>
            <span class="quiz__radio-label">Авто</span>
          </label>
          <label class="quiz__radio">
            <input type="radio" name="radio-1" class="quiz__radio-inp" value="ПТС">
            <span class="quiz__radio-pseudo-inp"></span>
            <span class="quiz__radio-label">ПТС</span>
          </label>
        </div>
      </div>

      <div class="quiz__step quiz__step-2">
        <span class="quiz__step-title">Информация по кредиту</span>
        <div class="quiz__inputs">
          <label class="quiz__text">
            <span class="quiz__text-label quiz__input-label">Сумма кредитного продукта</span>
            <input type="text" class="quiz__text-inp" placeholder="_ руб." data-mask=" руб." required>
          </label>
        </div>
      </div>

      <div class="quiz__step quiz__step-3">
        <span class="quiz__step-title">Информация по кредитной истории</span>
        <div class="quiz__inputs">
          <label class="quiz__text">
            <span class="quiz__text-label quiz__input-label">Количество открытых кредитов</span>
            <input type="number" class="quiz__text-inp">
          </label>
          <label class="quiz__select">
            <span class="quiz__text-label">Наличие просрочек</span>
            <select class="quiz__select-select" tabindex="1">
              <option value="Не было просрочек">Не было просрочек</option>
              <option value="до 30 дней">до 30 дней</option>
              <option value="более 30 дней">более 30 дней</option>
            </select>
          </label>
        </div>
      </div>

      <div class="quiz__step quiz__step-4">
        <span class="quiz__step-title">Персональная информация</span>
        <div class="quiz__inputs">
          <span class="quiz__radio-group-title quiz__input-label">Ваша регистрация</span>
          <label class="quiz__radio">
            <input type="radio" name="radio-2" class="quiz__radio-inp" value="Санкт-Петербург и ЛО" data-extra-field required>
            <span class="quiz__radio-pseudo-inp"></span>
            <span class="quiz__radio-label">Санкт-Петербург и ЛО</span>
          </label>
          <label class="quiz__text quiz__extra-field" data-radio="Санкт-Петербург и ЛО">
            <span class="quiz__text-label">Укажите ваш возраст</span>
            <input type="text" class="quiz__text-inp" required>
          </label>
          <label class="quiz__radio">
            <input type="radio" name="radio-2" class="quiz__radio-inp" value="Другой регион" data-extra-field required>
            <span class="quiz__radio-pseudo-inp"></span>
            <span class="quiz__radio-label">Другой регион</span>
          </label>
          <label class="quiz__text quiz__extra-field" data-radio="Другой регион">
            <span class="quiz__text-label">Укажите регион</span>
            <input type="text" class="quiz__text-inp" required>
          </label>
        </div>
      </div>

      <div class="quiz__step quiz__step-5 quiz__final-step">
        <span class="quiz__step-title">Персональная информация</span>
        <form action="#" class="quiz__form">
          <textarea class="quiz__form-result"></textarea>
          <label class="field field_name">
            <span class="field__text required">Фамилия, имя, отчество</span>
            <input type="text" name="user-name" class="field__inp" placeholder="Петров Иван Васильевич">
          </label>
          <label class="field field_tel">
            <span class="field__text required">Контактный телефон</span>
            <input type="text" name="user-tel" class="field__inp" placeholder="Номер телефона">
          </label>
          <div class="form-bottom">
            <label class="check">
              <input type="checkbox" name="policy" value="Я соглашаюсь с условиями  Политики конфиденциальности" class="check__inp" checked="">
              <span class="check__pseudo-inp"></span>
              <span class="check__text">Я соглашаюсь с условиями <a href="#" class="check__link"> Политики конфиденциальности</a></span>
            </label>
            <button class="btn">Получить решение</button>
          </div>
        </form>
      </div>

    </div>
    <div class="quiz__footer">
      <button type="button" class="btn quiz__next disabled">Следующий шаг</button>
    </div>
    <img src="#" alt="#" class="quiz__img">
  </div>
</section>