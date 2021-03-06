<?php
$template_directory = get_template_directory_uri();
$site_url = site_url();
$is_front_page = is_front_page();
$is_404 = is_404();

$address = get_option( 'contacts_address' );
$tel_people = get_option( 'contacts_tel_people' );
$tel_people_dry = preg_replace( '/\s/', '', $tel_people );
$tel_company = get_option( 'contacts_tel_company' );
$tel_company_dry = preg_replace( '/\s/', '', $tel_company );
$phones = [ $tel_people, $tel_company ];
$phones_dry = [ $tel_people_dry, $tel_company_dry ];
$phones_sign = [ 'Для физических лиц', 'Для юр. лиц и партнеров' ];
$email = get_option( 'contacts_email' );
$whatsapp = get_option( 'contacts_whatsapp' );
// Отключаем разные стандартные скрипты и стили wp
add_action( 'init', function() {
  // Отключаем wp-emoji
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  // Отключаем скрипты wp-embed
  remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
  remove_action( 'wp_head', 'wp_oembed_add_host_js' );
  // Отключаем гутенберг
  if ( 'disable_gutenberg' ) {
    add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );
    remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );
    add_action( 'admin_init', function() {
      remove_action( 'admin_notices', ['WP_Privacy_Policy_Content', 'notice'] );
      add_action( 'edit_form_after_title', ['WP_Privacy_Policy_Content', 'notice'] );
    } );
  }

  register_taxonomy( 'partners', ['page'], [
    'label'                 => '', // определяется параметром $labels->name
    'labels'                => [
      'name'              => 'Банки-партнеры',
      'singular_name'     => 'Банки-партнеры',
      'search_items'      => 'Найти',
      'all_items'         => 'Все',
      'view_item '        => 'Показать',
      'parent_item'       => 'Родитель',
      'parent_item_colon' => 'Родитель:',
      'edit_item'         => 'Изменить',
      'update_item'       => 'Обносить',
      'add_new_item'      => 'Добавить',
      'new_item_name'     => 'Добавить',
      'menu_name'         => 'Банки-партнеры',
    ],
    'hierarchical'          => false,
    'meta_box_cb'           => false
  ] );

} );

// убрать описание для таксономий в админке
add_action( 'admin_head', function() {
  print
  '<style>
    .term-description-wrap {display:none}
  </style>';
} );

      /* Contact Form 7 */
// Отключаем весь css-файл CF7
  add_filter( 'wpcf7_load_css', '__return_false' );

// Отключаем генерацию некоторых лишнех тегов
  add_filter( 'wpcf7_autop_or_not', '__return_false' );
// необходимые поддержки темой
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );

// удаление ненужных миниатюр
add_filter( 'intermediate_image_sizes', function ( $sizes ){
  // размеры которые нужно удалить
  return array_diff( $sizes, [
    'medium',
    'medium_large',
    'large',
    '1536x1536',
    '2048x2048',
  ] );
} );

// add_image_size( 'size_name', 100, 100, true );

// Функция подключения стилей
function enqueue_style( $style_name, $widths ) {
  if ( is_string( $widths ) ) {
    if ( $style_name === 'hover' ) {
      wp_enqueue_style( "{$style_name}", get_template_directory_uri() . "/css/{$style_name}.css", [], null, "(hover), (min-width:1024px)" );
    } else {
      wp_enqueue_style( "{$style_name}", get_template_directory_uri() . "/css/{$style_name}.css", [], null );
    }
  } else {
    foreach ( $widths as $width ) {
      if ( $width !== "0" ) {
        $media = $width - 0.02;
        // если размер файла равен 0, то не подключаем его
        if (filesize(get_template_directory() . '/css/' . $style_name . '.' . $width . '.css') === 0) {
          continue;
        }
      wp_enqueue_style( "{$style_name}-{$width}px", get_template_directory_uri() . "/css/{$style_name}.{$width}.css", [], null, "(min-width: {$media}px)" );
      } else {
        wp_enqueue_style( "{$style_name}-page", get_template_directory_uri() . "/css/{$style_name}.css", [], null );
      }
    }
  }
}

