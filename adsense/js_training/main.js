// ページの読み込みが完了したらloadイベントが発火され、第二引数の関数が実行される。
window.addEventListener("load", function () {
  console.log("ページの読み込みが完了しました。");

  Q1();
  Q2();
  Q3();
  Q4();
  Q5();
  Q6();
  Q7();
  Q8();
  Q9();
  Q10();
});

function Q1() {
  var dom_q1;

  console.log(document.getElementById('id_q1').title);
}

function Q2() {

  document.getElementById('dom_q2').width = document.getElementById('dom_q2').height;
}

function Q3() {
  //document.getElementById('dom_q3').style.width = "100%";
  document.getElementById('dom_q3').href = "https://geniee.co.jp/";
  document.getElementById('dom_q3').children[0].width = 300;
  document.getElementById('dom_q3').children[0].height = 250;
}

function Q4() {
  var dom_q4 = document.getElementById('dom_q4');
  dom_q4.style = "border: 2px solid black; position: relative; width: 98%; height: 130px;"

  dom_q4.children[0].children[1] .style.textDecoration = "underline";

  var element = dom_q4.children[0].children[2];
  var style = window.getComputedStyle(element , null).getPropertyValue('font-size');
  var fontSize = parseFloat(style); 
  element.style.fontSize = (fontSize - 6) + 'px';
  element.style.color = "#AAAAAA";

  element.style.position = "absolute";
  element.style.left = "130px";
  element.style.bottom = "10px"
}

function Q5() {
  document.getElementById('dom_q5').innerHTML = '<img src="geniee.jpg" width="128" height="128">';
}

function Q6() {
  var div = document.createElement("div");
      div.id = "dom_q6";
  var atag = document.createElement("a");
      atag.href = "https://geniee.co.jp/";
      atag.target = "_blank";
  var img = document.createElement("img");
      img.src = "geniee.jpg"
      img.height = "128";
      img.width = "128";

  atag.appendChild(img);
  div.appendChild(atag);

  var p_q6 = document.getElementById("p_q6");
  p_q6.parentNode.insertBefore(div, p_q6.nextSibling);

  // document.getElementById('p_q6').appendChild(div);
}

function Q7() {
  var dom_q7 = document.getElementById('dom_q7');
  dom_q7.style.position = "relative";

  dom_q7.children[0].children[0].style = "position: absolute; left: 50%; transform: translate(-50%, -50%);";
}

function Q8() {
  document.getElementById('dom_q8').addEventListener("click", function(i) {
    document.getElementById('dom_q8').style = "display: none;";
  });
}

function Q9() {
  if(navigator.userAgent.indexOf("Android") !== -1){
    document.getElementById('dom_q9').style = "display: inline;";
  } else {
    document.getElementById('dom_q9').style = "display: none;";
  }

}

function Q10() {
  // console.log(navigator.userAgent);
  if(navigator.userAgent.indexOf("Chrome") !== -1 || navigator.userAgent.indexOf("Edge") !== -1){
    document.getElementById('dom_q10').src = "ad_300_250.png";
    document.getElementById('dom_q10').height = "300";
    document.getElementById('dom_q10').width = "250";
  } else if(navigator.userAgent.indexOf("Safari") !== -1 || navigator.userAgent.indexOf("MSIE ") !== -1) {
  //} else if(navigator.userAgent.indexOf("Microsoft Internet Explorer") !== -1) {
    document.getElementById('dom_q10').style = "display: none;";
  }
}