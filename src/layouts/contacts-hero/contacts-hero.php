<?php
$coords = get_option('contacts_coords');
$zoom = get_option('contacts_zoom') ?>

<section class="contacts-sect container">
  <h1 class="contacts-sect__title">Контактная информация</h1>
  <div id="contacts-sect__map" data-coords="<?php echo $coords ?>" data-zoom="<?php echo $zoom ?>"></div>
  <div class="contacts-sect__contacts">
    <div class="contacts">
      <!-- address -->
      <span class="contacts__title">Адрес:</span>
      <p class="address contacts__address"><?php echo $address ?></p>
      <!-- email -->
      <div class="email contacts__email">
        <span>E-mail:</span>
        <a href="mailto:<?php echo $email ?>" class="email__link">
          <?php echo $email ?></a>
      </div>
    </div>
    <!-- phones -->
    <div class="phones contacts__phones">
      <span class="contacts__title">Телефоны:</span> <?php
      for ( $i = 0; $i < count( $phones ); $i++ ) : ?>
        <a href="tel:<?php echo $phones_dry[$i] ?>" class="tel tel-<?php echo $i + 1 ?>">
          <span class="tel__code">
            <?php echo substr( $phones[$i], 0, 9 ) ?></span>
          <span class="tel__number">
            <?php echo substr( $phones[$i], 9 ) ?></span>
          <small class="tel__sign">
            <?php echo $phones_sign[$i] ?></small>
        </a> <?php
      endfor ?>
    </div>
  </div>
</section>
<script src="https://api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&onload=ymapsOnload"></script>
<script>
  function ymapsOnload() {
    let mapBlockId = 'contacts-sect__map',
      mapBlock = q('#' + mapBlockId),
      mapAddress = q('.address', mapBlock.parentElement).textContent;
      mapZoom = +mapBlock.dataset.zoom;
      mapCoords = {
        a: mapBlock.dataset.coords.replace(/\,.*/, ''),
        b: mapBlock.dataset.coords.replace(/.*\s|\,/, '')
      };

    ymaps.ready(function() {
      contactsMap = new ymaps.Map(mapBlockId, {
        center: [mapCoords.a, mapCoords.b],
        zoom: mapZoom,
        controls: []
      }, {
        searchControlProvider: 'yandex#search'
      });
      let geoIcon = new ymaps.Placemark(contactsMap.getCenter(), {
        iconCaption: 'Атлант',
        balloonContent: mapAddress
      }, {
        preset: 'islands#redPocketIcon',
        iconColor: '#DB063D'
      });

      contactsMap.geoObjects.add(geoIcon);
      contactsMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)';
    });
  }
</script>