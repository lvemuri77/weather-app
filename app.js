$(document).ready(function(){
	var getIP = 'http://ip-api.com/json/';
	var temp;
	var city;
	var region;
	var country;
	$.getJSON(getIP).done(function(location) {
		city=location.city;
		region=location.region;
		country=location.country;

    	$('#currentLocation').text(city+ ', ' + region );
	});
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" +city +","+region, {
        units: 'metric',
        APPID: "3650b22aaf586dc4d821b750a7a94c0a"

    }).done(function(weather) {
		temp= weather.main.temp;
		desc=weather.weather[0].description;
		icon=weather.weather[0].icon;
		speed=weather.wind.speed;
       		$('#currentTemp').html(setCelcius());
			$('#desc').html(desc);
			$('#windSpeed').html(speed).append(' '+'mph');
			$('#currentTemp').click(function(){
			$('#currentTemp').toggleClass('celcius');
			$('#currentTemp').toggleClass('farenheit');
				if($(this).hasClass('celcius')){
					$('#currentTemp').text(setFahrenheit());
					return;
				}
			$('#currentTemp').text(setCelcius());
			});

		});
	function setFahrenheit(){
		var faren=Math.ceil((temp*9/5)+32);
			return faren+'\xB0F';
	};
	function setCelcius(){
		return temp + '\xB0C';
	};


	$('#search_button').on('click',function(){
		var address=$('#address').val();
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" +address , {
        units: 'metric',
        APPID: "3650b22aaf586dc4d821b750a7a94c0a"}).done(function(climate){
			console.log(climate);
			zip_temp=climate.main.temp;
			city_name=climate.name;
			$('#result').text(zip_temp);
			$('#city_result').html(city_name);

		})
	});

});



