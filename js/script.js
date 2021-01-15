const animItems = document.querySelectorAll("[data-anim]");

if (animItems != false) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll(params) {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = animItemHeight - window.innerHeight / animStart;
      }
      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight * (1 - 1 / animStart)
      ) {
        animItem.classList.add("_anim");
      } else if (animItem.getAttribute("data-anim") != "no-hide") {
        animItem.classList.remove("_anim");
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  animOnScroll();
}

//Адаптив блоку "Share".
const share = document.getElementsByClassName("share__container")[0];

moveShare();
window.addEventListener("resize", moveShare);

function moveShare() {
  const xx_small = 320;
  const x_small = 480;
  const small = 576;
  const small_1 = 700;
  const normal = 768;
  const large = 992;

  let winWidth = window.innerWidth;
  if (winWidth < large - 80 && winWidth >= small_1) {
    let change = large - 80 - winWidth;
    share.style.transform = "translateX(-" + change + "px)";
  } else {
    share.style.transform = "translateX(0)";
  }
}

const ratings = document.getElementsByClassName("rating");
if (ratings) {
  const maxRatingValue = 5;

  for (let i = 0; i < ratings.length; i++) {
    setRating(ratings[i]);
  }

  function setRating(el) {
    let value = el.getAttribute("data-rating");
    const elActive = el.getElementsByClassName("rating__active")[0];

    //Виводимі цифри
    const elValue = el.getElementsByClassName("rating__value")[0];

    //Оновлення виводимого значення
    function updateValue(value) {
      //Оновити зірочки
      elActive.style.width = (value / maxRatingValue) * 100 + "%";
      //Оновити виводимі цифри
      if (elValue) {
        elValue.innerHTML = value;
      }
    }

    updateValue(value);

    const stars = el.querySelectorAll('input[type="radio"]');
    for (let index = 0; index < stars.length; index++) {
      starHoverClick(stars[index], index);
    }
    //Івенти наведення/нажимання
    function starHoverClick(star, index) {
      star.onmouseover = function () {
        updateValue(index + 1);
      };
      star.onmouseleave = function () {
        updateValue(value);
      };

      star.onclick = function () {
        value = index + 1;
        updateValue(value);
        //AJAX запит робити тут
      };
    }
  }
}
