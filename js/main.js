window.addEventListener('DOMContentLoaded', function () {


  // Header dropdown
  const artstyleBtn = document.querySelectorAll('.select-list__btn');
  const artstyleDropdown = document.querySelectorAll('.select-list__dropdown');

  // Show/hide dropdown on click
  artstyleBtn.forEach(function(btn) {
    btn.addEventListener('click', function(ev) {
      artstyleDropdown.forEach(function(dropdown) {
        if (ev.currentTarget.dataset.artstyle === dropdown.dataset.artstyle) {
          dropdown.classList.toggle('select-list__dropdown--is-active');
          ev.currentTarget.classList.toggle('select-list__btn--is-active');
        } else {
          dropdown.classList.remove('select-list__dropdown--is-active');
        }
      })
      // Disable showing multiple dropdowns at a time
      artstyleBtn.forEach(function(btn) {
        artstyleDropdown.forEach(function(dropdown) {
          if (btn.dataset.artstyle === dropdown.dataset.artstyle) {
            if (!dropdown.classList.contains('select-list__dropdown--is-active')) {
              btn.classList.remove('select-list__btn--is-active');
            }
          }
        })
      })
    })
  })


  // Hero swiper
  // const heroSwiper = new Swiper('#hero__swiper', {
  //   slidesPerView: 1,
  //   speed: 3000,
  //   effect: 'fade',
  //   loop: true,
  //   autoplay: {
  //     delay: 3000,
  //   },
  // });

  // Gallery swiper
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


// Catalog accordion
  $("#accordion").accordion({
    heightStyle: "content",
    collapsible: true,
  });
  // $(".ui-accordion-content").show();


  // Gallery select
  const gallerySelect = document.querySelector('#gallery__select');
  const choicesGallery = new Choices(gallerySelect, {
    searchEnabled: false,
    shouldSort: false,
    allowHTML: true,
    itemSelectText: '',
  });

  // Removing selected item from dropdown list
  document.querySelector('.choices').addEventListener('click', function() {
    document.querySelectorAll('.choices__item--choice').forEach(function(item) {
      if (item.textContent === document.querySelector('.choices__list--single').textContent) {
        item.classList.add('display-none')
      }
    })
  })


  // Catalog tabs
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


  // Events swiper
  const eventsSwiper = new Swiper('#events__swiper', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,
    navigation: {
      nextEl: ".events__swiper-button-next",
      prevEl: ".events__swiper-button-prev",
    },
  });


  // Projects swiper
  const projectsSwiper = new Swiper('#projects__swiper', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,
    navigation: {
      nextEl: ".projects__swiper-button-next",
      prevEl: ".projects__swiper-button-prev",
    },
  });


  // Yandex map
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
