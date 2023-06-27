let burger = document.querySelector('.burger'),
    navMain = document.querySelector('.header__bottom-nav-main'),
    navMainItems = document.querySelectorAll('.nav__main-item'),
    navExtra = document.querySelector('.header__top-nav'),
    navExtraItems = document.querySelectorAll('.nav__ext-item'),
    burgerLine1 = document.querySelector('.burger__line1'),
    burgerLine2 = document.querySelector('.burger__line2'),
    burgerLine3 = document.querySelector('.burger__line3'),
    tLineMain = gsap.timeline({paused: true}),
    tLineExtra = gsap.timeline({paused: true}),
    burgerFlag = true,
    mediaWidth = 1023;

tLineMain.set(burger, {zIndex: 12})
          .set(navMain, {display: 'block'})
          .to(navMain, {opacity: 1, y: 0, duration: .3})
          .to(burgerLine2, {opacity: 0, x: -20, duration: .2}, "-=.2")
          .set(burgerLine2, {display: 'none'})
          .to(burgerLine1, {top: '50%', rotate: 45, duration: .2}, "-=.2")
          .to(burgerLine3, {top: '50%', rotate: -45, duration: .2}, "-=.2")
          .to(navMain, {backgroundPosition: 'right 72px bottom 60px', duration: .4}, "-=.2")
          .to(navMainItems[0], {opacity: 1, y: 0, duration: .2}, "-=.1")
          .to(navMainItems[1], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[2], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[3], {opacity: 1, y: 0, duration: .2})
          .to(navMainItems[4], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[5], {opacity: 1, y: 0, duration: .2}, "-=.15")

tLineExtra.set(navExtra, {display: 'block'}, "-=0.4")
            .to(navExtra, {opacity: 1, y: 0, duration: .3}, "-=.3")
            .to(navExtraItems[0], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[1], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[2], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[3], {opacity: 1, y: 0, duration: .2})


const btnReset = () => {
  burgerLine1.removeAttribute('style');
  burgerLine2.removeAttribute('style');
  burgerLine3.removeAttribute('style');
}

const btnActive = () => {
  burgerLine1.style.transform = 'rotate(45deg)';
  burgerLine1.style.top = '50%';
  burgerLine2.style.opacity = 0;
  burgerLine2.style.transform  = 'translateY(-50%) translateX(-20px)';
  burgerLine2.style.display = 'none';
  burgerLine3.style.transform  = 'rotate(-45deg)';
  burgerLine3.style.top = '50%';
}

const navMainReset = () => {
  navMainItems.forEach((item) => {
    item.style.opacity = 1;
    item.style.transform = 'none';
  })
  navMain.style.transform = 'none';
  navMain.style.display = 'block';
  navMain.style.opacity = 1;
  navMain.style.backgroundPosition = 'right 72px bottom 60px';
}

const navMainHidden = () => {
  navMainItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
  })
  navMain.style.transform = 'translateY(50px)';
  navMain.style.display = 'none';
  navMain.style.opacity = 0;
  navMain.style.backgroundPosition = 'right 72px bottom -150px';
}

const navExtraReset = () => {
  navExtraItems.forEach((item) => {
    item.style.opacity = 1;
    item.style.transform = 'none';
  })
  navExtra.style.transform = 'none';
  navExtra.style.display = 'block';
  navExtra.style.opacity = 1;
}

const navExtraHidden = () => {
  navExtraItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
  })
  navExtra.style.transform = 'translateY(50px)';
  navExtra.style.display = 'none';
  navExtra.style.opacity = 0;
}

burger.onclick = () => {
  let x = document.documentElement.clientWidth;

  if (x > 580) {
    if (burgerFlag === true) {
      tLineMain.play();
      navMain.classList.add('nav__active');
      navExtra.classList.add('nav__active');
      burgerFlag = !burgerFlag;
    } else {
      tLineMain.reverse();
      navMain.classList.remove('nav__active');
      navExtra.classList.remove('nav__active');
      burgerFlag = !burgerFlag;
    }
  } else {
    if (burgerFlag === true) {
      tLineMain.play();
      tLineExtra.play();
      navMain.classList.add('nav__active');
      navExtra.classList.add('nav__active');
      burgerFlag = !burgerFlag;
    } else {
      tLineExtra.reverse();
      tLineMain.reverse();
      navMain.classList.remove('nav__active');
      navExtra.classList.remove('nav__active');
      burgerFlag = !burgerFlag;
    }
  }
}

const propertiesController = () => {
  navMain.style.display = 'block';
  navExtra.style.display = 'block';

  let x = document.documentElement.clientWidth,
      headerH = document.querySelector('.header').offsetHeight,
      navMainHeight = navMain.offsetHeight;

  if (x > mediaWidth) {
    navMainReset();
    btnReset();
    navExtraReset();
  } else if (x <= 580) {
    navExtra.style.top = (headerH - 201 + navMainHeight) + 'px';
    navMain.style.top = (headerH - 201) + 'px';
    if (navMain.classList.contains('nav__active') === false) {
      navMainHidden();
      btnReset();
      navExtraHidden();
    } else {
      navMainReset();
      btnActive();
      navExtraReset();
    }
  } else {
    navMain.style.top = '108px';
    if (navMain.classList.contains('nav__active') === false) {
      navMainHidden();
      btnReset();
      navExtraReset();
    } else {
      navMainReset();
      btnActive();
      navExtraReset();
    }
  }
}

propertiesController();

window.onresize = () => {

  propertiesController();

  if (window.location.pathname === '/catalog.html') {
    let x = document.documentElement.clientWidth;

    if (x > 1200) {
      document.querySelectorAll('.catalog__left__dropdown').forEach(item => {
        item.classList.remove('catalog__left__dropdown__active');
        item.removeAttribute('style');
      })
      document.querySelectorAll('.catalog__left__btn').forEach(item => {
        item.classList.remove('catalog__left__btn__active');
        item.removeAttribute('style');
      })
    } else {
      document.querySelectorAll('.catalog__left__dropdown').forEach(dropdown => {
        dropdown.classList.remove('catalog__left__dropdown__active');
        gsap.to(dropdown, {height: 0, duration: .1})
        gsap.to(dropdown, {opacity: 0, duration: .1})
        gsap.to(dropdown, {display: 'none', duration: .1})
      })
    }

    document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';

    setCatalogSlidesOrder();
  }
}

if (window.location.pathname === '/catalog.html') {
  let catalogCategoryContainer = document.querySelector('.category-checkbox'),
      catalogDiscountContainer = document.querySelector('.discount-checkbox'),
      catalogColorContainer = document.querySelector('.color-checkbox'),
      catalogCategoryArr = document.querySelectorAll('label[data-filter="category"]'),
      catalogDiscountArr = document.querySelectorAll('label[data-filter="discount"]'),
      catalogColorArr = document.querySelectorAll('label[data-filter="color"]'),
      tLineCategoryCheckboxes = gsap.timeline({paused: true}),
      tLineDiscountCheckboxes = gsap.timeline({paused: true}),
      tLineColorCheckboxes = gsap.timeline({paused: true}),
      count = 9;

  let tLineGenerator = (arr, container, tLine) => {

    if (arr.length > count) {

      tLine.fromTo(container, {height: container.offsetHeight}, {height: 279, duration: .5})

      for (let i = 9; i < arr.length; i++) {
        tLine.to(arr[i], {opacity: 0, duration: .5}, "-=.5")
            .set(arr[i], {display: 'none'})
      }

      let button = document.createElement('button');

      button.classList.add('btn');
      button.classList.add('catalog__left_btn-showmore');
      button.dataset.filter = arr[0].dataset.filter;
      button.dataset.count = arr.length - count;
      container.parentElement.append(button);
      document.querySelector(`button[data-filter="${arr[0].dataset.filter}"]`).innerHTML = `+ ещё ${arr.length - count}`;

      tLine.play();
    }
  }

  tLineGenerator(catalogCategoryArr, catalogCategoryContainer, tLineCategoryCheckboxes);
  tLineGenerator(catalogDiscountArr, catalogDiscountContainer, tLineDiscountCheckboxes);
  tLineGenerator(catalogColorArr, catalogColorContainer, tLineColorCheckboxes);

  document.querySelectorAll('.catalog__left_btn-showmore').forEach(item => {
    item.onclick = () => {
      if (event.currentTarget.innerHTML === 'Свернуть') {
        if (event.currentTarget.dataset.filter === 'category') {
          tLineCategoryCheckboxes.play();
        } else if (event.currentTarget.dataset.filter === 'discount') {
          tLineDiscountCheckboxes.play();
        } else if (event.currentTarget.dataset.filter === 'color') {
          tLineColorCheckboxes.play();
        }
        event.currentTarget.innerHTML = `+ ещё ${event.currentTarget.dataset.count}`;
      } else {
        if (event.currentTarget.dataset.filter === 'category') {
          tLineCategoryCheckboxes.reverse();
        } else if (event.currentTarget.dataset.filter === 'discount') {
          tLineDiscountCheckboxes.reverse();
        } else if (event.currentTarget.dataset.filter === 'color') {
          tLineColorCheckboxes.reverse();
        }
        event.currentTarget.innerHTML = 'Свернуть';
      }
    }
  })

  document.querySelectorAll('.catalog__left-dropdown').forEach(dropdown => {
    let x = document.documentElement.clientWidth;

    if (x <= 1200) {
      dropdown.classList.remove('catalog__left-dropdown_active');
      gsap.to(dropdown, {height: 0})
      gsap.to(dropdown, {opacity: 0})
      gsap.to(dropdown, {display: 'none'})
    }
  })

  document.querySelectorAll('.catalog__left-btn').forEach(item => {
    item.onclick = () => {
      let path = event.currentTarget.dataset.path;

      event.currentTarget.classList.toggle('catalog__left-btn_active');

      document.querySelectorAll('.catalog__left-dropdown').forEach(dropdown => {
        let target = dropdown.dataset.target;
        if (target === path) {
          dropdown.classList.toggle('catalog__left-dropdown_active');
          if (dropdown.classList.contains('catalog__left-dropdown_active') === true) {
            gsap.to(dropdown, {display: 'block'})
            gsap.to(dropdown, {opacity: 1, duration: .5})
            gsap.to(dropdown, {height: 'auto', duration: .5})
          } else {
            gsap.to(dropdown, {height: 0, duration: .5})
            gsap.to(dropdown, {opacity: 0, duration: .5})
            gsap.to(dropdown, {display: 'none'})
          }
        }
      })
    }
  })
}

