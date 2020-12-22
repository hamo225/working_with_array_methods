// Select all DOM elements we need
// main
const main = document.getElementById("main");

// add users
const addUser = document.getElementById("add_user");

// double money
const doubleMoneybtn = document.getElementById("double_money");

// show only millionaires
const showMillionaires = document.getElementById("show_millionaires");

// sort by Richest
const sort = document.getElementById("sort");

// Calculate total net worth
const netWorth = document.getElementById("net_worth");

// initialise an array where we want to put the data pulled from the 3rd part resource- all the random people. We will loop over this later.
let data = [];

// Fetch random users first and last name and then add money using async await - with async you do not need to chain togethe the .then methods. allows us to make asynchronous requests in a cleaner way than with .then syntax.
async function getRandomUser() {
  // fetching from the url and putting it into a variable
  const res = await fetch("https://randomuser.me/api");
  // converting the data fetched into json and storing it in a new data variable
  const data = await res.json();

  // creating a user variable of the first index in the data results array
  const user = data.results[0];
  // create a new user object with only the data we want, the names and the money
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  // add new user data to the global data array above
  addData(newUser);
}

// Updating the DOM
// need a default value if we do not pass any parameters. so we make the default value as the data array
function updateDom(providedData = data) {
  // clear main div first
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  // take data and loop through with foreach
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// add new object to Data Array
function addData(obj) {
  data.push(obj);

  // at the same time we want to update the UI and the DOM
  updateDom();
}

// Format Number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double your Money
// map loops through an array and returns an array. .map takes in a function
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

// Sort users by Richest - does not create a new array
function sortrichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDom();
}

// filter for millionaires - filter method creats a new array
function showOnlyMillionaires() {
  data = data.filter((item) => {
    return item.money >= 1000000;
  });

  updateDom();
}

// Calculate net wealth
function calcnetwealth() {
  const total = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: ${formatMoney(total)}</h3>`;
  main.appendChild(wealthEl);
}

// event listeners
addUser.addEventListener("click", getRandomUser);
doubleMoneybtn.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortrichest);
showMillionaires.addEventListener("click", showOnlyMillionaires);
netWorth.addEventListener("click", calcnetwealth);

getRandomUser();
getRandomUser();
getRandomUser();
