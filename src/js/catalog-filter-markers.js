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
