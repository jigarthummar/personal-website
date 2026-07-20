// Year in footer
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Theme toggle — persists to localStorage, respects system preference
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeBtn');
  var saved = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (btn) btn.textContent = theme === 'dark' ? '☾' : '☀';
  }
  apply(saved || (prefersDark ? 'dark' : 'light'));

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      apply(next);
    });
  }
})();

// CV scroll-spy — highlight + nudge the sidebar link of the section in view
(function () {
  var links = document.querySelectorAll('.cv-side a');
  if (!links.length) return;

  var map = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var sec = document.getElementById(id);
    if (sec) map[id] = a;
  });

  var current = null;
  function setActive(id) {
    if (id === current || !map[id]) return;
    current = id;
    links.forEach(function (a) { a.classList.remove('active'); });
    map[id].classList.add('active'); // re-adding the class replays the nudge animation
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  Object.keys(map).forEach(function (id) {
    observer.observe(document.getElementById(id));
  });
})();
