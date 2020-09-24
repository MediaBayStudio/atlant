<?php
  $sect_title = $section['sect_title'];
  $sect_subtitle = $section['sect_subtitle'];
  $list = $section['list'];
  $text = $section['p'] ?>

<section class="about-sect sect container">
  <h2 class="about-sect__title sect-title"><?php echo $sect_title ?></h2>
  <p class="about-sect__list-title list-title"><?php echo $sect_subtitle ?></p>
  <ul class="about-sect__list list"> <?php
    foreach ( $list as $list_item ) : ?>
      <li class="about-sect__list-item list-item"><?php echo $list_item['list_item'] ?></li> <?php
    endforeach ?>
  </ul>
  <p class="about-sect__descr"><?php echo $text ?></p>
</section>