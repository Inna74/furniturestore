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
