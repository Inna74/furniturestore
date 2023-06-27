let dropdownBtn = document.querySelector('.header__reg-btn'),
    dropdownBtnText = document.querySelector('.header__reg-btn-text'),
    dropdownFlag = true,
    dropdownItems = document.querySelectorAll('.header__reg-dropdown-item-btn'),
    dropdownOpen = gsap.timeline({paused: true});

dropdownOpen.set(".header__reg-dropdown", {display: 'block'})
            .to(".header__reg-icon-arrow", {rotate: 90, duration: .3})
            .fromTo(".header__reg-dropdown", {y: 50, opacity: 0}, {y: 0, opacity: 1/* , zIndex: 8 */}, "-=0.4");

dropdownBtn.onclick = () => {
  if (dropdownFlag === true) {
    event.currentTarget.classList.add('header__reg-btn_active');
    dropdownOpen.play();
    dropdownFlag = !dropdownFlag;
  } else {
    event.currentTarget.classList.remove('header__reg-btn_active');
    dropdownOpen.reverse();
    dropdownFlag = !dropdownFlag;
  }
}

dropdownItems.forEach(item => {
  item.onclick = () => {
    let clickedInnerText = event.currentTarget.innerText,
        activeInnerText = dropdownBtnText.innerText;

    dropdownBtnText.innerText = clickedInnerText;
    dropdownBtnText.dataset.region = clickedInnerText;
    event.currentTarget.innerText = activeInnerText;
    event.currentTarget.dataset.region = activeInnerText;
    event.currentTarget.setAttribute('aria-label', activeInnerText);
    dropdownBtn.classList.remove('header__reg-btn_active');
    dropdownOpen.reverse();
    dropdownFlag = !dropdownFlag;
  }
})
