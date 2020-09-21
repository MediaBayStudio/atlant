<?php
  $page_title = $page['page_title'];
  $title_1 = $page['title_1'];
  $p_1 = $page['p_1'];

  $team_block = $page['team_block'];
  $team_block_title = $team_block['team_block_title'];
  $team_repeater = $team_block['team_repeater'];

  $title_2 = $page['title_2'];
  $p_2 = $page['p_2'];

  $list_title_1 = $page['list_title_1'];
  $list_1 = $page['list_1'];

  $numbers = $page['numbers'];

  $list_title_2 = $page['list_title_2'];
  $list_2 = $page['list_2'];

  $title_3 = $page['title_3'];
  $features = $page['features'] ?>

<section class="page-sect container">
  <h1 class="page-sect__title page-title"><?php echo $page_title ?></h1>
  <div class="page-sect__left">
    <a href="#callback-sect" class="page-sect__btn btn" id="about-btn">Написать нам</a> <?php
    get_template_part('layouts/secondary-pages-nav/secondary-pages-nav') ?>
  </div>
  <div class="page-sect__right"> <?php
    if ( $title_1 ) : ?>
      <h2 class="about__title sect-title"><?php echo $title_1 ?></h2> <?php
    endif;
    if ( $p_1 ) : ?>
      <p class="about__descr"><?php echo $p_1 ?></p> <?php
    endif ?>

    <div class="about__team-wrap">
      <h2 class="about__team-title sect-title"><?php echo $team_block_title ?></h2>
      <div class="about__team-slider" id="team"> <?php
        $len = count( $team_repeater );
        for ( $i = 0; $i < $len; $i++ ) :
          $char_name = $team_repeater[$i]['name'];
          $order_class = $team_repeater[$i + 1] ? '' : ' last' ?>
          <div class="char">
            <img src="<?php echo $team_repeater[$i]['photo'] ?>" alt="<?php echo $char_name ?>" class="char__photo">
            <span class="char__name"><?php echo $char_name ?></span>
            <span class="char__position"><?php echo $team_repeater[$i]['position'] ?></span>
          </div> <?php
        endfor ?>
      </div>
    </div>
    <section class="sect"> <?php
      if ( $title_2 ) : ?>
        <h2 class="about__title sect-title"><?php echo $title_2 ?></h2> <?php
      endif;

      if ( $p_2 ) : ?>
        <p class="about__descr"><?php echo $p_2 ?></p> <?php
      endif;

      if ( $list_title_1 ) : ?>
        <h3 class="list-title"><?php echo $list_title_1 ?></h3> <?php
      endif;
      if ( $list_1 ) : ?>
        <ul class="list"> <?php
          $len = count( $list_1 );
          for ( $i = 0; $i < $len; $i++ ) :
            $order_class = $list_1[$i + 1] ? '' : ' last' ?>
            <li class="list-item<?php echo $order_class ?>"><?php echo $list_1[$i]['list_item'] ?></li> <?php
          endfor ?>
        </ul> <?php
      endif;
      if ( $numbers ) : ?>
        <ul class="numbers"> <?php
          $len = count( $numbers );
          for ( $i = 0; $i < $len; $i++ ) :
            $order_class = $numbers[$i + 1] ? '' : ' last' ?>
            <li class="numbers__item number-block<?php echo $order_class ?>">
              <span class="number-block__number-wrap">
                <span class="number-block__number"><?php echo $numbers[$i]['number'] ?></span>
              </span>
              <p class="number-block__descr"><?php echo $numbers[$i]['descr'] ?></p>
            </li> <?php
          endfor ?>
        </ul> <?php
      endif;

      if ( $list_title_2 ) : ?>
        <h3 class="list-title"><?php echo $list_title_2 ?></h3> <?php
      endif;

      if ( $list_2 ) : ?>
        <ul class="list"> <?php
          $len = count( $list_2 );
          for ( $i = 0; $i < $len; $i++ ) :
            $order_class = $list_2[$i + 1] ? '' : ' last' ?>
            <li class="list-item<?php echo $order_class ?>"><?php echo $list_2[$i]['list_item'] ?></li> <?php
          endfor ?>
        </ul> <?php
      endif ?>
    </section>

    <section class="sect"> <?php
      if ( $title_3 ) : ?>
        <h2 class="about__title sect-title"><?php echo $title_3 ?></h2> <?php
      endif;

      if ( $features ) : ?>
        <ul class="feats"> <?php
          foreach ( $features as $feature ) :
            $feat_title = $feature['title'] ?>
            <li class="feats__item feat">
              <img src="#" data-src="<?php echo $feature['img'] ?>" alt="<?php echo $feat_title ?>" class="feat__img lazy">
              <div class="feat__text">
                <strong class="feat__title"><?php echo $feat_title ?></strong>
                <p class="feat__descr"><?php echo $feature['p'] ?></p>
              </div>
            </li> <?php
          endforeach ?>
        </ul> <?php
      endif ?>
    </section>

  </div>
</section>