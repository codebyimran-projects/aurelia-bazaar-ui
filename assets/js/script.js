// ============================================================
// AURELIA BAZAR - MAIN JAVASCRIPT
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // HAMBURGER MENU TOGGLE
  // ============================================================
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('mainNavbar');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navbar && !navbar.contains(event.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // ============================================================
  // SEARCH OVERLAY
  // ============================================================
  const searchIcon = document.getElementById('searchIconBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');

  function openSearch() {
    if (searchOverlay) {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
    }
  }

  function closeSearch() {
    if (searchOverlay) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (searchInput) searchInput.value = '';
    }
  }

  if (searchIcon) {
    searchIcon.addEventListener('click', function(e) {
      e.preventDefault();
      openSearch();
    });
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeSearch();
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
          alert('🔍 Searching for: "' + query + '"');
          closeSearch();
        }
      }
    });
  }

  // ============================================================
  // DRAG TO SCROLL - CATEGORIES
  // ============================================================
  const catScroll = document.getElementById('categoriesScroll');

  if (catScroll) {
    let isDragging = false;
    let startX = 0;
    let scrollLeftStart = 0;

    catScroll.addEventListener('mousedown', (e) => {
      isDragging = true;
      catScroll.classList.add('active');
      startX = e.pageX - catScroll.offsetLeft;
      scrollLeftStart = catScroll.scrollLeft;
      catScroll.style.cursor = 'grabbing';
      catScroll.style.scrollBehavior = 'auto';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - catScroll.offsetLeft;
      const walk = (x - startX) * 1.2;
      catScroll.scrollLeft = scrollLeftStart - walk;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        catScroll.classList.remove('active');
        catScroll.style.cursor = 'grab';
        catScroll.style.scrollBehavior = 'smooth';
      }
    });

    // Touch drag for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    catScroll.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX - catScroll.offsetLeft;
      touchScrollLeft = catScroll.scrollLeft;
      catScroll.style.scrollBehavior = 'auto';
    }, { passive: true });

    catScroll.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - catScroll.offsetLeft;
      const walk = (x - touchStartX) * 1.2;
      catScroll.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });

    catScroll.addEventListener('touchend', () => {
      catScroll.style.scrollBehavior = 'smooth';
    }, { passive: true });
  }

  // ============================================================
  // DRAG TO SCROLL - DAILY DEALS
  // ============================================================
  const dealScroll = document.getElementById('dealsScroll');

  if (dealScroll) {
    let isDragging = false;
    let startX = 0;
    let scrollLeftStart = 0;

    dealScroll.addEventListener('mousedown', (e) => {
      isDragging = true;
      dealScroll.classList.add('active');
      startX = e.pageX - dealScroll.offsetLeft;
      scrollLeftStart = dealScroll.scrollLeft;
      dealScroll.style.cursor = 'grabbing';
      dealScroll.style.scrollBehavior = 'auto';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - dealScroll.offsetLeft;
      const walk = (x - startX) * 1.2;
      dealScroll.scrollLeft = scrollLeftStart - walk;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        dealScroll.classList.remove('active');
        dealScroll.style.cursor = 'grab';
        dealScroll.style.scrollBehavior = 'smooth';
      }
    });

    // Touch drag for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    dealScroll.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX - dealScroll.offsetLeft;
      touchScrollLeft = dealScroll.scrollLeft;
      dealScroll.style.scrollBehavior = 'auto';
    }, { passive: true });

    dealScroll.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - dealScroll.offsetLeft;
      const walk = (x - touchStartX) * 1.2;
      dealScroll.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });

    dealScroll.addEventListener('touchend', () => {
      dealScroll.style.scrollBehavior = 'smooth';
    }, { passive: true });
  }

  // ============================================================
  // CATEGORY CARDS - CLICK & ARROW BUTTON
  // ============================================================
  document.querySelectorAll('.category-card').forEach(card => {
    // Card click
    card.addEventListener('click', function(e) {
      if (e.target.closest('button')) return;
      const name = this.querySelector('.category-name')?.textContent?.trim() || 'Category';
      alert('🛍️ Browsing: ' + name);
    });

    // Arrow button click
    const arrow = card.querySelector('.arrow-btn');
    if (arrow) {
      arrow.addEventListener('click', function(e) {
        e.stopPropagation();
        const name = card.querySelector('.category-name')?.textContent?.trim() || 'Category';
        alert('🛍️ Exploring: ' + name);
      });
    }
  });

  // ============================================================
  // DEAL CARDS - CLICK
  // ============================================================
  document.querySelectorAll('.deal-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('button')) return;
      const name = this.querySelector('.product-name')?.textContent || 'Product';
      alert('🛍️ Viewing: ' + name);
    });
  });

  // ============================================================
  // WISHLIST TOGGLE
  // ============================================================
  document.querySelectorAll('.deal-card .wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const icon = this.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        this.style.color = '#ff4757';
        this.style.background = 'rgba(255,71,87,0.06)';
        this.style.borderColor = 'rgba(255,71,87,0.1)';
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        this.style.color = '#999';
        this.style.background = 'rgba(0,0,0,0.02)';
        this.style.borderColor = 'rgba(0,0,0,0.04)';
      }
    });
  });

  // ============================================================
  // ADD TO CART
  // ============================================================
  document.querySelectorAll('.deal-card .add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.deal-card');
      const name = card.querySelector('.product-name')?.textContent || 'Product';
      
      // Show feedback
      alert('🛒 Added to cart: ' + name);
      
      // Change button state
      this.innerHTML = '<i class="fas fa-check"></i> Added';
      this.style.background = 'linear-gradient(135deg, #00b894, #00a381)';
      
      // Reset after 2 seconds
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
        this.style.background = 'linear-gradient(135deg, #6C63FF, #8B83F0)';
      }, 2000);
    });
  });

  // ============================================================
  // "SEE ALL" / "VIEW ALL" BUTTONS
  // ============================================================
  document.querySelectorAll('.see-all, .view-all').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('✨ Showing all items (demo)');
    });
  });

  // ============================================================
  // FILTER CHIPS
  // ============================================================
  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.addEventListener('click', function() {
      // Remove active from all chips
      document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
      // Add active to clicked chip
      this.classList.add('active');
    });
  });

  // ============================================================
  // SHOW ALL BUTTON (Search Box)
  // ============================================================
  document.querySelector('.show-all-btn')?.addEventListener('click', function() {
    alert('✨ Showing all products (demo)');
  });

  // ============================================================
  // MICROPHONE BUTTON (Voice Search)
  // ============================================================
  document.querySelector('.mic-btn')?.addEventListener('click', function() {
    alert('🎤 Voice search activated (demo)');
  });

  // ============================================================
  // NEWSLETTER FORM SUBMIT
  // ============================================================
  document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input');
    if (input && input.value.trim()) {
      alert('📧 Subscribed with: ' + input.value.trim());
      input.value = '';
    }
  });

  // ============================================================
  // SCROLL INDICATOR DOTS (Categories)
  // ============================================================
  const scrollContainer = document.getElementById('categoriesScroll');
  const indicator = document.getElementById('scrollIndicator');

  if (scrollContainer && indicator) {
    const cards = scrollContainer.querySelectorAll('.category-card');
    const total = cards.length;

    // Create dots
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.dataset.index = i;
      dot.addEventListener('click', function() {
        const idx = parseInt(this.dataset.index);
        const cardWidth = cards[0].offsetWidth + 24; // card width + gap
        scrollContainer.scrollTo({
          left: idx * cardWidth,
          behavior: 'smooth'
        });
      });
      indicator.appendChild(dot);
    }

    const dots = indicator.querySelectorAll('.dot');

    // Update active dot on scroll
    scrollContainer.addEventListener('scroll', function() {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 24;
      const activeIndex = Math.round(scrollLeft / cardWidth);
      const clamped = Math.min(Math.max(activeIndex, 0), total - 1);
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === clamped);
      });
    });

    // Update on resize
    window.addEventListener('resize', function() {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 24;
      const activeIndex = Math.round(scrollLeft / cardWidth);
      const clamped = Math.min(Math.max(activeIndex, 0), total - 1);
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === clamped);
      });
    });
  }

})();


