// select the elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionairs');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// array of people - object with users
let data = [];

// generate users
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
/* with async-await we don't have to chain several .then-s 
=> we mark the function as asynchronous
=> put the result of the fetch request in a variable
=> fetch is asynchronous, it happens behind the scene => we need to wait for it to finish, because it returns the promise once it's finished => we put 'await' in front of it
=> we need the data as json and we also neet to wait for it => 'await' */
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    
    // create a new object
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// double money
function doubleMoney() {
    data = data.map(user => {
        // copy all the data in user object with the spread operator and double the money
        return {...user, money: user.money * 2};
    });

    updateDOM();
}

// sort users by richest
function sortByRichest(){
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// calculate total wealth of all users displayed
function calculateWealth(){ 
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);

}

// add new object to the data array
function addData(obj){
    data.push(obj);

    updateDOM();
}

// filter only millionaires
function showMillionaires(){
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// update DOM
// if we don't pass any data as an argument, it will take in the infos from the data array by default
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    // loop through the items in the array / user object
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// format number as currency
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);