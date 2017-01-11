// Keyboard clicks
var lines = 0;

function keyboardClick(n) {
  lines += n;
  document.getElementById("lineCount").innerHTML = lines;
}

// Cursors
var cursors = 0;
var cursorEfficiency = 0.5;
var cursorCost = 10;

function buyCursor(){
    if(lines >= cursorCost){                                     //checks that the player can afford the cursor
      cursors = cursors + 1;                                     //increases number of cursors
      lines -= cursorCost;                                       //removes the LinesOfCode spent
      cursorCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor

      updateStats();
    };
};

function updateStats() {
  document.getElementById('cursors').innerHTML = cursors;       //updates the number of cursors for the user
  document.getElementById('lineCount').innerHTML = lines;       //updates the number of cookies for the user
  //document.getElementById('cursorCost').innerHTML = nextCost;   //updates the cursor cost for the user
  document.getElementById('cursorCost').innerHTML = cursorCost;   //updates the cursor cost for the user
}

// at page load
updateStats();


// Game
window.setInterval(function(){
  var c = cursors * cursorEfficiency;
  keyboardClick(c)
}, 1000);

// Save & Load
var save = {
  lines: lines,
  cursors: cursors
}

function saveGame() {
//  console.log("OLD:");
//  console.log(localStorage.getItem("save"));

  // Update save object
  save.lines = lines;
  save.cursors = cursors;

  localStorage.setItem("save", JSON.stringify(save));

//  console.log("NEW:");
//  console.log(localStorage.getItem("save"));
}

function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("save"));

  // futureproofing
  if (typeof savegame.lines !== "undefined") lines = savegame.lines;
  if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
  updateStats();
}

function destroySave() {
  localStorage.removeItem("save")
}

// Dev
function reset() {
  lines = 0;
  cursors = 0;
  cursorCost = 10;
  updateStats();
}
