<?php
/*
  Template name: Услуга
*/
require 'globals.php';
get_header();


$sections = get_field( 'sections' );

if ( $sections ) {
  foreach ( $sections as $section ) {
    $section_name = $section['acf_fc_layout'];
    $layout = 'layouts/' . $section_name . '/' . $section_name . '.php';
    require $layout;
  }
}

get_footer();