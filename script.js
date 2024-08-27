const API_KEY = 'ea2a78bdb466d7cc0b0da519e37ce75c'; 
let unit = 'metric'; 

const searchWeather = async () => {
    const city = document.getElementById('cityInput').value;
    if (!city) return;

    try {
      
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
        const weatherData = await weatherResponse.json();

        
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
        const forecastData = await forecastResponse.json();

       
        displayWeather(weatherData);
        
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

const displayWeather = (weatherData) => {
    const weatherCard = document.getElementById('weatherCard');
    const { main, weather, name } = weatherData;
    const tempUnit = unit === 'metric' ? 'C' : 'F';
    const weatherMain = weather[0].main.toLowerCase();

    weatherCard.innerHTML = `
        <h2>${name}</h2>
        <p>${weather[0].description}</p>
        <p>${Math.round(main.temp)}°${tempUnit}</p>
    `;

    
    document.body.className = weatherMain;
};

const displayForecast = (forecastData) => {
    const forecastDiv = document.getElementById('forecast');
    const days = forecastData.list.filter((_, index) => index % 8 === 0); 

    forecastDiv.innerHTML = days.map(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const temp = Math.round(day.main.temp);
        const tempUnit = unit === 'metric' ? 'C' : 'F';

        return `
            <div class="forecast-card">
                <h3>${date}</h3>
                <p>${day.weather[0].description}</p>
                <p>${temp}°${tempUnit}</p>
            </div>
        `;
    }).join('');
};

const toggleUnit = () => {
    unit = unit === 'metric' ? 'imperial' : 'metric';
    searchWeather(); 
};


searchWeather();
