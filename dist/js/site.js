document.addEventListener('DOMContentLoaded', function(){
  // Toggle dropdown on click (useful for touch devices)
  document.querySelectorAll('.dropbtn').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      var parent = el.parentElement;
      parent.classList.toggle('open');
    });
  });

  // Close open dropdowns when clicking outside
  document.addEventListener('click', function(e){
    document.querySelectorAll('.dropdown.open').forEach(function(d){
      if(!d.contains(e.target)) d.classList.remove('open');
    });
  });
});
