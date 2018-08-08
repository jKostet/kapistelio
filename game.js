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
    updateCanvas(); // show rise in coffee level
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
    updateCanvas(); // show decrease in coffee level
    return true;
  }

  // no coffee = no bonus
  return false;
}


function keyboardClick(n) {
  n = Math.floor(n);
  // TODO: Save income decimals
  // n = n.toFixed(2);
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
  //updateCanvas(); // canvas should only update when needed.
                    // atm that's only when coffee amount changes
}


// Save & Load
var save = {
  lines: lines,
  income: income,
  cursors: cursors,
  students: students,
  coffee: coffee,
  time: -1,
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
  save.time = Date.now();

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

  checkOfflineProgress(savegame.time);
}

function checkOfflineProgress(saveTime) {
  // Players gain 30% offline income for maximum of 72 hours.
  var timeNow = Date.now();
  var timeOffline = timeNow - saveTime;

  var maxTimeOffine = 72*60*60*100; // 72 hours to milliseconds

  if (timeOffline > maxTimeOffine) {

  }


}

function destroySave() {
  confirmation = confirm("This will destroy your save. Are you sure?");
  console.log(confirmation);
  if (confirmation) {
    localStorage.removeItem("save");
  }
}

// Dev
function resetGameState() {
  confirmation = confirm("This will reset the game. Are you sure?");
  console.log(confirmation);
  if (confirmation) {
    lines = 0;
    income = 0;
    cursors = 0;
    cursorCost = 10;
    students = 0;
    coffee = 0;
    updateStats();
  }
}

function addStudent() {
  students++;
  updateStats();
}


// HAS TO BE AT BOTTOM?

// at page load
// updateStats();
// window.onload = loadGame();

function calculateIncomeBonuses() {
  var incomeWithBonus = income;

  // Coffee bonus
  if(students > 0 && hasCoffee()) {
    var bonus = 1 + (coffeeBonus * students); // Production +1% for each student
    incomeWithBonus = income * bonus;  
  }

  return incomeWithBonus;

}


// Game
// clicks
window.setInterval(function(){

  // calculate income: loc/s
  income = cursors * cursorEfficiency;

  income = calculateIncomeBonuses()

  keyboardClick(income);
  updateStats();
}, 1000);

// autosave every 5s
window.setInterval(function(){
  saveGame();
}, 5000);
