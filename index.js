var pages = [
  document.getElementById('aboutPage'),
  document.getElementById('resumePage'),
  document.getElementById('projectsPage')
];

var buttons = [
  document.getElementById('aboutButton'),
  document.getElementById('resumeButton'),
  document.getElementById('projectsButton')
];

function point(x, y){
  return {x: x, y: y};
}
function lerp1(a, b, t){
  return a + ((b - a) * t);
}
function lerp2(a, b, t){
  return point(lerp1(a.x,b.x,t), lerp1(a.y,b.y,t));
}
function cubicBezier(a, b, t){
  var p1 = lerp2(point(0,0), a, t);
  var p2 = lerp2(b, point(1,1), t);
  console.log(p1,p2,t)
  return lerp2(p1, p2, t);
}
var lastIndex = -1, lastPercent = 1, lastTime = 0;
function scrollToTab(index){

  var t = (Date.now() - lastTime) / 1200;
  if(t < .2)
    return;

  if(index == lastIndex && t < 1){
    var percent = cubicBezier(point(0, 0.75), point(1, .25), t);
    lastIndex = -1;
    for(var i = 0; i < pages.length; i++){
        pages[i].className = 'page snap';
        buttons[i].className = 'button error';
        pages[i].style.top = lerp1(pages[i].from, pages[i].to, percent.y) + 'px';
    }
  }
  else {
    var sudoTop = document.getElementById('header').getBoundingClientRect().height - 1;
    for(var i = 0; i < pages.length; i++){
      pages[i].className = 'page';
      pages[i].from = pages[i].getBoundingClientRect().top;
      if(i == index){
        pages[i].to = sudoTop;
        buttons[i].className = 'button active';
        lastIndex = index;
      }
      else {
        pages[i].to = (screen.height + sudoTop);
        buttons[i].className = 'button';
      }
      pages[i].style.top = pages[i].to + 'px';
    }
  }
  lastTime = Date.now();
}

scrollToTab(0);
