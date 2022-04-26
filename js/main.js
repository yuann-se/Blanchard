window.addEventListener('DOMContentLoaded', function () {

  // -----HEADER-----

  // SEARCH (FOR TABLET AND SMALLER)
  // Open search
  document.querySelector('#search-btn').addEventListener('click', function () {
    document.querySelector('.header-top__search-wrapper').classList.add('is-shown');
    document.querySelector('.search__input-wrapper').classList.add('is-shown')
  })
  // Close search
  document.querySelector('#close-search-btn').addEventListener('click', function () {
    document.querySelector('.header-top__search-wrapper').classList.remove('is-shown');
    document.querySelector('.search__input-wrapper').classList.remove('is-shown')
  })

  //BURGER MENU
  document.querySelector('#burger-btn').addEventListener('click', function () {
    document.querySelector('#burger-btn').classList.toggle('is-transformed');
    document.querySelector('.header-top__wrapper').classList.toggle('is-shown');
    document.querySelector('html').classList.toggle('no-scroll');
  })
  // Burger-btn dissapears when navigation is scrolled
  document.querySelector('.header-top__wrapper').addEventListener('scroll', function () {
    document.querySelector('#burger-btn').classList.remove('is-hidden')
    if (document.querySelector('.header-top__wrapper').scrollTop > 0) {
      document.querySelector('#burger-btn').classList.add('is-hidden')
    }
  })
  // When navigation link is clicked:
  document.querySelectorAll('.header-nav__link').forEach(function (navLink) {
    navLink.addEventListener('click', function () {
      document.querySelector('.header-top__wrapper').scrollTop = 0;
      document.querySelector('.header-top__wrapper').classList.remove('is-shown');
      document.querySelector('html').classList.remove('no-scroll');
      document.querySelector('#burger-btn').classList.remove('is-hidden');
      document.querySelector('#burger-btn').classList.remove('is-transformed');
    })
  })

  // DROPDOWNS
  const artstyleBtn = document.querySelectorAll('.select-list__btn');
  const artstyleDropdown = document.querySelectorAll('.select-list__dropdown');

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

  // -----HERO-----

  // SWIPER
  const heroSwiper = new Swiper('#hero__swiper', {
    slidesPerView: 1,
    speed: 3000,
    effect: 'fade',
    loop: true,
    autoplay: {
      delay: 3000,
    },
  });


  // -----GALLERY-----

  // CHECKBOXES
  // Enable checked state by Enter
  let checkboxes = document.querySelectorAll('.gallery__checkbox-label');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        e.currentTarget.childNodes[1].toggleAttribute('checked');
      }
    })
  })

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', function (e) {
      e.preventDefault();
      e.currentTarget.childNodes[1].toggleAttribute('checked');
    })
  })

  // SELECT
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


  // SWIPER
  const gallerySwiper = new Swiper('#gallery__swiper', {
    pagination: {
      el: ".gallery__swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".gallery__swiper-button-next",
      prevEl: ".gallery__swiper-button-prev",
    },
    a11y: {
      prevSlideMessage: 'Предыдущая страница',
      nextSlideMessage: 'Следующая страница'
    },
    breakpoints: {
      451: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 15,
      },

      701: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 35,
      },
      1301: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      }
    }
  });


  // MODALS

  let gallerySlides = document.querySelectorAll('.gallery__swiper-slide');
  let modalWindows = document.querySelectorAll('.gallery__modal');

  for (let i = 0; i < gallerySlides.length; ++i) {
    gallerySlides[i].setAttribute('data-slide', `${i}`);
  }

  for (let i = 0; i < modalWindows.length; ++i) {
    modalWindows[i].setAttribute('data-modal', `${i}`);
  }

  gallerySlides.forEach(function (slide) {
    slide.addEventListener('click', function (e) {
      document.querySelector('html').classList.add('no-scroll');
      const slideNumber = e.currentTarget.dataset.slide;
      modalWindows.forEach(function (modal) {
        modal.classList.remove('gallery__modal--is-active');
      });
      document.querySelector(`[data-modal="${slideNumber}"]`).classList.add('gallery__modal--is-active');
    });
  });

  document.querySelectorAll('.modal__close-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelector('html').classList.remove('no-scroll');
      modalWindows.forEach(function (modal) {
        modal.classList.remove('gallery__modal--is-active');
      });
    })
  });


  // -----CATALOG-----

  // ACCORDION
  $("#accordion").accordion({
    heightStyle: "content",
    collapsible: true,
  });
  // Open all accordion panels
  // $(".ui-accordion-content").show();


  // TABS
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
      if (screen.width <= 1000) {
        document.querySelector('.catalog__tabs-wrapper').scrollIntoView();
      }
    });
  });


  // -----EVENTS-----

  // SWIPER
  const eventsSwiper = new Swiper('#events__swiper', {
    pagination: {
      el: '.events__swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: ".events__swiper-button-next",
      prevEl: ".events__swiper-button-prev",
    },
    a11y: {
      prevSlideMessage: 'Предыдущая страница',
      nextSlideMessage: 'Следующая страница',
      paginationBulletMessage: 'Перейти на слайд {{index}}',
      slideLabelMessage: '',
    },
    breakpoints: {
      451: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 15,
      },
      700: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 35,
      },
      1000: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 27,
      },
      1300: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      }
    }
  });


  // -----PROJECTS-----

  // TOOLTIPS
  tippy('#projects__tooltip--1', {
    content: 'Пример современных тенденций - современная методология разработки',
    trigger: 'click',
    maxWidth: 265,
  });

  tippy('#projects__tooltip--2', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    trigger: 'click',
    maxWidth: 265,
  });

  tippy('#projects__tooltip--3', {
    content: 'В стремлении повысить качество',
    trigger: 'click',
    maxWidth: 265,
  });


  // SWIPER
  const projectsSwiper = new Swiper('#projects__swiper', {
    navigation: {
      nextEl: ".projects__swiper-button-next",
      prevEl: ".projects__swiper-button-prev",
    },
    a11y: {
      prevSlideMessage: 'Предыдущая страница',
      nextSlideMessage: 'Следующая страница'
    },
    breakpoints: {
      451: {
        slidesPerView: 2,
        spaceBetween: 15,
        slidesPerGroup: 2,
      },
      701: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },
      1000: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },
      1300: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      }
    }
  });


  // -----CONTACTS-----

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
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("contacts__map", {
      center: [55.758468, 37.601088],
      zoom: 14
    });

    var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/placemark.svg',
      iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);
  }




})
