class AppFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("data-base") || "./";

    const homeHref = `${base}index.html`;
    const mailHref =
      "mailto:andresaraque24dos@gmail.com?subject=Contact%20From%20Portfolio&body=Hello%20Andres,";
    const whatsappHref = "https://api.whatsapp.com/send?phone=573217207734";
    const githubHref = "https://github.com/andresaraque";

    this.innerHTML = `
    <footer>
      <div class="container">
        <a href="${homeHref}" class="logo" id="principal-logo">A_A</a>
        <p class="text" data-i18n="footer.copyright">
          &copy; Copyright 2024. Developed with ❤️ by Andres Araque
        </p>
        <ul class="social-media">
          <li>
            <a href="${whatsappHref}" target="_blank" class="social-link">
              <i class="uil uil-whatsapp"></i>
            </a>
          </li>
          <li>
            <a href="${githubHref}" target="_blank" class="social-link">
              <i class="uil uil-github"></i>
            </a>
          </li>
          <li>
            <a href="${mailHref}" target="_blank" class="social-link">
              <i class="uil uil-envelope"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>`;
  }
}

customElements.define("app-footer", AppFooter);


