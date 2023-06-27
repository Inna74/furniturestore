let burger = document.querySelector('.burger'),
    navMain = document.querySelector('.header__bottom-nav-main'),
    navMainItems = document.querySelectorAll('.nav__main-item'),
    navExtra = document.querySelector('.header__top-nav'),
    navExtraItems = document.querySelectorAll('.nav__ext-item'),
    burgerLine1 = document.querySelector('.burger__line1'),
    burgerLine2 = document.querySelector('.burger__line2'),
    burgerLine3 = document.querySelector('.burger__line3'),
    tLineMain = gsap.timeline({paused: true}),
    tLineExtra = gsap.timeline({paused: true}),
    burgerFlag = true,
    mediaWidth = 1023;

tLineMain.set(burger, {zIndex: 12})
          .set(navMain, {display: 'block'})
          .to(navMain, {opacity: 1, y: 0, duration: .3})
          .to(burgerLine2, {opacity: 0, x: -20, duration: .2}, "-=.2")
          .set(burgerLine2, {display: 'none'})
          .to(burgerLine1, {top: '50%', rotate: 45, duration: .2}, "-=.2")
          .to(burgerLine3, {top: '50%', rotate: -45, duration: .2}, "-=.2")
          .to(navMain, {backgroundPosition: 'right 72px bottom 60px', duration: .4}, "-=.2")
          .to(navMainItems[0], {opacity: 1, y: 0, duration: .2}, "-=.1")
          .to(navMainItems[1], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[2], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[3], {opacity: 1, y: 0, duration: .2})
          .to(navMainItems[4], {opacity: 1, y: 0, duration: .2}, "-=.15")
          .to(navMainItems[5], {opacity: 1, y: 0, duration: .2}, "-=.15")

tLineExtra.set(navExtra, {display: 'block'}, "-=0.4")
            .to(navExtra, {opacity: 1, y: 0, duration: .3}, "-=.3")
            .to(navExtraItems[0], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[1], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[2], {opacity: 1, y: 0, duration: .2}, "-=.1")
            .to(navExtraItems[3], {opacity: 1, y: 0, duration: .2})


const btnReset = () => {
  burgerLine1.removeAttribute('style');
  burgerLine2.removeAttribute('style');
  burgerLine3.removeAttribute('style');
}

const btnActive = () => {
  burgerLine1.style.transform = 'rotate(45deg)';
  burgerLine1.style.top = '50%';
  burgerLine2.style.opacity = 0;
  burgerLine2.style.transform  = 'translateY(-50%) translateX(-20px)';
  burgerLine2.style.display = 'none';
  burgerLine3.style.transform  = 'rotate(-45deg)';
  burgerLine3.style.top = '50%';
}

const navMainReset = () => {
  navMainItems.forEach((item) => {
    item.style.opacity = 1;
    item.style.transform = 'none';
  })
  navMain.style.transform = 'none';
  navMain.style.display = 'block';
  navMain.style.opacity = 1;
  navMain.style.backgroundPosition = 'right 72px bottom 60px';
}

const navMainHidden = () => {
  navMainItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
  })
  navMain.style.transform = 'translateY(50px)';
  navMain.style.display = 'none';
  navMain.style.opacity = 0;
  navMain.style.backgroundPosition = 'right 72px bottom -150px';
}

const navExtraReset = () => {
  navExtraItems.forEach((item) => {
    item.style.opacity = 1;
    item.style.transform = 'none';
  })
  navExtra.style.transform = 'none';
  navExtra.style.display = 'block';
  navExtra.style.opacity = 1;
}

const navExtraHidden = () => {
  navExtraItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
  })
  navExtra.style.transform = 'translateY(50px)';
  navExtra.style.display = 'none';
  navExtra.style.opacity = 0;
}

burger.onclick = () => {
  let x = document.documentElement.clientWidth;

  if (x > 580) {
    if (burgerFlag === true) {
      tLineMain.play();
      navMain.classList.add('nav__active');
      navExtra.classList.add('nav__active');
      burgerFlag = !burgerFlag;
    } else {
      tLineMain.reverse();
      navMain.classList.remove('nav__active');
      navExtra.classList.remove('nav__active');
      burgerFlag = !burgerFlag;
    }
  } else {
    if (burgerFlag === true) {
      tLineMain.play();
      tLineExtra.play();
      navMain.classList.add('nav__active');
      navExtra.classList.add('nav__active');
      burgerFlag = !burgerFlag;
    } else {
      tLineExtra.reverse();
      tLineMain.reverse();
      navMain.classList.remove('nav__active');
      navExtra.classList.remove('nav__active');
      burgerFlag = !burgerFlag;
    }
  }
}

const propertiesController = () => {
  navMain.style.display = 'block';
  navExtra.style.display = 'block';

  let x = document.documentElement.clientWidth,
      headerH = document.querySelector('.header').offsetHeight,
      navMainHeight = navMain.offsetHeight;

  if (x > mediaWidth) {
    navMainReset();
    btnReset();
    navExtraReset();
  } else if (x <= 580) {
    navExtra.style.top = (headerH - 201 + navMainHeight) + 'px';
    navMain.style.top = (headerH - 201) + 'px';
    if (navMain.classList.contains('nav__active') === false) {
      navMainHidden();
      btnReset();
      navExtraHidden();
    } else {
      navMainReset();
      btnActive();
      navExtraReset();
    }
  } else {
    navMain.style.top = '108px';
    if (navMain.classList.contains('nav__active') === false) {
      navMainHidden();
      btnReset();
      navExtraReset();
    } else {
      navMainReset();
      btnActive();
      navExtraReset();
    }
  }
}

propertiesController();

window.onresize = () => {

  propertiesController();

  if (window.location.pathname === '/catalog.html') {
    let x = document.documentElement.clientWidth;

    if (x > 1200) {
      document.querySelectorAll('.catalog__left__dropdown').forEach(item => {
        item.classList.remove('catalog__left__dropdown__active');
        item.removeAttribute('style');
      })
      document.querySelectorAll('.catalog__left__btn').forEach(item => {
        item.classList.remove('catalog__left__btn__active');
        item.removeAttribute('style');
      })
    } else {
      document.querySelectorAll('.catalog__left__dropdown').forEach(dropdown => {
        dropdown.classList.remove('catalog__left__dropdown__active');
        gsap.to(dropdown, {height: 0, duration: .1})
        gsap.to(dropdown, {opacity: 0, duration: .1})
        gsap.to(dropdown, {display: 'none', duration: .1})
      })
    }

    document.querySelector('.catalog__left').style.top = (document.querySelector('.catalog__top').offsetHeight + 17) + 'px';

    setCatalogSlidesOrder();
  }
}
