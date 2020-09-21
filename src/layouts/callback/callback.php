<?php
$sect_title = $section['sect_title'];
$sect_subtitle = $section['sect_subtitle'];
if ( $sect_title || $sect_subtitle ) :?>
  <section class="callback-sect container" id="callback-sect">
    <div class="callback-form-wrap">
      <h2 class="callback-sect__title"><?php echo $sect_title ?></h2>
      <span class="callback-sect__subtitle"><?php echo $sect_subtitle ?></span> <?php
      echo do_shortcode('[contact-form-7 id="186" html_class="callback-form"]') ?>
    </div>
  </section> <?php
endif;