// Подключаем свои стили и скрипты
add_action( 'wp_enqueue_scripts', function() {
  $screen_widths = ['0', '420', '576', '768', '1024', '1440']; // на каких экранах подключать css

  wp_enqueue_style( 'theme-style', get_stylesheet_uri(), [], null );        // подключить стиль темы (default)

  // подключаем стили с помощью своей функции
  enqueue_style( 'style', $screen_widths );

  if ( is_front_page() || is_page_template( 'service.php' ) ) {
		enqueue_style( 'service', $screen_widths );
	} else if ( is_404() || is_page_template( 'about.php' ) || is_page_template( 'reviews.php' ) || is_page_template( 'faq.php' ) || is_page_template( 'contacts.php' ) ) {
		enqueue_style( 'pages', $screen_widths );
	}

  enqueue_style( 'hover', '' ); // подключаем стили для эффектов при наведении

  // Подключаем скрипты циклом
  $scripts = [
		'slick.min',
		'jquery.validate.min',
		'lazy.min',
		'MobileMenu.min',
		'Popup.min',
		'svg4everybody.min',
		'main'
	];

  foreach ( $scripts as $script_name ) {
    wp_enqueue_script( "{$script_name}", get_template_directory_uri() . "/js/{$script_name}.js", [], null );
  }
  // Отключаем стандартные jquery, jquery-migrate
  // лучше подключать свой jquery
  wp_deregister_script( 'jquery-core' );
  wp_deregister_script( 'jquery' );

  // Подключаем свой jquery
  wp_register_script( 'jquery-core', get_template_directory_uri() . '/js/jquery-3.4.1.min.js', false, null, true );
  wp_register_script( 'jquery', false, ['jquery-core'], null, true );
  wp_enqueue_script( 'jquery' );

} );

// Убираем id и type в тегах script, добавляем нужным атрибут defer
  add_filter('script_loader_tag',   function( $html, $handle ) {
    switch ( $handle ) {
      case 'value':
      case 'slick.min':
      case 'jquery.validate.min':
      case 'lazy.min':
      case 'MobileMenu.min':
      case 'Popup.min':
      case 'svg4everybody.min':
      case 'main':
      case 'contact-form-7':
        $html = str_replace( ' src', ' defer src', $html );
        break;
    }

    $html = str_replace( " id='$handle-js' ", '', $html );
    $html = str_replace( " type='text/javascript'", '', $html );

     return $html;
  }, 10, 2);

// Убираем id и type в тегах style
  add_filter( 'style_loader_tag', function( $html, $handle ) {
    $html = str_replace( " id='$handle-css' ", '', $html );
    $html = str_replace( " type='text/css'", '', $html );

    switch ( $handle ) {
      case 'theme-style':
      case 'style-page':
      // case 'service-page':
      // case 'pages-page':
      $html = str_replace( "rel='stylesheet'", "rel='preload' as='style' onload=\"this.rel='stylesheet'\"", $html );
        break;
    }


    // $html = str_replace( "rel='stylesheet'", "rel='preload' as='style' onload=\"this.rel='stylesheet'\"", $html );
    return $html;
  }, 10, 2 );
 /* Настройка контактов в панели настройки->общее */
// Функции вывода нужных полей
  function options_inp_html ( $id ) {
    echo "<input type='text' name='{$id}' value='" . esc_attr( get_option( $id ) ) . "'>";
  }

  add_action( 'admin_init', function() {
    $options = [
      'tel_people'     =>  'Телефон для физ. лиц',
      'tel_company'     =>  'Телефон для юр. лиц',
      'address' =>  'Адрес',
      'email'   =>  'E-mail',
      'coords'  =>  'Координаты маркера на карте',
      'zoom'    =>  'Увеличение карты',
      'whatsapp' => 'WhatsApp'
    ];

    foreach ( $options as $id => $name ) {
      $my_id = "contacts_{$id}";

      add_settings_field( $id, $name, 'options_inp_html', 'general', 'default', $my_id );
      register_setting( 'general', $my_id );
    }
  } );

// Меню на сайте
  add_action( 'after_setup_theme', function() {
    register_nav_menus( [
      'header_menu' =>  'Меню в шапке сайта',
      'side_menu_in_page' => 'Боковое меню на некоторых страницах'
      // 'mobile_menu' =>  'Мобильное меню на сайте',
      // 'footer_menu' =>  'Меню в подвале сайта'
    ] );
  } );

// добавить класс для ссылки в меню (a)
  add_filter( 'nav_menu_link_attributes', function( $atts, $item ) {
    $atts['class'] = 'nav__link';
    if ( $atts['href'][0] === '#' ) {
      $atts['tabindex'] = '-1';
    }
    return $atts;
  }, 10, 2);  

// задать свои классы для пунктов меню (li)
  add_filter( 'nav_menu_css_class', function( $classes, $item, $args, $depth ) {
    $classesArray = ['nav__list-item'];

    foreach ( $classes as $class ) {
      if ( $class === 'current-menu-item' ) {
        $classesArray[] = 'current';
      } else if ( $class === 'menu-item-has-children' ) {
        $classesArray[] = 'contains-submenu';
      } else if ( $class === 'submenu-title' ) {
        $classesArray[] = $class;
      } else if ( $class === 'disabled' ) {
        $classesArray[] = 'disabled';
      }
    }
    return $classesArray;
  }, 10, 4);

// убрать id у пунктов меню
  add_filter( 'nav_menu_item_id', function( $menu_id, $item, $args, $depth ) {
    return '';
  }, 10, 4);