const currentHash = () => window.location.hash.substr(1) || '';

const pagesEl = [...document.querySelectorAll('.content .page')];

const loadPage = (hash) => {
  pagesEl.forEach((page, i) => {
    if (page.id === hash || (i === 0 && hash === '')) {
      page.classList.remove('hide');
    } else {
      page.classList.add('hide');
    }
  });
};

const main = document.querySelector('.main');
document.querySelector('button.toggle-sidebar').onclick = () => {
  if (main.classList !== null && main.classList.contains('full-width')) {
    main.classList.remove('full-width');
  } else {
    main.classList.add('full-width');
  }
};

window.onhashchange = () => {
  loadPage(currentHash());
};

loadPage(currentHash());
