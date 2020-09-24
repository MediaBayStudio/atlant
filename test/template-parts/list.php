<section class="sect container"> <?php
  $sect_title = $section['sect_title'];
  $lists = $section['lists_repeater'];
  $title_class = $section['title_is_big'] ? 'page-title' : 'sect-title' ?>

  <h2 class="<?php echo $title_class ?>"><?php echo $sect_title ?></h2> <?php
  foreach ( $lists as $list ) : ?>
    <div class="list-wrap"> <?php
      if ( $list['list_title'] ) : ?>
        <h3 class="list-title"><?php echo $list['list_title'] ?></h3> <?php
      endif;
      if ( $list['two_col'] ) {
        $list_class = ' list_two-col';
      } else {
        $list_class = '';
      } ?>
        <ul class="list<?php echo $list_class ?>"> <?php
        foreach ( $list['list'] as $li ) : ?>
          <li class="list-item<?php echo $order_class ?>"><?php echo $li['list_item'] ?></li> <?php
        endforeach ?>
        </ul>
    </div> <?php
  endforeach ?>
</section>