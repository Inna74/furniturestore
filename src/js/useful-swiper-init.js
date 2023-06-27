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
