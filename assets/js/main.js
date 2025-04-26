document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".custom-slider");
  if (slider) {
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".custom-slider-nav .get-prev");
    const nextBtn = document.querySelector(".custom-slider-nav .get-next");

    let currentIndex = 0;

    // Находим максимальную высоту слайдов
    let maxHeight = 0;
    let hasImageSlide = false;

    slides.forEach((slide) => {
      const height = slide.getBoundingClientRect().height;
      if (height > maxHeight) {
        maxHeight = height;
      }
      if (slide.classList.contains("image-slide")) {
        hasImageSlide = true;
      }
    });

    // Устанавливаем минимальную высоту для слайдера
    slider.style.minHeight = maxHeight + (hasImageSlide ? 60 : 0) + "px";

    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.remove("active-slide", "prev-slide", "next-slide");

        if (index === currentIndex) {
          slide.classList.add("active-slide");
        } else if (
          index ===
          (currentIndex - 1 + slides.length) % slides.length
        ) {
          slide.classList.add("prev-slide");
        } else if (index === (currentIndex + 1) % slides.length) {
          slide.classList.add("next-slide");
        }
      });
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlides();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlides();
    });

    // Инициализация начального состояния
    updateSlides();
  }

  new Swiper(".vendors-slider", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 70,
    loop: true,
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".get-next[vendors-slider]",
      prevEl: ".get-prev[vendors-slider]",
    },
  });

  new Swiper(".core-values-slider", {
    slidesPerView: 4,
    spaceBetween: 21,
    loop: true,
    centeredSlides: true,
    speed: 500,
    autoplay: false,
    navigation: {
      nextEl: ".get-next[core-values-slider]",
      prevEl: ".get-prev[core-values-slider]",
    },
  });

  new Swiper('.vendor-gallery-swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 0,
    navigation: {
      nextEl: ".get-next[vendor-gallery-swiper]",
      prevEl: ".get-prev[vendor-gallery-swiper]",
    },
  });

  const buttons = document.querySelectorAll("[year-button]");
  if (buttons) {
    const contents = document.querySelectorAll(".year-content");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedYear = button.textContent.trim();

        // Обновляем классы у кнопок
        buttons.forEach((btn) => {
          btn.classList.remove("h-2");
          btn.classList.add("h-3");
        });
        button.classList.remove("h-3");
        button.classList.add("h-2");

        // Обновляем классы у year-content
        contents.forEach((content) => {
          const yearText = content.querySelector(".max").textContent.trim();
          if (yearText === selectedYear) {
            content.classList.add("selected-year");
          } else {
            content.classList.remove("selected-year");
          }
        });
      });
    });
  }

  const callFormButton = document.querySelector("button[call-form-button]");
  if (callFormButton) {
    const modalForm = document.querySelector(".modal-form");

    callFormButton.addEventListener("click", () => {
      modalForm.classList.toggle("show-form");
    });

    const closeFormButton = document.querySelector("button[close-form]");

    closeFormButton.addEventListener("click", () => {
      closeFormButton.closest(".modal-form").classList.remove("show-form");
    });
  }

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const countrySelect = document.querySelector('select[name="country"]');
  const searchInput = document.querySelector(
    'input[type="text"][placeholder="Search by name"]'
  );
  const categoryRadios = document.querySelectorAll('input[name="cat"]');
  const gridElements = document.querySelectorAll(".filter-item");

  if (countrySelect || searchInput || categoryRadios.length) {
    function filterGridElements() {
      const selectedCountry = countrySelect ? countrySelect.value : null;
      const searchQuery = searchInput ? searchInput.value.toLowerCase() : "";
      const selectedCategory = document.querySelector(
        'input[name="cat"]:checked'
      )?.value || "all";

      gridElements.forEach((element) => {
        const elementCountries = element
          .getAttribute("country")
          ?.split(",")
          .map((c) => c.trim());
        const elementTitle = element.getAttribute("title").toLowerCase();
        const elementCategories = element
          .getAttribute("cat")
          ?.split(",")
          .map((c) => c.trim());

        const matchesCountry =
          !selectedCountry ||
          (elementCountries && elementCountries.includes(selectedCountry));
        const matchesSearch =
          !searchQuery || elementTitle.includes(searchQuery);
        const matchesCategory =
          selectedCategory === "all" ||
          (elementCategories && elementCategories.includes(selectedCategory));

        if (matchesCountry && matchesSearch && matchesCategory) {
          element.style.transition = "opacity 0.3s ease";
          element.style.opacity = "1";
          setTimeout(() => {
            element.style.display = "block";
          }, 300);
        } else {
          element.style.transition = "opacity 0.3s ease";
          element.style.opacity = "0";
          setTimeout(() => {
            element.style.display = "none";
          }, 300);
        }
      });
    }

    if (countrySelect) {
      countrySelect.addEventListener("change", filterGridElements);
    }
    if (searchInput) {
      searchInput.addEventListener("input", filterGridElements);
    }
    if (categoryRadios.length) {
      categoryRadios.forEach((radio) =>
        radio.addEventListener("change", filterGridElements)
      );
    }
  }

  document.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('.vendor-modal').classList.add('show-vendor-modal');
      if(!document.querySelector('.vendor-short-details')) {
        document.querySelector('.vendor-full-details').classList.add('show-vendor-full-details');
      }
    });
  });

  document.querySelectorAll('.close-vendor').forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.vendor-modal').classList.remove('show-vendor-modal');
      button.closest('.vendor-full-details').classList.remove('show-vendor-full-details');
    });
  });

  document.querySelectorAll('[show-vendor-full]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.vendor-full-details').classList.add('show-vendor-full-details');
    });
  });

  new Swiper('.vendor-gallery-swiper', {
                      slidesPerView: 1,
                      loop: true,
                    });
});
