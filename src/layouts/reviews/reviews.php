<section class="reviews-sect container"> <?php
  $block = $section['block'] ?>
  <div class="reviews-sect__reviews-block" data-text="<?php echo $block['num'] ?>">
    <p class="reviews-block__title sect-title"><?php echo $block['title'] ?></p>
    <div class="reviews-block__number-wrap">
      <span class="reviews-block__span">уже</span>
      <span class="reviews-block__number"><?php echo $block['num'] ?></span>
      <span class=reviews-block__who><?php echo $block['who'] ?></span>
    </div>
    <a href="reviews" class="reviews-block__link btn"> Отзывы наших клиентов</a>
  </div> <?php
  #if ( $section['has_reviews_block'] ) :
    #$reviews = $section['reviews-repeater'] ?>
    <!-- <div class="reviews-sect__reviews">
      <h2 class="reviews__title"><?php #echo $section['reviews_block_title'] ?></h2>
    </div> --> <?php
  #endif ?>

</section>