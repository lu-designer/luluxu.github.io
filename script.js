
document.addEventListener('DOMContentLoaded', () => {

/*** 🌄 Parallax Scroll Effect ***/
window.addEventListener('scroll', () => {
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = el.dataset.speed || 0.5;
    const yPos = -(window.scrollY * speed);
    el.style.backgroundPosition = `center ${yPos}px`;
  });
});



 /*** 🎞️ Horizontal Storytelling Scroll — Stable Version ***/
const storytelling = document.querySelector('.storytelling');
const scrollContainer = document.querySelector('.scroll-container');
const track = document.querySelector('.project-track');

if (storytelling && scrollContainer && track) {
  function setStoryHeight() {
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;

    if (trackWidth <= viewportWidth) {
      storytelling.style.height = `${window.innerHeight}px`;
      track.style.transform = 'translateX(0)';
      return;
    }

    const horizontalScrollLength = trackWidth - viewportWidth;
    storytelling.style.height = `${window.innerHeight + horizontalScrollLength}px`;
  }

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const start = storytelling.offsetTop;
    const maxScroll = storytelling.offsetHeight - window.innerHeight;

    if (scrollTop < start || maxScroll <= 0) {
      track.style.transform = 'translateX(0)';
      return;
    }

    const progress = Math.min(Math.max((scrollTop - start) / maxScroll, 0), 1);
    const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
    const translateX = -progress * maxTranslate;
    track.style.transform = `translateX(${translateX}px)`;
  }

  // Recalculate after images fully load
  function initAfterImages() {
    setStoryHeight();
    handleScroll();
  }

  // ✅ Run after all content + images have loaded
  window.addEventListener('load', initAfterImages);

  // ✅ Also run after small delay to catch late layout shifts
  setTimeout(initAfterImages, 800);

  // ✅ Smoothly recalc on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setStoryHeight();
      handleScroll();
    }, 200);
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
}




    
    

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      });
    });
  

  /*** ✨ Fade/Slide Animations for Scrolling Sections ***/
  const animatedEls = document.querySelectorAll('.animate');
  const projects = document.querySelectorAll('.storytelling .project');
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('reveal')) {
          entry.target.classList.add('visible');
        }
        if (entry.target.classList.contains('animate')) {
          entry.target.classList.add('show');
        }
        if (entry.target.classList.contains('project')) {
          entry.target.classList.add('show');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  [...animatedEls, ...projects, ...reveals].forEach(el => observer.observe(el));






// Custom Mouse Cursor
/*** 
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

const interactiveElements = document.querySelectorAll(
  "a, button, [role='button'], .btn"
);

interactiveElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("is-hovering");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-hovering");
  });
});
***/


// 🔹 Disable cursor animation on mobile
/*** 
if (window.innerWidth <= 768) {
  const cursorDot = document.querySelector('.cursor-dot');
  if (cursorDot) cursorDot.style.display = 'none';

  // Stop cursor tracking listeners
  document.removeEventListener('mousemove', handleCursorMove);
}
***/



// Project Filter System (supports multiple categories)
const filterItems = document.querySelectorAll('.filter-item');
const projectCards = document.querySelectorAll('.project-card');

filterItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active class from all, then add to clicked
    filterItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    const filterValue = item.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');

      if (filterValue === 'all' || categories.includes(filterValue)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});



function setMobileVH() {
  if (window.innerWidth <= 768) {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  } else {
    // Reset on desktop so nothing changes
    document.documentElement.style.removeProperty('--vh');
  }
}

setMobileVH();
window.addEventListener('resize', setMobileVH);




  });

