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

var lastIndex = -1, lastPercent = 1, lastTime = 0;
function scrollTo(index){

  var sudoTop = document.getElementById('header').getBoundingClientRect().height - 1;
  for(var i = 0; i < pages.length; i++){
    if(index == lastIndex && i === index && (Date.now() - lastTime) > 100){
      pages[i].className = 'page snap';
      buttons[i].className = 'button error';
      pages[i].style.top =  (sudoTop + (lastPercent * screen.height) - (((lastPercent * screen.height) * ((Date.now() - lastTime) / 800)))) + 'px';
      lastIndex = -1;
    }
    else {
      pages[i].className = 'page';
      if(i == index){
        pages[i].style.top = sudoTop+'px';
        buttons[i].className = 'button active';
        lastIndex = index;
        lastPercent = (pages[i].getBoundingClientRect().top - sudoTop) / screen.height;
      }
      else {
        pages[i].style.top = (screen.height + sudoTop) + 'px';
        buttons[i].className = 'button';
      }
    }
  }
  lastTime = Date.now();
}

scrollTo(0);
