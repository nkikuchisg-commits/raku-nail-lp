/* instagram.js — ②「投稿の埋め込み」用の最小JS
   ・Instagram の embed.js は重いので、セクションが画面に近づいてから読み込む
     （表示速度＝品質下限のモバイル80点を守るため）
   ・②を使わない（.instagram-media が無い）ページでは何もしない
   使い方：埋め込みたい投稿の <blockquote class="instagram-media" …> を置き、
           このファイルを読み込むだけ。 */
(function () {
  if (!document.querySelector('.instagram-media')) return;

  var loaded = false;
  function loadEmbed() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.instagram.com/embed.js';
    // 既に読み込み済みなら再処理だけ促す
    s.onload = function () {
      if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
    };
    document.body.appendChild(s);
  }

  var target = document.querySelector('.ig-embeds') || document.querySelector('.instagram-media');
  if ('IntersectionObserver' in window && target) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) {
        loadEmbed();
        io.disconnect();
      }
    }, { rootMargin: '300px' });
    io.observe(target);
  } else {
    loadEmbed();
  }
})();
