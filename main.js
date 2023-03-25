import conditions from "./coditions.js";
const apiKey = '6c9c8ff2dd154ca2b92181859232403'
console.log (conditions)


/* Получаем название города */ 
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError (errorMessage) {
const html = `<div class= "card">${errorMessage}</div>`
header.insertAdjacentHTML('afterend', html)
}

function showCard ({name, country, temp, condition, imgPath}) {
    const html = `  <div class="card">
            <h2 class="card-sity">${name} <span>${country}</span></h2>
            <div class="card-weather">
                <div class="card-value">${temp}<sup>°C</sup></div>
                <img class="card-img" src='${imgPath}' alt="">
            </div>
            <div class="card-description">${condition}</div>
        </div>` 

// Отображаем карточку на странице
header.insertAdjacentHTML('afterend', html)

}

 async function getWeather(city) {
    const  url = ` http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data= await response.json();
   console.log(data);
    return(data);
    
}  

form.onsubmit = async function (e) {
    e.preventDefault();
    let city = input.value.trim();
    
    const data = await getWeather(city)

if (data.error) {
    removeCard();
    showError(data.error.message);
}
else {
    removeCard();
    console.log (data.current.condition.code);
    const info = conditions.find((obj) =>  obj.code === data.current.condition.code)
    console.log(info)
    console.log(info.languages[23]['day_text'])
    
    const filePath = './img/' + (data.current.is_day ? 'day' : 'night') + '/'
    const fileName = (data.current.is_day ? info.day : info.night)+ '.png';
    const imgPath =filePath + fileName;
    console.log('filePath',filePath +  fileName )
    const weatherData = {name: data.location.name, country: data.location.country, temp: data.current.temp_c, condition:  data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text'], 
    imgPath, 
};
    showCard(weatherData);
};
}
