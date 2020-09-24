<aside class="menu">
  <div class="menu__cnt">
    <a href="/" class="menu__logo" title="На главную">
      <svg class="menu__logo-img">
        <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#logo' ?>"></use>
      </svg>
    </a>
    <div class="menu__buttons">
      <button type="button" class="menu__callback callback-btn">
        <svg class="callback-btn__img">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-callback' ?>"></use>
        </svg>
        <span>Заказать обратный звонок</span>
      </button>
      <a href="<?php echo $whatsapp ?>" class="menu__whatsapp whatsapp-btn">
        <svg class="whatsapp-btn__img">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-whatsapp' ?>"></use>
        </svg>
        <span>Задать вопрос в WhatsApp</span>
      </a>
    </div>
    <div class="phones menu__phones"> <?php
        # Номера телефонов
        for ( $i = 0; $i < count( $phones ); $i++ ) : ?>
      <a href="tel:<?php echo $phones_dry[$i] ?>" class="tel tel-<?php echo $i + 1 ?>">
        <span class="tel__code">
          <?php echo substr( $phones[$i], 0, 9 ) ?></span>
        <span class="tel__number">
          <?php echo substr( $phones[$i], 9 ) ?></span>
        <small class="tel__sign">
          <?php echo $phones_sign[$i] ?></small>
      </a> <?php
        endfor ?>
    </div>
    <div class="email menu__email">
      <span>E-mail:</span>
      <a href="mailto:<?php echo $email ?>" class="email__link"><?php echo $email ?></a>
    </div> <?php
    # Меню в шапке
    wp_nav_menu( [
      'theme_location'  => 'header_menu',
      'container'       => 'nav',
      'container_class' => 'menu__nav',
      'menu_class'      => 'menu__nav-list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <p class="address menu__address"><?php echo $address ?></p>
    <a href="https://yandex.ru/maps/-/CCQxi8EHoB" rel="noopener noreferrer nofollow" target="_blank" class="link menu__link-geo">
      <img src="#" data-src="<?php echo $template_directory ?>/img/icon-geo.svg" alt="Иконка" class="link__img lazy">
      <span class="link__text">Показать на Яндекс.Картах</span>
    </a>
    <a href="mailto:<?php echo $email ?>" class="link menu__link-mailto">
      <img src="#" data-src="<?php echo $template_directory ?>/img/icon-mail.svg" alt="Иконка" class="link__img lazy">
      <span class="link__text">Написать нам</span>
    </a>
    <a href="#" target="_blank" class="link menu__link-sitemap">
      <img src="#" data-src="<?php echo $template_directory ?>/img/icon-sitemap.svg" alt="Иконка" class="link__img lazy">
      <span class="link__text">Карта сайта</span>
    </a>
  </div>
</aside>