const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const quantity = document.querySelector('#quantity');
const totalValue = document.querySelector('#totalValue');
const selectedMovie = document.querySelector('#movie');

let ticketPrice = Number(selectedMovie.value);

// Salva o o index e o preço do filme
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Seleciona o filme
selectedMovie.addEventListener('change', (e) => {
  ticketPrice = Number(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  selectsSeats();
})

// Atualiza a quantidade de assentos selecionados e o valor total deles
const selectsSeats = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
  
  localStorage.setItem('selectsSeats', JSON.stringify(seatsIndex));
  
  const numberOfSeatsSelected = selectedSeats.length;
  quantity.innerText = numberOfSeatsSelected;
  totalValue.innerText = numberOfSeatsSelected * ticketPrice;
}

// Busca os dados no localStorage e popula a UI com os dados iniciais
const getInitialData = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectsSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

  if (selectedMovieIndex !== null) {
    selectedMovie.selectedIndex = selectedMovieIndex;
  }
}
getInitialData();

// Seleciona os assentos
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
  }

  selectsSeats();
})

// Inicia com a quantidade de assentos e valor total vindo do localStorage
selectsSeats();