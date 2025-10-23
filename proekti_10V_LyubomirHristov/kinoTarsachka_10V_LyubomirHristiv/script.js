const API_KEY = 'c111d2';                          
const API_URL = 'https://www.omdbapi.com/';        

const searchInput = document.getElementById('searchInput');             
const searchBtn = document.getElementById('searchBtn');                
const resultsContainer = document.getElementById('results');           
const favoritesContainer = document.getElementById('favorites');       //   f12/Application/Storaga/local storage
const errorMessage = document.getElementById('errorMessage');          

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];   

searchBtn.addEventListener('click', searchMovies);                     
searchInput.addEventListener('keypress', (e) => {                      
    if (e.key === 'Enter') {                                           
        searchMovies();                                                 
    }                                                                  
});                                                                    

document.addEventListener('DOMContentLoaded', displayFavorites);       

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
        const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);               
        
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
                <button class="${isFavorite ? 'remove-favorite' : 'add-favorite'}" 
                        data-id="${movie.imdbID}"
                        data-title="${movie.Title}"
                        data-year="${movie.Year}"
                        data-poster="${movie.Poster}">
                    ${isFavorite ? 'Премахни от любими' : 'Добави в любими'}
                </button>
            </div>
        `;
        
        resultsContainer.appendChild(movieCard);                                            
    });
    
    document.querySelectorAll('.add-favorite, .remove-favorite').forEach(button => {       
        button.addEventListener('click', toggleFavorite);
    });
}

function toggleFavorite(e) {                                           
    const button = e.target;
    const imdbID = button.getAttribute('data-id');
    const title = button.getAttribute('data-title');
    const year = button.getAttribute('data-year');
    const poster = button.getAttribute('data-poster');
    
    const movie = { imdbID, Title: title, Year: year, Poster: poster };
    
    const movieIndex = favorites.findIndex(fav => fav.imdbID === imdbID);
    
    if (movieIndex === -1) {

        favorites.push(movie);
        button.textContent = 'Премахни от любими';
        button.classList.remove('add-favorite');
        button.classList.add('remove-favorite');
    } else {

        favorites.splice(movieIndex, 1);
        button.textContent = 'Добави в любими';
        button.classList.remove('remove-favorite');
        button.classList.add('add-favorite');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));       
    
    displayFavorites();                                                
}

function displayFavorites() {                                           
    favoritesContainer.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Нямате добавени любими филми.</p>';
        return;
    }
    
    favorites.forEach(movie => {
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
                <button class="remove-favorite" 
                        data-id="${movie.imdbID}">
                    Премахни от любими
                </button>
            </div>
        `;
        
        favoritesContainer.appendChild(movieCard);
    });

    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });
}

function showError(message) {                                        // показване на грешка
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {                                              // да не показва грешка
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
}