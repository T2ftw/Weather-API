document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const WeatherInfo = document.getElementById("weather-info");
    const CityNameDisplay = document.getElementById("city-name");
    const Temperature = document.getElementById("temperature");
    const Description = document.getElementById("description");
    const Errormessage = document.getElementById("error-message");

    const API_key = "88e98ac166856d931c2812ecac9f391e"; //env variables
    getWeatherBtn.addEventListener('click',async ()=>{
        const city = cityInput.value.trim();
        if(!city) return;
        //When we make a web request: 
        //it may throw an error
        //DB or server is in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }


    })

    async function fetchWeatherData(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);

        if(!response.ok){
            throw new error(" City not found ")
        }
        const data = await response.json()
        return data;
        
    }

    function displayWeatherData(data){
        //display
        console.log(data);
        const {name,main,weather}= data;
        CityNameDisplay.textContent = name;
        Temperature.textContent = `Temperature : ${main.temp}`;
        Description.textContent = `Weather : ${weather[0].description}`;


        //unlock the display
        WeatherInfo.classList.remove('hidden');
        Errormessage.classList.add('hidden');
        
    }

    function showError(){
        // for the error we have to remove the city so hence we keep that hidden and remove hidden from the p part of html.
        WeatherInfo.classList.remove("hidden");
        Errormessage.classList.add("hidden");
    }

});