if (window.location.pathname === '/catalog.html') {
  let markerCategoryContainer = document.querySelector('.catalog__markers_category-container'),
      markerPriceContainer = document.querySelector('.catalog__markers_price-container'),
      markerDiscountContainer = document.querySelector('.catalog__markers_discount-container'),
      markerColorContainer = document.querySelector('.catalog__markers_color-container');

  let markerRemove = () => {
    document.querySelectorAll('.catalog__markers__btn').forEach(item => {
      item.onclick = (active) => {
        document.querySelectorAll('.checkbox-label').forEach(label => {
          if (label.getAttribute('aria-label') === active.currentTarget.parentElement.getAttribute('aria-label')) {
            label.querySelector('input[type="checkbox"]').checked = false;
          }
        })
        active.currentTarget.parentElement.remove();
        console.log(markerCategoryContainer.childNodes.length);
        if (markerCategoryContainer.childNodes.length === 0) {
          markerCategoryContainer.style.marginRight = 0;
        } else {
          markerCategoryContainer.style.marginRight = '20px';
        }
        if (markerPriceContainer.childNodes.length === 0) {
          markerPriceContainer.style.marginRight = 0;
        } else {
          markerPriceContainer.style.marginRight = '20px';
        }
        if (markerDiscountContainer.childNodes.length === 0) {
          markerDiscountContainer.style.marginRight = 0;
        } else {
          markerDiscountContainer.style.marginRight = '20px';
        }
        if (markerColorContainer.childNodes.length === 0) {
          markerColorContainer.style.marginRight = 0;
        } else {
          markerColorContainer.style.marginRight = '20px';
        }

        document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';
      }
    })
  }

  let markerAdd = (item) => {
    if (item.dataset.filter === 'category') {
      if (item.querySelector('input[type="checkbox"]').checked === true) {
        let div = document.createElement('div');
        div.classList.add('catalog__markers_marker');
        div.classList.add('catalog__markers_category');
        div.setAttribute('aria-label', item.getAttribute('aria-label'));
        markerCategoryContainer.append(div);
        div.innerHTML = `${item.getAttribute('aria-label')}
                          <button class="btn catalog__markers_btn" aria-label="Убрать фильтр">
                            <svg class="catalog__markers-icon" width="24" height="24">
                              <use xlink:href="img/sprite.svg#close"></use>
                            </svg>
                          </button>`;
        markerCategoryContainer.style.marginRight = '20px';
      } else {
        document.querySelectorAll('.catalog__markers_category').forEach(category => {
          if (category.getAttribute('aria-label') === item.getAttribute('aria-label')) {
            category.remove();
          }
        })
        if (markerCategoryContainer.childNodes.length === 0) {
          markerCategoryContainer.style.marginRight = 0;
        }
      }
    } else if (item.dataset.filter === 'discount') {
      if (item.querySelector('input[type="checkbox"]').checked === true) {
        if (document.querySelector('.catalog__markers_discount') === null) {
          let div = document.createElement('div');
          div.classList.add('catalog__markers_marker');
          div.classList.add('catalog__markers_discount');
          div.setAttribute('aria-label', item.getAttribute('aria-label'));
          markerDiscountContainer.append(div);
          div.innerHTML = `${item.getAttribute('aria-label')}
                            <button class="btn catalog__markers_btn" aria-label="Убрать фильтр">
                              <svg class="catalog__markers-icon" width="24" height="24">
                                <use xlink:href="img/sprite.svg#close"></use>
                              </svg>
                            </button>`;
        }
        else {
          document.querySelector('.catalog__markers_discount').setAttribute('aria-label', item.getAttribute('aria-label'));
          document.querySelector('.catalog__markers_discount').innerHTML = `${item.getAttribute('aria-label')}
                            <button class="btn catalog__arkers_btn" aria-label="Убрать фильтр">
                              <svg class="catalog__markers-icon" width="24" height="24">
                                <use xlink:href="img/sprite.svg#close"></use>
                              </svg>
                            </button>`;
        }
        markerDiscountContainer.style.marginRight = '20px';
        document.querySelectorAll('.checkbox-label').forEach(label => {
          if (label.parentElement.classList.contains('catalog__discount__checkbox__container') === true && label.querySelector('input[type="checkbox"]').checked === true && (label.getAttribute('aria-label') !== item.getAttribute('aria-label'))) {
            label.querySelector('input[type="checkbox"]').checked = false;

          }
        })
      } else {
        document.querySelectorAll('.catalog__markers_discount').forEach(discount => {
          if (discount.getAttribute('aria-label') === item.getAttribute('aria-label')) {
            discount.remove();
          }
        })
        if (markerDiscountContainer.childNodes.length === 0) {
          markerDiscountContainer.style.marginRight = 0;
        }
      }
    } else if (item.dataset.filter === 'color') {
      if (item.querySelector('input[type="checkbox"]').checked === true) {
        let div = document.createElement('div');
        div.classList.add('catalog__markers_marker');
        div.classList.add('catalog__markers_color');
        div.setAttribute('aria-label', item.getAttribute('aria-label'));
        markerColorContainer.append(div);
        div.innerHTML = `${item.getAttribute('aria-label')}
                          <button class="btn catalog__markers_btn" aria-label="Убрать фильтр">
                            <svg class="catalog__markers-icon" width="24" height="24">
                              <use xlink:href="img/sprite.svg#close"></use>
                            </svg>
                          </button>`;
        markerColorContainer.style.marginRight = '20px';
      } else {
        document.querySelectorAll('.catalog__markers_color').forEach(color => {
          if (color.getAttribute('aria-label') === item.getAttribute('aria-label')) {
            color.remove();
          }
        })
        if (markerColorContainer.childNodes.length === 0) {
          markerColorContainer.style.marginRight = 0;
        }
      }
    }
  }

  document.querySelectorAll('.checkbox-label').forEach(item => {
    markerAdd(item);

    item.onclick = (active) => {
      markerAdd(active.currentTarget);

      document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';
    }
  })

  $('.catalog__markers').on("DOMNodeInserted", function (event) {
    markerRemove();

    document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';
  })

  markerRemove();
}

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

const catalogSwiper = new Swiper('.catalog__swiper', {
  spaceBetween: 16,
  slidesPerGroup: 2,
  slidesPerView: 2,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '" aria-label="Слайд ' + (index + 1) + '">' + (index + 1) + '</span>';
    },
  },
  grid: {
    rows: 3,
  },
  breakpoints: {
    461: {
      spaceBetween: 32,
      slidesPerGroup: 2,
      slidesPerView: 2,
    },
    1024: {
      spaceBetween: 32,
      slidesPerGroup: 3,
      slidesPerView: 3,
      grid: {
        rows: 3,
      },
    }
  },
});

let setCatalogSlidesOrder = () => {

  let x = document.documentElement.clientWidth,
      slidesArr = document.querySelectorAll('.catalog__slide'),
      row = 1,
      plus = 0,
      order = 0;

  if (x > 1023) {
    for (let i = 0; i < slidesArr.length; i++) {
      if (row === 1) {
        slidesArr[i].style.order = order + plus;
        order += 3;
        if ((i + 1) % 3 === 0) {
          row = 2;
          order = 1;
        }
      } else if (row === 2) {
        slidesArr[i].style.order = order + plus;
        order += 3;
        if ((i + 1) % 3 === 0) {
          row = 3;
          order = 2;
        }
      } else if (row === 3) {
        slidesArr[i].style.order = order + plus;
        order += 3;
        if ((i + 1) % 3 === 0) {
          row = 1;
          order = 0;
          plus += 9;
        }
      }
    }
  } else {
    for (let i = 0; i < slidesArr.length; i++) {
      if (row === 1) {
        slidesArr[i].style.order = order + plus;
        if ((i + 1) % 3 === 1) {
          order += 3;
        } else if ((i + 1) % 3 === 2) {
          order -= 2;
        } else if ((i + 1) % 3 === 0) {
          row = 2;
          order = 4;
        }
      } else if (row === 2) {
        slidesArr[i].style.order = order + plus;
        if ((i + 1) % 3 === 1) {
          order -= 2;
        } else if ((i + 1) % 3 === 2) {
          order += 3;
        } else if ((i + 1) % 3 === 0) {
          row = 1;
          order = 0;
          plus += 6;
        }
      }
    }

    if (x > 460) {
      slidesArr[2].style.order = 4;
      slidesArr[3].style.order = 1;
    }
  }
}

if (window.location.pathname === '/catalog.html') {
  setCatalogSlidesOrder();
}

if (window.location.pathname === '/index.html') {

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");

  im.mask(selector);

  new JustValidate('.contacts__form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 15,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
      mail: {
        required: true,
        email: true
      },
    },
    messages: {
      name: {
        required: 'Заполните это поле',
        minLength: 'Введите от 2 до 15 символов',
        maxLength: 'Введите от 2 до 15 символов',
      },
      tel: {
        required: 'Заполните это поле',
        function: 'Введите полный номер'
      },
      mail: {
        required: 'Заполните это поле',
        email: 'Введите корректный e-mail'
      },
    },
    colorWrong: '#FF6972',

    submitHandler: function (form, values, ajax) {
      ajax({
          url: '/mail.php',
          method: 'POST',
          data: values,
          async: true,
          callback: function (response) {
              alert('Ваша заявка успешно отправлена!')
          },
          error: function (response) {
              alert('Ошибка отправки!')
          }
      });
    },
  });
}

if (window.location.pathname === '/index.html') {
  tippy('#myButton1', {
    content: "Реплицированные с зарубежных источников, исследования формируют глобальную сеть.",
    maxWidth: 157,
    theme: 'black',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 2,
    interactiveDebounce: 150,
  });
}

const element = document.querySelector('.header__select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
});
let ariaLabel = element.getAttribute('aria-label');
element.closest('.choices').setAttribute('aria-label', ariaLabel);

let dropdownBtn = document.querySelector('.header__reg-btn'),
    dropdownBtnText = document.querySelector('.header__reg-btn-text'),
    dropdownFlag = true,
    dropdownItems = document.querySelectorAll('.header__reg-dropdown-item-btn'),
    dropdownOpen = gsap.timeline({paused: true});

dropdownOpen.set(".header__reg-dropdown", {display: 'block'})
            .to(".header__reg-icon-arrow", {rotate: 90, duration: .3})
            .fromTo(".header__reg-dropdown", {y: 50, opacity: 0}, {y: 0, opacity: 1/* , zIndex: 8 */}, "-=0.4");

dropdownBtn.onclick = () => {
  if (dropdownFlag === true) {
    event.currentTarget.classList.add('header__reg-btn_active');
    dropdownOpen.play();
    dropdownFlag = !dropdownFlag;
  } else {
    event.currentTarget.classList.remove('header__reg-btn_active');
    dropdownOpen.reverse();
    dropdownFlag = !dropdownFlag;
  }
}

dropdownItems.forEach(item => {
  item.onclick = () => {
    let clickedInnerText = event.currentTarget.innerText,
        activeInnerText = dropdownBtnText.innerText;

    dropdownBtnText.innerText = clickedInnerText;
    dropdownBtnText.dataset.region = clickedInnerText;
    event.currentTarget.innerText = activeInnerText;
    event.currentTarget.dataset.region = activeInnerText;
    event.currentTarget.setAttribute('aria-label', activeInnerText);
    dropdownBtn.classList.remove('header__reg-btn_active');
    dropdownOpen.reverse();
    dropdownFlag = !dropdownFlag;
  }
})

const simpleBar = new SimpleBar(document.querySelector('.header__reg-dropdown-list'), {
  scrollbarMinSize: 20,
  scrollbarMaxSize: 28,
});


const heroSwiper = new Swiper('.hero__swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


let input = document.querySelectorAll('.contacts__input, .form-input'),
    placeholder = document.querySelectorAll('.placeholder');

input.forEach((item) => {
  item.onfocus = () => {
    let path = event.currentTarget.dataset.path;
    placeholder.forEach((active) => {
      let target = active.dataset.target,
          placeholderWidth = active.offsetWidth;
      if (path.localeCompare(target) === 0) {
        active.style.transform = `translate(-${placeholderWidth * 0.18}px, -16px) scale(60%)`;
      }
    })
  };
  item.onblur = () =>  {
    let curTarget = event.currentTarget,
        path = curTarget.dataset.path;
    placeholder.forEach((active) => {
      let target = active.dataset.target,
      placeholderWidth = active.offsetWidth;
      if (path.localeCompare(target) === 0) {
        if (curTarget.value !== "") {
          active.style.transform = `translate(-${placeholderWidth * 0.18}px, -16px) scale(60%)`;
        } else {
          active.style.transform = 'none';
        }
      }
    })
  };
})

if (window.location.pathname === '/product-card.html') {

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");

  im.mask(selector);

  new JustValidate('.product__form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 15,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },
    messages: {
      name: {
        required: 'Заполните это поле',
        minLength: 'Введите от 2 до 15 символов',
        maxLength: 'Введите от 2 до 15 символов',
      },
      tel: {
        required: 'Заполните это поле',
        function: 'Введите полный номер'
      },
    },
    colorWrong: '#FF6972',

    submitHandler: function (form, values, ajax) {
      ajax({
          url: '/mail.php',
          method: 'POST',
          data: values,
          async: true,
          callback: function (response) {
            document.querySelector('.product__form').classList.remove('product__modal_display');
            document.querySelector('.product__form').classList.remove('product__modal_visible');

            document.querySelector('.product__success').classList.add('product__modal_display');
            setTimeout(() => {
              document.querySelector('.product__success').classList.add('product__modal_visible');
            }, 200)
            productBtnOpen.scrollIntoView({block: "center", behavior: "smooth"});
          },
          error: function (response) {
              alert('Ошибка отправки!')
          }
      });
    },
  });
}

