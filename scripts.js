
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

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.order-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const tarifNameEl = modal.querySelector('.tarif-name');
  const descriptionTextEl = modal.querySelector('.description-text');
  const priceEl = modal.querySelector('.price');

  function openModal(tariffName, price) {
    tarifNameEl.textContent = `Тариф «${tariffName}»`;
    descriptionTextEl.textContent = `Курс Топ Мастер по наращиванию волос - тариф “${tariffName}” - на русском языке`;
    priceEl.textContent = price;
    modal.classList.add('show');
  }

  closeModalBtn.addEventListener('click', function () {
    modal.classList.remove('show');
  });

  document.querySelectorAll('.white-card .button').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const card = this.closest('.white-card');
      if (!card) return;

      const title = card.querySelector('.text-section-title').textContent.trim();
      const price = card.querySelector('.price .text-section-title.text-accent')?.textContent.trim();

      openModal(title, price);
    });
  });
});

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
  slidesPerView: 1,
  spaceBetween: 0,
  breakpoints: {
    394: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    }
  },
  loop: true,
    autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
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
    394: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    }
  },
  loop: true,
    autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  speed: 1600,
  effect: 'slide',
  resistance: true,
  resistanceRatio: 0.85,
  threshold: 10,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
});