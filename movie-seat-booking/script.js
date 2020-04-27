const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};

// update count and price
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // copy selected seats into an array
    // map thru the array
    // return a new array indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    // save the selected seats in local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // get the number of seats
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        // set the index of movieSelect according to whatever index is stored in local storage
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        console.log(e.target);
    }
    e.target.classList.toggle('selected');

    updateSelectedCount();
})

// initial count and total set
updateSelectedCount();