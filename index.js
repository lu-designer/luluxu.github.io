
var images = [
  {
    over: 'images/SJET-index-mouseHover1_6.gif',
    out: 'images/MQ-N.png'
  },
  {
    over: 'images/big-w1.png',
    out: 'images/bigW-index-mousehover.png'
  },
  {
    over: 'images/usability testing -img.png',
    out: "images/nsw electoral new.png"
  },
  {
    over: 'images/p4-overhead pic-1.gif',
    out: "images/kongming lantern-index.png"
  },
  {
    over: 'images/SJET-index-mouseHover1_1.gif',
    out: 'images/belonging-indexImg.png'
  }
]

function setImg(projectId,img) {
  const {over,out} = images[projectId - 1]
  document.getElementById('projectAnimation' + projectId).src = images[projectId - 1][img];
}

function preloadImages(){
  images.forEach((item, i) => {
      var i = new Image();
      console.log(item.over)
      i.src = item.over;
  });
}

(function(){
  preloadImages();
})()
