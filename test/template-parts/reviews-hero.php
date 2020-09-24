<section class="page-sect container">
  <h1 class="page-sect__title page-title">Отзывы наших клиентов</h1>
  <div class="page-sect__left">
 <?php
    get_template_part('layouts/secondary-pages-nav/secondary-pages-nav') ?>
  </div>
  <div class="page-sect__right" id="reviews"> <?php
    $reviews = get_field( 'reviews' );

    function print_starts( $stars_count, $max_stars=5 ) {
      for ( $i = 0; $i < $max_stars; $i++ ) :
        if ( $stars_count > $i ) {
          $filled_class = ' filled';
        } else {
          $filled_class = '';
        } ?>
        <div class="star<?php echo $filled_class ?>">
          <div class="star__edge"></div>
          <div class="star__edge"></div>
          <div class="star__edge"></div>
          <div class="star__edge"></div>
          <div class="star__edge"></div>
        </div> <?php
      endfor;
    }

    if ( $reviews ) :
      foreach ( $reviews as $review ) :
        $name = $review['name'];
        $manager_stars = $review['manager_rate'];
        $common_stars = $review['common_rate'];
        // Получаем первые символы имени
        $initials = array_reduce( explode( ' ', $name ), function( $prev, $next ) {
          $prev .= substr( $next, 0, 2 );
          return $prev;
        } ) ?>
        <div class="review">
          <div class="review__top">
            <figure class="review__figure" data-initials="<?php echo $initials ?>"> <?php
              if ( $review['photo'] ) : ?>
                <img src="<?php echo $review['img'] ?>" alt="<?php echo $name ?>" class="review__photo"> <?php
              endif ?>
            </figure>
            <div class="review__title-block">
              <span class="review__name"><?php echo $name ?></span>
              <span class="review__service-name"><?php echo $review['service_name'] ?></span>
            </div>
          </div>
          <div class="review__rate-block">
            <div class="review__manager-rate">
              <span>Работа менеджера</span>
              <div class="review__stars"> <?php
                print_starts( $manager_stars ) ?>
              </div>
            </div>
            <div class="review__common-rate">
              <span>Общая оценка работы</span>
              <div class="review__stars"> <?php
                print_starts( $common_stars ) ?>
              </div>
            </div>
            <span class="review__date"><?php echo $review['date'] ?></span>
          </div>
          <div class="review__video">
            <?php echo $review['video'] ?>
          </div>
        </div> <?php
      endforeach;
    else : ?>
      <p class="review__not-found">Отзывов пока нет</p> <?php
    endif ?>
  </div>
</section>