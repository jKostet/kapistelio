// Keyboard clicks
var lines = 0;

// Students
var students = 0;


// Coffee
var coffee = 0;
var coffeeCost = 10;

function buyCoffee() {
  if(lines >= coffeeCost){
    lines -= coffeeCost;
    coffee++;
    updateStats();
  }
}

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
  document.getElementById('studentCount').innerHTML = students;
  document.getElementById('coffeeCount').innerHTML = coffee;
}


// Save & Load
var save = {
  lines: lines,
  cursors: cursors,
  students: students,
  coffee: coffee
}

function saveGame() {
//  console.log("OLD:");
//  console.log(localStorage.getItem("save"));

  // Update save object
  save.lines = lines;
  save.cursors = cursors;
  save.students = students;
  save.coffee = coffee;

  localStorage.setItem("save", JSON.stringify(save));

//  console.log("NEW:");
//  console.log(localStorage.getItem("save"));
}

function loadGame() {
  var savegame = JSON.parse(localStorage.getItem("save"));

  // futureproofing
  if (typeof savegame.lines !== "undefined") lines = savegame.lines;
  if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
  if (typeof savegame.students !== "undefined") students = savegame.students;
  if (typeof savegame.coffee !== "undefined") coffee = savegame.coffee;
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
  students = 0;
  coffee = 0;
  updateStats();
}


// HAS TO BE AT BOTTOM?

// at page load
//updateStats();
loadGame();

// Game
// clicks
window.setInterval(function(){
  var c = cursors * cursorEfficiency;
  keyboardClick(c)
}, 1000);

// autosave every 5s
window.setInterval(function(){
  saveGame();
}, 5000);
