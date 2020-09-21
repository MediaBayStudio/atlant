<?php

/*
Template name: О компании
*/

require 'globals.php';

get_header();

$page = get_field( 'about_page' );

require 'layouts/about-hero/about-hero.php';

$section = [
  'sect_title' => 'Бесплатная консультация',
  'sect_subtitle' => 'мы ответим на любые ваши вопросы'
];
require 'layouts/callback/callback.php';

get_footer();