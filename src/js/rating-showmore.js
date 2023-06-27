if (window.location.pathname === '/index.html') {
  let ratingBtnShowMore = document.querySelector('.rating__btn-more'),
      ratingCards = document.querySelectorAll('.rating__item');

  ratingBtnShowMore.onclick = () => {
    ratingBtnShowMore.style.display = 'none';
    ratingCards.forEach(item => {
      item.style.display = 'block';
    })
  }
}
