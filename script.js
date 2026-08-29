"use strict";

console.log("WELCOME TO MY PERFECT DAY");

/* ---------------- DATA ---------------- */
let foodOptions = ["Pizza", "Burger", "Sushi", "Salad"];
let activityOptions = ["Hiking", "Movies", "Bowling", "Swimming"];
let moodOptions = ["Relaxed", "Energetic", "Adventurous", "Chill"];
let budgetOptions = ["Low", "Medium", "High"];

let num = 0;              // total participants
let i = 0;                // current participant index
let currentName = "";
let participants = [];

/* ---------------- DOM REFS ---------------- */
const homeDiv = document.getElementById("home");
const peopleStepDiv = document.getElementById("people-step");
const nameStepDiv = document.getElementById("name-step");
const preferencesDiv = document.getElementById("preferences");
const resultDiv = document.getElementById("result");

const peopleInput = document.getElementById("people");
const nameInput = document.getElementById("name-input");
const nameHeading = document.getElementById("name-heading");
const personHeading = document.getElementById("person-heading");
const optionButtons = document.querySelectorAll(".option-btn");

/* ---------------- STEP 1: HOME ---------------- */
function start() {
  homeDiv.style.display = "none";
  peopleStepDiv.style.display = "block";
}

/* ---------------- STEP 2: NUMBER OF PARTICIPANTS ---------------- */

function next() {
  const value = Number(peopleInput.value);

  if (isNaN(value) || value < 1 || value > 10) {
    alert("PARTICIPANTS MUST BE BETWEEN 1 AND 10, PLZ RE-ENTER");
    return;
  }

  num = value;
  participants = [];
  i = 0;

  peopleStepDiv.style.display = "none";
  goToNameStep();
}

/* ---------------- STEP 3: NAME ENTRY (per participant) ---------------- */
function goToNameStep() {
  nameHeading.textContent = `Participant ${i + 1}`;
  nameInput.value = "";
  nameStepDiv.style.display = "block";
}

function submitName() {
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  currentName = name;
  nameStepDiv.style.display = "none";
  preferencesDiv.style.display = "block";
  renderPerson();
}

/* ---------------- STEP 4: PREFERENCES (per participant) ---------------- */
function renderPerson() {
  personHeading.textContent = `Enter your preferences, ${currentName}`;
  optionButtons.forEach((btn) => btn.classList.remove("selected"));
}

optionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    document
      .querySelectorAll(`.option-btn[data-category="${category}"]`)
      .forEach((b) => b.classList.remove("selected"));

    btn.classList.add("selected");
  });
});

function nextPerson() {
  const food = document.querySelector('.option-btn[data-category="food"].selected');
  const activity = document.querySelector('.option-btn[data-category="activity"].selected');
  const mood = document.querySelector('.option-btn[data-category="mood"].selected');
  const budget = document.querySelector('.option-btn[data-category="budget"].selected');

  if (!food || !activity || !mood || !budget) {
    alert("PLZ RE-ENTER, PICK ONE OPTION IN EACH CATEGORY");
    return;
  }

  let person = {
    name: currentName,
    food: food.textContent,
    activity: activity.textContent,
    mood: mood.textContent,
    budget: budget.textContent,
  };
  participants.push(person);

  i++;

  if (i < num) {
    preferencesDiv.style.display = "none";
    goToNameStep();
  } else {
    console.log("Just a sec… the app is putting on its thinking cap 🧠✨");
    console.log(participants);
    preferencesDiv.style.display = "none";
    showResults();
  }
}

/* ---------------- STEP 5: RESULTS ---------------- */
function tally(category) {
  const counts = {};
  participants.forEach((p) => {
    const val = p[category];
    counts[val] = (counts[val] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const [winner, winnerCount] = sorted[0];
  const minority = sorted.slice(1).map(([val]) => val);

  return { winner, winnerCount, minority, total: participants.length, tieCount: sorted.length };
}

function describeResult(category) {
  const t = tally(category);

  if (t.tieCount === 1) {
    return `Everyone picked ${t.winner}.`;
  }

  let text = `${t.winner} (${t.winnerCount} of ${t.total} votes).`;
  if (t.minority.length > 0) {
    text += ` A few of you wanted ${t.minority.join(" or ")} instead — worth mixing in if you can.`;
  }
  return text;
}

function showResults() {
  resultDiv.style.display = "block";

  document.getElementById("food-result").textContent = describeResult("food");
  document.getElementById("activity-result").textContent = describeResult("activity");
  document.getElementById("mood-result").textContent = describeResult("mood");
  document.getElementById("budget-result").textContent = describeResult("budget");
}

/* ---------------- RESTART ---------------- */
function restart() {
  num = 0;
  i = 0;
  currentName = "";
  participants = [];
  peopleInput.value = "";
  optionButtons.forEach((btn) => btn.classList.remove("selected"));
  resultDiv.style.display = "none";
  homeDiv.style.display = "block";
}