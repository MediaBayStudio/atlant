<?php
wp_nav_menu( [
  'theme_location'  => 'side_menu_in_page',
  'container'       => 'nav',
  'container_class' => 'side-menu__nav',
  'menu_class'      => 'side-menu__nav-list',
  'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
] ) ?>