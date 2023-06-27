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
