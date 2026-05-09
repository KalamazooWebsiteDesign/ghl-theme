/*! KWD GHL Theme loader
 *  - Marks <html data-kwd-page="settings|main"> for SPA-aware CSS scoping.
 *  - Injects the CSS bundle from the same version tag this loader is served at.
 *  Pin a version in the <script src> tag in GHL Custom JS.
 */
(function () {
  // Same-version CSS: derive from this script's own src, so bumping the
  // <script src="…@vX/dist/loader.js"> auto-pins the matching CSS.
  var thisScript = document.currentScript ||
    [].slice.call(document.scripts).pop();
  var src = thisScript && thisScript.src || '';
  var cssHref = src.replace(/loader\.js(\?.*)?$/, 'main.css');
  if (!cssHref || cssHref === src) {
    cssHref = 'https://cdn.jsdelivr.net/gh/KalamazooWebsiteDesign/ghl-theme@main/dist/main.css';
  }

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssHref;
  link.dataset.kwdTheme = '1';
  document.head.appendChild(link);

  function markPage() {
    var p = location.pathname;
    var page = /\/settings(\/|$)/.test(p) ? 'settings' : 'main';
    document.documentElement.dataset.kwdPage = page;
  }

  markPage();

  // Hook SPA navigation
  ['pushState', 'replaceState'].forEach(function (m) {
    var orig = history[m];
    history[m] = function () {
      var r = orig.apply(this, arguments);
      markPage();
      return r;
    };
  });
  window.addEventListener('popstate', markPage);
  window.addEventListener('hashchange', markPage);
})();