// shop collection 
 (function() {
      // Wishlist toggle
      document.querySelectorAll('.shop-card .wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const icon = this.querySelector('i');
          if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#ff4757';
            this.style.background = 'rgba(255,71,87,0.2)';
          } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = '#fff';
            this.style.background = 'rgba(255,255,255,0.15)';
          }
        });
      });

      // Add to Cart
      document.querySelectorAll('.shop-card .add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const card = this.closest('.shop-card');
          const name = card.querySelector('.product-name')?.textContent || 'Product';
          alert('🛒 Added to cart: ' + name);
          this.innerHTML = '<i class="fas fa-check"></i> Added';
          this.style.background = '#00b894';
          this.style.borderColor = '#00b894';
          setTimeout(() => {
            this.innerHTML = '<i class="fas fa-plus"></i> Add';
            this.style.background = 'rgba(255,255,255,0.15)';
            this.style.borderColor = 'rgba(255,255,255,0.1)';
          }, 2000);
        });
      });

      // Card click
      document.querySelectorAll('.shop-card').forEach(card => {
        card.addEventListener('click', function(e) {
          if (e.target.closest('button')) return;
          const name = this.querySelector('.product-name')?.textContent || 'Product';
          alert('🛍️ Viewing: ' + name);
        });
      });

      // View All
      document.querySelector('.shop-header .see-all')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('✨ Showing all products (demo)');
      });

    })();




    // promo section 
       (function() {
      // Set timer to 24 hours from now
      let timer = 24 * 60 * 60; // 24 hours in seconds

      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      function updateTimer() {
        const h = Math.floor(timer / 3600);
        const m = Math.floor((timer % 3600) / 60);
        const s = timer % 60;

        hoursEl.textContent = String(h).padStart(2, '0');
        minutesEl.textContent = String(m).padStart(2, '0');
        secondsEl.textContent = String(s).padStart(2, '0');

        if (timer > 0) {
          timer--;
        } else {
          timer = 24 * 60 * 60; // Reset to 24 hours
        }
      }

      updateTimer();
      setInterval(updateTimer, 1000);

      // ============================================================
      // BUTTON INTERACTIONS
      // ============================================================
      document.querySelector('.promo-content .btn-primary')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('🛒 Starting your shopping experience!');
      });

      document.querySelector('.promo-content .btn-secondary')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('✨ Showing all collections (demo)');
      });

    })();