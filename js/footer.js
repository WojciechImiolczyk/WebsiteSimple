// footer.js — inserts shared footer partial into pages
(function(){
  var targetId = 'site-footer';
  var el = document.getElementById(targetId);
  if (!el) return;

  function computeRootPrefix(){
    var parts = location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return '/';
    return '/' + parts[0] + '/';
  }

  var prefix = computeRootPrefix();
  var html = '' +
    '<footer class="site-footer">' +
    '<div class="container footer-inner">' +
    '<div class="footer-social">' +
    '<a href="https://www.facebook.com/placeholder" target="_blank" rel="noopener">' +
    '<img class="social-icon" src="' + prefix + 'images/facebook.svg" alt="Facebook">' +
    '<span class="sr-only">Facebook</span>' +
    '</a>' +
    '<a href="https://www.instagram.com/placeholder.pl/" target="_blank" rel="noopener">' +
    '<img class="social-icon" src="' + prefix + 'images/instagram.svg" alt="Instagram">' +
    '<span class="sr-only">Instagram</span>' +
    '</a>' +
    '<a href="https://www.youtube.com/@placeholder" target="_blank" rel="noopener">' +
    '<img class="social-icon" src="' + prefix + 'images/youtube.svg" alt="YouTube">' +
    '<span class="sr-only">YouTube</span>' +
    '</a>' +
    '</div>' +
    '<p>© Placeholder — Wszystkie prawa zastrzeżone</p>' +
    '<p class="footer-credit">Powered By <a href="https://www.linkedin.com/in/wojciechimiolczyk/" target="_blank" rel="noopener">Wojciech Imiołczyk</a></p>' +
    '</div>' +
    '</footer>';

  el.innerHTML = html;
})();
