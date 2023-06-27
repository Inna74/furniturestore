if (window.location.pathname === '/catalog.html') {

  let markerPriceAdd = (priceTo) => {
    if (document.querySelector('.catalog__markers_price') === null) {
      let catalogMarker = document.createElement('div');
      catalogMarker.classList.add('catalog__markers_marker');
      catalogMarker.classList.add('catalog__markers_price');
      document.querySelector('.catalog__markers_price-container').append(catalogMarker);
      document.querySelector('.catalog__markers_price-container').style.marginRight = '20px';
    }

    document.querySelector('.catalog__markers_price').innerHTML = `До ${priceTo}
    <button class="btn catalog__markers_btn">
      <svg class="catalog__markers-icon" width="24" height="24">
        <use xlink:href="img/sprite.svg#close"></use>
      </svg>
    </button>`;
  }

  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 200000,
      values: [ 2000, 150000 ],
      slide: function( event, ui ) {
        $( ".catalog__price-min-input" ).val(ui.values[ 0 ]);
        $( ".catalog__price-max-input" ).val(ui.values[ 1 ]);
        $('.catalog__price-min-input').val(String($('.catalog__price-min-input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        $('.catalog__price-max-input').val(String($('.catalog__price-max-input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));

        markerPriceAdd($('.catalog__price-max-input').val());
      }
    });
    $( ".catalog__price-min-input" ).val($( "#slider-range" ).slider( "values", 0 ));
    $( ".catalog__price-max-input" ).val($( "#slider-range" ).slider( "values", 1 ));
    $('.catalog__price-min-input').val(String($('.catalog__price-min-input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    $('.catalog__price-max-input').val(String($('.catalog__price-max-input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));

    markerPriceAdd($('.catalog__price-max-input').val());

    document.querySelectorAll('.ui__slider__handle').forEach(item => {
      item.onfocus = () => {
        document.querySelector('.ui-widget-header').style.background = '#7033AC';
      }

      item.onblur = () => {
        document.querySelector('.ui-widget-header').style.background = '#A65CF0';
      }
    })
  } );

  document.querySelector('.catalog__price-min-input').oninput = () => {
    $('.catalog__price-min-input').val(String($('.catalog__price-min-input').val().replace(/\B(?=(\d{3})+(?!\d))/g, " ")).replace(/[^0-9.]/g,''));
    if (/^(0|-?[1-9]\d{0,5})$/.test($( ".catalog__price-min-input" ).val())) {
      if ($( ".catalog__price-min-input" ).val() > $( "#slider-range" ).slider( "values", 1)) {
        $( ".catalog__price-min-input" ).val($( "#slider-range" ).slider( "values", 1))
      }
    } else {
      $( ".catalog__price-min-input" ).val($( "#slider-range" ).slider( "option", "min" ));
    }
    $( "#slider-range" ).slider( "values", 0, $( ".catalog__price-min-input" ).val() );
    $('.catalog__price-min-input').val(String($('.catalog__price-min-input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
  }

  document.querySelector('.catalog__price-max-input').oninput = () => {
    $('.catalog__price-max-input').val(String($('.catalog__price-max-input').val().replace(/\B(?=(\d{3})+(?!\d))/g, " ")).replace(/[^0-9.]/g,''));
    if (/^(0|-?[1-9]\d{0,5})$/.test($( ".catalog__price-max-input" ).val())) {
      if ($( ".catalog__price-max-input" ).val() < $( "#slider-range" ).slider( "values", 0)) {
        $( ".catalog__price-max-input" ).val($( "#slider-range" ).slider( "values", 0))
      }
    } else {
      $( ".catalog__price-max-input" ).val($( "#slider-range" ).slider( "option", "max" ));
    }
    $( "#slider-range" ).slider( "values", 1, $( ".catalog__price-max-input" ).val() );
    $('.catalog__price-max-input').val(String($('.catalog__price-max-input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));

    markerPriceAdd($('.catalog__price-max-input').val());
  }
}
