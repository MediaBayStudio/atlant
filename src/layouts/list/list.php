<section class="list-sect container"> <?php
  $sect_title = $section['sect_title'];
  $title_is_big = $section['title_is_big'];
  $lists = $section['lists_repeater'] ?>

  <h2 class="list-sect__title sect-title"><?php echo $sect_title ?></h2> <?php
  foreach ( $lists as $list ) : ?>
    <div class="list-sect__list-wrapper"> <?php
      if ( $list['list_title'] ) : ?>
        <span class="list-sect__list-title"><?php echo $$list['list_title'] ?></span> <?php
        endif ?>
        <ul class="list-sect__list"> <?php
          foreach ( $list['list'] as $list_item ) : ?>
            <li class="list-sect__list-item"><?php echo $list_item['list_item'] ?></li> <?php
          endforeach ?>
        </ul>
    </div> <?php
  endforeach ?>
</section>