<section class="quiz-sect container"> <?php
  $sect_title = $section['sect_title'];
  $sect_subtitle = $section['sect_subtitle'] ?>
  <h1 class="quiz-sect__title"><?php echo $sect_title ?></h1>
  <span class="quiz-sect__subtitle"><?php echo $sect_subtitle ?></span>
  <div class="quiz-sect__quiz" id="quiz">
    <?php echo do_shortcode('[contact-form-7 id="168" html_class="quiz__form" html_id="quiz-form"]') ?>
  <img src="#" alt="Изображение" class="quiz__img">
  </div>
</section>