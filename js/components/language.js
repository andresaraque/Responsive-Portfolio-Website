class AppLanguage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="lan-fixed">
        <div class="language-selector">
          <button class="lang-btn" id="lang-btn">
            <i class="uil uil-globe"></i>
            <span data-i18n="language.selector">Language</span>
          </button>
          <div class="lang-dropdown" id="lang-dropdown">
            <button class="lang-option" data-lang="en">
              <span class="flag">🇺🇸</span>
              <span data-i18n="language.english">English</span>
            </button>
            <button class="lang-option" data-lang="es">
              <span class="flag">🇪🇸</span>
              <span data-i18n="language.spanish">Español</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Event logic
    const langBtn = this.querySelector("#lang-btn");
    const langDropdown = this.querySelector("#lang-dropdown");
    const langOptions = this.querySelectorAll(".lang-option");

    if (!langBtn || !langDropdown) return;

    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove("show");
      }
    });

    langOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const selectedLang = option.getAttribute("data-lang");
        console.log('test: ', window.i18n);
        if (window.i18n) {
          window.i18n.changeLanguage(selectedLang);
          this.updateActiveLanguage(selectedLang);
          // Re-arranca el typewriter si existe en la página principal
          if (typeof window.initializeTypewriter === "function") {
            setTimeout(() => window.initializeTypewriter(), 100);
          }
        }
        langDropdown.classList.remove("show");
      });
    });

    if (window.i18n) {
      this.updateActiveLanguage(window.i18n.getCurrentLanguage());
    }
  }

  updateActiveLanguage(lang) {
    const langOptions = this.querySelectorAll(".lang-option");
    langOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-lang") === lang) {
        option.classList.add("active");
      }
    });
  }
}

customElements.define("app-language", AppLanguage);


