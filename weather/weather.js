const container = document.querySelector(".container");
const search = document.querySelector(".searchBox button");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weatheDetails");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "fe7e3b4ce2484982af6105409232009";
  const city = document.querySelector(".searchBox input").value;

  if (city === "") return;

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`
  )
    .then((response) => response.json())
    .then((json) => {
      if (!json.current) {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weatherBox img");
      const temperature = document.querySelector(".weatherBox .temperature");
      const description = document.querySelector(".weatherBox .description");
      const humidity = document.querySelector(".weatheDetails .humidity span");
      const wind = document.querySelector(".weatheDetails .wind span");
      const condition = json?.current?.condition;
      image.src = condition.icon;

      temperature.innerHTML = `${json.current.temp_c}<span>°C</span>`;
      description.innerHTML = `${condition.text}`;
      humidity.innerHTML = `${json.current.humidity}%`;
      wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
