const cityInput = document.getElementById('cityInput');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const planBtn = document.getElementById('planBtn');
const newTripBtn = document.getElementById('newTripBtn');
const forecastContainer = document.getElementById('forecastContainer');
const activitiesContainer = document.getElementById('activitiesContainer');
const API_KEY = '83f4834d142dee3138e8ed4aaf535637'; // Replace with your actual OpenWeatherMap API key

let activities = JSON.parse(localStorage.getItem('activities')) || {};

// Set today's date as default for start date
const today = new Date().toISOString().split('T')[0];
startDate.value = today;

// Validate user input
function validateInput() {
    if (!cityInput.value) {
        alert('Моля, въведете град.');
        return false;
    }
    
    if (!startDate.value || !endDate.value) {
        alert('Моля, изберете период.');
        return false;
    }
    
    if (new Date(endDate.value) < new Date(startDate.value)) {
        alert('Крайната дата трябва да е след началната.');
        return false;
    }
    
    return true;
}

// Fetch weather forecast
async function fetchWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.cod !== '200') throw new Error(data.message);
    
    // Filter to get one forecast per day (at noon if possible)
    const dailyForecasts = [];
    const uniqueDays = new Set();
    
    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        const time = item.dt_txt.split(' ')[1];
        
        // Only add one forecast per day (preferably around noon)
        if (!uniqueDays.has(date) && time >= '09:00:00' && time <= '15:00:00') {
            uniqueDays.add(date);
            dailyForecasts.push(item);
        }
    });
    
    // Limit to 3 days
    return dailyForecasts.slice(0, 3);
}

// Display weather forecast
function displayForecast(forecasts) {
    forecastContainer.innerHTML = '';
    
    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const dateStr = date.toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long' });
        
        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        dayDiv.innerHTML = `
            <h3>${dateStr}</h3>
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
            <p>${forecast.weather[0].description}</p>
            <p>Температура: ${Math.round(forecast.main.temp)}°C</p>
            <p>Влажност: ${forecast.main.humidity}%</p>
            <p>Вятър: ${Math.round(forecast.wind.speed * 3.6)} km/h</p>
        `;
        
        forecastContainer.appendChild(dayDiv);
        
        // Add activities section for each day
        const activitiesDayDiv = document.createElement('div');
        activitiesDayDiv.className = 'activities-day';
        activitiesDayDiv.dataset.date = date.toISOString().split('T')[0];
        
        const activitiesHeader = document.createElement('h3');
        activitiesHeader.textContent = `Дейности за ${dateStr}`;
        activitiesDayDiv.appendChild(activitiesHeader);
        
        const activitiesList = document.createElement('div');
        activitiesList.className = 'activities-list';
        activitiesDayDiv.appendChild(activitiesList);
        
        const activityInputDiv = document.createElement('div');
        activityInputDiv.className = 'activity-input';
        activityInputDiv.innerHTML = `
            <input type="text" placeholder="Добави дейност (напр. плаж, разходка)">
            <button class="add-activity">Добави</button>
        `;
        activitiesDayDiv.appendChild(activityInputDiv);
        
        activitiesContainer.appendChild(activitiesDayDiv);
        
        // Set up activity adding for this day
        const addButton = activityInputDiv.querySelector('.add-activity');
        const inputField = activityInputDiv.querySelector('input');
        
        addButton.addEventListener('click', () => {
            const activityText = inputField.value.trim();
            if (activityText) {
                const dateKey = date.toISOString().split('T')[0];
                if (!activities[dateKey]) {
                    activities[dateKey] = [];
                }
                activities[dateKey].push(activityText);
                saveActivities();
                renderActivities();
                inputField.value = '';
            }
        });
    });
    
    // Save forecast data to localStorage
    localStorage.setItem('forecastData', JSON.stringify(forecasts));
}

// Save activities to localStorage
function saveActivities() {
    localStorage.setItem('activities', JSON.stringify(activities));
}

// Render activities from localStorage
function renderActivities() {
    document.querySelectorAll('.activities-day').forEach(container => {
        const date = container.dataset.date;
        const activitiesList = container.querySelector('.activities-list');
        activitiesList.innerHTML = '';
        
        (activities[date] || []).forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.textContent = activity;
            activitiesList.appendChild(activityItem);
        });
    });
}

// Event listeners
planBtn.addEventListener('click', async () => {
    if (!validateInput()) return;
    
    try {
        const forecasts = await fetchWeather(cityInput.value);
        displayForecast(forecasts);
        renderActivities();
    } catch (e) {
        alert('Грешка: ' + e.message);
    }
});

newTripBtn.addEventListener('click', () => {
    localStorage.clear();
    activities = {};
    forecastContainer.innerHTML = '';
    activitiesContainer.innerHTML = '';
    cityInput.value = '';
    endDate.value = '';
});

// Load saved data when page loads
window.addEventListener('load', () => {
    const savedForecast = JSON.parse(localStorage.getItem('forecastData')) || [];
    if (savedForecast.length > 0) {
        displayForecast(savedForecast);
    }
    renderActivities();
});