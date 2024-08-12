
var images = [
  {
    over: 'images/SJET-index-mouseHover1_6.gif',
    out: 'images/MQ-N.png'
  },
  {
    over: 'images/big-w1.jpg',
    out: 'images/bigW-index-mousehover.jpg'
  },
  {
    over: 'images/usability testing -img.jpg',
    out: "images/nsw electoral new.png"
  },
  {
    over: 'images/p4-overhead pic-1.gif',
    out: "images/kongming lantern-index.jpg"
  },
  {
    over: 'images/SJET-index-mouseHover1_1.gif',
    out: 'images/belonging-indexImg.jpg'
  }
]

function setImg(projectId,img) {
  const {over,out} = images[projectId - 1]
  document.getElementById('project' + projectId).src = images[projectId - 1][img];
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
