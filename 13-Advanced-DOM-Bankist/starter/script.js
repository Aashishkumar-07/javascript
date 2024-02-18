'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  // When clicking open account, the page scrolls up by default as href='#' in html. To prevent this behavior
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// we have 2 btn--show-modal in html code so we are selecting both using queryselectorAll and get a nodeList
// Even though nodeList is not an array it has forEach method
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Scrolling

btnScrollTo.addEventListener('click', function () {
  // Scrolling - old way
  window.scrollTo({
    left: window.scrollX + section1.getBoundingClientRect().left,
    top: window.scrollY + section1.getBoundingClientRect().top,
    behavior: 'smooth',
  });
  // Scrolling - new way
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// page navigation

// ❌ We add event listner to each anchor element (not efficient)
// document.querySelectorAll('.nav__link').forEach(function (e) {
//   e.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// ✅ event propogation : bubbling (event delegation)
// 1. Find the common parent el of the anchor el
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  // To make sure we are pressing the link
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  }
});
///////////////////////////////////////
// Tabbed component

//DOM Delegation : bubbling
tabsContainer.addEventListener('click', function (e) {
  // if you press the span el(1/2/3) or the text you go to the closest class operations__tab
  const clicked = e.target.closest('.operations__tab ');
  console.log(clicked);
  // Guard class - if not clicked operations__tab element , return function immediately (not clicked in the give options)
  if (!clicked) return;

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate Content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
///////////////////////////////////////
// Menu fade animation
// mouseenter does not bubble so use mouseover
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// Passing argument into handler
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

///////////////////////////////////////
// Sticky navigation

// NOT EFFICIENT METHOD
// const stickynavoffset = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > stickynavoffset.y) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Efficient method : Intersection observer
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const obsCallBack = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry.isIntersecting, entry.intersectionRatio);
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};

const obsOptions = {
  root: null, //viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(header);

///////////////////////////////////////
// Reveal Sections
const allSections = document.querySelectorAll('.section');

const sectionOptions = {
  root: null,
  threshold: 0.15,
};

const sectionCallBack = function (entries, observer) {
  entries.forEach(function (entry) {
    // Guard class
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    // No need to observe that section any longer
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(
  sectionCallBack,
  sectionOptions
);

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

///////////////////////////////////////
// Lazy Loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const imgCallBack = function (entries, observer) {
  entries.forEach(function (entry) {
    // console.log(entry.target, entry.isIntersecting, entry.intersectionRatio);
    // Guard class - If not intersecting
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    // We want the blur effect to be removed only after original image gets loaded
    // In slow networks blur will be removed only after high resolution image gets loaded
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};

const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px', // To make the image load before
};

const imgObserver = new IntersectionObserver(imgCallBack, imgOptions);
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// CAROUSEL / SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, idx) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide="${idx}"></button>`
      );
    });
  };
  // Temporary settings for visualization
  // slider.style.overflow = 'visible';
  // slider.style.transform = 'scale(0.3) translateX(-100%)';

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, idx) => (s.style.transform = `translateX(${100 * (idx - slide)}%)`)
    );
  };

  let currSlide = 0;
  const maxSlide = slides.length - 1;

  // To avoid overlap : Initial display
  const init = function () {
    goToSlide(currSlide);
    createDots();
    activateDot(currSlide);
    // 0% 100% 200% 300%
  };
  init();

  const nextSlide = function () {
    if (currSlide === maxSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    // -100% 0% 100% 200%
    activateDot(currSlide);
  };
  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  // Next Slide
  btnRight.addEventListener('click', nextSlide);
  // Previous slide
  btnLeft.addEventListener('click', prevSlide);

  // Carousel control using keyboard
  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Carousel control using dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      currSlide = Number(e.target.dataset.slide);
      goToSlide(currSlide);
      activateDot(currSlide);
    }
  });
};
slider();
/////////////////////////////////////////////////////////////////////////////////////
// DOM MANIPULATION LECTURE

/*
////////////////////////
// Selecting elements//
//////////////////////

// To select the entire html code
console.log(document.documentElement);
// To select html head and body element
console.log(document.head, document.body);
// To select multiple elements with same class name(will return nodelist)
console.log(document.querySelectorAll('.section'));
// To get element by id
console.log(document.getElementById('section--1'));
// To return a live HTMLCollection of elements with the given tag name
console.log(document.getElementsByTagName('button'));
// To get element by className (returns a live HTMLcollection)
console.log(document.getElementsByClassName('btn'));

////////////////////////////////////
// Creating & inserting elements //
//////////////////////////////////
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved experience and functionality<button class='btn btn--close-cookie'> Got it</button>`;
const header = document.querySelector('header');
// adding html element as the first child of the parent element
header.prepend(message);


// Adding html element as the last child of the parent element
header.append(message);
// A DOM element cannot be at multiple places at the same time. MEANING : it can be either appended or prepended.
// However if DOM needed to do be at multiple places:
header.append(message.cloneNode(true));
// Adding html element after parent element
header.after(message);
// Adding html element before parent element
header.before(message);

////////////////////////
// Deleting elements //
//////////////////////

const closeCookie = document.querySelector('.btn--close-cookie');
closeCookie.addEventListener('click', function () {
  message.remove();
  // old way :
  // message.parentElement.removeChild(message);
});
/////////////////////////////////////////////////////////////////////////////////////

////////////////////////
//      Style        //
//////////////////////

// These styles are set as inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.backgroundColor);
// No output for below code
console.log(message.style.color);
// To get styles that are not defined by inline styles
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = parseInt(getComputedStyle(message).height) + 30 + 'px';
// To modify root/global css variables (we have to access the root html)
document.documentElement.style.setProperty('--color-primary', 'orangered');

////////////////////////
//    Attributes     //
//////////////////////

// Attributes(src, alt) of particular element(img)
const logo = document.querySelector('.nav__logo');
console.log(logo.src, logo.alt, logo.className);
logo.alt = 'beautiful minimalist logo';

// To get non standard properties
console.log(logo.getAttribute('designer'));
// To set attribute
logo.setAttribute('company', 'boscj');
// Data Attribute
// The data-* attribute is used to store custom data private to the page.It creates a more engaging user experience (without any Ajax calls or server-side database queries).
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add('c1', 'c');
logo.classList.remove('c', 'c1');
logo.classList.toggle('c');
logo.classList.contains('c');


////////////////////////////
//Types of event handlers//
//////////////////////////

const alerth1 = function (e) {
  alert('hovering over h1');
  //To remove event listner
  h1.removeEventListener('mouseenter', alerth1);
};

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alerth1);

//Before addEventListner came we use on{eventname}
// h1.onmouseenter = function (e) {
//   alert('hovering over h1 using old method');
// };

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////
//  DOM Traversing  //
/////////////////////
const h1 = document.querySelector('h1');
// HTML collection
console.log(h1.children);
console.log(h1.parentElement);
// Nodelist
console.log(h1.parentNode);
console.log(h1.childNodes);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = '#555';

// If there exist multiple parents with the same name
// To select the nearest parent of the child El
// Useful in DOM Delegation
h1.closest('.header').style.backgroundColor = 'var(--color-secondary-opacity)';

// Sibling
console.log(h1.nextElementSibling);
console.log(h1.previousElementSibling);
// To get all sibling
console.log(h1.parentElement.children);
*/
///////////////////////////////////////////////////////////////////////////////////////////
