<div class="faq-popup popup container" id="faq-popup">
  <div class="faq-popup__cnt popup__content">
    <button type="button" class="faq-popup__close popup__close">
      <svg class="close__icon">
        <use xlink:href="<?php echo $template_directory ?>/img/icons-sprite.svg#icon-close"></use>
      </svg>
    </button>
    <span class="faq-popup__title popup__title">Задайте вопрос</span>
    <span class="faq-popup__subtitle popup__subtitle">нашим экспертам</span> <?php
    echo do_shortcode('[contact-form-7 id="286" html_class="faq-form"]') ?>
  </div>
</div>