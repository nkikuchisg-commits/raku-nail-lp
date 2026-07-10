/* app.js — 動くハンバーガー ＋ スクロール表示 ＋ サンプルフォーム
   （品質下限：置いた部品は必ず動く。フォームはサンプルのため送信しない） */
(function () {
  /* ---- ハンバーガーメニュー（aria-expanded を切替＝読み上げにも状態が伝わる） ---- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1024) setOpen(false); });
  }

  /* ---- スクロールで各セクションをふわっと表示 ---- */
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('on'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { threshold: .14 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- サンプル問い合わせフォーム（本番では送信を実装。ここでは送らず案内のみ） ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('form-msg');
      if (msg) {
        msg.hidden = false;
        msg.focus();
      }
      form.querySelector('button[type="submit"]').disabled = true;
    });
  }
})();
