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
