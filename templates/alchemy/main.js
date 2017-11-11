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
  let activeIndex = 0;
  pageEls.forEach((page, i) => {
    if (page.id === hash || (i === 0 && hash === '')) {
      activeIndex = i;
      page.classList.remove('hide');
    } else {
      page.classList.add('hide');
    }
  });
  return activeIndex;
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


/**
 * Highlight the given word
 * @param {Element} root
 * @param {string} word
 * @param {string} [className='highlight'] className
 */
function highlightWord(root, word, className = 'highlight') {
  const excludeElements = ['script', 'style', 'iframe', 'canvas'];
  let found = false;

  /**
   * @returns {Node[]}
   */
  const textNodesUnder = () => {
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const text = [];

    while (walk.nextNode()) {
      if (excludeElements.indexOf(walk.currentNode.parentElement.tagName.toLowerCase()) < 0) {
        text.push(walk.currentNode);
      }
    }
    return text;
  };

  /**
   * Highlight words
   * @param {Node} n
   * @returns {boolean}
   */
  const highlightWords = (n) => {
    const indexOfNode = (node, i) => node.nodeValue.toLowerCase().indexOf(word.toLowerCase(), i);
    let after;
    let span;
    let i = indexOfNode(n);

    if (!found && i > -1) {
      found = true;
    }

    while (i > -1) {
      after = n.splitText(i + word.length);
      span = document.createElement('span');
      span.className = className;
      span.appendChild(n.splitText(i));
      after.parentNode.insertBefore(span, after);
      n = after;
      i = indexOfNode(after, i);
    }
  };

  textNodesUnder().forEach(highlightWords);
  return found;
}

/**
 * Remove highlight from elements
 * @param {Element[]} elements
 */
const removeHighlight = (elements) => {
  elements.forEach((el) => {
    const prev = el.previousSibling;
    const next = el.nextSibling;
    prev.textContent += (el.textContent + next.textContent);
    el.parentNode.removeChild(next);
    el.parentNode.removeChild(el);
  });
};

const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

/**
 * Highlight sidebar link
 * @param {number} index
 */
const addClassSidebarIndex = (index, className) => {
  sidebarLinks[index].classList.add(className);
};

/**
 * Remove highlights from sidebar
 */
const removeClassesSidebar = (className) => {
  sidebarLinks.forEach(link => link.classList.remove(className));
};

const toggleActiveLinkSidebar = (index) => {
  sidebarLinks.forEach((link, i) => {
    if (i === index) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
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

const searchInputEl = document.querySelector('.search-input');
searchInputEl.classList.remove('hide');

const highlightClass = 'highlight';

searchInputEl.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode;
  if (key === 13) {
    removeHighlight([...document.querySelectorAll('.content .highlight')]);
    removeClassesSidebar(highlightClass);
    pageEls.forEach((el, pIndex) => {
      if (highlightWord(el, searchInputEl.value)) {
        addClassSidebarIndex(pIndex, highlightClass);
      }
    });
  }
});

searchInputEl.addEventListener('keyup', (e) => {
  const key = e.which || e.keyCode;
  if (key !== 13 && searchInputEl.value.length < 1) {
    removeHighlight([...document.querySelectorAll(`.content .${highlightClass}`)]);
    removeClassesSidebar(highlightClass);
  }
});

const showPageFromCurrentHash = () => {
  const index = showPageFromHash(currentHash());
  toggleActiveLinkSidebar(index);
};

// Listen for hash change
window.onhashchange = () => {
  showPageFromCurrentHash();
};

showPageFromCurrentHash();
