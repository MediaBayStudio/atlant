<section class="flexible-sect sect container"> <?php
  $blocks = $section['flexible'];

  foreach ( $blocks as $block ) :
    $layout = $block['acf_fc_layout'];

    if ( $layout === 'list' ) {
      $list_title = $block['list_title'];
      $list_items = $block['list_items'];
      if ( $list_items ) :
        if ( $list_title ) : 
          $text_align_class = ' text-' . $block['text_align'] ?>
          <h3 class="list-title<?php echo $text_align_class ?>"><?php echo $list_title ?></h3> <?php
        endif;
        if ( $block['two_col'] ) {
          $list_class = ' list_two-col';
        } else {
          $list_class = '';
        } ?>
        <div class="list-wrap">
          <ul class="list<?php echo $list_class ?>"> <?php
            foreach ( $list_items as $li ) : ?>
              <li class="list-item"><?php echo $li['list_item'] ?></li> <?php
            endforeach ?>
          </ul>
        </div> <?php
      endif;
    } else {
      if ( $layout === 'sect_title' ) {
        $start_tag = '<h2 class="sect-title">';
        $end_tag = '</h2>';
      } else if ( $layout === 'sect_descr' ) {
        $text_align_class = 'text-' . $block['text_align'];
        $start_tag = '<p class="flexible-sect__descr ' . $text_align_class . '">';
        $end_tag = '</p>';
      }
      echo $start_tag . $block['text'] . $end_tag;
    }
  endforeach;
?>  
</section>