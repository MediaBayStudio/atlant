<section class="procedures-sect container"> <?php
  $sect_title = $section['sect_title'];
  $left = $section['left'];
  $right = $section['right'];
  $lists = $section['lists'] ?>
  <h2 class="procedures-sect__title sect-title"><?php echo $sect_title ?></h2>
  <p class="procedures-sect__descr left"><?php echo $left ?></p>
  <p class="procedures-sect__descr right"><?php echo $right ?></p> <?php
  if ( $lists ) : ?>
    <div class="list-wrap"> <?php
      foreach ( $lists as $list ) :
        $list_title = $list['list_title'];
        $ul = $list['list'];
        if ( $list_title ) : ?>
          <h3 class="list-title"><?php echo $list_title ?></h3> <?php
        endif ?>
        <ul class="list"> <?php
          foreach ( $ul as $li ) : ?>
            <li class="list-item"><?php echo $li['list_item'] ?></li> <?php
          endforeach ?>
        </ul> <?php
      endforeach ?>
    </div> <?php
  endif ?>
</section>