const currencyElement_one = document.getElementById('currency-one');
const currencyElement_two = document.getElementById('currency-two');

const amountElement_one = document.getElementById('amount-one');
const amountElement_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch exchange rates and update the DOM
function calculate(){
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;
    // fetch runs asynchronously
    // returns a promise
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
        // convert the promise into json
        .then(res => res.json())
        // another promise
        .then(data => {
            /* console.log(data); */
            const rate = data.rates[currency_two];
            /* console.log(rate); */
            // show the result
            rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            // set the value of the secont amount
            // format it: only two decimals
            amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
        });
}

// Event Listeners
currencyElement_one.addEventListener('change', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
amountElement_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    calculate();
});

calculate();