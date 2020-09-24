<section class="page-sect container">
  <h1 class="page-sect__title page-title">Вопросы-ответы</h1>
  <div class="page-sect__left">
    <button type="button" class="page-sect__btn btn" id="opening-faq-popup-btn">Задать свой вопрос</button> <?php
    get_template_part('layouts/secondary-pages-nav/secondary-pages-nav') ?>
  </div>
  <div class="page-sect__right" id="faqs"> <?php
    $faqs = get_field( 'faq' );
    if ( $faqs ) :
      for ( $i = 0, $len = count( $faqs ); $i < $len; $i++ ) :
        $order_class = $faqs[$i + 1] ? '' : ' last' ?>
        <div class="faq<?php echo $order_class ?>">
          <button type="button" class="faq__question">
            <svg class="faq__question-img">
              <use xlink:href="<?php echo $template_directory . '/img/icons-sprite.svg#icon-caret' ?>"></use>
            </svg> <?php echo $faqs[$i]['question'] ?>
          </button>
          <p class="faq__answer"><?php echo $faqs[$i]['answer'] ?></p>
        </div>
        <?php
      endfor;
    endif ?>
  </div>
</section>