if (window.location.pathname === '/product-card.html') {
  let productForm = document.querySelector('.product__form'),
      productBtnOpen = document.querySelector('.product__buy-btn_buy'),
      productBtnCloseArr = document.querySelectorAll('.modal__btn-close');

  productBtnOpen.onclick = () => {
    document.body.classList.add('no-scroll');
    productForm.classList.add('product__modal_display');
    setTimeout(() => {
      productForm.classList.add('product__modal_visible');
    }, 200)
    document.querySelector('.form__input').scrollIntoView({block: "center", behavior: "smooth"});
  }

  productBtnCloseArr.forEach(item => {
    item.onclick = () => {
      let dataClose = event.currentTarget.dataset.close;

      document.body.classList.remove('no-scroll');
      document.querySelector(`.product__${dataClose}`).classList.remove('product__modal_visible');
      setTimeout(() => {
        document.querySelector(`.product__${dataClose}`).classList.remove('product__modal_display');
      }, 200)
    }
  })
}

if (window.location.pathname === '/product-card.html') {
  const productSimpleBar = new SimpleBar(document.querySelector('.product-preview'), {
    scrollbarMinSize: 20,
    scrollbarMaxSize: 28,
  });
}

if (window.location.pathname === '/product-card.html') {
  let productBig = document.querySelector('.product__big'),
      productSlider = document.querySelector('.product__slider'),
      productPreviewArr = document.querySelectorAll('.product-preview__img'),
      productBigImg = document.querySelector('.product__big-img'),
      productBigSrc = productBigImg.getAttribute('src'),
      productSliderPreviewArr = document.querySelectorAll('.product-slider__img-preview'),
      productSliderBigImg = document.querySelector('.product-slider__big-img'),
      productSliderBigSrc = productBigImg.getAttribute('src');

  productBig.onclick = () => {
    productSliderBigImg.setAttribute('src', productSliderBigSrc);
    document.body.classList.add('no-scroll');
    productSlider.classList.add('product__modal_display');
    setTimeout(() => {
      productSlider.classList.add('product__modal_visible');
    }, 200)
    document.querySelector('.product-slider__big').scrollIntoView({block: "center", behavior: "smooth"});
  }

  productPreviewArr.forEach(item => {
    item.onclick = () => {
      let src = event.currentTarget.dataset.src;
      if (productBigImg.getAttribute('src') === src) {
        productBigImg.setAttribute('src', productBigSrc);
      } else {
        productBigImg.setAttribute('src', src);
      }
    }
  })

  productSliderPreviewArr.forEach(item => {
    item.onclick = () => {
      let src = event.currentTarget.dataset.src;
      if (productSliderBigImg.getAttribute('src') === src) {
        productSliderBigImg.setAttribute('src', productSliderBigSrc);
      } else {
        productSliderBigImg.setAttribute('src', src);
      }
    }
  })
}

const productSwiper = new Swiper('.product-slider__swiper', {
  spaceBetween: 63,
  slidesPerGroup: 1,
  slidesPerView: 1,
  breakpoints: {
    581: {
      spaceBetween: 78,
      slidesPerGroup: 1,
      slidesPerView: 2,
    },
    1023: {
      spaceBetween: 78,
      slidesPerGroup: 3,
      slidesPerView: 3,
    },
    1201: {
      spaceBetween: 78,
      slidesPerGroup: 4,
      slidesPerView: 4,
    }
  },

  navigation: {
    nextEl: '.product__slider__btn_next',
    prevEl: '.product__slider__btn_prev',
  }
});



if (window.location.pathname === '/index.html') {
  let ratingBtnShowMore = document.querySelector('.rating__btn-more'),
      ratingCards = document.querySelectorAll('.rating__item');

  ratingBtnShowMore.onclick = () => {
    ratingBtnShowMore.style.display = 'none';
    ratingCards.forEach(item => {
      item.style.display = 'block';
    })
  }
}

const similarSwiper = new Swiper('.similar__swiper', {
  spaceBetween: 16,
  slidesPerGroup: 2,
  slidesPerView: 2,
  breakpoints: {
    461: {
      spaceBetween: 32,
      slidesPerGroup: 2,
      slidesPerView: 2,
    },
    1023: {
      spaceBetween: 32,
      slidesPerGroup: 3,
      slidesPerView: 3,
    },
    1200: {
      spaceBetween: 32,
      slidesPerGroup: 4,
      slidesPerView: 4,
    }
  },

  navigation: {
    nextEl: '.similar__btn_next',
    prevEl: '.similar__btn_prev',
  }
});

const specialsSwiper = new Swiper('.special__swiper', {
  // Optional parameters
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 32,
  slidesPerView: 'auto',
  breakpoints: {
    581: {
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerGroup: 3,
    }
  },

  navigation: {
    nextEl: '.special__btn_next',
    prevEl: '.special__btn_prev',
  }
});

