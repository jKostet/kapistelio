canvas = document.getElementById("gc");
canvasContext = canvas.getContext("2d");

window.onload = drawBase();


function drawBase() {
  // console.log("toimiiks canva?");
  canvasContext.fillStyle = "gray";
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
}

function updateCanvas() {
  drawBase();

  var g = coffee;
  g = g * 10;

  var img = new Image();
  img.src = "img/coffee2.png";

  img.onload = function() {
    canvasContext.drawImage(img,200,200,140,100);
  }

  canvasContext.fillStyle = "#420b0b";

  if (g <= 90) {
    canvasContext.fillRect(225,290,95,(-g));
  } else {
    canvasContext.fillRect(225,290,95,(-80));
  }

}
