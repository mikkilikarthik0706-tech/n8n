/**
 * Portfolio Website — script.js
 * Vanilla JavaScript — no frameworks, no jQuery
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
   * 1. LUCIDE ICONS INIT
   * ============================================================ */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }


  /* ============================================================
   * 2. CUSTOM CURSOR
   * ============================================================ */
  const cursor         = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (hasFinePointer && cursor && cursorFollower) {
    // Track mouse and move main cursor immediately
    document.addEventListener('mousemove', (e) => {
      cursor.style.left         = `${e.clientX}px`;
      cursor.style.top          = `${e.clientY}px`;
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top  = `${e.clientY}px`;
    });

    // Interactive element selectors
    const interactiveSelectors = 'a, button, .project-card, .skill-tag';

    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        cursorFollower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        cursorFollower.classList.remove('hovering');
      });
    });
  }


  /* ============================================================
   * 3. NAVBAR SCROLL BEHAVIOUR
   * ============================================================ */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    // Run once on load in case the page is already scrolled
    handleNavbarScroll();
  }


  /* ============================================================
   * 4. MOBILE HAMBURGER MENU
   * ============================================================ */
  const hamburger     = document.getElementById('hamburger');
  const navLinks      = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const openMenu = () => {
    if (!navLinks || !hamburger) return;
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburger) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks && navLinks.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when any nav-link is clicked
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });


  /* ============================================================
   * 5. SMOOTH SCROLLING
   * ============================================================ */
  const NAVBAR_HEIGHT = 64;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  /* ============================================================
   * 6. ACTIVE NAV HIGHLIGHTING  (Section → nav data-section map)
   * ============================================================ */
  // Feature 15 mapping is embedded here
  const sectionNavMap = {
    'home'           : 'home',
    'about'          : 'about',
    'skills'         : 'skills',
    'projects'       : 'projects',
    'automation-lab' : 'projects',   // maps to projects nav
    'journey'        : 'experience', // maps to experience nav
    'experience'     : 'experience',
    'contact'        : 'contact',
  };

  const allNavLinks = document.querySelectorAll('.nav-link[data-section]');

  const setActiveNav = (sectionId) => {
    const targetSection = sectionNavMap[sectionId];
    allNavLinks.forEach((link) => {
      if (link.dataset.section === targetSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const sectionIds = Object.keys(sectionNavMap);
  const sectionEls = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sectionEls.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionEls.forEach((el) => navObserver.observe(el));
  }


  /* ============================================================
   * 7. SCROLL REVEAL ANIMATIONS
   * ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
              window._revealObserver = revealObserver;
  // Unobserve after reveal so it doesn't flicker back
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold   : 0.12,
        rootMargin  : '0px 0px -60px 0px',
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }


  /* ============================================================
   * 8. BACK TO TOP BUTTON
   * ============================================================ */
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    const handleBackToTopVisibility = () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    handleBackToTopVisibility();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ============================================================
   * 9. THEME TOGGLE
   * ============================================================ */
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY   = 'theme';
  const LIGHT_CLASS = 'light-theme';

  // Apply saved preference on load
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light') {
    document.body.classList.add(LIGHT_CLASS);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle(LIGHT_CLASS);
      localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    });
  }


  /* ============================================================
   * 10. CANVAS PARTICLE ANIMATION (hero background)
   * ============================================================ */
  const heroCanvas = document.getElementById('heroCanvas');

  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    const PARTICLE_COUNT = 80;
    const LINK_DISTANCE  = 120;
    const COLORS         = ['#3B82F6', '#A855F7'];

    let particles = [];
    let animationId;

    const resizeCanvas = () => {
      const parent = heroCanvas.parentElement;
      heroCanvas.width  = parent ? parent.offsetWidth  : window.innerWidth;
      heroCanvas.height = parent ? parent.offsetHeight : window.innerHeight;
    };

    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    const createParticle = () => ({
      x      : randomBetween(0, heroCanvas.width),
      y      : randomBetween(0, heroCanvas.height),
      vx     : randomBetween(-0.3, 0.3),
      vy     : randomBetween(-0.3, 0.3),
      radius : randomBetween(1, 2.5),
      alpha  : randomBetween(0.2, 0.6),
      color  : COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    };

    const drawParticle = (p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawLinks = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DISTANCE) {
            const lineAlpha = (1 - dist / LINK_DISTANCE) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0)                 p.x = heroCanvas.width;
        if (p.x > heroCanvas.width)  p.x = 0;
        if (p.y < 0)                 p.y = heroCanvas.height;
        if (p.y > heroCanvas.height) p.y = 0;

        drawParticle(p);
      });

      drawLinks();

      animationId = requestAnimationFrame(animate);
    };

    // Initialise and start
    resizeCanvas();
    initParticles();
    animate();

    // Re-initialise on resize so particles fill the new dimensions
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animationId);
        resizeCanvas();
        initParticles();
        animate();
      }, 150);
    });
  }


  /* ============================================================
   * 11. CONTACT FORM VALIDATION
   * ============================================================ */
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');

  if (contactForm) {
    // Helper: show an error message in the paired .form-error element
    const showError = (fieldEl, message) => {
      const errorEl = fieldEl.parentElement
        ? fieldEl.parentElement.querySelector('.form-error')
        : null;
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
      fieldEl.setAttribute('aria-invalid', 'true');
    };

    // Helper: clear error
    const clearError = (fieldEl) => {
      const errorEl = fieldEl.parentElement
        ? fieldEl.parentElement.querySelector('.form-error')
        : null;
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
      fieldEl.removeAttribute('aria-invalid');
    };

    // Clear errors on focus
    contactForm.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('focus', () => clearError(field));
    });

    // Email regex (RFC-5322 simplified)
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = () => {
      let firstInvalid = null;
      let isValid      = true;

      const nameField    = document.getElementById('name');
      const emailField   = document.getElementById('email');
      const subjectField = document.getElementById('subject');
      const messageField = document.getElementById('message');

      // Name
      if (nameField) {
        if (!nameField.value.trim() || nameField.value.trim().length < 2) {
          showError(nameField, 'Please enter your name (at least 2 characters).');
          if (!firstInvalid) firstInvalid = nameField;
          isValid = false;
        } else {
          clearError(nameField);
        }
      }

      // Email
      if (emailField) {
        if (!emailField.value.trim() || !EMAIL_REGEX.test(emailField.value.trim())) {
          showError(emailField, 'Please enter a valid email address.');
          if (!firstInvalid) firstInvalid = emailField;
          isValid = false;
        } else {
          clearError(emailField);
        }
      }

      // Subject
      if (subjectField) {
        if (!subjectField.value.trim() || subjectField.value.trim().length < 3) {
          showError(subjectField, 'Subject must be at least 3 characters.');
          if (!firstInvalid) firstInvalid = subjectField;
          isValid = false;
        } else {
          clearError(subjectField);
        }
      }

      // Message
      if (messageField) {
        if (!messageField.value.trim() || messageField.value.trim().length < 10) {
          showError(messageField, 'Message must be at least 10 characters.');
          if (!firstInvalid) firstInvalid = messageField;
          isValid = false;
        } else {
          clearError(messageField);
        }
      }

      return { isValid, firstInvalid };
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const { isValid, firstInvalid } = validate();

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Loading state
      if (submitBtn) {
        submitBtn.disabled   = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
      }

      // Simulate processing delay (1 second)
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled    = false;
          submitBtn.textContent = submitBtn.dataset.originalText || 'Send';
        }

        // Show success banner
        if (formSuccess) {
          formSuccess.removeAttribute('hidden');
          formSuccess.setAttribute('role', 'status');

          // Auto-hide after 8 seconds
          setTimeout(() => {
            formSuccess.setAttribute('hidden', '');
          }, 8000);
        }

        // Reset form
        contactForm.reset();
      }, 1000);
    });
  }


  /* ============================================================
   * 12. FOOTER YEAR
   * ============================================================ */
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.innerHTML = new Date().getFullYear();
  }


  /* ============================================================
   * 13. FLOAT CHIP ANIMATION — LUCIDE ICONS INSIDE CHIPS
   *     Lucide icons are already initialised in section 1.
   *     No additional JS needed; CSS handles the animation.
   * ============================================================ */


  /* ============================================================
   * 14. SKILL TAG HOVER MICRO-INTERACTION
   * ============================================================ */
  document.querySelectorAll('.skill-tag').forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-2px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
    });
  });


}); // end DOMContentLoaded

