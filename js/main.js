window.addEventListener('DOMContentLoaded', function () {


  // HEADER DROPDOWN
  const artstyleBtn = document.querySelectorAll('.select-list__btn');
  const artstyleDropdown = document.querySelectorAll('.select-list__dropdown');

  // Show/hide dropdown on click
  artstyleBtn.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      artstyleDropdown.forEach(function (dropdown) {
        if (ev.currentTarget.dataset.artstyle === dropdown.dataset.artstyle) {
          dropdown.classList.toggle('select-list__dropdown--is-active');
          ev.currentTarget.classList.toggle('select-list__btn--is-active');
        } else {
          dropdown.classList.remove('select-list__dropdown--is-active');
        }
      })
      // Disable showing multiple dropdowns at a time
      artstyleBtn.forEach(function (btn) {
        artstyleDropdown.forEach(function (dropdown) {
          if (btn.dataset.artstyle === dropdown.dataset.artstyle) {
            if (!dropdown.classList.contains('select-list__dropdown--is-active')) {
              btn.classList.remove('select-list__btn--is-active');
            }
          }
        })
      })
    })
  })

  // SCROLLBAR
  document.querySelectorAll('.dropdown__list-wrapper').forEach(function (dropdown) {
    new SimpleBar(dropdown, {
      autoHide: false,
      scrollbarMaxSize: 28,
    })
  })



  // HERO SWIPER
  // const heroSwiper = new Swiper('#hero__swiper', {
  //   slidesPerView: 1,
  //   speed: 3000,
  //   effect: 'fade',
  //   loop: true,
  //   autoplay: {
  //     delay: 3000,
  //   },
  // });


  // GALLERY CHECKBOXES
  // Enable checked state for checkbox by Enter
  let checkboxes = document.querySelectorAll('.gallery__checkbox-label');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        e.currentTarget.childNodes[1].toggleAttribute('checked');
      }
    })
  })

  // GALLERY SELECT
  const gallerySelect = document.querySelector('#gallery__select');
  const choicesGallery = new Choices(gallerySelect, {
    searchEnabled: false,
    shouldSort: false,
    allowHTML: true,
    itemSelectText: '',
  });

  // Removing selected item from dropdown list
  // In case of mouse interaction:
  document.querySelector('.choices').addEventListener('mouseenter', function () {
    document.querySelectorAll('.choices__item--choice').forEach(function (item) {
      if (item.textContent === document.querySelector('.choices__list--single').textContent) {
        item.remove();
      }
    })
  })

  // In case of keyboard interaction:
  document.querySelector('.choices').addEventListener('keydown', function () {
    document.querySelectorAll('.choices__item--choice').forEach(function (item) {
      if (item.textContent === document.querySelector('.choices__list--single').textContent) {
        item.remove();
      }
    })
  })


  // GALLERY SWIPER
  const gallerySwiper = new Swiper('#gallery__swiper', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".gallery__swiper-button-next",
      prevEl: ".gallery__swiper-button-prev",
    },
  });


  // CATALOG ACCORDION
  $("#accordion").accordion({
    heightStyle: "content",
    collapsible: true,
  });
  // Open all accordion panels
  // $(".ui-accordion-content").show();


  // CATALOG TABS
  let mastersBtns = document.querySelectorAll('.masters__btn');
  let mastersCards = document.querySelectorAll('.masters-card');

  for (let i = 0; i < mastersBtns.length; ++i) {
    mastersBtns[i].setAttribute('data-path', `${i}`);
  }

  for (let i = 0; i < mastersCards.length; ++i) {
    mastersCards[i].setAttribute('data-target', `${i}`);
  }

  mastersBtns.forEach(function (mastersBtn) {
    mastersBtn.addEventListener('click', function (e) {
      const path = e.currentTarget.dataset.path;
      mastersBtns.forEach(function (mastersBtn) {
        mastersBtn.classList.remove('masters__btn--active');
      });
      e.currentTarget.classList.add('masters__btn--active');
      mastersCards.forEach(function (card) {
        card.classList.remove('masters-card--active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('masters-card--active');
    });
  });


  // EVENTS SWIPER
  const eventsSwiper = new Swiper('#events__swiper', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,
    navigation: {
      nextEl: ".events__swiper-button-next",
      prevEl: ".events__swiper-button-prev",
    },
  });


  // PROJECTS TOOLTIPS

  tippy('#projects__tooltip--1', {
    content: 'Пример современных тенденций - современная методология разработки',
    trigger: 'click',
    maxWidth: 265,
  });

  tippy('#projects__tooltip--2', {
    content: 'В стремлении повысить качество',
    trigger: 'click',
    maxWidth: 265,
  });

  tippy('#projects__tooltip--3', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    trigger: 'click',
    maxWidth: 265,
  });


  // PROJECTS SWIPER
  const projectsSwiper = new Swiper('#projects__swiper', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,
    navigation: {
      nextEl: ".projects__swiper-button-next",
      prevEl: ".projects__swiper-button-prev",
    },
  });


  // FOOTER

  // Removing color backgroung from focus state when input field is not empty
  document.querySelectorAll('.form__input').forEach(function (input) {
    input.addEventListener('input', function () {
      input.classList.remove('not-empty');
      if (input.value) {
        input.classList.add('not-empty')
      }
    })
  })

  // PHONE NUMBER MASK
  var tel = document.querySelector(".form__input--tel");
  var im = new Inputmask("+7(999) 999-99-99");
  im.mask(tel);

  // FORM VALIDATION
  window.onload = function () {

    var form = document.getElementById("contacts__form");
    var pristine = new Pristine(form);

    pristine.addValidator(tel, function (value, el) {
      const phone = tel.inputmask.unmaskedvalue();
      if (Number(phone) && (phone.length === 10)) {
        return true;
      }
      return false;
    }, "Недопустимый формат", 2, false);

    form.addEventListener('submit', function (e) {
      if (!pristine.validate()) {
        e.preventDefault();
      }
    });
  };


  // YANDEX MAP
  // ymaps.ready(init);
  // function init() {
  //   var myMap = new ymaps.Map("contacts__map", {
  //     center: [55.758468, 37.601088],
  //     zoom: 14
  //   });

  //   var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
  //     iconLayout: 'default#image',
  //     iconImageHref: 'img/placemark.svg',
  //     iconImageSize: [20, 20],
  //   });

  //   myMap.geoObjects.add(myPlacemark);
  // }















})
