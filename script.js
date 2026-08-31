/* =====================================================
   个人网站脚本:主题切换、导航、打字机、滚动动画
   ===================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 深浅色主题 ---------- */
  var themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* 隐私模式下忽略 */ }
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (systemDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* 忽略 */ }
    });
  }

  /* ---------- 顶部导航:阴影 + 移动端菜单 ---------- */
  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeMenu() {
    document.body.classList.remove("menu-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- 回到顶部 ---------- */
  var backTop = document.getElementById("backTop");

  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (backTop) backTop.classList.toggle("show", y > 600);
  }, { passive: true });

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- 首屏打字机效果 ---------- */
  var typed = document.getElementById("typed");
  var roles = ["全栈开发者", "设计爱好者", "开源贡献者", "终身学习者"];

  if (typed) {
    if (prefersReduced) {
      typed.textContent = roles[0];
    } else {
      var ri = 0, ci = 0, deleting = false;
      (function tick() {
        var word = roles[ri];
        ci += deleting ? -1 : 1;
        typed.textContent = word.slice(0, ci);
        var delay = deleting ? 70 : 140;
        if (!deleting && ci === word.length) { delay = 1800; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 380; }
        setTimeout(tick, delay);
      })();
    }
  }

  /* ---------- 滚动浮现动画 ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 导航高亮当前板块 ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var links = document.querySelectorAll(".nav-link");
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
