<div class="callback-popup popup container" id="callback-popup">
  <div class="callback-popup__cnt popup__content">
    <button type="button" class="callback-popup__close popup__close">
      <svg class="close__icon">
        <use xlink:href="<?php echo $template_directory ?>/img/icons-sprite.svg#icon-close"></use>
      </svg>
    </button>
    <span class="callback-popup__title popup__title">Закажите обратный звонок</span>
    <span class="callback-popup__subtitle popup__subtitle">и мы ответим  на все ваши вопросы</span> <?php
    echo do_shortcode('[contact-form-7 id="186" html_class="callback-form"]') ?>
  </div>
</div>