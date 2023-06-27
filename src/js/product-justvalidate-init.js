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
