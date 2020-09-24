<?php

/*
Template name: О компании
*/
get_header();

$page = get_field( 'about_page' );
require 'template-parts/about-hero.php';

$section = [
  'sect_title' => 'Бесплатная консультация',
  'sect_subtitle' => 'мы ответим на любые ваши вопросы'
];
require 'template-parts/callback.php';

get_footer();