/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function fadeInner(element){ $(element).fadeIn(1000); }

function fadeOuter(element){ $(element).fadeOut(1000); }

function countryShower(){
  $.getJSON('json/data.json', function success(data){
    for (var countryID in data.country){
      document.getElementById("country").innerHTML += ('<option value="' + data.country[countryID].code + '">' + data.country[countryID].name + '</option>');
    }
  });
}

function cityShower(country) {
  document.getElementById("city").innerHTML = "";
  $.getJSON('json/data.json', function success(data){
    for (var countryID in data.country){
      if (country === data.country[countryID].code){
        for (var cityID in data.country[countryID].cities){
          document.getElementById("city").innerHTML += ('<option value="' + data.country[countryID].cities[cityID] + '">' + data.country[countryID].cities[cityID] + '</option>');
        }
      }
    }
  });
}

function getRequest(city, country){
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=2de143494c0b295cca9337e1e96b00e0', function success(data) {
    document.getElementById("cityName").innerHTML = data.name;
    document.getElementById("cityIcon").innerHTML = '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon +  '.png" alt="' + data.weather[0].main + '">'
    document.getElementById("cityWeather").innerHTML = data.weather[0].main;
    if ((data.main.temp - 273) > 0){
      document.getElementById("cityTemp").innerHTML = '+' + parseFloat(data.main.temp - 273).toFixed(0) + ' °C';
    }
    else{
      document.getElementById("cityTemp").innerHTML = parseFloat(data.main.temp - 273).toFixed(0) + ' °C';
    }
  });
}

function showTableParams(){
  fadeOuter("#city");
  fadeOuter("#unitGet");
  fadeOuter("#unit")
  setTimeout('fadeInner("#tableGet"), fadeInner("#divtable")', 1000);
}

function showUnitParams(){
  fadeOuter("#tableGet");
  fadeOuter("#divtable");
  setTimeout('fadeInner("#city"), fadeInner("#unitGet"), fadeInner("#unit")', 1000);
}

function getTableRequest(country){
  document.getElementById("tableCitySt").innerHTML = "";
  document.getElementById("tableCityIcon").innerHTML = "";
  document.getElementById("tableCityWeather").innerHTML = "";
  document.getElementById("tableCityTemp").innerHTML = "";
  $.getJSON('json/data.json', function success(data){
    for (var countryID in data.country){
      if (country === data.country[countryID].code){
        for (var cityID in data.country[countryID].cities){
          $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + data.country[countryID].cities[cityID] + ',' + data.country[countryID].code + '&appid=2de143494c0b295cca9337e1e96b00e0', function success(data) {
            document.getElementById("tableCitySt").innerHTML += '<th>' + data.name + '</th>';
            document.getElementById("tableCityIcon").innerHTML += '<th><img src="http://openweathermap.org/img/w/' + data.weather[0].icon +  '.png" alt="' + data.weather[0].main + '"></th>';
            document.getElementById("tableCityWeather").innerHTML += '<th>' + data.weather[0].main + '</th>';
            if ((data.main.temp - 273) > 0){
              document.getElementById("tableCityTemp").innerHTML += '<th>' + '+' + parseFloat(data.main.temp - 273).toFixed(0) + ' °C' + '</th>';
            }
            else{
              document.getElementById("tableCityTemp").innerHTML += '<th>' + parseFloat(data.main.temp - 273).toFixed(0) + ' °C' + '</th>';
            }
          });
        }
      }
    }
  });
}
