/**
 * Get the current hash (without the leading #)
 * @returns {string}
 */
const currentHash = () => window.location.hash.substr(1) || '';

/**
 * Get all pages element
 * @returns {Element[]}
 */
const getPageElements = () => [...document.querySelectorAll('.content .page')];

const pageEls = getPageElements();

/**
 * Get current page index from an hash string
 * @param {number} hash
 */
const getCurrentPageIndex = hash => pageEls.findIndex((page, i) => page.id === hash || (i === 0 && hash === ''));

/**
 * Display class from hash string
 * @param {string} hash
 */
const showPageFromHash = (hash) => {
  pageEls.forEach((page, i) => {
    if (page.id === hash || (i === 0 && hash === '')) {
      page.classList.remove('hide');
    } else {
      page.classList.add('hide');
    }
  });
};

/**
 * Toggle class for an element
 * @param {Element} element
 * @param {string} className
 */
const toggleClass = (element, className) => {
  if (element.classList !== null && element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};

const main = document.querySelector('.main');
document.querySelector('button.toggle-sidebar').onclick = () => {
  toggleClass(main, 'full-width');
};

document.querySelector('button.toggle-light').onclick = () => {
  toggleClass(main, 'dark');
};

document.querySelector('button.next-page').onclick = () => {
  const nextIndex = Math.min(getCurrentPageIndex(currentHash()) + 1, pageEls.length - 1);
  window.location.hash = `#${pageEls[nextIndex].id}`;
};

document.querySelector('button.previous-page').onclick = () => {
  const prevIndex = Math.max(0, (getCurrentPageIndex(currentHash()) - 1));
  window.location.hash = `#${pageEls[prevIndex].id}`;
};

document.querySelector('.tools').classList.remove('hide');

// Listen for hash change
window.onhashchange = () => {
  showPageFromHash(currentHash());
};

showPageFromHash(currentHash());
