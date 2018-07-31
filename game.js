// Keyboard clicks
var lines = 0;
// per second
var income = 0;

// Students
var students = 0;

// Coffee
var coffee = 0;
var coffeeCost = 10;
var coffeeBonus = 0.01;  // % bonus per student

function buyCoffee() {
  if(lines >= coffeeCost){
    lines -= coffeeCost;
    coffee++;
    updateStats();
  }
}

function hasCoffee() {

  // TODO: Students should consume the rest of the coffee
  //       in cases where there is less coffee than a cup for each student

  var cost = students * 0.1; // Each student drinks 0.1 units of coffee

  if (coffee >= cost) {
    coffee -= cost;
    coffee = Math.round(coffee * 100) / 100;
    updateStats();
    return true;
  }

  // no coffee = no bonus
  return false;
}


function keyboardClick(n) {
  n = Math.floor(n);
  lines += n;
  updateStats();
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
    }
}

function updateStats() {
  document.getElementById('cursors').innerHTML = cursors;             //updates the number of cursors for the user
  document.getElementById('lineCount').innerHTML = Math.floor(lines); //updates the number of cookies for the user
  document.getElementById('income').innerHTML = income.toFixed(2);
  document.getElementById('cursorCost').innerHTML = cursorCost;       //updates the cursor cost for the user
  document.getElementById('studentCount').innerHTML = students;
  document.getElementById('coffeeCount').innerHTML = coffee;
  updateCanvas();
}


// Save & Load
var save = {
  lines: lines,
  income: income,
  cursors: cursors,
  students: students,
  coffee: coffee
}

function saveGame() {
//  console.log("OLD:");
//  console.log(localStorage.getItem("save"));

  // Update save object
  save.lines = lines;
  save.income = income;
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
  if (typeof savegame.income !== "undefined") income = savegame.income;
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
  income = 0;
  cursors = 0;
  cursorCost = 10;
  students = 0;
  coffee = 0;
  updateStats();
}

function addStudent() {
  students++;
  updateStats();
}


// HAS TO BE AT BOTTOM?

// at page load
//updateStats();
window.onload = loadGame();

// Game
// clicks
window.setInterval(function(){

  // calculate income: loc/s
  income = cursors * cursorEfficiency;

  if(students > 0 && hasCoffee()) {
    var bonus = 1 + (coffeeBonus * students); // Production bonus +1% for each student
    income = income * bonus;
  }

  keyboardClick(income);
  updateStats();
}, 1000);

// autosave every 5s
window.setInterval(function(){
  saveGame();
}, 5000);
