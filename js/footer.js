// footer.js — inserts shared footer partial into pages
(function(){
  var targetId = 'site-footer';
  var el = document.getElementById(targetId);
  if (!el) return;

  var candidates = ['/partials/footer.html','partials/footer.html','../partials/footer.html'];
  function computeRootPrefix(){
    var parts = location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return '/';
    // assume repo is first segment (GitHub Pages user site: /<repo>/...)
    return '/' + parts[0] + '/';
  }

  function tryFetch(i){
    if (i>=candidates.length){
      // fallback: simple inline footer
      el.innerHTML = '<footer class="site-footer"><div class="container footer-inner"><p>© Placeholder</p></div></footer>';
      return;
    }
    fetch(candidates[i]).then(function(resp){
      if (!resp.ok) throw new Error('fetch failed');
      return resp.text();
    }).then(function(html){
      var prefix = computeRootPrefix();
      html = html.replace(/\[\[ROOT\]\]/g, prefix);
      el.innerHTML = html;
    }).catch(function(){
      tryFetch(i+1);
    });
  }
  tryFetch(0);
})();
