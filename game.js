

// Keyboard clicks
var lines = 0;

function keyboardClick(n) {
  lines += n;
  document.getElementById("lineCount").innerHTML = lines;
}

// Cursors
var cursors = 0;
var cursorEfficiency = 0.5;

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(lines >= cursorCost){                                     //checks that the player can afford the cursor
      cursors = cursors + 1;                                     //increases number of cursors
	    lines  -= cursorCost;                                      //removes the cookies spent
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    updateCursorStats();
};

function updateCursorStats() {
  document.getElementById('cursors').innerHTML = cursors;       //updates the number of cursors for the user
  document.getElementById('lineCount').innerHTML = lines;       //updates the number of cookies for the user
  document.getElementById('cursorCost').innerHTML = nextCost;   //updates the cursor cost for the user
}

// Game
window.setInterval(function(){
  var c = cursors * cursorEfficiency;
  keyboardClick(c)
}, 1000);

// Dev
function reset() {
  lines = 0;
  cursors = 0;
  updateCursorStats();
}
