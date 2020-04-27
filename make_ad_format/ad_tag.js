(function () {
  // グローバル汚染させないため、可能な限り即時関数の中に書く

  // このjsを読み込んだscriptタグを返す
  function getCurrentScript(){
      if (document.currentScript)
        return document.currentScript;

      var tagElm = document.getElementsByTagName("script");
      return tagElm[tagElm.length - 1];
  }

  var createElement = function createElement(){
      var div = document.createElement("div");
          div.id = "div_elm";
      var atag = document.createElement("a");
          atag.href = "https://geniee.co.jp/";
          atag.target = "_blank";
      var img = document.createElement("img");
          img.id = "div_elm_img"
          img.src = "ad_320_100.png"
          img.height = "100"
          img.width = "320"

      atag.appendChild(img);
      div.appendChild(atag);      

      var script = getCurrentScript();
      script.parentNode.insertBefore(div, script.nextElementSibling);
  }

  var overlay = function overlay(){
      var div = document.getElementById('div_elm');
          div.style = "position: fixed; display: block; width: 100%; height: 100px; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 2;";

      var img = document.getElementById('div_elm_img');
          img.style = "display: block; margin-left: auto; margin-right: auto;";

      var imgBtn = document.createElement("img");
          imgBtn.id = "div_elem_closebtn"
          imgBtn.src = "close.png";
          imgBtn.height = "24"
          imgBtn.width = "24"
          imgBtn.style = "position: absolute; right: 0px; top: 0px;";
          // imgBtn.setAttribute("onclick", "closeBtn();");

      div.appendChild(imgBtn);

      imgBtn.addEventListener("click", function(i) {
        document.getElementById('div_elm').style = "display: none;";
      });
  }

  // var ua = navigator.userAgent.toLocaleLowerCase();
  // if(/ipad|iphone|ipod/.test(ua) || ua.indexOf("android") !== -1){
  //   console.log("orj bnbal bal");
  //     createElement();
  //     overlay();
  // } else {
  //     console.log("orj bn123");
  //     createElement();
  // }  

  // let last_known_scroll_position = 0;
  let ticking = true;
  setTimeout(() => { ticking = false; }, 2000);
  window.addEventListener('scroll', function(e) {
    // last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {

          var ua = navigator.userAgent.toLocaleLowerCase();
          if(/ipad|iphone|ipod/.test(ua) || ua.indexOf("android") !== -1){
              createElement();
              overlay();
          } else {
              createElement();
          }  
          // ticking = false;
      });
  
      ticking = true;
    }
  });

})();
// この下には何も書かないこと