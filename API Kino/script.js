const API_KEY = 'c111d2';                          // моя ключ
const API_URL = 'https://www.omdbapi.com/';        // сайт който достъваме

const searchInput = document.getElementById('searchInput');            //връзка с различните елементи на сайта 
const searchBtn = document.getElementById('searchBtn');                //
const resultsContainer = document.getElementById('results');           //
const favoritesContainer = document.getElementById('favorites');       //   f12/Application/Storaga/local storage
const errorMessage = document.getElementById('errorMessage');          //

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];   //създаваме на JSON (НЕ СЕ РАДВАМ ДА ГО ВИДЯ  >:(  )

searchBtn.addEventListener('click', searchMovies);                     // създаване на събитие за кликане на бутона на търсачката
searchInput.addEventListener('keypress', (e) => {                      // Може и с "Enter"
    if (e.key === 'Enter') {                                           //
        searchMovies();                                                // 
    }                                                                  //
});                                                                    //

document.addEventListener('DOMContentLoaded', displayFavorites);       // събитие за показване на любими филми (както и се пазят тук)

async function searchMovies() {                                        // метод за търсене на филм
    const searchTerm = searchInput.value.trim();                       //

    resultsContainer.innerHTML = '';                                   //
    hideError();                                                       //
                                                                 
    if (!searchTerm) {                                                 // проверка за проблем 
        showError('Моля, въведете име на филм за търсене.');           //
        return;                                                        //
    }                                                                  //
    
    try {                                                                                                    //
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`);    //достъпваме информация и се
        const data = await response.json();                                                                  //пригорвяме за грешка 
        
        if (data.Response === 'True') {                                                                      //
            displayMovies(data.Search);                                                                      //
        } else {                                                                                             //
            showError(data.Error || 'Няма намерени филми. Моля, опитайте с друга заявка.');                  //
        }                                                                                                    //
    } catch (error) {                                                                                        //
        showError('Възникна грешка при извличането на данни. Моля, опитайте отново по-късно.');              //
        console.error('Error:', error);                                                                      //
    }                                                                                                        //
}

function displayMovies(movies) {                                                             //
    movies.forEach(movie => {                                                                //цикъл за създаване на карта за филм
        const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);               //
        
        const movieCard = document.createElement('div');                                     //
        movieCard.className = 'movie-card';                                                  //
        
        const poster = movie.Poster !== 'N/A'                                                //
            ? `<img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">`        //
            : `<div class="no-poster">Няма налично изображение</div>`;                       //
                                                                                                        //създаване на карта за филм
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
        
        resultsContainer.appendChild(movieCard);                                            //Добавя филма
    });
    
    document.querySelectorAll('.add-favorite, .remove-favorite').forEach(button => {       // събитие по натискане на бутон любими
        button.addEventListener('click', toggleFavorite);
    });
}

function toggleFavorite(e) {                                           //имплементация на метода за добавяне към любими 
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
    
    localStorage.setItem('favorites', JSON.stringify(favorites));       // добре дошъл в АДА за врори път  (не харсвам JSON)
    
    displayFavorites();                                                //метод за показване на списака с любими 
}

function displayFavorites() {                                           //имплементация на метода запоказване на любими
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