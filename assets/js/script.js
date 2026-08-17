// Navbar Section Code 
 (function() {
      const navbar = document.getElementById('mainNavbar');
      const hamburger = document.getElementById('hamburgerBtn');
      const navLinks = document.getElementById('navLinks');
      const links = navLinks ? navLinks.querySelectorAll('a') : [];

      // ---- Search functionality ----
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

      // Close search on backdrop click
      if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
          if (e.target === searchOverlay) {
            closeSearch();
          }
        });
      }

      // Close search on Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
          closeSearch();
        }
      });

      // ---- hamburger toggle ----
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

      // ---- active link switching ----
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

      // ---- search on Enter key (demo) ----
      if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
              alert('🔍 Searching for: "' + query + '" (demo)');
              closeSearch();
            }
          }
        });
      }

    })();