const usefulSwiper = new Swiper('.useful__swiper', {
  // Optional parameters
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 32,
  breakpoints: {
    581: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1200: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },

  navigation: {
    nextEl: '.useful__btn_next',
    prevEl: '.useful__btn_prev',
  }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1cmdlci5qcyIsImNhdGFsb2ctY2hlY2tib3gtc2hvd21vcmUuanMiLCJjYXRhbG9nLWZpbHRlci1tYXJrZXJzLmpzIiwiY2F0YWxvZy1qcXVlcnktcmFuZ2UtaW5pdC5qcyIsImNhdGFsb2ctc3dpcGVyLWluaXQuanMiLCJjb250YWN0cy1qdXN0dmFsaWRhdGUtaW5pdC5qcyIsImNvbnRhY3RzLXRpcHB5LWluaXQuanMiLCJoZWFkZXItY2hvaWNlcy1pbml0LmpzIiwiaGVhZGVyLWRyb3Bkb3duLmpzIiwiaGVhZGVyLXNpbXBsZWJhci1pbml0LmpzIiwiaGVyby1zd2lwZXItaW5pdC5qcyIsImlucHV0LXBsYWNlaG9sZGVycy5qcyIsInByb2R1Y3QtanVzdHZhbGlkYXRlLWluaXQuanMiLCJwcm9kdWN0LW1vZGFsLmpzIiwicHJvZHVjdC1zaW1wbGViYXItaW5pdC5qcyIsInByb2R1Y3Qtc2xpZGVyLmpzIiwicHJvZHVjdC1zd2lwZXItaW5pdC5qcyIsInJhdGluZy1zaG93bW9yZS5qcyIsInNpbWlsYXItc3dpcGVyLWluaXQuanMiLCJzcGVjaWFsLXN3aXBlci1pbml0LmpzIiwidXNlZnVsLXN3aXBlci1pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1cmdlcicpLFxuICAgIG5hdk1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19ib3R0b20tbmF2LW1haW4nKSxcbiAgICBuYXZNYWluSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmF2X19tYWluLWl0ZW0nKSxcbiAgICBuYXZFeHRyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3RvcC1uYXYnKSxcbiAgICBuYXZFeHRyYUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdl9fZXh0LWl0ZW0nKSxcbiAgICBidXJnZXJMaW5lMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXJnZXJfX2xpbmUxJyksXG4gICAgYnVyZ2VyTGluZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnVyZ2VyX19saW5lMicpLFxuICAgIGJ1cmdlckxpbmUzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1cmdlcl9fbGluZTMnKSxcbiAgICB0TGluZU1haW4gPSBnc2FwLnRpbWVsaW5lKHtwYXVzZWQ6IHRydWV9KSxcbiAgICB0TGluZUV4dHJhID0gZ3NhcC50aW1lbGluZSh7cGF1c2VkOiB0cnVlfSksXG4gICAgYnVyZ2VyRmxhZyA9IHRydWUsXG4gICAgbWVkaWFXaWR0aCA9IDEwMjM7XG5cbnRMaW5lTWFpbi5zZXQoYnVyZ2VyLCB7ekluZGV4OiAxMn0pXG4gICAgICAgICAgLnNldChuYXZNYWluLCB7ZGlzcGxheTogJ2Jsb2NrJ30pXG4gICAgICAgICAgLnRvKG5hdk1haW4sIHtvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogLjN9KVxuICAgICAgICAgIC50byhidXJnZXJMaW5lMiwge29wYWNpdHk6IDAsIHg6IC0yMCwgZHVyYXRpb246IC4yfSwgXCItPS4yXCIpXG4gICAgICAgICAgLnNldChidXJnZXJMaW5lMiwge2Rpc3BsYXk6ICdub25lJ30pXG4gICAgICAgICAgLnRvKGJ1cmdlckxpbmUxLCB7dG9wOiAnNTAlJywgcm90YXRlOiA0NSwgZHVyYXRpb246IC4yfSwgXCItPS4yXCIpXG4gICAgICAgICAgLnRvKGJ1cmdlckxpbmUzLCB7dG9wOiAnNTAlJywgcm90YXRlOiAtNDUsIGR1cmF0aW9uOiAuMn0sIFwiLT0uMlwiKVxuICAgICAgICAgIC50byhuYXZNYWluLCB7YmFja2dyb3VuZFBvc2l0aW9uOiAncmlnaHQgNzJweCBib3R0b20gNjBweCcsIGR1cmF0aW9uOiAuNH0sIFwiLT0uMlwiKVxuICAgICAgICAgIC50byhuYXZNYWluSXRlbXNbMF0sIHtvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogLjJ9LCBcIi09LjFcIilcbiAgICAgICAgICAudG8obmF2TWFpbkl0ZW1zWzFdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSwgXCItPS4xNVwiKVxuICAgICAgICAgIC50byhuYXZNYWluSXRlbXNbMl0sIHtvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogLjJ9LCBcIi09LjE1XCIpXG4gICAgICAgICAgLnRvKG5hdk1haW5JdGVtc1szXSwge29wYWNpdHk6IDEsIHk6IDAsIGR1cmF0aW9uOiAuMn0pXG4gICAgICAgICAgLnRvKG5hdk1haW5JdGVtc1s0XSwge29wYWNpdHk6IDEsIHk6IDAsIGR1cmF0aW9uOiAuMn0sIFwiLT0uMTVcIilcbiAgICAgICAgICAudG8obmF2TWFpbkl0ZW1zWzVdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSwgXCItPS4xNVwiKVxuXG50TGluZUV4dHJhLnNldChuYXZFeHRyYSwge2Rpc3BsYXk6ICdibG9jayd9LCBcIi09MC40XCIpXG4gICAgICAgICAgICAudG8obmF2RXh0cmEsIHtvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogLjN9LCBcIi09LjNcIilcbiAgICAgICAgICAgIC50byhuYXZFeHRyYUl0ZW1zWzBdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSwgXCItPS4xXCIpXG4gICAgICAgICAgICAudG8obmF2RXh0cmFJdGVtc1sxXSwge29wYWNpdHk6IDEsIHk6IDAsIGR1cmF0aW9uOiAuMn0sIFwiLT0uMVwiKVxuICAgICAgICAgICAgLnRvKG5hdkV4dHJhSXRlbXNbMl0sIHtvcGFjaXR5OiAxLCB5OiAwLCBkdXJhdGlvbjogLjJ9LCBcIi09LjFcIilcbiAgICAgICAgICAgIC50byhuYXZFeHRyYUl0ZW1zWzNdLCB7b3BhY2l0eTogMSwgeTogMCwgZHVyYXRpb246IC4yfSlcblxuXG5jb25zdCBidG5SZXNldCA9ICgpID0+IHtcbiAgYnVyZ2VyTGluZTEucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICBidXJnZXJMaW5lMi5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gIGJ1cmdlckxpbmUzLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbn1cblxuY29uc3QgYnRuQWN0aXZlID0gKCkgPT4ge1xuICBidXJnZXJMaW5lMS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlKDQ1ZGVnKSc7XG4gIGJ1cmdlckxpbmUxLnN0eWxlLnRvcCA9ICc1MCUnO1xuICBidXJnZXJMaW5lMi5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgYnVyZ2VyTGluZTIuc3R5bGUudHJhbnNmb3JtICA9ICd0cmFuc2xhdGVZKC01MCUpIHRyYW5zbGF0ZVgoLTIwcHgpJztcbiAgYnVyZ2VyTGluZTIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgYnVyZ2VyTGluZTMuc3R5bGUudHJhbnNmb3JtICA9ICdyb3RhdGUoLTQ1ZGVnKSc7XG4gIGJ1cmdlckxpbmUzLnN0eWxlLnRvcCA9ICc1MCUnO1xufVxuXG5jb25zdCBuYXZNYWluUmVzZXQgPSAoKSA9PiB7XG4gIG5hdk1haW5JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICBpdGVtLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJztcbiAgfSlcbiAgbmF2TWFpbi5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XG4gIG5hdk1haW4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIG5hdk1haW4uc3R5bGUub3BhY2l0eSA9IDE7XG4gIG5hdk1haW4uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ3JpZ2h0IDcycHggYm90dG9tIDYwcHgnO1xufVxuXG5jb25zdCBuYXZNYWluSGlkZGVuID0gKCkgPT4ge1xuICBuYXZNYWluSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgaXRlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSg1MHB4KSc7XG4gIH0pXG4gIG5hdk1haW4uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoNTBweCknO1xuICBuYXZNYWluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIG5hdk1haW4uc3R5bGUub3BhY2l0eSA9IDA7XG4gIG5hdk1haW4uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ3JpZ2h0IDcycHggYm90dG9tIC0xNTBweCc7XG59XG5cbmNvbnN0IG5hdkV4dHJhUmVzZXQgPSAoKSA9PiB7XG4gIG5hdkV4dHJhSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgaXRlbS5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XG4gIH0pXG4gIG5hdkV4dHJhLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJztcbiAgbmF2RXh0cmEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIG5hdkV4dHJhLnN0eWxlLm9wYWNpdHkgPSAxO1xufVxuXG5jb25zdCBuYXZFeHRyYUhpZGRlbiA9ICgpID0+IHtcbiAgbmF2RXh0cmFJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBpdGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDUwcHgpJztcbiAgfSlcbiAgbmF2RXh0cmEuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoNTBweCknO1xuICBuYXZFeHRyYS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBuYXZFeHRyYS5zdHlsZS5vcGFjaXR5ID0gMDtcbn1cblxuYnVyZ2VyLm9uY2xpY2sgPSAoKSA9PiB7XG4gIGxldCB4ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gIGlmICh4ID4gNTgwKSB7XG4gICAgaWYgKGJ1cmdlckZsYWcgPT09IHRydWUpIHtcbiAgICAgIHRMaW5lTWFpbi5wbGF5KCk7XG4gICAgICBuYXZNYWluLmNsYXNzTGlzdC5hZGQoJ25hdl9fYWN0aXZlJyk7XG4gICAgICBuYXZFeHRyYS5jbGFzc0xpc3QuYWRkKCduYXZfX2FjdGl2ZScpO1xuICAgICAgYnVyZ2VyRmxhZyA9ICFidXJnZXJGbGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0TGluZU1haW4ucmV2ZXJzZSgpO1xuICAgICAgbmF2TWFpbi5jbGFzc0xpc3QucmVtb3ZlKCduYXZfX2FjdGl2ZScpO1xuICAgICAgbmF2RXh0cmEuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X19hY3RpdmUnKTtcbiAgICAgIGJ1cmdlckZsYWcgPSAhYnVyZ2VyRmxhZztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ1cmdlckZsYWcgPT09IHRydWUpIHtcbiAgICAgIHRMaW5lTWFpbi5wbGF5KCk7XG4gICAgICB0TGluZUV4dHJhLnBsYXkoKTtcbiAgICAgIG5hdk1haW4uY2xhc3NMaXN0LmFkZCgnbmF2X19hY3RpdmUnKTtcbiAgICAgIG5hdkV4dHJhLmNsYXNzTGlzdC5hZGQoJ25hdl9fYWN0aXZlJyk7XG4gICAgICBidXJnZXJGbGFnID0gIWJ1cmdlckZsYWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRMaW5lRXh0cmEucmV2ZXJzZSgpO1xuICAgICAgdExpbmVNYWluLnJldmVyc2UoKTtcbiAgICAgIG5hdk1haW4uY2xhc3NMaXN0LnJlbW92ZSgnbmF2X19hY3RpdmUnKTtcbiAgICAgIG5hdkV4dHJhLmNsYXNzTGlzdC5yZW1vdmUoJ25hdl9fYWN0aXZlJyk7XG4gICAgICBidXJnZXJGbGFnID0gIWJ1cmdlckZsYWc7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHByb3BlcnRpZXNDb250cm9sbGVyID0gKCkgPT4ge1xuICBuYXZNYWluLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICBuYXZFeHRyYS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICBsZXQgeCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgIGhlYWRlckggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykub2Zmc2V0SGVpZ2h0LFxuICAgICAgbmF2TWFpbkhlaWdodCA9IG5hdk1haW4ub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmICh4ID4gbWVkaWFXaWR0aCkge1xuICAgIG5hdk1haW5SZXNldCgpO1xuICAgIGJ0blJlc2V0KCk7XG4gICAgbmF2RXh0cmFSZXNldCgpO1xuICB9IGVsc2UgaWYgKHggPD0gNTgwKSB7XG4gICAgbmF2RXh0cmEuc3R5bGUudG9wID0gKGhlYWRlckggLSAyMDEgKyBuYXZNYWluSGVpZ2h0KSArICdweCc7XG4gICAgbmF2TWFpbi5zdHlsZS50b3AgPSAoaGVhZGVySCAtIDIwMSkgKyAncHgnO1xuICAgIGlmIChuYXZNYWluLmNsYXNzTGlzdC5jb250YWlucygnbmF2X19hY3RpdmUnKSA9PT0gZmFsc2UpIHtcbiAgICAgIG5hdk1haW5IaWRkZW4oKTtcbiAgICAgIGJ0blJlc2V0KCk7XG4gICAgICBuYXZFeHRyYUhpZGRlbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYXZNYWluUmVzZXQoKTtcbiAgICAgIGJ0bkFjdGl2ZSgpO1xuICAgICAgbmF2RXh0cmFSZXNldCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuYXZNYWluLnN0eWxlLnRvcCA9ICcxMDhweCc7XG4gICAgaWYgKG5hdk1haW4uY2xhc3NMaXN0LmNvbnRhaW5zKCduYXZfX2FjdGl2ZScpID09PSBmYWxzZSkge1xuICAgICAgbmF2TWFpbkhpZGRlbigpO1xuICAgICAgYnRuUmVzZXQoKTtcbiAgICAgIG5hdkV4dHJhUmVzZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmF2TWFpblJlc2V0KCk7XG4gICAgICBidG5BY3RpdmUoKTtcbiAgICAgIG5hdkV4dHJhUmVzZXQoKTtcbiAgICB9XG4gIH1cbn1cblxucHJvcGVydGllc0NvbnRyb2xsZXIoKTtcblxud2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xuXG4gIHByb3BlcnRpZXNDb250cm9sbGVyKCk7XG5cbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9jYXRhbG9nLmh0bWwnKSB7XG4gICAgbGV0IHggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICBpZiAoeCA+IDEyMDApIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nX19sZWZ0X19kcm9wZG93bicpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY2F0YWxvZ19fbGVmdF9fZHJvcGRvd25fX2FjdGl2ZScpO1xuICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIH0pXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZ19fbGVmdF9fYnRuJykuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjYXRhbG9nX19sZWZ0X19idG5fX2FjdGl2ZScpO1xuICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nX19sZWZ0X19kcm9wZG93bicpLmZvckVhY2goZHJvcGRvd24gPT4ge1xuICAgICAgICBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdjYXRhbG9nX19sZWZ0X19kcm9wZG93bl9fYWN0aXZlJyk7XG4gICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtoZWlnaHQ6IDAsIGR1cmF0aW9uOiAuMX0pXG4gICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtvcGFjaXR5OiAwLCBkdXJhdGlvbjogLjF9KVxuICAgICAgICBnc2FwLnRvKGRyb3Bkb3duLCB7ZGlzcGxheTogJ25vbmUnLCBkdXJhdGlvbjogLjF9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbGVmdCcpLnN0eWxlLnRvcCA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fdG9wJykub2Zmc2V0SGVpZ2h0ICsgMTcpICsgJ3B4JztcblxuICAgIHNldENhdGFsb2dTbGlkZXNPcmRlcigpO1xuICB9XG59XG4iLCJpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2NhdGFsb2cuaHRtbCcpIHtcbiAgbGV0IGNhdGFsb2dDYXRlZ29yeUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yeS1jaGVja2JveCcpLFxuICAgICAgY2F0YWxvZ0Rpc2NvdW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc2NvdW50LWNoZWNrYm94JyksXG4gICAgICBjYXRhbG9nQ29sb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3ItY2hlY2tib3gnKSxcbiAgICAgIGNhdGFsb2dDYXRlZ29yeUFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsW2RhdGEtZmlsdGVyPVwiY2F0ZWdvcnlcIl0nKSxcbiAgICAgIGNhdGFsb2dEaXNjb3VudEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsW2RhdGEtZmlsdGVyPVwiZGlzY291bnRcIl0nKSxcbiAgICAgIGNhdGFsb2dDb2xvckFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsW2RhdGEtZmlsdGVyPVwiY29sb3JcIl0nKSxcbiAgICAgIHRMaW5lQ2F0ZWdvcnlDaGVja2JveGVzID0gZ3NhcC50aW1lbGluZSh7cGF1c2VkOiB0cnVlfSksXG4gICAgICB0TGluZURpc2NvdW50Q2hlY2tib3hlcyA9IGdzYXAudGltZWxpbmUoe3BhdXNlZDogdHJ1ZX0pLFxuICAgICAgdExpbmVDb2xvckNoZWNrYm94ZXMgPSBnc2FwLnRpbWVsaW5lKHtwYXVzZWQ6IHRydWV9KSxcbiAgICAgIGNvdW50ID0gOTtcblxuICBsZXQgdExpbmVHZW5lcmF0b3IgPSAoYXJyLCBjb250YWluZXIsIHRMaW5lKSA9PiB7XG5cbiAgICBpZiAoYXJyLmxlbmd0aCA+IGNvdW50KSB7XG5cbiAgICAgIHRMaW5lLmZyb21Ubyhjb250YWluZXIsIHtoZWlnaHQ6IGNvbnRhaW5lci5vZmZzZXRIZWlnaHR9LCB7aGVpZ2h0OiAyNzksIGR1cmF0aW9uOiAuNX0pXG5cbiAgICAgIGZvciAobGV0IGkgPSA5OyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRMaW5lLnRvKGFycltpXSwge29wYWNpdHk6IDAsIGR1cmF0aW9uOiAuNX0sIFwiLT0uNVwiKVxuICAgICAgICAgICAgLnNldChhcnJbaV0sIHtkaXNwbGF5OiAnbm9uZSd9KVxuICAgICAgfVxuXG4gICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjYXRhbG9nX19sZWZ0X2J0bi1zaG93bW9yZScpO1xuICAgICAgYnV0dG9uLmRhdGFzZXQuZmlsdGVyID0gYXJyWzBdLmRhdGFzZXQuZmlsdGVyO1xuICAgICAgYnV0dG9uLmRhdGFzZXQuY291bnQgPSBhcnIubGVuZ3RoIC0gY291bnQ7XG4gICAgICBjb250YWluZXIucGFyZW50RWxlbWVudC5hcHBlbmQoYnV0dG9uKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGJ1dHRvbltkYXRhLWZpbHRlcj1cIiR7YXJyWzBdLmRhdGFzZXQuZmlsdGVyfVwiXWApLmlubmVySFRNTCA9IGArINC10YnRkSAke2Fyci5sZW5ndGggLSBjb3VudH1gO1xuXG4gICAgICB0TGluZS5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgdExpbmVHZW5lcmF0b3IoY2F0YWxvZ0NhdGVnb3J5QXJyLCBjYXRhbG9nQ2F0ZWdvcnlDb250YWluZXIsIHRMaW5lQ2F0ZWdvcnlDaGVja2JveGVzKTtcbiAgdExpbmVHZW5lcmF0b3IoY2F0YWxvZ0Rpc2NvdW50QXJyLCBjYXRhbG9nRGlzY291bnRDb250YWluZXIsIHRMaW5lRGlzY291bnRDaGVja2JveGVzKTtcbiAgdExpbmVHZW5lcmF0b3IoY2F0YWxvZ0NvbG9yQXJyLCBjYXRhbG9nQ29sb3JDb250YWluZXIsIHRMaW5lQ29sb3JDaGVja2JveGVzKTtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZ19fbGVmdF9idG4tc2hvd21vcmUnKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGl0ZW0ub25jbGljayA9ICgpID0+IHtcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmlubmVySFRNTCA9PT0gJ9Ch0LLQtdGA0L3Rg9GC0YwnKSB7XG4gICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsdGVyID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICAgICAgdExpbmVDYXRlZ29yeUNoZWNrYm94ZXMucGxheSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWx0ZXIgPT09ICdkaXNjb3VudCcpIHtcbiAgICAgICAgICB0TGluZURpc2NvdW50Q2hlY2tib3hlcy5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbHRlciA9PT0gJ2NvbG9yJykge1xuICAgICAgICAgIHRMaW5lQ29sb3JDaGVja2JveGVzLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmlubmVySFRNTCA9IGArINC10YnRkSAke2V2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb3VudH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWx0ZXIgPT09ICdjYXRlZ29yeScpIHtcbiAgICAgICAgICB0TGluZUNhdGVnb3J5Q2hlY2tib3hlcy5yZXZlcnNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbHRlciA9PT0gJ2Rpc2NvdW50Jykge1xuICAgICAgICAgIHRMaW5lRGlzY291bnRDaGVja2JveGVzLnJldmVyc2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsdGVyID09PSAnY29sb3InKSB7XG4gICAgICAgICAgdExpbmVDb2xvckNoZWNrYm94ZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaW5uZXJIVE1MID0gJ9Ch0LLQtdGA0L3Rg9GC0YwnO1xuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZ19fbGVmdC1kcm9wZG93bicpLmZvckVhY2goZHJvcGRvd24gPT4ge1xuICAgIGxldCB4ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgaWYgKHggPD0gMTIwMCkge1xuICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgnY2F0YWxvZ19fbGVmdC1kcm9wZG93bl9hY3RpdmUnKTtcbiAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtoZWlnaHQ6IDB9KVxuICAgICAgZ3NhcC50byhkcm9wZG93biwge29wYWNpdHk6IDB9KVxuICAgICAgZ3NhcC50byhkcm9wZG93biwge2Rpc3BsYXk6ICdub25lJ30pXG4gICAgfVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nX19sZWZ0LWJ0bicpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaXRlbS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgbGV0IHBhdGggPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucGF0aDtcblxuICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdjYXRhbG9nX19sZWZ0LWJ0bl9hY3RpdmUnKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhdGFsb2dfX2xlZnQtZHJvcGRvd24nKS5mb3JFYWNoKGRyb3Bkb3duID0+IHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGRyb3Bkb3duLmRhdGFzZXQudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0ID09PSBwYXRoKSB7XG4gICAgICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LnRvZ2dsZSgnY2F0YWxvZ19fbGVmdC1kcm9wZG93bl9hY3RpdmUnKTtcbiAgICAgICAgICBpZiAoZHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXRhbG9nX19sZWZ0LWRyb3Bkb3duX2FjdGl2ZScpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBnc2FwLnRvKGRyb3Bkb3duLCB7ZGlzcGxheTogJ2Jsb2NrJ30pXG4gICAgICAgICAgICBnc2FwLnRvKGRyb3Bkb3duLCB7b3BhY2l0eTogMSwgZHVyYXRpb246IC41fSlcbiAgICAgICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtoZWlnaHQ6ICdhdXRvJywgZHVyYXRpb246IC41fSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3NhcC50byhkcm9wZG93biwge2hlaWdodDogMCwgZHVyYXRpb246IC41fSlcbiAgICAgICAgICAgIGdzYXAudG8oZHJvcGRvd24sIHtvcGFjaXR5OiAwLCBkdXJhdGlvbjogLjV9KVxuICAgICAgICAgICAgZ3NhcC50byhkcm9wZG93biwge2Rpc3BsYXk6ICdub25lJ30pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn1cbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvY2F0YWxvZy5odG1sJykge1xuICBsZXQgbWFya2VyQ2F0ZWdvcnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbWFya2Vyc19jYXRlZ29yeS1jb250YWluZXInKSxcbiAgICAgIG1hcmtlclByaWNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX21hcmtlcnNfcHJpY2UtY29udGFpbmVyJyksXG4gICAgICBtYXJrZXJEaXNjb3VudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nX19tYXJrZXJzX2Rpc2NvdW50LWNvbnRhaW5lcicpLFxuICAgICAgbWFya2VyQ29sb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbWFya2Vyc19jb2xvci1jb250YWluZXInKTtcblxuICBsZXQgbWFya2VyUmVtb3ZlID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nX19tYXJrZXJzX19idG4nKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5vbmNsaWNrID0gKGFjdGl2ZSkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tib3gtbGFiZWwnKS5mb3JFYWNoKGxhYmVsID0+IHtcbiAgICAgICAgICBpZiAobGFiZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgPT09IGFjdGl2ZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykpIHtcbiAgICAgICAgICAgIGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGFjdGl2ZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1hcmtlckNhdGVnb3J5Q29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoKTtcbiAgICAgICAgaWYgKG1hcmtlckNhdGVnb3J5Q29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbWFya2VyQ2F0ZWdvcnlDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcmtlckNhdGVnb3J5Q29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwcHgnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXJrZXJQcmljZUNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1hcmtlclByaWNlQ29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXJrZXJQcmljZUNvbnRhaW5lci5zdHlsZS5tYXJnaW5SaWdodCA9ICcyMHB4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAobWFya2VyRGlzY291bnRDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBtYXJrZXJEaXNjb3VudENvbnRhaW5lci5zdHlsZS5tYXJnaW5SaWdodCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFya2VyRGlzY291bnRDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hcmtlckNvbG9yQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbWFya2VyQ29sb3JDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcmtlckNvbG9yQ29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwcHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX2xlZnQnKS5zdHlsZS50b3AgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX3RvcCcpLm9mZnNldEhlaWdodCArIDE3KSArICdweCc7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxldCBtYXJrZXJBZGQgPSAoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtLmRhdGFzZXQuZmlsdGVyID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICBpZiAoaXRlbS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhdGFsb2dfX21hcmtlcnNfbWFya2VyJyk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjYXRhbG9nX19tYXJrZXJzX2NhdGVnb3J5Jyk7XG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKTtcbiAgICAgICAgbWFya2VyQ2F0ZWdvcnlDb250YWluZXIuYXBwZW5kKGRpdik7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBgJHtpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNhdGFsb2dfX21hcmtlcnNfYnRuXCIgYXJpYS1sYWJlbD1cItCj0LHRgNCw0YLRjCDRhNC40LvRjNGC0YBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiY2F0YWxvZ19fbWFya2Vycy1pY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNjbG9zZVwiPjwvdXNlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xuICAgICAgICBtYXJrZXJDYXRlZ29yeUNvbnRhaW5lci5zdHlsZS5tYXJnaW5SaWdodCA9ICcyMHB4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nX19tYXJrZXJzX2NhdGVnb3J5JykuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgaWYgKGNhdGVnb3J5LmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpID09PSBpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKSB7XG4gICAgICAgICAgICBjYXRlZ29yeS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChtYXJrZXJDYXRlZ29yeUNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1hcmtlckNhdGVnb3J5Q29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXRlbS5kYXRhc2V0LmZpbHRlciA9PT0gJ2Rpc2NvdW50Jykge1xuICAgICAgaWYgKGl0ZW0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX21hcmtlcnNfZGlzY291bnQnKSA9PT0gbnVsbCkge1xuICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2F0YWxvZ19fbWFya2Vyc19tYXJrZXInKTtcbiAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2F0YWxvZ19fbWFya2Vyc19kaXNjb3VudCcpO1xuICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKTtcbiAgICAgICAgICBtYXJrZXJEaXNjb3VudENvbnRhaW5lci5hcHBlbmQoZGl2KTtcbiAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYCR7aXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNhdGFsb2dfX21hcmtlcnNfYnRuXCIgYXJpYS1sYWJlbD1cItCj0LHRgNCw0YLRjCDRhNC40LvRjNGC0YBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJjYXRhbG9nX19tYXJrZXJzLWljb25cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2xvc2VcIj48L3VzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX21hcmtlcnNfZGlzY291bnQnKS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKTtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbWFya2Vyc19kaXNjb3VudCcpLmlubmVySFRNTCA9IGAke2l0ZW0uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBjYXRhbG9nX19hcmtlcnNfYnRuXCIgYXJpYS1sYWJlbD1cItCj0LHRgNCw0YLRjCDRhNC40LvRjNGC0YBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJjYXRhbG9nX19tYXJrZXJzLWljb25cIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2xvc2VcIj48L3VzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XG4gICAgICAgIH1cbiAgICAgICAgbWFya2VyRGlzY291bnRDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveC1sYWJlbCcpLmZvckVhY2gobGFiZWwgPT4ge1xuICAgICAgICAgIGlmIChsYWJlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2F0YWxvZ19fZGlzY291bnRfX2NoZWNrYm94X19jb250YWluZXInKSA9PT0gdHJ1ZSAmJiBsYWJlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGVja2VkID09PSB0cnVlICYmIChsYWJlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSAhPT0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSkpIHtcbiAgICAgICAgICAgIGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoZWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nX19tYXJrZXJzX2Rpc2NvdW50JykuZm9yRWFjaChkaXNjb3VudCA9PiB7XG4gICAgICAgICAgaWYgKGRpc2NvdW50LmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpID09PSBpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKSB7XG4gICAgICAgICAgICBkaXNjb3VudC5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChtYXJrZXJEaXNjb3VudENvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1hcmtlckRpc2NvdW50Q29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXRlbS5kYXRhc2V0LmZpbHRlciA9PT0gJ2NvbG9yJykge1xuICAgICAgaWYgKGl0ZW0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjYXRhbG9nX19tYXJrZXJzX21hcmtlcicpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2F0YWxvZ19fbWFya2Vyc19jb2xvcicpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgaXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSk7XG4gICAgICAgIG1hcmtlckNvbG9yQ29udGFpbmVyLmFwcGVuZChkaXYpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gYCR7aXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBjYXRhbG9nX19tYXJrZXJzX2J0blwiIGFyaWEtbGFiZWw9XCLQo9Cx0YDQsNGC0Ywg0YTQuNC70YzRgtGAXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImNhdGFsb2dfX21hcmtlcnMtaWNvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2xvc2VcIj48L3VzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcbiAgICAgICAgbWFya2VyQ29sb3JDb250YWluZXIuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZ19fbWFya2Vyc19jb2xvcicpLmZvckVhY2goY29sb3IgPT4ge1xuICAgICAgICAgIGlmIChjb2xvci5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA9PT0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSkge1xuICAgICAgICAgICAgY29sb3IucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAobWFya2VyQ29sb3JDb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBtYXJrZXJDb2xvckNvbnRhaW5lci5zdHlsZS5tYXJnaW5SaWdodCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tib3gtbGFiZWwnKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIG1hcmtlckFkZChpdGVtKTtcblxuICAgIGl0ZW0ub25jbGljayA9IChhY3RpdmUpID0+IHtcbiAgICAgIG1hcmtlckFkZChhY3RpdmUuY3VycmVudFRhcmdldCk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nX19sZWZ0Jykuc3R5bGUudG9wID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nX190b3AnKS5vZmZzZXRIZWlnaHQgKyAxNykgKyAncHgnO1xuICAgIH1cbiAgfSlcblxuICAkKCcuY2F0YWxvZ19fbWFya2VycycpLm9uKFwiRE9NTm9kZUluc2VydGVkXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIG1hcmtlclJlbW92ZSgpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX2xlZnQnKS5zdHlsZS50b3AgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX3RvcCcpLm9mZnNldEhlaWdodCArIDE3KSArICdweCc7XG4gIH0pXG5cbiAgbWFya2VyUmVtb3ZlKCk7XG59XG4iLCJpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnL2NhdGFsb2cuaHRtbCcpIHtcblxuICBsZXQgbWFya2VyUHJpY2VBZGQgPSAocHJpY2VUbykgPT4ge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbWFya2Vyc19wcmljZScpID09PSBudWxsKSB7XG4gICAgICBsZXQgY2F0YWxvZ01hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2F0YWxvZ01hcmtlci5jbGFzc0xpc3QuYWRkKCdjYXRhbG9nX19tYXJrZXJzX21hcmtlcicpO1xuICAgICAgY2F0YWxvZ01hcmtlci5jbGFzc0xpc3QuYWRkKCdjYXRhbG9nX19tYXJrZXJzX3ByaWNlJyk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbWFya2Vyc19wcmljZS1jb250YWluZXInKS5hcHBlbmQoY2F0YWxvZ01hcmtlcik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbWFya2Vyc19wcmljZS1jb250YWluZXInKS5zdHlsZS5tYXJnaW5SaWdodCA9ICcyMHB4JztcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fbWFya2Vyc19wcmljZScpLmlubmVySFRNTCA9IGDQlNC+ICR7cHJpY2VUb31cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNhdGFsb2dfX21hcmtlcnNfYnRuXCI+XG4gICAgICA8c3ZnIGNsYXNzPVwiY2F0YWxvZ19fbWFya2Vycy1pY29uXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XG4gICAgICAgIDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2Nsb3NlXCI+PC91c2U+XG4gICAgICA8L3N2Zz5cbiAgICA8L2J1dHRvbj5gO1xuICB9XG5cbiAgJCggZnVuY3Rpb24oKSB7XG4gICAgJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoe1xuICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICBtaW46IDAsXG4gICAgICBtYXg6IDIwMDAwMCxcbiAgICAgIHZhbHVlczogWyAyMDAwLCAxNTAwMDAgXSxcbiAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuICAgICAgICAkKCBcIi5jYXRhbG9nX19wcmljZS1taW4taW5wdXRcIiApLnZhbCh1aS52YWx1ZXNbIDAgXSk7XG4gICAgICAgICQoIFwiLmNhdGFsb2dfX3ByaWNlLW1heC1pbnB1dFwiICkudmFsKHVpLnZhbHVlc1sgMSBdKTtcbiAgICAgICAgJCgnLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSk7XG4gICAgICAgICQoJy5jYXRhbG9nX19wcmljZS1tYXgtaW5wdXQnKS52YWwoU3RyaW5nKCQoJy5jYXRhbG9nX19wcmljZS1tYXgtaW5wdXQnKS52YWwoKS5yZXBsYWNlKC9bXjAtOS5dL2csJycpKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIiBcIikpO1xuXG4gICAgICAgIG1hcmtlclByaWNlQWRkKCQoJy5jYXRhbG9nX19wcmljZS1tYXgtaW5wdXQnKS52YWwoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJCggXCIuY2F0YWxvZ19fcHJpY2UtbWluLWlucHV0XCIgKS52YWwoJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwidmFsdWVzXCIsIDAgKSk7XG4gICAgJCggXCIuY2F0YWxvZ19fcHJpY2UtbWF4LWlucHV0XCIgKS52YWwoJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwidmFsdWVzXCIsIDEgKSk7XG4gICAgJCgnLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSk7XG4gICAgJCgnLmNhdGFsb2dfX3ByaWNlLW1heC1pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2dfX3ByaWNlLW1heC1pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSk7XG5cbiAgICBtYXJrZXJQcmljZUFkZCgkKCcuY2F0YWxvZ19fcHJpY2UtbWF4LWlucHV0JykudmFsKCkpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVpX19zbGlkZXJfX2hhbmRsZScpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLm9uZm9jdXMgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51aS13aWRnZXQtaGVhZGVyJykuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzAzM0FDJztcbiAgICAgIH1cblxuICAgICAgaXRlbS5vbmJsdXIgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51aS13aWRnZXQtaGVhZGVyJykuc3R5bGUuYmFja2dyb3VuZCA9ICcjQTY1Q0YwJztcbiAgICAgIH1cbiAgICB9KVxuICB9ICk7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgJCgnLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSkucmVwbGFjZSgvW14wLTkuXS9nLCcnKSk7XG4gICAgaWYgKC9eKDB8LT9bMS05XVxcZHswLDV9KSQvLnRlc3QoJCggXCIuY2F0YWxvZ19fcHJpY2UtbWluLWlucHV0XCIgKS52YWwoKSkpIHtcbiAgICAgIGlmICgkKCBcIi5jYXRhbG9nX19wcmljZS1taW4taW5wdXRcIiApLnZhbCgpID4gJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwidmFsdWVzXCIsIDEpKSB7XG4gICAgICAgICQoIFwiLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dFwiICkudmFsKCQoIFwiI3NsaWRlci1yYW5nZVwiICkuc2xpZGVyKCBcInZhbHVlc1wiLCAxKSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJCggXCIuY2F0YWxvZ19fcHJpY2UtbWluLWlucHV0XCIgKS52YWwoJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwib3B0aW9uXCIsIFwibWluXCIgKSk7XG4gICAgfVxuICAgICQoIFwiI3NsaWRlci1yYW5nZVwiICkuc2xpZGVyKCBcInZhbHVlc1wiLCAwLCAkKCBcIi5jYXRhbG9nX19wcmljZS1taW4taW5wdXRcIiApLnZhbCgpICk7XG4gICAgJCgnLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLnZhbChTdHJpbmcoJCgnLmNhdGFsb2dfX3ByaWNlLW1pbi1pbnB1dCcpLnZhbCgpLnJlcGxhY2UoL1teMC05Ll0vZywnJykpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKSk7XG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fcHJpY2UtbWF4LWlucHV0Jykub25pbnB1dCA9ICgpID0+IHtcbiAgICAkKCcuY2F0YWxvZ19fcHJpY2UtbWF4LWlucHV0JykudmFsKFN0cmluZygkKCcuY2F0YWxvZ19fcHJpY2UtbWF4LWlucHV0JykudmFsKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIgXCIpKS5yZXBsYWNlKC9bXjAtOS5dL2csJycpKTtcbiAgICBpZiAoL14oMHwtP1sxLTldXFxkezAsNX0pJC8udGVzdCgkKCBcIi5jYXRhbG9nX19wcmljZS1tYXgtaW5wdXRcIiApLnZhbCgpKSkge1xuICAgICAgaWYgKCQoIFwiLmNhdGFsb2dfX3ByaWNlLW1heC1pbnB1dFwiICkudmFsKCkgPCAkKCBcIiNzbGlkZXItcmFuZ2VcIiApLnNsaWRlciggXCJ2YWx1ZXNcIiwgMCkpIHtcbiAgICAgICAgJCggXCIuY2F0YWxvZ19fcHJpY2UtbWF4LWlucHV0XCIgKS52YWwoJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwidmFsdWVzXCIsIDApKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAkKCBcIi5jYXRhbG9nX19wcmljZS1tYXgtaW5wdXRcIiApLnZhbCgkKCBcIiNzbGlkZXItcmFuZ2VcIiApLnNsaWRlciggXCJvcHRpb25cIiwgXCJtYXhcIiApKTtcbiAgICB9XG4gICAgJCggXCIjc2xpZGVyLXJhbmdlXCIgKS5zbGlkZXIoIFwidmFsdWVzXCIsIDEsICQoIFwiLmNhdGFsb2dfX3ByaWNlLW1heC1pbnB1dFwiICkudmFsKCkgKTtcbiAgICAkKCcuY2F0YWxvZ19fcHJpY2UtbWF4LWlucHV0JykudmFsKFN0cmluZygkKCcuY2F0YWxvZ19fcHJpY2UtbWF4LWlucHV0JykudmFsKCkucmVwbGFjZSgvW14wLTkuXS9nLCcnKSkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIgXCIpKTtcblxuICAgIG1hcmtlclByaWNlQWRkKCQoJy5jYXRhbG9nX19wcmljZS1tYXgtaW5wdXQnKS52YWwoKSk7XG4gIH1cbn1cbiIsImNvbnN0IGNhdGFsb2dTd2lwZXIgPSBuZXcgU3dpcGVyKCcuY2F0YWxvZ19fc3dpcGVyJywge1xuICBzcGFjZUJldHdlZW46IDE2LFxuICBzbGlkZXNQZXJHcm91cDogMixcbiAgc2xpZGVzUGVyVmlldzogMixcbiAgcGFnaW5hdGlvbjoge1xuICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICBjbGlja2FibGU6IHRydWUsXG4gICAgcmVuZGVyQnVsbGV0OiBmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnXCIgYXJpYS1sYWJlbD1cItCh0LvQsNC50LQgJyArIChpbmRleCArIDEpICsgJ1wiPicgKyAoaW5kZXggKyAxKSArICc8L3NwYW4+JztcbiAgICB9LFxuICB9LFxuICBncmlkOiB7XG4gICAgcm93czogMyxcbiAgfSxcbiAgYnJlYWtwb2ludHM6IHtcbiAgICA0NjE6IHtcbiAgICAgIHNwYWNlQmV0d2VlbjogMzIsXG4gICAgICBzbGlkZXNQZXJHcm91cDogMixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgfSxcbiAgICAxMDI0OiB7XG4gICAgICBzcGFjZUJldHdlZW46IDMyLFxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDMsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgZ3JpZDoge1xuICAgICAgICByb3dzOiAzLFxuICAgICAgfSxcbiAgICB9XG4gIH0sXG59KTtcblxubGV0IHNldENhdGFsb2dTbGlkZXNPcmRlciA9ICgpID0+IHtcblxuICBsZXQgeCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgIHNsaWRlc0FyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nX19zbGlkZScpLFxuICAgICAgcm93ID0gMSxcbiAgICAgIHBsdXMgPSAwLFxuICAgICAgb3JkZXIgPSAwO1xuXG4gIGlmICh4ID4gMTAyMykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocm93ID09PSAxKSB7XG4gICAgICAgIHNsaWRlc0FycltpXS5zdHlsZS5vcmRlciA9IG9yZGVyICsgcGx1cztcbiAgICAgICAgb3JkZXIgKz0gMztcbiAgICAgICAgaWYgKChpICsgMSkgJSAzID09PSAwKSB7XG4gICAgICAgICAgcm93ID0gMjtcbiAgICAgICAgICBvcmRlciA9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocm93ID09PSAyKSB7XG4gICAgICAgIHNsaWRlc0FycltpXS5zdHlsZS5vcmRlciA9IG9yZGVyICsgcGx1cztcbiAgICAgICAgb3JkZXIgKz0gMztcbiAgICAgICAgaWYgKChpICsgMSkgJSAzID09PSAwKSB7XG4gICAgICAgICAgcm93ID0gMztcbiAgICAgICAgICBvcmRlciA9IDI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocm93ID09PSAzKSB7XG4gICAgICAgIHNsaWRlc0FycltpXS5zdHlsZS5vcmRlciA9IG9yZGVyICsgcGx1cztcbiAgICAgICAgb3JkZXIgKz0gMztcbiAgICAgICAgaWYgKChpICsgMSkgJSAzID09PSAwKSB7XG4gICAgICAgICAgcm93ID0gMTtcbiAgICAgICAgICBvcmRlciA9IDA7XG4gICAgICAgICAgcGx1cyArPSA5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocm93ID09PSAxKSB7XG4gICAgICAgIHNsaWRlc0FycltpXS5zdHlsZS5vcmRlciA9IG9yZGVyICsgcGx1cztcbiAgICAgICAgaWYgKChpICsgMSkgJSAzID09PSAxKSB7XG4gICAgICAgICAgb3JkZXIgKz0gMztcbiAgICAgICAgfSBlbHNlIGlmICgoaSArIDEpICUgMyA9PT0gMikge1xuICAgICAgICAgIG9yZGVyIC09IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoKGkgKyAxKSAlIDMgPT09IDApIHtcbiAgICAgICAgICByb3cgPSAyO1xuICAgICAgICAgIG9yZGVyID0gNDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyb3cgPT09IDIpIHtcbiAgICAgICAgc2xpZGVzQXJyW2ldLnN0eWxlLm9yZGVyID0gb3JkZXIgKyBwbHVzO1xuICAgICAgICBpZiAoKGkgKyAxKSAlIDMgPT09IDEpIHtcbiAgICAgICAgICBvcmRlciAtPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKChpICsgMSkgJSAzID09PSAyKSB7XG4gICAgICAgICAgb3JkZXIgKz0gMztcbiAgICAgICAgfSBlbHNlIGlmICgoaSArIDEpICUgMyA9PT0gMCkge1xuICAgICAgICAgIHJvdyA9IDE7XG4gICAgICAgICAgb3JkZXIgPSAwO1xuICAgICAgICAgIHBsdXMgKz0gNjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh4ID4gNDYwKSB7XG4gICAgICBzbGlkZXNBcnJbMl0uc3R5bGUub3JkZXIgPSA0O1xuICAgICAgc2xpZGVzQXJyWzNdLnN0eWxlLm9yZGVyID0gMTtcbiAgICB9XG4gIH1cbn1cblxuaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9jYXRhbG9nLmh0bWwnKSB7XG4gIHNldENhdGFsb2dTbGlkZXNPcmRlcigpO1xufVxuIiwiaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9pbmRleC5odG1sJykge1xuXG4gIHZhciBzZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPSd0ZWwnXVwiKTtcbiAgdmFyIGltID0gbmV3IElucHV0bWFzayhcIis3ICg5OTkpIDk5OS05OS05OVwiKTtcblxuICBpbS5tYXNrKHNlbGVjdG9yKTtcblxuICBuZXcgSnVzdFZhbGlkYXRlKCcuY29udGFjdHNfX2Zvcm0nLCB7XG4gICAgcnVsZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbkxlbmd0aDogMixcbiAgICAgICAgbWF4TGVuZ3RoOiAxNSxcbiAgICAgIH0sXG4gICAgICB0ZWw6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGZ1bmN0aW9uOiAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgICBjb25zdCBwaG9uZSA9IHNlbGVjdG9yLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKClcbiAgICAgICAgICByZXR1cm4gTnVtYmVyKHBob25lKSAmJiBwaG9uZS5sZW5ndGggPT09IDEwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBlbWFpbDogdHJ1ZVxuICAgICAgfSxcbiAgICB9LFxuICAgIG1lc3NhZ2VzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHJlcXVpcmVkOiAn0JfQsNC/0L7Qu9C90LjRgtC1INGN0YLQviDQv9C+0LvQtScsXG4gICAgICAgIG1pbkxlbmd0aDogJ9CS0LLQtdC00LjRgtC1INC+0YIgMiDQtNC+IDE1INGB0LjQvNCy0L7Qu9C+0LInLFxuICAgICAgICBtYXhMZW5ndGg6ICfQktCy0LXQtNC40YLQtSDQvtGCIDIg0LTQviAxNSDRgdC40LzQstC+0LvQvtCyJyxcbiAgICAgIH0sXG4gICAgICB0ZWw6IHtcbiAgICAgICAgcmVxdWlyZWQ6ICfQl9Cw0L/QvtC70L3QuNGC0LUg0Y3RgtC+INC/0L7Qu9C1JyxcbiAgICAgICAgZnVuY3Rpb246ICfQktCy0LXQtNC40YLQtSDQv9C+0LvQvdGL0Lkg0L3QvtC80LXRgCdcbiAgICAgIH0sXG4gICAgICBtYWlsOiB7XG4gICAgICAgIHJlcXVpcmVkOiAn0JfQsNC/0L7Qu9C90LjRgtC1INGN0YLQviDQv9C+0LvQtScsXG4gICAgICAgIGVtYWlsOiAn0JLQstC10LTQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdGL0LkgZS1tYWlsJ1xuICAgICAgfSxcbiAgICB9LFxuICAgIGNvbG9yV3Jvbmc6ICcjRkY2OTcyJyxcblxuICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtLCB2YWx1ZXMsIGFqYXgpIHtcbiAgICAgIGFqYXgoe1xuICAgICAgICAgIHVybDogJy9tYWlsLnBocCcsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgYWxlcnQoJ9CS0LDRiNCwINC30LDRj9Cy0LrQsCDRg9GB0L/QtdGI0L3QviDQvtGC0L/RgNCw0LLQu9C10L3QsCEnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBhbGVydCgn0J7RiNC40LHQutCwINC+0YLQv9GA0LDQstC60LghJylcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvaW5kZXguaHRtbCcpIHtcbiAgdGlwcHkoJyNteUJ1dHRvbjEnLCB7XG4gICAgY29udGVudDogXCLQoNC10L/Qu9C40YbQuNGA0L7QstCw0L3QvdGL0LUg0YEg0LfQsNGA0YPQsdC10LbQvdGL0YUg0LjRgdGC0L7Rh9C90LjQutC+0LIsINC40YHRgdC70LXQtNC+0LLQsNC90LjRjyDRhNC+0YDQvNC40YDRg9GO0YIg0LPQu9C+0LHQsNC70YzQvdGD0Y4g0YHQtdGC0YwuXCIsXG4gICAgbWF4V2lkdGg6IDE1NyxcbiAgICB0aGVtZTogJ2JsYWNrJyxcbiAgICBoaWRlT25DbGljazogZmFsc2UsXG4gICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgaW50ZXJhY3RpdmVCb3JkZXI6IDIsXG4gICAgaW50ZXJhY3RpdmVEZWJvdW5jZTogMTUwLFxuICB9KTtcbn1cbiIsImNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19zZWxlY3QnKTtcbmNvbnN0IGNob2ljZXMgPSBuZXcgQ2hvaWNlcyhlbGVtZW50LCB7XG4gIHNlYXJjaEVuYWJsZWQ6IGZhbHNlLFxuICBpdGVtU2VsZWN0VGV4dDogJycsXG4gIHNob3VsZFNvcnQ6IGZhbHNlLFxufSk7XG5sZXQgYXJpYUxhYmVsID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcbmVsZW1lbnQuY2xvc2VzdCgnLmNob2ljZXMnKS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBhcmlhTGFiZWwpO1xuIiwibGV0IGRyb3Bkb3duQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fcmVnLWJ0bicpLFxuICAgIGRyb3Bkb3duQnRuVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3JlZy1idG4tdGV4dCcpLFxuICAgIGRyb3Bkb3duRmxhZyA9IHRydWUsXG4gICAgZHJvcGRvd25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX3JlZy1kcm9wZG93bi1pdGVtLWJ0bicpLFxuICAgIGRyb3Bkb3duT3BlbiA9IGdzYXAudGltZWxpbmUoe3BhdXNlZDogdHJ1ZX0pO1xuXG5kcm9wZG93bk9wZW4uc2V0KFwiLmhlYWRlcl9fcmVnLWRyb3Bkb3duXCIsIHtkaXNwbGF5OiAnYmxvY2snfSlcbiAgICAgICAgICAgIC50byhcIi5oZWFkZXJfX3JlZy1pY29uLWFycm93XCIsIHtyb3RhdGU6IDkwLCBkdXJhdGlvbjogLjN9KVxuICAgICAgICAgICAgLmZyb21UbyhcIi5oZWFkZXJfX3JlZy1kcm9wZG93blwiLCB7eTogNTAsIG9wYWNpdHk6IDB9LCB7eTogMCwgb3BhY2l0eTogMS8qICwgekluZGV4OiA4ICovfSwgXCItPTAuNFwiKTtcblxuZHJvcGRvd25CdG4ub25jbGljayA9ICgpID0+IHtcbiAgaWYgKGRyb3Bkb3duRmxhZyA9PT0gdHJ1ZSkge1xuICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVhZGVyX19yZWctYnRuX2FjdGl2ZScpO1xuICAgIGRyb3Bkb3duT3Blbi5wbGF5KCk7XG4gICAgZHJvcGRvd25GbGFnID0gIWRyb3Bkb3duRmxhZztcbiAgfSBlbHNlIHtcbiAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlcl9fcmVnLWJ0bl9hY3RpdmUnKTtcbiAgICBkcm9wZG93bk9wZW4ucmV2ZXJzZSgpO1xuICAgIGRyb3Bkb3duRmxhZyA9ICFkcm9wZG93bkZsYWc7XG4gIH1cbn1cblxuZHJvcGRvd25JdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICBpdGVtLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgbGV0IGNsaWNrZWRJbm5lclRleHQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmlubmVyVGV4dCxcbiAgICAgICAgYWN0aXZlSW5uZXJUZXh0ID0gZHJvcGRvd25CdG5UZXh0LmlubmVyVGV4dDtcblxuICAgIGRyb3Bkb3duQnRuVGV4dC5pbm5lclRleHQgPSBjbGlja2VkSW5uZXJUZXh0O1xuICAgIGRyb3Bkb3duQnRuVGV4dC5kYXRhc2V0LnJlZ2lvbiA9IGNsaWNrZWRJbm5lclRleHQ7XG4gICAgZXZlbnQuY3VycmVudFRhcmdldC5pbm5lclRleHQgPSBhY3RpdmVJbm5lclRleHQ7XG4gICAgZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnJlZ2lvbiA9IGFjdGl2ZUlubmVyVGV4dDtcbiAgICBldmVudC5jdXJyZW50VGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGFjdGl2ZUlubmVyVGV4dCk7XG4gICAgZHJvcGRvd25CdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX19yZWctYnRuX2FjdGl2ZScpO1xuICAgIGRyb3Bkb3duT3Blbi5yZXZlcnNlKCk7XG4gICAgZHJvcGRvd25GbGFnID0gIWRyb3Bkb3duRmxhZztcbiAgfVxufSlcbiIsImNvbnN0IHNpbXBsZUJhciA9IG5ldyBTaW1wbGVCYXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fcmVnLWRyb3Bkb3duLWxpc3QnKSwge1xuICBzY3JvbGxiYXJNaW5TaXplOiAyMCxcbiAgc2Nyb2xsYmFyTWF4U2l6ZTogMjgsXG59KTtcblxuIiwiY29uc3QgaGVyb1N3aXBlciA9IG5ldyBTd2lwZXIoJy5oZXJvX19zd2lwZXInLCB7XG4gIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgbG9vcDogdHJ1ZSxcblxuICAvLyBJZiB3ZSBuZWVkIHBhZ2luYXRpb25cbiAgcGFnaW5hdGlvbjoge1xuICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICBjbGlja2FibGU6IHRydWUsXG4gIH0sXG59KTtcblxuIiwibGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhY3RzX19pbnB1dCwgLmZvcm0taW5wdXQnKSxcbiAgICBwbGFjZWhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGFjZWhvbGRlcicpO1xuXG5pbnB1dC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gIGl0ZW0ub25mb2N1cyA9ICgpID0+IHtcbiAgICBsZXQgcGF0aCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5wYXRoO1xuICAgIHBsYWNlaG9sZGVyLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgICAgbGV0IHRhcmdldCA9IGFjdGl2ZS5kYXRhc2V0LnRhcmdldCxcbiAgICAgICAgICBwbGFjZWhvbGRlcldpZHRoID0gYWN0aXZlLm9mZnNldFdpZHRoO1xuICAgICAgaWYgKHBhdGgubG9jYWxlQ29tcGFyZSh0YXJnZXQpID09PSAwKSB7XG4gICAgICAgIGFjdGl2ZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKC0ke3BsYWNlaG9sZGVyV2lkdGggKiAwLjE4fXB4LCAtMTZweCkgc2NhbGUoNjAlKWA7XG4gICAgICB9XG4gICAgfSlcbiAgfTtcbiAgaXRlbS5vbmJsdXIgPSAoKSA9PiAge1xuICAgIGxldCBjdXJUYXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICBwYXRoID0gY3VyVGFyZ2V0LmRhdGFzZXQucGF0aDtcbiAgICBwbGFjZWhvbGRlci5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICAgIGxldCB0YXJnZXQgPSBhY3RpdmUuZGF0YXNldC50YXJnZXQsXG4gICAgICBwbGFjZWhvbGRlcldpZHRoID0gYWN0aXZlLm9mZnNldFdpZHRoO1xuICAgICAgaWYgKHBhdGgubG9jYWxlQ29tcGFyZSh0YXJnZXQpID09PSAwKSB7XG4gICAgICAgIGlmIChjdXJUYXJnZXQudmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgICBhY3RpdmUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgtJHtwbGFjZWhvbGRlcldpZHRoICogMC4xOH1weCwgLTE2cHgpIHNjYWxlKDYwJSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZS5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9O1xufSlcbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvcHJvZHVjdC1jYXJkLmh0bWwnKSB7XG5cbiAgdmFyIHNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9J3RlbCddXCIpO1xuICB2YXIgaW0gPSBuZXcgSW5wdXRtYXNrKFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIpO1xuXG4gIGltLm1hc2soc2VsZWN0b3IpO1xuXG4gIG5ldyBKdXN0VmFsaWRhdGUoJy5wcm9kdWN0X19mb3JtJywge1xuICAgIHJ1bGVzOiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBtaW5MZW5ndGg6IDIsXG4gICAgICAgIG1heExlbmd0aDogMTUsXG4gICAgICB9LFxuICAgICAgdGVsOiB7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBmdW5jdGlvbjogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGhvbmUgPSBzZWxlY3Rvci5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpXG4gICAgICAgICAgcmV0dXJuIE51bWJlcihwaG9uZSkgJiYgcGhvbmUubGVuZ3RoID09PSAxMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAgbWVzc2FnZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgcmVxdWlyZWQ6ICfQl9Cw0L/QvtC70L3QuNGC0LUg0Y3RgtC+INC/0L7Qu9C1JyxcbiAgICAgICAgbWluTGVuZ3RoOiAn0JLQstC10LTQuNGC0LUg0L7RgiAyINC00L4gMTUg0YHQuNC80LLQvtC70L7QsicsXG4gICAgICAgIG1heExlbmd0aDogJ9CS0LLQtdC00LjRgtC1INC+0YIgMiDQtNC+IDE1INGB0LjQvNCy0L7Qu9C+0LInLFxuICAgICAgfSxcbiAgICAgIHRlbDoge1xuICAgICAgICByZXF1aXJlZDogJ9CX0LDQv9C+0LvQvdC40YLQtSDRjdGC0L4g0L/QvtC70LUnLFxuICAgICAgICBmdW5jdGlvbjogJ9CS0LLQtdC00LjRgtC1INC/0L7Qu9C90YvQuSDQvdC+0LzQtdGAJ1xuICAgICAgfSxcbiAgICB9LFxuICAgIGNvbG9yV3Jvbmc6ICcjRkY2OTcyJyxcblxuICAgIHN1Ym1pdEhhbmRsZXI6IGZ1bmN0aW9uIChmb3JtLCB2YWx1ZXMsIGFqYXgpIHtcbiAgICAgIGFqYXgoe1xuICAgICAgICAgIHVybDogJy9tYWlsLnBocCcsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19mb3JtJykuY2xhc3NMaXN0LnJlbW92ZSgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2Zvcm0nKS5jbGFzc0xpc3QucmVtb3ZlKCdwcm9kdWN0X19tb2RhbF92aXNpYmxlJyk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19zdWNjZXNzJykuY2xhc3NMaXN0LmFkZCgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19zdWNjZXNzJykuY2xhc3NMaXN0LmFkZCgncHJvZHVjdF9fbW9kYWxfdmlzaWJsZScpO1xuICAgICAgICAgICAgfSwgMjAwKVxuICAgICAgICAgICAgcHJvZHVjdEJ0bk9wZW4uc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImNlbnRlclwiLCBiZWhhdmlvcjogXCJzbW9vdGhcIn0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBhbGVydCgn0J7RiNC40LHQutCwINC+0YLQv9GA0LDQstC60LghJylcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn1cbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvcHJvZHVjdC1jYXJkLmh0bWwnKSB7XG4gIGxldCBwcm9kdWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19mb3JtJyksXG4gICAgICBwcm9kdWN0QnRuT3BlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19idXktYnRuX2J1eScpLFxuICAgICAgcHJvZHVjdEJ0bkNsb3NlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsX19idG4tY2xvc2UnKTtcblxuICBwcm9kdWN0QnRuT3Blbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tc2Nyb2xsJyk7XG4gICAgcHJvZHVjdEZvcm0uY2xhc3NMaXN0LmFkZCgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcHJvZHVjdEZvcm0uY2xhc3NMaXN0LmFkZCgncHJvZHVjdF9fbW9kYWxfdmlzaWJsZScpO1xuICAgIH0sIDIwMClcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9faW5wdXQnKS5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwiY2VudGVyXCIsIGJlaGF2aW9yOiBcInNtb290aFwifSk7XG4gIH1cblxuICBwcm9kdWN0QnRuQ2xvc2VBcnIuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpdGVtLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBsZXQgZGF0YUNsb3NlID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNsb3NlO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXNjcm9sbCcpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2R1Y3RfXyR7ZGF0YUNsb3NlfWApLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2R1Y3RfX21vZGFsX3Zpc2libGUnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucHJvZHVjdF9fJHtkYXRhQ2xvc2V9YCkuY2xhc3NMaXN0LnJlbW92ZSgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xuICAgICAgfSwgMjAwKVxuICAgIH1cbiAgfSlcbn1cbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvcHJvZHVjdC1jYXJkLmh0bWwnKSB7XG4gIGNvbnN0IHByb2R1Y3RTaW1wbGVCYXIgPSBuZXcgU2ltcGxlQmFyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXByZXZpZXcnKSwge1xuICAgIHNjcm9sbGJhck1pblNpemU6IDIwLFxuICAgIHNjcm9sbGJhck1heFNpemU6IDI4LFxuICB9KTtcbn1cbiIsImlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvcHJvZHVjdC1jYXJkLmh0bWwnKSB7XG4gIGxldCBwcm9kdWN0QmlnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2JpZycpLFxuICAgICAgcHJvZHVjdFNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19zbGlkZXInKSxcbiAgICAgIHByb2R1Y3RQcmV2aWV3QXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtcHJldmlld19faW1nJyksXG4gICAgICBwcm9kdWN0QmlnSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2JpZy1pbWcnKSxcbiAgICAgIHByb2R1Y3RCaWdTcmMgPSBwcm9kdWN0QmlnSW1nLmdldEF0dHJpYnV0ZSgnc3JjJyksXG4gICAgICBwcm9kdWN0U2xpZGVyUHJldmlld0FyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXNsaWRlcl9faW1nLXByZXZpZXcnKSxcbiAgICAgIHByb2R1Y3RTbGlkZXJCaWdJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1zbGlkZXJfX2JpZy1pbWcnKSxcbiAgICAgIHByb2R1Y3RTbGlkZXJCaWdTcmMgPSBwcm9kdWN0QmlnSW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cbiAgcHJvZHVjdEJpZy5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHByb2R1Y3RTbGlkZXJCaWdJbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBwcm9kdWN0U2xpZGVyQmlnU3JjKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXNjcm9sbCcpO1xuICAgIHByb2R1Y3RTbGlkZXIuY2xhc3NMaXN0LmFkZCgncHJvZHVjdF9fbW9kYWxfZGlzcGxheScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcHJvZHVjdFNsaWRlci5jbGFzc0xpc3QuYWRkKCdwcm9kdWN0X19tb2RhbF92aXNpYmxlJyk7XG4gICAgfSwgMjAwKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXNsaWRlcl9fYmlnJykuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImNlbnRlclwiLCBiZWhhdmlvcjogXCJzbW9vdGhcIn0pO1xuICB9XG5cbiAgcHJvZHVjdFByZXZpZXdBcnIuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpdGVtLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBsZXQgc3JjID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnNyYztcbiAgICAgIGlmIChwcm9kdWN0QmlnSW1nLmdldEF0dHJpYnV0ZSgnc3JjJykgPT09IHNyYykge1xuICAgICAgICBwcm9kdWN0QmlnSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgcHJvZHVjdEJpZ1NyYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9kdWN0QmlnSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcHJvZHVjdFNsaWRlclByZXZpZXdBcnIuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpdGVtLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBsZXQgc3JjID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnNyYztcbiAgICAgIGlmIChwcm9kdWN0U2xpZGVyQmlnSW1nLmdldEF0dHJpYnV0ZSgnc3JjJykgPT09IHNyYykge1xuICAgICAgICBwcm9kdWN0U2xpZGVyQmlnSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgcHJvZHVjdFNsaWRlckJpZ1NyYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9kdWN0U2xpZGVyQmlnSW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG4iLCJjb25zdCBwcm9kdWN0U3dpcGVyID0gbmV3IFN3aXBlcignLnByb2R1Y3Qtc2xpZGVyX19zd2lwZXInLCB7XG4gIHNwYWNlQmV0d2VlbjogNjMsXG4gIHNsaWRlc1Blckdyb3VwOiAxLFxuICBzbGlkZXNQZXJWaWV3OiAxLFxuICBicmVha3BvaW50czoge1xuICAgIDU4MToge1xuICAgICAgc3BhY2VCZXR3ZWVuOiA3OCxcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICB9LFxuICAgIDEwMjM6IHtcbiAgICAgIHNwYWNlQmV0d2VlbjogNzgsXG4gICAgICBzbGlkZXNQZXJHcm91cDogMyxcbiAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgfSxcbiAgICAxMjAxOiB7XG4gICAgICBzcGFjZUJldHdlZW46IDc4LFxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDQsXG4gICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgIH1cbiAgfSxcblxuICBuYXZpZ2F0aW9uOiB7XG4gICAgbmV4dEVsOiAnLnByb2R1Y3RfX3NsaWRlcl9fYnRuX25leHQnLFxuICAgIHByZXZFbDogJy5wcm9kdWN0X19zbGlkZXJfX2J0bl9wcmV2JyxcbiAgfVxufSk7XG5cblxuIiwiaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9pbmRleC5odG1sJykge1xuICBsZXQgcmF0aW5nQnRuU2hvd01vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nX19idG4tbW9yZScpLFxuICAgICAgcmF0aW5nQ2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmF0aW5nX19pdGVtJyk7XG5cbiAgcmF0aW5nQnRuU2hvd01vcmUub25jbGljayA9ICgpID0+IHtcbiAgICByYXRpbmdCdG5TaG93TW9yZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJhdGluZ0NhcmRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pXG4gIH1cbn1cbiIsImNvbnN0IHNpbWlsYXJTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc2ltaWxhcl9fc3dpcGVyJywge1xuICBzcGFjZUJldHdlZW46IDE2LFxuICBzbGlkZXNQZXJHcm91cDogMixcbiAgc2xpZGVzUGVyVmlldzogMixcbiAgYnJlYWtwb2ludHM6IHtcbiAgICA0NjE6IHtcbiAgICAgIHNwYWNlQmV0d2VlbjogMzIsXG4gICAgICBzbGlkZXNQZXJHcm91cDogMixcbiAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgfSxcbiAgICAxMDIzOiB7XG4gICAgICBzcGFjZUJldHdlZW46IDMyLFxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDMsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgIH0sXG4gICAgMTIwMDoge1xuICAgICAgc3BhY2VCZXR3ZWVuOiAzMixcbiAgICAgIHNsaWRlc1Blckdyb3VwOiA0LFxuICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICB9XG4gIH0sXG5cbiAgbmF2aWdhdGlvbjoge1xuICAgIG5leHRFbDogJy5zaW1pbGFyX19idG5fbmV4dCcsXG4gICAgcHJldkVsOiAnLnNpbWlsYXJfX2J0bl9wcmV2JyxcbiAgfVxufSk7XG4iLCJjb25zdCBzcGVjaWFsc1N3aXBlciA9IG5ldyBTd2lwZXIoJy5zcGVjaWFsX19zd2lwZXInLCB7XG4gIC8vIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgc2xpZGVzUGVyVmlldzogMSxcbiAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gIHNwYWNlQmV0d2VlbjogMzIsXG4gIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgYnJlYWtwb2ludHM6IHtcbiAgICA1ODE6IHtcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAyLFxuICAgIH0sXG4gICAgMTAyNDoge1xuICAgICAgc2xpZGVzUGVyR3JvdXA6IDMsXG4gICAgfVxuICB9LFxuXG4gIG5hdmlnYXRpb246IHtcbiAgICBuZXh0RWw6ICcuc3BlY2lhbF9fYnRuX25leHQnLFxuICAgIHByZXZFbDogJy5zcGVjaWFsX19idG5fcHJldicsXG4gIH1cbn0pO1xuIiwiY29uc3QgdXNlZnVsU3dpcGVyID0gbmV3IFN3aXBlcignLnVzZWZ1bF9fc3dpcGVyJywge1xuICAvLyBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gIHNsaWRlc1BlclZpZXc6IDEsXG4gIHNsaWRlc1Blckdyb3VwOiAxLFxuICBzcGFjZUJldHdlZW46IDMyLFxuICBicmVha3BvaW50czoge1xuICAgIDU4MToge1xuICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAyLFxuICAgIH0sXG4gICAgMTAyNDoge1xuICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAzLFxuICAgIH0sXG4gICAgMTIwMDoge1xuICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAyLFxuICAgIH0sXG4gIH0sXG5cbiAgbmF2aWdhdGlvbjoge1xuICAgIG5leHRFbDogJy51c2VmdWxfX2J0bl9uZXh0JyxcbiAgICBwcmV2RWw6ICcudXNlZnVsX19idG5fcHJldicsXG4gIH1cbn0pO1xuIl19
