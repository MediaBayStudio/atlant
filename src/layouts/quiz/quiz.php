<!-- 

 -->
<section class="quiz-sect container"> <?php
  $sect_title = $section['sect_title'];
  $sect_subtitle = $section['sect_subtitle'];
  $sect_quiz = $section['quiz_code'];
  $sect_quiz = str_replace( '#form', do_shortcode('[contact-form-7 id="168" html_class="quiz__form"]'), $sect_quiz ) ?>
  <h1 class="quiz-sect__title"><?php echo $sect_title ?></h1>
  <span class="quiz-sect__subtitle"><?php echo $sect_subtitle ?></span> <?php
  echo $sect_quiz ?>
</section>