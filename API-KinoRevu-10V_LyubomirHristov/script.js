const API_KEY = 'c111d2';
const API_URL = 'https://www.omdbapi.com/';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('results');
const errorMessage = document.getElementById('errorMessage');
const movieModal = document.getElementById('movieModal');
const movieDetails = document.getElementById('movieDetails');
const reviewsContainer = document.getElementById('reviewsContainer');
const reviewForm = document.getElementById('reviewForm');
const closeModal = document.querySelector('.close');

let currentMovieId = null;

searchBtn.addEventListener('click', searchMovies);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovies();
    }
});

closeModal.addEventListener('click', () => {
    movieModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === movieModal) {
        movieModal.style.display = 'none';
    }
});

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addReview();
});

async function searchMovies() {
    const searchTerm = searchInput.value.trim();

    resultsContainer.innerHTML = '';
    hideError();

    if (!searchTerm) {
        showError('Моля, въведете име на филм за търсене.');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            showError(data.Error || 'Няма намерени филми. Моля, опитайте с друга заявка.');
        }
    } catch (error) {
        showError('Възникна грешка при извличането на данни. Моля, опитайте отново по-късно.');
        console.error('Error:', error);
    }
}

function displayMovies(movies) {
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        const poster = movie.Poster !== 'N/A'
            ? `<img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">`
            : `<div class="no-poster">Няма налично изображение</div>`;

        movieCard.innerHTML = `
            ${poster}
            <div class="movie-details">
                <div class="movie-title">${movie.Title}</div>
                <div class="movie-year">${movie.Year}</div>
                <button class="view-details" data-id="${movie.imdbID}">
                    Виж детайли
                </button>
            </div>
        `;
        
        resultsContainer.appendChild(movieCard);
    });
    
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => showMovieDetails(button.getAttribute('data-id')));
    });
}

async function showMovieDetails(imdbID) {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}`);
        const movie = await response.json();
        
        if (movie.Response === 'True') {
            currentMovieId = imdbID;
            displayMovieDetails(movie);
            displayReviews(imdbID);
            movieModal.style.display = 'block';
        } else {
            showError('Неуспешно зареждане на детайли за филма.');
        }
    } catch (error) {
        showError('Възникна грешка при зареждането на детайлите.');
        console.error('Error:', error);
    }
}

function displayMovieDetails(movie) {
    const poster = movie.Poster !== 'N/A'
        ? `<img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster-large">`
        : `<div class="no-poster" style="height:450px;">Няма налично изображение</div>`;

    movieDetails.innerHTML = `
        ${poster}
        <div class="movie-info">
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><strong>Режисьор:</strong> ${movie.Director || 'Няма информация'}</p>
            <p><strong>Актьори:</strong> ${movie.Actors || 'Няма информация'}</p>
            <p><strong>Жанр:</strong> ${movie.Genre || 'Няма информация'}</p>
            <p><strong>Продължителност:</strong> ${movie.Runtime || 'Няма информация'}</p>
            <p><strong>Сюжет:</strong> ${movie.Plot || 'Няма информация'}</p>
            <p><strong>IMDb рейтинг:</strong> ${movie.imdbRating || 'Няма информация'}</p>
        </div>
    `;
}

function addReview() {
    const reviewText = document.getElementById('reviewText').value.trim();
    const rating = document.getElementById('reviewRating').value;
    
    if (!reviewText || !rating) {
        showError('Моля, попълнете всички полета.');
        return;
    }
    
    const reviews = JSON.parse(localStorage.getItem('movieReviews')) || {};
    const movieReviews = reviews[currentMovieId] || [];
    
    movieReviews.push({
        text: reviewText,
        rating: rating,
        date: new Date().toISOString()
    });
    
    reviews[currentMovieId] = movieReviews;
    localStorage.setItem('movieReviews', JSON.stringify(reviews));
    
    // Изчистване на формата и обновяване на списъка с рецензии
    reviewForm.reset();
    displayReviews(currentMovieId);
}

function displayReviews(imdbID) {
    const reviews = JSON.parse(localStorage.getItem('movieReviews')) || {};
    const movieReviews = reviews[imdbID] || [];
    
    reviewsContainer.innerHTML = '';
    
    if (movieReviews.length === 0) {
        reviewsContainer.innerHTML = '<p>Няма рецензии за този филм.</p>';
        return;
    }
    
    movieReviews.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        reviewCard.innerHTML = `
            <div class="review-rating">Оценка: ${'★'.repeat(review.rating)}</div>
            <div class="review-text">${review.text}</div>
            <div class="review-date">${new Date(review.date).toLocaleString()}</div>
        `;
        
        reviewsContainer.appendChild(reviewCard);
    });
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
}