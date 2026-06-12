document.addEventListener('DOMContentLoaded', function(){
  const available = ['pl','en'];
  const defaultLang = 'pl';
  const root = window.SITE_ROOT || './';

  function getStored(){ return localStorage.getItem('site_lang'); }
  function setStored(lang){ localStorage.setItem('site_lang', lang); }

  function lookup(obj, key){
    return key.split('.').reduce((o,k)=> (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }

  async function loadLang(lang){
    if(!available.includes(lang)) lang = defaultLang;
    try{
      const res = await fetch(root + 'js/i18n/' + lang + '.json');
      const data = await res.json();
      window._i18n = data;
      window._siteLang = lang;
      document.documentElement.lang = lang;

      // replace textContent
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        const val = lookup(data, key);
        if(val !== undefined) el.textContent = val;
      });

      // replace HTML for elements marked data-i18n-html
      document.querySelectorAll('[data-i18n-html]').forEach(el=>{
        const key = el.getAttribute('data-i18n-html');
        const val = lookup(data, key);
        if(val !== undefined) el.innerHTML = val;
      });

      // titles
      document.querySelectorAll('title[data-i18n]').forEach(t=>{
        const key = t.getAttribute('data-i18n');
        const val = lookup(data, key);
        if(val) t.textContent = val;
      });

      // update active language buttons
      updateActiveLang(lang);

      // notify listeners that i18n data is ready
      try{ document.dispatchEvent(new CustomEvent('i18n:loaded',{detail:{lang:lang}})); }catch(e){}
    }catch(e){
      console.error('i18n load failed', e);
    }
  }

  // attach switcher
  document.querySelectorAll('.lang-switcher [data-lang]').forEach(btn=>{
    btn.addEventListener('click', function(){
      const lang = btn.getAttribute('data-lang');
      setStored(lang);
      loadLang(lang);
    });
  });

  const initial = getStored() || (navigator.language && navigator.language.startsWith('en') ? 'en' : defaultLang);
  loadLang(initial);

  function updateActiveLang(lang){
    document.querySelectorAll('.lang-switcher [data-lang]').forEach(b=>{
      const is = b.getAttribute('data-lang') === lang;
      if(is){ b.classList.add('active'); b.setAttribute('aria-pressed','true'); }
      else { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); }
    });
  }
});
