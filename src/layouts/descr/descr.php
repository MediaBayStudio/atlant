<section class="descr-sect container"> <?php
  $sect_title = $section['sect_title'];
  $sect_descr = $section['sect_descr'];
  $blocks = $section['blocks_repeater'] ?>
  <h2 class="descr-sect__title sect-title"><?php echo $sect_title ?></h2>
  <div class="descr-sect__blocks"> <?php
    for ( $i = 0, $len = count( $blocks ); $i < $len; $i++ ) :
      $block_title = $blocks[$i]['title'];
      $class = $i % 2 === 0 ? 'odd' : 'even' ?>
      <div class="descr-sect__block <?php echo $class ?>">
        <img src="#" data-src="<?php echo $blocks[$i]['img'] ?>" alt="<?php echo $block_title ?>" class="descr-sect__block-img lazy"></img>
        <div>
         <p class="descr-sect__block-title"><?php echo $block_title ?></p>
          <p class="descr-sect__block-descr"><?php echo $blocks[$i]['descr'] ?></p> 
        </div>
      </div> <?php
    endfor ?>
  </div>
</section>