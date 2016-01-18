$(function(){
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/sw.js').then(function(registration) {
      // 登録成功
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // 登録失敗 :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }

  $("#cachedMethodButton").on("click", function(){
    var $logDiv = $("<div class='log cached'></div>");
    $(".output").append($logDiv.append(cachedFunc()));
  });

  $("#uncachedMethodButton").on("click", function(){
    var $logDiv = $("<div class='log uncached'></div>");
    $(".output").append($logDiv.append(uncachedFunc()));
  });
});
