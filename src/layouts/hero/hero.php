<section class="hero-sect container" id="hero-sect__slider"> <?php
  $sect_title = $section['sect_title'];
  $slides = $section['slider'];
  $bottom_text = $section['bottom_text'];
  $add_form = $section['add_form'];
  $template_dir = get_template_directory();

  if ( $sect_title ) : ?>
    <h1 class="hero-sect__heading"><?php echo $sect_title ?></h1> <?php
  endif ?>

  <div class="hero-sect__slider"> <?php
    $i = 0;
    foreach ( $slides as $slide ) :
      $bg = $slide['bg'];
      $img_name = preg_replace( "/.*\//", '', $bg );
      $bg_1024 = '/img/' . preg_replace( "/\d+/", '1024', $img_name );
      $bg_1440 = '/img/' . preg_replace( "/\d+/", '1440', $img_name );

      $bg_1024_path = $template_dir . $bg_1024;
      $bg_1440_path = $template_dir . $bg_1440;

      if ( file_exists ( $bg_1024_path ) ) {
        $bg_1024 = '(min-width:767.98px) {url(' . $template_directory . $bg_1024 . ')}';
      } else {
        $bg_1024 = '';
      }

      if ( file_exists ( $bg_1024_path ) ) {
        $bg_1440 = '(min-width:1023.98px) {url(' . $template_directory . $bg_1440 . ')}';
      } else {
        $bg_1440 = '';
      }

      $bg = 'url(' . $bg . ')';

      if ( $bg_1024 || $bg_1440 ) {
        $data_media = ' data-media="' . $bg_1024 . $bg_1440 . '"';
      } else {
        $data_media = '';
      }

      $title_tag = $sect_title || $i !== 0 ? 'span' : 'h1';
      $title = $slide['title'];
      $subtitle = $slide['subtitle'];
      $list = $slide['list'];
      $list_title = $slide['list_title'];
      $link = $slide['link'];
      $comment = $slide['comment'];

      $contains_comment_class = $comment ? ' contains-comment-link' : '';

      $slide_title = "<" . $title_tag . " class=\"hero-sect__title\">" . $title . "</" . $title_tag . ">"; 

      ?>

      <div class="hero-sect__slide lazy" data-src="<?php echo $bg ?>"<?php echo $data_media ?>><?php
        echo $slide_title;
        if ( $subtitle ) : ?>
          <p class="hero-sect__subtitle"><?php echo $subtitle ?></p> <?php
        endif ?>

        <div class="hero-sect__text-block<?php echo $contains_comment_class ?>"> <?php

          if ( $list[0]['list_item'] ) :
            if ( $list_title ) {
              $list_title = ' data-title="' . $list_title . '"';
            } ?>
            <ul class="hero-sect__list"<?php echo $list_title ?>> <?php
              $i = 0;
              foreach ( $list as $li ) :
                if ( $i % 2 === 0) :
                  if ( !$list[$i + 1] || !$list[$i + 2] ) {
                    $class_for_last_sublist = ' last';
                  } else {
                    $class_for_last_sublist = '';
                  } ?>
                  <li class="hero-sect__list-item<?php echo $class_for_last_sublist ?>">
                    <ul class="hero-sect__sublist"> <?php
                endif;
                    if ( ($i - 1) % 2 === 0 || !$list[$i + 1]['list_item'] ) {
                      $class_for_last_item = ' last';
                    } else {
                      $class_for_last_item = '';
                    } ?>
                      <li class="hero-sect__sublist-item<?php echo $class_for_last_item ?>"><?php echo $li['list_item'] ?></li> <?php
                if ( ($i - 1) % 2 === 0 || !$list[$i + 1]['list_item'] ) : ?>
                    </ul>
                  </li> <?php
                endif;
                $i++;
              endforeach ?>
            </ul> <?php
          endif;

          if ( $link || $comment ) : ?>
            <div class="hero-sect__link-block"> <?php
          endif;

            if ( $comment ) : ?>
              <p class="hero-sect__comment"><?php echo $comment ?></p> <?php
            endif;

            if ( $link ) : ?>
              <a href="<?php echo $link['url'] ?>" class="hero-sect__link"><?php echo $link['title'] ?></a> <?php
            endif;
              
          if ( $link || $comment ) : ?>
            </div> <?php
          endif ?>
          
        </div>

      </div> <?php
      $i++;
    endforeach ?>
    <div class="hero-sect__arrows"></div>
  </div>
  <div class="hero-sect__form-wrapper"> <?php
    if ( $bottom_text ) : ?>
      <p class="hero-sect__sign"><?php echo $bottom_text ?></p> <?php
    endif;
    if ( $add_form ) {
      echo do_shortcode( '[contact-form-7 id="10" html_class="hero-sect__form"]' );
    } ?>

  </div>
</section>

