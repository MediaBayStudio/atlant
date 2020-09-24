<section class="advantages-sect container"> <?php
  $sect_title = $section['sect_title'];
  $advantages = $section['advantages_repeater'] ?>
  <h2 class="advantages-sect__title sect-title"><?php echo $sect_title ?></h2>
  <div class="advantages-sect_advantages"> <?php
    foreach ( $advantages as $advantage ) : ?>
      <div class="advantage">
        <span class="advantage__text-top"><?php echo $advantage['text_top'] ?></span>
        <span class="advantage__number"><?php echo $advantage['num'] ?></span>
        <span class="advantage__text-bottom"><?php echo $advantage['text_bottom'] ?></span>
      </div> <?php
    endforeach ?>
  </div>
</section>