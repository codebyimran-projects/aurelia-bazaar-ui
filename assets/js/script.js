 (function() {
      const navbar = document.getElementById('mainNavbar');
      const hamburger = document.getElementById('hamburgerBtn');
      const navLinks = document.getElementById('navLinks');
      const links = navLinks ? navLinks.querySelectorAll('a') : [];

      // ---- Search ----
      const searchIcon = document.getElementById('searchIconBtn');
      const searchOverlay = document.getElementById('searchOverlay');
      const closeSearchBtn = document.getElementById('closeSearchBtn');
      const searchInput = document.getElementById('searchInput');

      function openSearch() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          if (searchInput) searchInput.focus();
        }, 100);
      }

      function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (searchInput) searchInput.value = '';
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
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
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

      // ---- Hamburger ----
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

        document.addEventListener('click', function(event) {
          if (!navbar.contains(event.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
          }
        });
      }

      // ---- Active links ----
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          links.forEach(l => l.classList.remove('active'));
          this.classList.add('active');

          if (navLinks && window.innerWidth <= 820) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
          }
        });
      });

      window.addEventListener('resize', function() {
        if (window.innerWidth > 820 && navLinks) {
          navLinks.classList.remove('open');
          if (hamburger) {
            hamburger.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
          }
        }
      });

      // ---- Filter chips ----
      const chips = document.querySelectorAll('.filter-chips .chip');
      chips.forEach(chip => {
        chip.addEventListener('click', function() {
          chips.forEach(c => c.classList.remove('active'));
          this.classList.add('active');
        });
      });

      // ---- Show All button ----
      const showAllBtn = document.querySelector('.show-all-btn');
      if (showAllBtn) {
        showAllBtn.addEventListener('click', function() {
          alert('✨ Showing all products (demo)');
        });
      }

      // ---- Mic button ----
      const micBtn = document.querySelector('.mic-btn');
      if (micBtn) {
        micBtn.addEventListener('click', function() {
          alert('🎤 Voice search activated (demo)');
        });
      }

    })();



      (function() {
      const scrollContainer = document.getElementById('categoriesScroll');
      const indicator = document.getElementById('scrollIndicator');
      const cards = scrollContainer.querySelectorAll('.category-card');
      const totalCards = cards.length;

      // ---- Create dots ----
      for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          const cardWidth = cards[0].offsetWidth + 24; // card width + gap
          scrollContainer.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
          });
        });
        indicator.appendChild(dot);
      }

      const dots = indicator.querySelectorAll('.dot');

      // ---- Update active dot on scroll ----
      function updateActiveDot() {
        const scrollLeft = scrollContainer.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 24;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        const clampedIndex = Math.min(Math.max(activeIndex, 0), totalCards - 1);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === clampedIndex);
        });
      }

      scrollContainer.addEventListener('scroll', updateActiveDot);
      window.addEventListener('resize', updateActiveDot);

      // ---- Drag to scroll (grab & drag) ----
      let isDragging = false;
      let startX = 0;
      let scrollLeftStart = 0;

      scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        scrollContainer.classList.add('active');
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeftStart = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
        scrollContainer.style.scrollBehavior = 'auto';
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.2; // scroll speed multiplier
        scrollContainer.scrollLeft = scrollLeftStart - walk;
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          scrollContainer.classList.remove('active');
          scrollContainer.style.cursor = 'grab';
          scrollContainer.style.scrollBehavior = 'smooth';
          updateActiveDot();
        }
      });

      // ---- Touch drag for mobile ----
      let touchStartX = 0;
      let touchScrollLeft = 0;

      scrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
        touchScrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.scrollBehavior = 'auto';
      }, { passive: true });

      scrollContainer.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - touchStartX) * 1.2;
        scrollContainer.scrollLeft = touchScrollLeft - walk;
      }, { passive: true });

      scrollContainer.addEventListener('touchend', () => {
        scrollContainer.style.scrollBehavior = 'smooth';
        updateActiveDot();
      }, { passive: true });

      // ---- Card click (with arrow button) ----
      cards.forEach(card => {
        const arrowBtn = card.querySelector('.arrow-btn');
        if (arrowBtn) {
          arrowBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const name = card.querySelector('.cat-name')?.textContent?.trim() || 'Category';
            alert('🛍️ Exploring: ' + name);
          });
        }

        card.addEventListener('click', function() {
          const name = this.querySelector('.cat-name')?.textContent?.trim() || 'Category';
          alert('🛍️ Browsing: ' + name);
        });
      });

      // ---- View all button ----
      document.querySelector('.view-all')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('✨ Showing all categories (demo)');
      });

      // ---- Auto-scroll animation (subtle) ----
      let autoScrollInterval = null;
      let isAutoScrolling = false;

      function startAutoScroll() {
        if (isAutoScrolling) return;
        isAutoScrolling = true;
        let index = 0;
        autoScrollInterval = setInterval(() => {
          const cardWidth = cards[0].offsetWidth + 24;
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          index = (index + 1) % totalCards;
          const target = Math.min(index * cardWidth, maxScroll);
          scrollContainer.scrollTo({
            left: target,
            behavior: 'smooth'
          });
        }, 3500);
      }

      function stopAutoScroll() {
        if (autoScrollInterval) {
          clearInterval(autoScrollInterval);
          autoScrollInterval = null;
          isAutoScrolling = false;
        }
      }

      // Start auto-scroll after 2 seconds
      setTimeout(startAutoScroll, 2000);

      // Stop auto-scroll on user interaction
      scrollContainer.addEventListener('mousedown', stopAutoScroll);
      scrollContainer.addEventListener('touchstart', stopAutoScroll);
      scrollContainer.addEventListener('mouseup', () => {
        setTimeout(startAutoScroll, 4000);
      });
      scrollContainer.addEventListener('touchend', () => {
        setTimeout(startAutoScroll, 4000);
      });

      // Reset auto-scroll on resize
      window.addEventListener('resize', () => {
        stopAutoScroll();
        setTimeout(startAutoScroll, 2000);
      });

    })();