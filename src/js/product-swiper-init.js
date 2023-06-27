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


