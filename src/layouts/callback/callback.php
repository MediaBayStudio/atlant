<?php
if ( $section['add_callback'] ) : ?>
  <section class="callback-sect container">
    <div class="callback-form-wrap">
      <h2 class="callback-sect__title">Закажите обратный звонок</h2>
      <span class="callback-sect__subtitle">и мы ответим на все ваши вопросы</span> <?php
      echo do_shortcode('[contact-form-7 id="186" html_class="callback-form"]') ?>
    </div>
  </section> <?php
endif;