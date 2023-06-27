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
