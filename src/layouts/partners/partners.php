<section class="partners-sect container"> <?php
  $sect_title = $section['sect_title'];
  $page_id = get_the_ID();
  $terms = get_terms( [
    'taxonomy' => 'partners',
    'hide_empty' => false
  ] ) ?>
  <h2 class="partners-sect__title sect-title"><?php echo $sect_title ?></h2> <?php
  if ( $terms ) : ?>
    <div class="partners"> <?php
      foreach ( $terms as $term ) :
        $term_title = $term->name;
        $term_img = get_field( 'logo', $term ) ?>
        <img src="<?php echo $term_img ?>" alt="<?php echo $term_title ?>" class="parnters__img">
      <?php
    endforeach ?>
   </div> <?php
  endif ?>
</section>