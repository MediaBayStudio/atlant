<section class="links-sect container"> <?php
  $sect_title = $section['sect_title'];
  $links = $section['links_repeater']; ?>
  <h2 class="links-sect__title sect-title"><?php echo $sect_title ?></h2>
  <div class="links-sect__links"> <?php
  $i = 0;
  foreach ( $links as $link ) :
    if ( $i % 3 === 0 ) : ?>
      <div class="links-sect__links-wrap"> <?php
    endif ?>
        <a href="<?php echo $link['link']['url'] ?>" class="links__link"><?php echo $link['link']['title'] ?></a> <?php
    if ( $i === 2 || $i === 5 || $i === 8 ) : ?>
      </div> <?php
    endif;
  $i++;
  endforeach ?>
  </div>
</section>