if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/main.js').then(function(registration) {
    // 登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // 登録失敗 :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/css/cache.css',
  '/js/main.js',
  '/js/cache.js'
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

$("#cachedMethodButton").on("click", function(){
  var $logDiv = $("<div class='log cached'></div>");
  $(".output").append($logDiv.append(cachedFunc()));
});

$("#uncachedMethodButton").on("click", function(){
  var $logDiv = $("<div class='log uncached'></div>");
  $(".output").append($logDiv.append(uncachedFunc()));
});