// ============================================================
// DYNAMIC CONTENT LOADER (reads from admin localStorage)
// ============================================================
function loadDynamicContent() {
  loadDynamicProjects();
  loadDynamicResearch();
}

function getIconSVG(icon) {
  const icons = {
    'bot': 'M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM7 14v3a1 1 0 0 0 2 0v-3H7zm8 0v3a1 1 0 0 0 2 0v-3h-2z',
    'bar-chart-4': 'M3 3v18h18M7 16v-5M11 16V8M15 16v-3M19 16V5',
    'terminal': 'M4 17l6-6-6-6M12 19h8',
    'cpu': 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18',
    'zap': 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
    'layers': 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    'shield': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    'trending-up': 'M23 6l-9.5 9.5-5-5L1 18',
  };
  return icons[icon] || icons['zap'];
}

function colorClass(color) {
  const map = { blue: 'blue', purple: 'purple', green: 'green', orange: 'orange' };
  return map[color] || 'blue';
}

function loadDynamicProjects() {
  try {
    const raw = localStorage.getItem('mk_portfolio_projects');
    const wrapper = document.getElementById('dynamic-projects-wrapper');
    const container = document.getElementById('dynamic-projects-container');
    if (!wrapper || !container) return;

    if (!raw) {
      wrapper.style.display = 'none';
      container.innerHTML = '';
      return;
    }
    const projects = JSON.parse(raw);
    if (!projects || projects.length === 0) {
      wrapper.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    container.innerHTML = '';
    projects.forEach(proj => {
      const statusClass = proj.status === 'In Progress' ? 'learning' : (proj.status === 'Concept' ? 'concept' : 'upcoming');
      const c = colorClass(proj.color);
      const stackTags = (proj.stack || []).map(t => `<span class="stack-tag">${t}</span>`).join('');
      const card = document.createElement('article');
      card.className = 'dynamic-project-card reveal visible';
      card.innerHTML = `
        <div class="project-card__top">
          <div class="project-card-icon project-card-icon--${c}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="${getIconSVG(proj.icon)}"/>
            </svg>
          </div>
          <div class="project-status project-status--${statusClass}">
            <span class="status-dot status-dot--${statusClass}"></span>
            ${proj.status || 'Upcoming'}
          </div>
        </div>
        <div class="project-category">${proj.category || 'AI · Technology'}</div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        ${stackTags ? `<div class="project-stack">${stackTags}</div>` : ''}
        ${proj.expectedDate ? `<div style="font-size:0.75rem;color:var(--cream-dimmer);font-family:var(--font-mono);margin-top:6px;">Timeline: ${proj.expectedDate}</div>` : ''}
        ${proj.link ? `<div style="margin-top:8px;"><a href="${proj.link}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener">View Resource →</a></div>` : ''}
      `;
      container.appendChild(card);
    });

    wrapper.style.display = 'block';

    if (window._revealObserver) {
      container.querySelectorAll('.reveal').forEach(el => window._revealObserver.observe(el));
    }
  } catch (e) {
    console.error('Dynamic projects load error:', e);
  }
}

function loadDynamicResearch() {
  try {
    const raw = localStorage.getItem('mk_portfolio_research');
    const section = document.getElementById('research');
    const container = document.getElementById('dynamic-research-container');
    if (!section || !container) return;

    if (!raw) {
      section.style.display = 'none';
      container.innerHTML = '';
      return;
    }
    const entries = JSON.parse(raw);
    if (!entries || entries.length === 0) {
      section.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    container.innerHTML = '';
    entries.forEach(entry => {
      const dateStr = entry.date ? new Date(entry.date).toLocaleDateString('en-GB', { month:'short', year:'numeric' }) : '';
      const tags = (entry.tags || []).map(t => `<span class="stack-tag">#${t}</span>`).join('');
      const card = document.createElement('article');
      card.className = 'research-card reveal visible';
      card.innerHTML = `
        <div class="research-card__category">${entry.category || 'Research'}</div>
        <h3 class="research-card__title">${entry.title}</h3>
        <p class="research-card__summary">${entry.summary}</p>
        ${tags ? `<div class="project-stack" style="margin-top:4px;">${tags}</div>` : ''}
        <div class="research-card__meta">
          <span class="research-card__date">${dateStr}</span>
          ${entry.link ? `<a href="${entry.link}" target="_blank" rel="noopener" class="research-card__link">Read Full Document <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg></a>` : ''}
        </div>
      `;
      container.appendChild(card);
    });

    section.style.display = 'block';

    if (window._revealObserver) {
      container.querySelectorAll('.reveal').forEach(el => window._revealObserver.observe(el));
    }
  } catch (e) {
    console.error('Dynamic research load error:', e);
  }
}

// 1. Initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadDynamicContent);
} else {
  loadDynamicContent();
}

// 2. Real-time multi-tab synchronization listener
window.addEventListener('storage', (e) => {
  if (e.key === 'mk_portfolio_projects' || e.key === 'mk_portfolio_research' || !e.key) {
    loadDynamicContent();
  }
});
