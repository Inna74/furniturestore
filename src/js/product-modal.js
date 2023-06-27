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
