document.addEventListener('DOMContentLoaded', function(){
  // Toggle dropdown on click (useful for touch devices)
  document.querySelectorAll('.dropbtn').forEach(function(el){
    el.addEventListener('click', function(e){
      var parent = el.parentElement;
      // If dropbtn is an anchor, allow first tap to open menu (prevent navigation),
      // second tap will follow the link (when menu already open).
      if(el.tagName === 'A'){
        if(!parent.classList.contains('open')){
          e.preventDefault();
          parent.classList.add('open');
          try{ el.setAttribute('aria-expanded', 'true'); }catch(err){}
          return;
        }
        // otherwise allow navigation to proceed
      } else {
        e.preventDefault();
        parent.classList.toggle('open');
        try{ el.setAttribute('aria-expanded', parent.classList.contains('open')); }catch(e){}
      }
    });
  });

  // Close open dropdowns when clicking outside
  document.addEventListener('click', function(e){
    document.querySelectorAll('.dropdown.open').forEach(function(d){
      if(!d.contains(e.target)) d.classList.remove('open');
      try{ var btn = d.querySelector('.dropbtn'); if(btn) btn.setAttribute('aria-expanded','false'); }catch(e){}
    });
  });

  // Mark active nav item (and dropdown parent) based on current URL
  function markActiveNav(){
    try{
      var current = location.pathname.replace(/\/$/, '');
      document.querySelectorAll('.nav a').forEach(function(a){
        try{
          var aPath = new URL(a.getAttribute('href'), location.href).pathname.replace(/\/$/, '');
          if(aPath === current){
            a.classList.add('active');
            var dropdown = a.closest('.dropdown');
            if(dropdown){
              var btn = dropdown.querySelector('.dropbtn');
              if(btn) btn.classList.add('active');
              dropdown.classList.add('active');
            }
          }
        }catch(e){}
      });
      // Fallback: if URL contains '/gallery/' mark gallery dropdown active
      if(current.indexOf('/gallery/') !== -1){
        var dd = document.querySelector('.nav .dropdown');
        if(dd){
          dd.classList.add('active');
          var b = dd.querySelector('.dropbtn'); if(b) b.classList.add('active');
        }
      }
    }catch(e){}
  }
  markActiveNav();
});
