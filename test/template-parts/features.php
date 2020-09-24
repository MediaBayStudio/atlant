<section class="features-sect container"> <?php
  $sect_title = $section['sect_title'];
  $features = $section['features'];
  $sect_descr = $section['sect_descr'];
  $list = $section['list'] ?>
  <h2 class="features-sect__title sect-title"><?php echo $sect_title ?></h2>
  <div class="features-sect__features"> <?php
  for ( $i = 0, $len = count( $features ); $i < $len; $i++ ) :
      $feature_title = $features[$i]['title'];
      $class = $i % 2 === 0 ? ' odd' : ' even' ?>
      <div class="feature feat-<?php echo $i + 1 . $class ?>">
        <img src="#" data-src="<?php echo $features[$i]['img'] ?>" alt="<?php echo $feature_title ?>" class="feature__img lazy">
        <strong class="feature__title"><?php echo $feature_title ?></strong>
        <p class="feature__descr"><?php echo $features[$i]['descr'] ?></p>
      </div> <?php
    endfor ?>
  </div> <?php
  if ( $sect_descr ) : ?>
    <p class="features-sect__descr"><?php echo $sect_descr ?></p> <?php
  endif;
  if ( $list[0]['list_item'] ) :
    if ( $list['two_col'] ) {
      $list_class = ' list_two-col';
    } ?>
    <ul class="list"> <?php
      foreach ( $list as $list_item ) : ?>
        <li class="list-item"><?php echo $list_item['list_item'] ?></li> <?php
      endforeach ?>
    </ul> <?php
  endif ?>
</section>