<?php
  global 
    $site_url,
    $template_directory,
    $is_front_page,
    $address,
    $phones,
    $phones_dry,
    $phones_sign,
    $email,
    $whatsapp ?>
<footer class="ftr container">
  <!-- contacts -->
  <div class="ftr__contacts">
    <!-- logo -->
    <a href="/" class="ftr__logo" title="На главную">
      <svg class="ftr__logo-img">
        <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#logo' ?>"></use>
      </svg>
    </a>
    <p class="address ftr__address"><?php echo $address ?></p>
    <!-- geo link -->
    <a href="https://yandex.ru/maps/-/CCQxi8EHoB" rel="noopener noreferrer nofollow" target="_blank" class="link ftr__link-geo">
      <img src="#" data-src="<?php echo $template_directory ?>/img/icon-geo.svg" alt="Иконка" class="link__img lazy">
      <span class="link__text">Показать на Яндекс.Картах</span>
    </a>
    <!-- mailto link -->
    <a href="mailto:<?php echo $email ?>" class="link ftr__link-mailto">
      <img src="#" data-src="<?php echo $template_directory ?>/img/icon-mail.svg" alt="Иконка" class="link__img lazy">
      <span class="link__text">Написать нам</span>
    </a>
    <!-- sitemap link -->
    <a href="#" target="_blank" class="link ftr__link-sitemap">
      <img src="#" data-src="<?php echo $template_directory ?>/img/icon-sitemap.svg" alt="Иконка" class="link__img lazy">
      <span class="link__text">Карта сайта</span>
    </a>
    <!-- phones block -->
    <div class="phones ftr__phones"> <?php
      # Номера телефонов
      for ( $i = 0; $i < count( $phones ); $i++ ) : ?>
        <a href="tel:<?php echo $phones_dry[$i] ?>" class="tel tel-<?php echo $i + 1 ?>">
          <span class="tel__code"><?php echo substr( $phones[$i], 0, 9 ) ?></span>
          <span class="tel__number"><?php echo substr( $phones[$i], 9 ) ?></span>
          <small class="tel__sign"><?php echo $phones_sign[$i] ?></small>
        </a> <?php
      endfor ?>
    </div>
    <!-- email link -->
    <div class="email ftr__email">
      <span>E-mail:</span>
      <a href="mailto:<?php echo $email ?>" class="email__link"><?php echo $email ?></a>
    </div>
    <!-- callback, whatsapp buttons -->
    <div class="ftr__buttons">
      <button type="button" class="ftr__callback callback-btn">
        <svg class="callback-btn__img">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-callback' ?>"></use>
        </svg>
        <!--  class="ftr__callback-text" -->
        <span>Заказать обратный звонок</span>
      </button>
      <a href="<?php echo $whatsapp ?>" class="ftr__whatsapp whatsapp-btn">
        <svg class="whatsapp-btn__img">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-whatsapp' ?>"></use>
        </svg>
        <!--  class="ftr__whatsapp-text" -->
        <span>Задать вопрос в WhatsApp</span>
      </a>
    </div>
    <!-- design logo -->
    <img src="#" data-src="<?php echo $template_directory ?>/img/design-logo.svg" alt="Логотип дизайнера" class="ftr__design lazy">
    <!-- dev logo -->
    <div class="ftr__dev"><span>Разработка — </span><a href="https://media-bay.ru/" rel="noopener noreferrer nofollow" target="_blank" title="Перейти на сайт разработчика" class="ftr__dev-link">media bay</a></div>
  </div>
  <!-- copyright -->
  <span class="ftr__copy">
    <span class="ftr__copy-text">&copy; 2016-<?php echo date('Y') ?>,  ИП Занько Михаил Александрович.  Все права защищены.</span>
  </span>
</footer>
<div id="fake-scrollbar"></div> <?php
wp_footer();

require 'layouts/mobile-menu/mobile-menu.php';
require 'layouts/overlay/overlay.php';
require 'layouts/review-popup/review-popup.php';
require 'layouts/callback-popup/callback-popup.php';
require 'layouts/thanks-popup/thanks-popup.php' ?>
	</body>
</html>