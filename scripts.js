
function initSliderPadding(sliderSelector, containerSelector) {
  const slider = document.querySelector(sliderSelector);
  const sliderContainer = document.querySelector(containerSelector);

  if (!slider || !sliderContainer) return;

  function updateSliderPadding() {
    const sliderLeftDistance = sliderContainer.getBoundingClientRect().left;
    slider.style.paddingLeft = `${sliderLeftDistance}px`;
  }

  updateSliderPadding();
  window.addEventListener('resize', updateSliderPadding);
}

initSliderPadding('#slider-course-programm', 'section.course-programm > .container');
initSliderPadding('#reviews-slider', 'section.reviews > .container');

// document.addEventListener('DOMContentLoaded', function () {
//   const modal = document.querySelector('.order-modal');
//   const closeModalBtn = document.getElementById('close-modal');
//   const tarifNameEl = modal.querySelector('.tarif-name');
//   const descriptionTextEl = modal.querySelector('.description-text');
//   const priceEl = modal.querySelector('.price');

//   function openModal(tariffName, price) {
//     tarifNameEl.textContent = `Тариф «${tariffName}»`;
//     descriptionTextEl.textContent = `Курс Топ Мастер по наращиванию волос - тариф “${tariffName}” - на русском языке`;
//     priceEl.textContent = price;
//     modal.classList.add('show');
//   }

//   closeModalBtn.addEventListener('click', function () {
//     modal.classList.remove('show');
//   });

//   document.querySelectorAll('.white-card .button').forEach(button => {
//     button.addEventListener('click', function (e) {
//       e.preventDefault();

//       const card = this.closest('.white-card');
//       if (!card) return;

//       const title = card.querySelector('.text-section-title').textContent.trim();
//       const price = card.querySelector('.price .text-section-title.text-accent')?.textContent.trim();

//       openModal(title, price);
//     });
//   });
// });

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

const swiper1 = new Swiper('.swiper.swiper-1', {
  slidesPerView: 1.2,
  spaceBetween: 50,
  breakpoints: {
    // 0: {
    //   slidesPerView: 1.2,
    // },
    460: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    }
  },
  // loop: true,
  //   autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  grabCursor: true,
  speed: 1600,
  effect: 'slide',
  resistance: true,
  resistanceRatio: 0.85,
  threshold: 10,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
});

const swiper2 = new Swiper('.swiper.swiper-2', {
  slidesPerView: 1.2,
  spaceBetween: 50,
  breakpoints: {
    // 0: {
    //   slidesPerView: 1.2,
    // },
    460: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    }
  },
  // loop: true,
  //   autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  grabCursor: true,
  speed: 1600,
  effect: 'slide',
  resistance: true,
  resistanceRatio: 0.85,
  threshold: 10,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
});

// Language switch
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

const availableLangs = [
  { code: 'en', name: 'EN', label: 'English', icons: './icons/en.svg' },
  { code: 'ru', name: 'RU', label: 'Русский', icons: './icons/ru.svg' },
];

function getLang(langCode) {
  return availableLangs.find(l => l.code === langCode);
}

function getLangFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || 'ru';
}

function updateURLLang(lang) {
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url.toString());
}

async function loadLanguage(lang) {
  try {
    const res = await fetch(`/lang/${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = getNestedValue(translations, key);
      if (text) {
        el.innerText = text;
      }
    });

    updateLangSwitcher(lang);
    updateURLLang(lang);
  } catch (e) {
    console.error(`Translation load error for ${lang}:`, e);
  }
}

function updateLangSwitcher(currentLang) {
  const switcher = document.querySelector('.lang-switcher');
  const selected = switcher.querySelector('.selected');
  const optionsList = switcher.querySelector('.lang-options');
  optionsList.innerHTML = '';

  const current = getLang(currentLang);
  const alt = availableLangs.find(l => l.code !== currentLang);

  selected.querySelector('img').src = current.icons;
  selected.querySelector('span').textContent = current.name;

  const li = document.createElement('li');
  li.setAttribute('data-lang', alt.code);
  li.innerHTML = `<img src="${alt.icons}" alt="${alt.name}" /><span>${alt.name}</span>`;
  optionsList.appendChild(li);

  li.addEventListener('click', () => {
    loadLanguage(alt.code);
    document.querySelector('.lang-switcher').classList.remove('open');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getLangFromURL();
  loadLanguage(currentLang);

  const switcher = document.querySelector('.lang-switcher');
  const selected = switcher.querySelector('.selected');

  selected.addEventListener('click', () => {
    switcher.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('open');
    }
  });
});
