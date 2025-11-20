
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

const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

  document.querySelectorAll('a, button, .clickable').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('custom-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('custom-hover'));
  });



// Cursor enlarge slightly on hover over clickable items

const links = document.querySelectorAll("a, button, span");

links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
    cursor.style.backgroundColor = "#7c7be8ff";
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.backgroundColor = "#ed884e";
  });
});



// 🔇 Disable background audio & sound interactions on mobile
if (window.innerWidth <= 768) {
  // Target your ambient audio
  const ambientAudio = document.getElementById('ambient-audio');
  if (ambientAudio) {
    ambientAudio.pause();
    ambientAudio.currentTime = 0;
    ambientAudio.removeAttribute('autoplay');
    ambientAudio.removeAttribute('loop');
  }

  // Disable sound intro click triggering playback
  const soundIntro = document.getElementById('sound-intro');
  if (soundIntro) {
    soundIntro.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Fade out intro overlay if needed
      soundIntro.style.display = 'none';
    });
  }

  // Also ensure any <audio> tags on the page are muted
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
    audio.removeAttribute('autoplay');
    audio.removeAttribute('loop');
  });
}


// 🔹 Disable cursor animation on mobile
if (window.innerWidth <= 768) {
  const cursorDot = document.querySelector('.cursor-dot');
  if (cursorDot) cursorDot.style.display = 'none';

  // Stop cursor tracking listeners
  document.removeEventListener('mousemove', handleCursorMove);
}



// Project Filter System

/*** 
  const filterItems = document.querySelectorAll('.filter-item');
  const projectCards = document.querySelectorAll('.project-card');

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      // remove active class
      filterItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const filterValue = item.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
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








  });

