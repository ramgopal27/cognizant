console.log("Welcome to the Community Portal");

window.onload = () => alert("Page fully loaded");

const eventName = "Community Music Fest";
const eventDate = "2025-06-10";
let availableSeats = 50;
console.log(
  `Event: ${eventName}, Date: ${eventDate}, Seats: ${availableSeats}`
);

const events = [
  { name: "Music Fest", date: "2025-06-10", seats: 10, category: "Music" },
  { name: "Art Expo", date: "2024-05-10", seats: 0, category: "Art" },
  { name: "Tech Talk", date: "2025-07-20", seats: 30, category: "Tech" },
];

events.forEach((event) => {
  if (new Date(event.date) > new Date() && event.seats > 0) {
    console.log(`${event.name} is available`);
  }
});

function registerUser(event) {
  try {
    if (event.seats <= 0) throw "No seats available";
    event.seats--;
    console.log(`Registered for ${event.name}`);
  } catch (err) {
    console.error(err);
  }
}

function addEvent(name, date, seats, category) {
  events.push({ name, date, seats, category });
}

const registrationTracker = (function () {
  const registrations = {};
  return function (category) {
    registrations[category] = (registrations[category] || 0) + 1;
    console.log(`Total in ${category}: ${registrations[category]}`);
  };
})();

function filterEventsByCategory(category, callback) {
  const filtered = events.filter((e) => e.category === category);
  callback(filtered);
}

function Event(name, date, seats) {
  this.name = name;
  this.date = date;
  this.seats = seats;
}

Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

const artEvent = new Event("Art Camp", "2025-08-10", 15);
console.log(Object.entries(artEvent));

const musicEvents = events.filter((e) => e.name.includes("Music"));
const displayCards = events.map((e) => `Workshop on ${e.name}`);

const container = document.querySelector("#eventContainer");
events.forEach((e) => {
  const card = document.createElement("div");
  card.className = "event-card";
  card.textContent = `${e.name} - ${e.date}`;
  container.appendChild(card);
});

document.querySelectorAll(".register-btn").forEach((btn) => {
  btn.onclick = () => alert("Registered!");
});

document.querySelector("#categoryFilter").onchange = (e) => {
  filterEventsByCategory(e.target.value, (filtered) => console.log(filtered));
};

document.querySelector("#searchBox").onkeydown = (e) => {
  if (e.key === "Enter") console.log("Searching:", e.target.value);
};

function fetchEvents() {
  fetch("https://mockapi.io/events")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}

async function loadEventsAsync() {
  document.querySelector("#loading").style.display = "block";
  try {
    const res = await fetch("https://mockapi.io/events");
    const data = await res.json();
    console.log(data);
  } finally {
    document.querySelector("#loading").style.display = "none";
  }
}

function printEvent({ name, date, seats = 0 }) {
  console.log(`${name} on ${date} with ${seats} seats`);
}

const clonedEvents = [...events];

document.querySelector("#regForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const { name, email, event: selectedEvent } = e.target.elements;
  if (!name.value || !email.value) {
    alert("All fields are required!");
  } else {
    console.log(
      `Name: ${name.value}, Email: ${email.value}, Event: ${selectedEvent.value}`
    );
  }
});

function postRegistration(data) {
  document.querySelector("#status").textContent = "Submitting...";
  setTimeout(() => {
    fetch("https://mockapi.io/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        document.querySelector("#status").textContent = "Success!";
        console.log(result);
      })
      .catch(() => {
        document.querySelector("#status").textContent = "Error!";
      });
  }, 1000);
}

function debugSubmitForm() {
  const data = { name: "Test", event: "Debug Event" };
  console.log("Submitting:", data);
  fetch("https://mockapi.io/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((res) => console.log("Response received"));
}

$(document).ready(function () {
  $("#registerBtn").click(() => alert("Registered via jQuery"));
  $(".event-card").fadeIn(500);
  console.log(
    "Frameworks like React simplify state management and UI rendering."
  );
});
