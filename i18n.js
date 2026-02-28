// i18n simple loader: charge les fichiers JSON dans /locales et remplace les éléments avec data-i18n
(function(){
  const defaultLang = localStorage.getItem('lang') || 'fr';

  async function loadLang(lang){
    try{
      const res = await fetch(`locales/${lang}.json`);
      if(!res.ok) throw new Error('Failed to fetch');
      const dict = await res.json();
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        if(dict[key]){
          el.textContent = dict[key];
        }
      });
      // update some other known keys if present
      const title = document.querySelector('head title');
      if(title && dict['presentation.title']) title.textContent = dict['presentation.title'];
      localStorage.setItem('lang', lang);
    }catch(e){
      console.warn('i18n load failed', e);
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('[data-lang]').forEach(btn=>{
      btn.addEventListener('click', ()=> loadLang(btn.getAttribute('data-lang')));
    });
    loadLang(defaultLang);
  });
})();
