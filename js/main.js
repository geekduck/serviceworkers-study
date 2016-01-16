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
  console.dir(event);
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

self.addEventListener('fetch', function(event) {
  console.dir(event);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあったのでレスポンスを返す
        if (response) {
          return response;
        }

        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(function(response) {
            // レスポンスが正しいかをチェック
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});
