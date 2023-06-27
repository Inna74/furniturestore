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
