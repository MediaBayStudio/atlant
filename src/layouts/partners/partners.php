<section class="partners-sect container"> <?php
  $sect_title = $section['sect_title'];
  $page_id = get_the_ID();
  $terms = get_terms( [
    'taxonomy' => 'partners',
    'hide_empty' => false
  ] ) ?>
  <h2 class="partners-sect__title sect-title"><?php echo $sect_title ?></h2> <?php
  if ( $terms ) : ?>
    <div id="partners">
      <div class="partners__nav"></div> <?php
      for ( $i = 0, $len = count( $terms ); $i < $len; $i++ ) : 
        $term_title = $terms[$i]->name;
        $term_img = get_field( 'logo', $terms[$i] ) ?>
        <img src="#" data-src="<?php echo $term_img ?>" alt="<?php echo $term_title ?>" class="partners__img lazy">
      <?php
    endfor ?>
   </div> <?php
  endif ?>
</section>