class AppHeader extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("data-base") || "./";
    const startScrolled = this.getAttribute("data-scrolled") === "true";

    const homeHref = `${base}index.html`;
    const aboutHref = `${base}index.html#about-nav`;
    const skillsHref = `${base}index.html#skills-nav`;
    const educationHref = `${base}index.html#education-nav`;
    const portfolioHref = `${base}index.html#portfolio-nav`;

    const changeIconClass = startScrolled ? " change-color-icon" : "";
    const headerScrolledClass = startScrolled ? " class=\"scrolled\"" : "";

    this.innerHTML = `
    <header${headerScrolledClass}>
      <!-- --------- Navbar --------- -->
      <nav class="container">
        <div class="nav-data">
          <a href="${homeHref}" class="logo" id="principal-logo">A_A</a>

          <div class="nav-toggle" id="nav-toggle">
            <i class="uil uil-list-ul nav-burger common-icon${changeIconClass}"></i>
            <i class="uil uil-multiply nav-close common-icon${changeIconClass}"></i>
          </div>
        </div>

        <div class="nav-menu" id="nav-menu">
          <ul class="nav-list">
            <li>
              <a href="${homeHref}" class="nav-link" data-i18n="nav.home">Home</a>
            </li>
            <li>
              <a href="${aboutHref}" class="nav-link" data-i18n="nav.about">About</a>
            </li>
            <li>
              <a href="${skillsHref}" class="nav-link" data-i18n="nav.skills">Skills</a>
            </li>
            <li>
              <a href="${educationHref}" class="nav-link" data-i18n="nav.education">Education</a>
            </li>
            <li>
              <a href="${portfolioHref}" class="nav-link" data-i18n="nav.portfolio">Portfolio</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>`;
  }
}

customElements.define("app-header", AppHeader);


