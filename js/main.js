window.addEventListener('DOMContentLoaded', () => {

  // -----HEADER-----

  // Changing bottom border color when input field is not empty
  document.querySelectorAll('.search__input').forEach(input =>
    input.addEventListener('input', () => {
      input.classList.remove('search__input--is-active');
      if (input.value) {
        input.classList.add('search__input--is-active');
      }
    }));

  // SEARCH (FOR TABLET AND SMALLER)
  // Open search
  document.querySelector('#search-btn').addEventListener('click', () => {
    document.querySelector('.header-top__search-wrapper').classList.add('is-shown');
    document.querySelector('.search__input-wrapper').classList.add('is-shown');
  });
  // Close search
  document.querySelector('#close-search-btn').addEventListener('click', () => {
    document.querySelector('.header-top__search-wrapper').classList.remove('is-shown');
    document.querySelector('.search__input-wrapper').classList.remove('is-shown');
  });

  //BURGER MENU
  const burgerBtn = document.querySelector('#burger-btn');
  const headerTopWrapper = document.querySelector('.header-top__wrapper');
  const html = document.querySelector('html');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('is-transformed');
    headerTopWrapper.classList.toggle('is-shown');
    html.classList.toggle('no-scroll');
  });
  // Burger-btn dissapears when navigation is scrolled
  headerTopWrapper.addEventListener('scroll', () => {
    burgerBtn.classList.remove('is-hidden');
    if (headerTopWrapper.scrollTop > 0) {
      burgerBtn.classList.add('is-hidden');
    };
  });
  // When navigation link is clicked:
  document.querySelectorAll('.header-nav__link').forEach(navLink =>
    navLink.addEventListener('click', () => {
      headerTopWrapper.scrollTop = 0;
      headerTopWrapper.classList.remove('is-shown');
      html.classList.remove('no-scroll');
      burgerBtn.classList.remove('is-hidden');
      burgerBtn.classList.remove('is-transformed');
    }));

  // DROPDOWNS
  const artstyleBtn = document.querySelectorAll('.select-list__btn');
  const artstyleDropdown = document.querySelectorAll('.select-list__dropdown');

  artstyleBtn.forEach(btn =>
    btn.addEventListener('click', ev => {
      artstyleDropdown.forEach(dropdown => {
        if (ev.currentTarget.dataset.artstyle === dropdown.dataset.artstyle) {
          dropdown.classList.toggle('select-list__dropdown--is-active');
          ev.currentTarget.classList.toggle('select-list__btn--is-active');
        } else {
          dropdown.classList.remove('select-list__dropdown--is-active');
        }
      });
      // Disable showing multiple dropdowns at a time
      artstyleBtn.forEach(btn =>
        artstyleDropdown.forEach(dropdown => {
          if (btn.dataset.artstyle === dropdown.dataset.artstyle) {
            if (!dropdown.classList.contains('select-list__dropdown--is-active')) {
              btn.classList.remove('select-list__btn--is-active');
            }
          }
        }))
    }));

  // SCROLLBAR
  document.querySelectorAll('.dropdown__list-wrapper').forEach(dropdown =>
    new SimpleBar(dropdown, {
      autoHide: false,
    }));


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

  // SELECT
  const gallerySelect = document.querySelector('#gallery__select');

  const choicesGallery = new Choices(gallerySelect, {
    searchEnabled: false,
    shouldSort: false,
    allowHTML: true,
    itemSelectText: '',
  });

  // CHECKBOXES
  const checkboxes = document.querySelectorAll('.gallery__checkbox-label');
  // Enable checked state by Enter
  checkboxes.forEach(checkbox =>
    checkbox.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        e.currentTarget.childNodes[1].toggleAttribute('checked');
      }
    }));

  // This block is reqired to prevent errors
  checkboxes.forEach(checkbox =>
    checkbox.addEventListener('click', e => {
      e.preventDefault();
      e.currentTarget.childNodes[1].toggleAttribute('checked');
    }));


  // SWIPER
  const gallerySwiper = new Swiper('#gallery__swiper', {
    spaceBetween: 50,
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
      nextSlideMessage: 'Следующая страница',
      slideLabelMessage: 'Слайд номер {{index}} из {{slidesLength}}',
      slideRole: null,
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

  const gallerySlides = document.querySelectorAll('.gallery__swiper-slide');
  const modalWindows = document.querySelectorAll('.gallery__modal');

  for (let i = 0; i < gallerySlides.length; ++i) {
    gallerySlides[i].setAttribute('data-slide', `${i}`);
  };

  for (let i = 0; i < modalWindows.length; ++i) {
    modalWindows[i].setAttribute('data-modal', `${i}`);
  };

  gallerySlides.forEach(slide =>
    slide.addEventListener('click', e => {
      html.classList.add('no-scroll');
      const slideNumber = e.currentTarget.dataset.slide;
      modalWindows.forEach(modal => modal.classList.remove('gallery__modal--is-active'));
      document.querySelector(`[data-modal="${slideNumber}"]`).classList.add('gallery__modal--is-active');
    }));

  document.querySelectorAll('.modal__close-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      html.classList.remove('no-scroll');
      modalWindows.forEach(modal => modal.classList.remove('gallery__modal--is-active'));
    }));


  // Close modal by click on overlay
  modalWindows.forEach(modal =>
    modal.addEventListener('click', (ev) => {
      if (!ev.target.closest('.modal__container')) {
        modalWindows.forEach(modal => modal.classList.remove('gallery__modal--is-active'));
      }
    })
  )



  // -----CATALOG-----

  // ACCORDION
  $("#accordion").accordion({
    heightStyle: "content",
    collapsible: true,
  });
  // Open all accordion panels
  // $(".ui-accordion-content").show();


  // TABS
  const mastersBtns = document.querySelectorAll('.masters__btn');
  const mastersCards = document.querySelectorAll('.masters-card');

  for (let i = 0; i < mastersBtns.length; ++i) {
    mastersBtns[i].setAttribute('data-path', `${i}`);
  };

  for (let i = 0; i < mastersCards.length; ++i) {
    mastersCards[i].setAttribute('data-target', `${i}`);
  };

  mastersBtns.forEach(mastersBtn =>
    mastersBtn.addEventListener('click', e => {
      const path = e.currentTarget.dataset.path;
      mastersBtns.forEach(mastersBtn => mastersBtn.classList.remove('masters__btn--active'));
      e.currentTarget.classList.add('masters__btn--active');
      mastersCards.forEach(card => card.classList.remove('masters-card--active'));
      document.querySelector(`[data-target="${path}"]`).classList.add('masters-card--active');
      if (screen.width <= 1000) {
        document.querySelector('.catalog__tabs-wrapper').scrollIntoView();
      }
    })
  );


  // -----EVENTS-----

  // SWIPER
  const eventsSwiper = new Swiper('#events__swiper', {
    simulateTouch: false,
    spaceBetween: 50,
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
    spaceBetween: 50,
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
  document.querySelectorAll('.form__input').forEach(input =>
    input.addEventListener('input', () => {
      input.classList.remove('not-empty');
      if (input.value) {
        input.classList.add('not-empty');
      }
    }));

  // PHONE NUMBER MASK
  const tel = document.querySelector(".form__input--tel");
  const im = new Inputmask("+7(999) 999-99-99");
  im.mask(tel);

  // FORM VALIDATION
  window.onload = function () {

    const form = document.getElementById("contacts__form");
    const pristine = new Pristine(form);

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
    const myMap = new ymaps.Map("contacts__map", {
      center: [55.758468, 37.601088],
      zoom: 14
    });

    const myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/placemark.svg',
      iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);
  };

  document.getElementById('map-block').addEventListener('click', function () {
    this.style.zIndex = '-1';
  })




});
