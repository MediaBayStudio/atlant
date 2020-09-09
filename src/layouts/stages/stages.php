<section class="stages-sect container"> <?php
  $sect_title = $section['sect_title'];
  $sect_subtitle = $section['sect_subtitle'];
  $stages = $section['stages_repeater'];
  $sect_style = $section['style'];

  if ( $sect_title ) : ?>
    <h1 class="stages-sect__title"><?php echo $sect_title ?></h1> <?php
  endif;
  if ( $sect_subtitle ) : ?>
    <p class="stages-sect__subtitle"><?php echo $sect_subtitle ?></p> <?php
  endif;
  $sect_modifier = ' stages_';
  $sect_modifier .= $sect_style === 'Круг' ? 'circle' : 'numbers';
  $images = [];
  $len = count( $stages ) ?>
  <div class="stages-sect__stages<?php echo $sect_modifier ?> childs-<?php echo $len ?>"> <?php
    for ( $i = 0; $i < $len; $i++ ) :
      $stage = $stages[$i];
      $images[] = $template_directory . '/img/' . $post->post_name . '-step-' . ($i + 1) . '.png' ?>
      <div class="stage stage-<?php echo $i + 1 ?>">
        <span class="stage__number"><?php echo '0' . ($i + 1) ?></span>
        <h3 class="stage__title"><?php echo $stage['title'] ?></h3>
        <p class="stage__descr"><?php echo $stage['descr'] ?></p>
      </div> <?php
  endfor;
  if ( $sect_style === 'Круг' ) : ?>
    <figure class="stages__figure"> <?php
      for ( $i = 0, $len = count( $images ); $i < $len; $i++ ) : ?>
        <img src="#" data-src="<?php echo $images[$i] ?>" alt="#" class="stages__img img-<?php echo ($i + 1) ?> lazy"> <?php
      endfor ?>
      <img src="#" data-src="<?php echo $template_directory . '/img/steps-' . $len . '.png' ?>" alt="#" class="stages__img img-0 lazy">
    </figure> <?php
  endif ?>
  </div>
</section>