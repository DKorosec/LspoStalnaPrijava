const second = 1000;
const variate = second * 10;

function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange =  () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}

function trySendRequestLoop(){
  
  var time = second * 50 + Math.floor(Math.random()*variate);
  chrome.tabs.query({
  }, (tabs) => {
    for (var tab of tabs) {
      var url = tab.url;
      if (url.includes('vaje.um.si') || url.includes('vaje.uni-mb.si')) {
        httpGetAsync("https://vaje.um.si/vaje/new/vaje.jsp",(data)=>console.log("ping send!"));
        return;
      }
    }
    console.log("vaje uni not found in tabs!");
  });
  console.log(`resending in ${time/1000} seconds!`);
  setTimeout(trySendRequestLoop,time);
}

trySendRequestLoop();
