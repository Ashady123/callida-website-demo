/**
 * Callida custom cursor — FLX-style magnetic ring + states.
 * Colors adapt: dark page areas → yellow accent; light areas → Callida navy.
 * Skipped on coarse pointers (touch).
 */
(function initCallidaCursor() {
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
  if (document.getElementById('callida-cursor')) return;

  function parseRgb(str) {
    if (!str || str === 'transparent') return null;
    var m = String(str).match(
      /rgba?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/
    );
    if (!m) return null;
    return {
      r: +m[1],
      g: +m[2],
      b: +m[3],
      a: m[4] !== undefined ? +m[4] : 1,
    };
  }

  function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  /** true = light background under pointer → use navy cursor */
  function isLightBackgroundAt(x, y) {
    var hit = document.elementFromPoint(x, y);
    if (hit && hit.closest) {
      if (hit.closest('nav.nav.dark:not(.scrolled)')) return false;
      if (hit.closest('header.hero')) return false;
      if (hit.closest('.section.dark, .services')) return false;
      if (hit.closest('.cta-footer')) return false;
      if (hit.closest('.case-modal-backdrop')) return false;
    }
    var el = hit;
    var depth = 0;
    while (el && el !== document.documentElement && depth < 28) {
      if (el.nodeType !== 1) {
        el = el.parentElement;
        continue;
      }
      if (el.id === 'callida-cursor') {
        el = el.parentElement;
        continue;
      }
      var attr = el.getAttribute && el.getAttribute('data-callida-cursor-bg');
      if (attr === 'light') return true;
      if (attr === 'dark') return false;

      var cs = window.getComputedStyle(el);
      var bg = cs.backgroundColor;
      var rgb = parseRgb(bg);
      if (rgb && rgb.a > 0.06) {
        return luminance(rgb.r, rgb.g, rgb.b) > 0.52;
      }
      el = el.parentElement;
      depth++;
    }
    var hb = window.getComputedStyle(document.documentElement).backgroundColor;
    var hr = parseRgb(hb);
    if (hr && hr.a > 0.06) {
      return luminance(hr.r, hr.g, hr.b) > 0.52;
    }
    return true;
  }

  var cursor = document.createElement('div');
  cursor.id = 'callida-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<div class="callida-cur-dot"></div><div class="callida-cur-ring"></div>';
  document.body.appendChild(cursor);

  var curDot = cursor.querySelector('.callida-cur-dot');
  var curRing = cursor.querySelector('.callida-cur-ring');
  var mx = -100;
  var my = -100;
  var rx = -100;
  var ry = -100;
  var schemeRaf = 0;

  var cursorStyle = document.createElement('style');
  cursorStyle.textContent =
    '@media (pointer: fine) {' +
    '* { cursor: none !important; }' +
    '#callida-cursor {' +
    'position: fixed; top: 0; left: 0; z-index: 10050; pointer-events: none;' +
    '--cc-solid: #F2DC4B;' +
    '--cc-ring: rgba(242,220,75,0.5);' +
    '--cc-ring-strong: rgba(242,220,75,0.8);' +
    '--cc-fill-cta: rgba(242,220,75,0.15);' +
    '--cc-border-cta: #F2DC4B;' +
    '--cc-fill-img: rgba(242,220,75,0.08);' +
    '--cc-border-img: rgba(242,220,75,0.4);' +
    '}' +
    'body.callida-cursor-on-light #callida-cursor {' +
    '--cc-solid: #1B2028;' +
    '--cc-ring: rgba(27,32,40,0.42);' +
    '--cc-ring-strong: rgba(27,32,40,0.72);' +
    '--cc-fill-cta: rgba(27,32,40,0.1);' +
    '--cc-border-cta: #1B2028;' +
    '--cc-fill-img: rgba(27,32,40,0.07);' +
    '--cc-border-img: rgba(27,32,40,0.38);' +
    '}' +
    '#callida-cursor .callida-cur-dot {' +
    'position: fixed; width: 6px; height: 6px; background: var(--cc-solid); border-radius: 50%;' +
    'border: 0 solid transparent;' +
    'transform: translate(-50%,-50%);' +
    'transition: width 0.2s, height 0.2s, background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;' +
    'will-change: transform;' +
    '}' +
    '#callida-cursor .callida-cur-ring {' +
    'position: fixed; width: 36px; height: 36px; border: 1.5px solid var(--cc-ring); border-radius: 50%;' +
    'transform: translate(-50%,-50%);' +
    'transition: width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1),' +
    'border-color 0.2s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease;' +
    'will-change: transform;' +
    '}' +
    'body.cursor-hover #callida-cursor .callida-cur-dot { width: 10px; height: 10px; background: var(--cc-solid); }' +
    'body.cursor-hover #callida-cursor .callida-cur-ring { width: 56px; height: 56px; border-color: var(--cc-ring-strong); }' +
    'body.cursor-cta #callida-cursor .callida-cur-dot {' +
    'width: 48px; height: 48px; background: var(--cc-fill-cta); border: 1.5px solid var(--cc-border-cta);' +
    '}' +
    'body.cursor-cta #callida-cursor .callida-cur-ring { width: 0; height: 0; opacity: 0; }' +
    'body.cursor-img #callida-cursor .callida-cur-dot {' +
    'width: 64px; height: 64px; background: var(--cc-fill-img); border: 1px solid var(--cc-border-img);' +
    '}' +
    'body.cursor-img #callida-cursor .callida-cur-ring { opacity: 0; }' +
    '}' +
    '@media (pointer: coarse) {' +
    '#callida-cursor { display: none !important; }' +
    '}';
  document.head.appendChild(cursorStyle);

  function syncScheme() {
    schemeRaf = 0;
    var light = isLightBackgroundAt(mx, my);
    document.body.classList.toggle('callida-cursor-on-light', light);
  }

  document.addEventListener(
    'mousemove',
    function (e) {
      mx = e.clientX;
      my = e.clientY;
      curDot.style.left = mx + 'px';
      curDot.style.top = my + 'px';
      if (!schemeRaf) {
        schemeRaf = requestAnimationFrame(syncScheme);
      }
    },
    { passive: true }
  );

  function lerpCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    curRing.style.left = rx + 'px';
    curRing.style.top = ry + 'px';
    requestAnimationFrame(lerpCursor);
  }
  requestAnimationFrame(lerpCursor);

  function bindHover(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  function bindCta(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.remove('cursor-hover');
        document.body.classList.add('cursor-cta');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-cta');
      });
    });
  }

  function bindImg(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-img');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-img');
      });
    });
  }

  function bindMarqueeCards(root) {
    if (!root) return;
    root.querySelectorAll('.clients-marquee__card').forEach(function (el) {
      if (el.dataset.callidaCursorBound) return;
      el.dataset.callidaCursorBound = '1';
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-hover');
        document.body.classList.add('cursor-img');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-hover');
        document.body.classList.remove('cursor-img');
      });
    });
  }

  bindHover(
    'a, button, [role="button"], .service-link, select, label[for]'
  );
  bindCta('.btn, .nav-cta, button[type="submit"], input[type="submit"]');
  bindImg('.hero-image, .case-studies-slide-media');

  var marqueeRow = document.querySelector('[data-clients-marquee-row]');
  bindMarqueeCards(marqueeRow);
  if (marqueeRow && window.MutationObserver) {
    new MutationObserver(function () {
      bindMarqueeCards(marqueeRow);
    }).observe(marqueeRow, { childList: true });
  }

  syncScheme();
})();
