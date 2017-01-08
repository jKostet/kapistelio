

// Keyboard clicks
var clicks = 0;

function keyboardClick(n) {
  clicks += n;
  document.getElementById("clicks").innerHTML = clicks;
}
