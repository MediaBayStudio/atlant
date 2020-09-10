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
<!DOCTYPE html>
<html <?php language_attributes() ?>>

<head>
  <meta charset="<?php bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, user-scalable=no, viewport-fit=cover">
  <meta http-equiv="X-UA-Compatible" content="ie=edge"> <?php
  # Fonts preload
  $fonts = [
    'IntroBlack-Regular.woff',
    'Ubuntu-Bold.woff',
    'Ubuntu-Medium.woff',
    'Ubuntu-Regular.woff',
    'Ubuntu-Light.woff',
    'SegoeUI-SemiBold.woff'
  ];
  foreach ( $fonts as $font ) : ?>
  <link rel="preload" href="<?php echo $template_directory . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
  endforeach ?>
  <!-- favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#eff1f1">
  <meta name="theme-color" content="#ffffff"> <?php
  wp_head() ?>
</head>

<body data-post="<?php echo $post->post_name ?>" data-directory="<?php echo $template_directory ?>" data-post-name="<?php the_title() ?>"> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.
    <!-- </noindex> -->
  </noscript>
  <header class="hdr"> <?php
    # Меню в шапке
    wp_nav_menu( [
      'theme_location'  => 'header_menu',
      'container'       => 'nav',
      'container_class' => 'hdr__nav container',
      'menu_class'      => 'hdr__nav-list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <div class="hdr__content container">
      <!-- logo -->
      <a href="/" class="hdr__logo" title="На главную">
        <svg class="hdr__logo-img">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#logo' ?>"></use>
        </svg>
        <svg class="hdr__logo-img hdr__logo-img_vertical">
          <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#logo-vertical' ?>"></use>
        </svg>
      </a>
      <!-- burger -->
      <button type="button" class="hdr__burger">
        <span class="hdr__burger-box">
          <span class="hdr__burger-inner"></span>
        </span>
      </button>
      <!-- callback, whatsapp buttons -->
      <div class="hdr__buttons">
        <!-- callback btn -->
        <button type="button" class="hdr__callback callback-btn">
          <svg class="callback-btn__img">
            <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-callback' ?>"></use>
          </svg>
          <span>Заказать обратный звонок</span>
        </button>
        <!-- whatsapp btn -->
        <a href="<?php echo $whatsapp ?>" class="hdr__whatsapp whatsapp-btn">
          <svg class="whatsapp-btn__img">
            <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-whatsapp' ?>"></use>
          </svg>
          <span>Задать вопрос в WhatsApp</span>
        </a>
      </div>
      <div class="hdr__contacts">
        <!-- phones -->
        <div class="phones hdr__phones"> <?php
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
        <!-- address -->
        <p class="address hdr__address"><?php echo $address ?></p>
        <!-- email -->
        <div class="email hdr__email">
          <span>E-mail:</span>
          <a href="mailto:<?php echo $email ?>" class="email__link">
            <?php echo $email ?></a>
        </div>
      </div>
    </div> <?php
    # Мобильное меню
    require 'layouts/mobile-menu/mobile-menu.php' ?>
  </header> <?php
  if ( !$is_front_page ) : ?>
  <div class="breadcrumbs container">
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <a href="/" class="breadcrumbs__link">Главная</a>
      </li>
      <li class="breadcrumbs__item current">
        <a href="<?php the_permalink() ?>" class="breadcrumbs__link">
          <?php the_title() ?></a>
      </li>
    </ul>
  </div>
  <?php
  endif;