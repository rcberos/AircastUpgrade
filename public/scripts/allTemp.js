function temp1Controller($scope, $window, $timeout, $http, temp1Src, callback){
	
	var widthMultiplier = 0.75;
	var heightMultiplier = 0.75;
	$scope.temp1VideoStyle = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}
	$scope.temp1BottomStyle = {
	    "position": "absolute",
	    "top":      $window.innerHeight*heightMultiplier+"px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*(1-heightMultiplier)+"px",
	    "background-color": "yellow"
	}
	$scope.temp1Side1Style = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.33+"px",
	    "background-color": "green"
	}
	$scope.temp1Side2Style = {
	    "position": "absolute",
	    "top":      $window.innerHeight*0.33+"px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.33+"px",
	    "background-color": "orange"
	}
	$scope.temp1Side3Style = {
	    "position": "absolute",
	    "top":      $window.innerHeight*0.66+"px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.34+"px",
	    "background-color": "white"
	}

	$scope.temp1Src = {
		// video: temp1Src.video,
		side1: temp1Src.side1,
		side2: temp1Src.side2,
		side3: temp1Src.side3,
		bottom: temp1Src.bottom
	}

 	var vidCtr = 0;

	if(!$scope.$$phase) {
		$scope.$apply();
	}
    
    console.log('hello');
	function temp1VideoPlay(){

		vidCtr++;

		var vidElem = document.getElementById('temp1Video');
		vidElem.src = temp1Src.video;

		vidElem.play();

		
	}

	  

	$scope.temp1VideoEnd = function(){
		// if(vidCtr<temp1Src.video.length)
		// 	temp1VideoPlay();
		// else
			callback();
	}

	temp1VideoPlay();
}



function temp2Controller($scope, $window, $timeout, $http, temp2Src, callback){
	var widthMultiplier = 1;
	var heightMultiplier = 1;
	$scope.temp2VideoStyle = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}

	$scope.temp2Src = {
		video: temp2Src.video
	}

	$timeout(function(){
		$timeout(function(){

			// var videoElements = angular.element(document.getElementById('temp2Video'));
			var videoElements = document.getElementById('temp2Video');
			// console.log('video');
			// console.log(videoElements);

			document.getElementById('temp2Video').src = temp2Src.video;

	    	// videoElements[0].play();
	    	videoElements.play();
		}, 10);
	}, 10);

	// $http.get('http://api.openweathermap.org/data/2.5/weather?q=Manila&appid=29e1d90ba906e48e127efbe09126adfe').then(function(response){
	// 	console.log(response.data);
	// },
	// function(error){
	// 	console.log(error);
	// });

	

	  

	$scope.temp2VideoEnd = function(){
		callback();
	}
}



function temp3Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){

	var widthMultiplier = 1;
	var heightMultiplier = 1;
	$scope.temp3DivStyle = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}

	weather = function() {
        var d = $q.defer();
        $http({
          method : 'GET',
          url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7',
          withCredentials: false,
          headers: { 'Content-Type': 'application/json' }
        }).then(function(data){
          d.resolve(data);
        });

        return d.promise;
    }

    weather_now = function() {
        var d = $q.defer();
        $http({
          method : 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67',
          withCredentials: false,
          headers: { 'Content-Type': 'application/json' }
        }).then(function(data){
          d.resolve(data);
        });

        return d.promise;
    }

    function getGreetingTime (m) {
      	var g = null; //return g

      	// if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

      	var split_afternoon = 12 //24hr time to split the afternoon
      	var split_evening = 17 //24hr time to split the evening
      	// var currentHour = parseFloat(m.format("HH"));

      	var date = new Date(m);
		// Hours part from the timestamp
		var currentHour = date.getHours();
		console.log('current: '+currentHour);

      	if(currentHour >= split_afternoon && currentHour <= split_evening) {
      		g = "afternoon";
      	} else if(currentHour >= split_evening) {
      		g = "evening";
      	} else {
      		g = "morning";
      	}

      	return g;
      }

    function get_icon (weather,greeting) {
      if(weather == 'Rain') {
        return  'icon-rain'
      }

      else if(greeting == 'evening') {
        if(x["weather"] == 'Clouds') {
          return 'icon-moon-cloud'
        }
        else {
          return 'icon-waning-crescent-moon'
        }
      }
      else {
        if(weather == 'Clouds') {
          return  'icon-sun-cloud'
        }
        else {
          return 'icon-sun'
        }
      }
    }

    weather().then(function(d){

      now = weather_now().then(function(data){
        now_w = {}
        now_w["temp"] =  data.data.main.temp - 273.15
        now_w["description"] = data.data.weather[0].description
        now_w["weather"] = data.data.weather[0].main
        now_w["greeting"] = getGreetingTime(data.data.dt*1000)
        now_w["icon"] = get_icon(data.data.weather[0].main, now_w["greeting"])

        $scope.now_weather = now_w
      })


      conditions = []

      d.data.list.forEach(function(v){
      	x = {}

      	var months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      	var date = new Date(v.dt*1000);
		// Hours part from the timestamp
		var currentDay = date.getDay();

        x["temp"] = v.temp.day - 273.15
        // x["day"] = moment(v.dt*1000).format('dddd')
        x["day"] = days[currentDay];
        x["weather"] = v.weather[0].main
        x["greeting"] = getGreetingTime(v.dt*1000)
        x["icon"] = get_icon(x["weather"], x["greeting"])


        conditions.push(x)
      })
      // _.each(d.data.list, function(v) {
      //   x = {}

      //   x["temp"] = v.temp.day - 273.15
      //   x["day"] = moment(v.dt*1000).format('dddd')
      //   x["weather"] = v.weather[0].main
      //   x["greeting"] = getGreetingTime(v.dt*1000)
      //   x["icon"] = get_icon(x["weather"], x["greeting"])


      //   conditions.push(x)
      // })

      $scope.conditions = conditions

      // $scope.now = moment().format('MMMM DD ddd');

    });

	
	$timeout(callback, 10000);
}





function temp4Controller($scope, $window, $timeout, $http, tempSrc, callback){

	$scope.temp4DivStyle = {
	    "position": "relative",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth+"px",
	    "height":   $window.innerHeight+"px",
	    "background-color": "black",
	    "background-image": "url('"+tempSrc.gif+"')",
	    "background-repeat": "no-repeat",
	    "background-size": "100% 100%"
	}
	$scope.temp4Text = {
	    "position": "absolute",
	    "top":      "200px",
	    "left":     $window.innerWidth*.4+"px",
	    // "width":    $window.innerWidth+"px",
	    // "height":   $window.innerHeight+"px",
	    "font-size": "2em"
	}
	$timeout(function(){
		$timeout(function(){
			
		}, 10);
	}, 10);

	$timeout(callback, 15000);
}



function temp5Controller($scope, $window, $timeout, $http, temp5Src, callback){
// 	$scope.testing = function(){
// 		console.log('asdasdasdasd');
// 		$window.alert($window.innerWidth);
// 	}
	var widthMultiplier = 0.66;
	var heightMultiplier = 0.66;
	$scope.temp5VideoStyle = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}
	$scope.temp5BottomStyle = {
	    "position": "absolute",
	    "top":      $window.innerHeight*heightMultiplier+"px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*(1-heightMultiplier)+"px",
	    "background-color": "yellow",
		"background-image": 'url("images/trafficrecording.gif")',
		"background-repeat": "no-repeat",
		"background-size": "100% 100%",
	}



	$scope.temp5Side1Style = {
	    "position": "relative",
	    "top":      "0px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.5+"px",
	    "background-color": "skyblue"
	}
	$scope.temp5Side2Style = {
	    "position": "absolute",
	    "top":      $window.innerHeight*0.5+"px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.5+"px",
	    "background-color": "orange"
	}

	var weatherWidth = $window.innerWidth*(1-widthMultiplier);
	var weatherHeight = $window.innerHeight*0.5;
	$scope.temp5WeatherMainIcon = {
		"position": "absolute",
		"display": "block",
	    "top":      weatherHeight*0.1+"px",
	    "left":     weatherWidth*0.4+"px",
	    "font-size": weatherWidth*0.2+"px",
	    "color": "black"
	}
	$scope.temp5WeatherMainText = {
		"position": "relative",
		"display": "block",
	    "top":      weatherHeight*0.26+"px",
	    // "left":     weatherWidth*0.4+"px",
	    "text-align": "center",
	    "font-size": weatherWidth*0.07+"px",
	    "color": "black"
	}
	$scope.temp5WeatherForcast = {
		"font-size": weatherWidth*0.07+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.45+"px",
	    // "left":     "10px",
	    "width":    weatherWidth+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast1 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.60+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast11 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.60+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast2 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.73+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast22 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.73+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast3 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.86+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast33 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.86+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherSpan = {
		"display": "inline-block",
	    "width":    weatherWidth*0.2+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}


	console.log($scope.temp5WeatherForcast);
	if(!$scope.$$phase) {
		$scope.$apply();
	}






	$scope.temp5Src = {
		// video: temp5Src.video,
		video: "images/guardian.mp4",
		// side1: temp5Src.side1,
		side2: temp5Src.side2,
		// side3: temp5Src.side3,
		// bottom: temp5Src.bottom
	}

	// $timeout(function(){}, 10);

	// var videoElements = angular.element(document.getElementById('temp1Video'));
	// console.log(videoElements);
 //    videoElements[0].play();

 	var vidCtr = 0;
 //    $timeout(function(){
	// 	$timeout(function(){
	// 		temp1VideoPlay();
	// 	}, 10);
	// }, 10);

	// $scope.$apply();
    
    console.log('hello');
	function temp5VideoPlay(){
		$scope.temp5Src.video = temp5Src.video;
		$scope.$apply();
		vidCtr++;
		var videoElements = angular.element(document.getElementById('temp5Video'));
	    		videoElements[0].play();
		// $timeout(function(){
		// 	// var videoElements = angular.element(document.getElementById('temp1Video'));
	 //  //   		videoElements[0].play();

		// 	$timeout(function(){
		// 		var videoElements = angular.element(document.getElementById('temp1Video'));
	 //    		videoElements[0].play();
		// 	}, 10);
		// }, 10);
		
	}

	  

	$scope.temp5VideoEnd = function(){
		// if(vidCtr<temp1Src.video.length)
		// 	temp1VideoPlay();
		// else
			callback();
	}

	temp5VideoPlay();

	$http({
      method : 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast?lat=14.629701&lon=121.027937&APPID=9f534971ae41269da3bdca6da5ad3a67',
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' }
    }).then(function(data){
      // d.resolve(data);
      console.log(data.data);
    	

		$scope.temp5WeatherFuture1 = {
	      	temp: (data.data.list[0].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[0].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture1.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[0].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture1.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture1.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[0].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture1.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture1.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture1.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture1.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture1.time = (hours+8-12)+" PM";
		}

		$scope.temp5WeatherFuture2 = {
	      	temp: (data.data.list[1].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[1].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture2.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[1].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture2.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture2.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[1].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture2.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture2.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture2.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture2.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture2.time = (hours+8-12)+" PM";
		}

		$scope.temp5WeatherFuture3 = {
	      	temp: (data.data.list[2].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[2].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture3.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[2].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture3.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture3.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[2].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture3.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture3.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture3.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture3.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture3.time = (hours+8-12)+" PM";
		}

    });

	if(!$scope.$$phase) {
		$scope.$apply();
	}

    $http({
      method : 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=14.629701&lon=121.027937&APPID=9f534971ae41269da3bdca6da5ad3a67',
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' }
    }).then(function(data){
    	console.log('now');
      console.log(data.data);
      $scope.temp5WeatherNow = {
      	description: data.data.weather[0].description,
      	temp: (data.data.main.temp-273.15).toFixed(2)+"°C"
      };
      if(data.data.weather[0].main == "Clouds"){
      	$scope.temp5WeatherNow.icon = "wi-day-cloudy";
      }
      else if(data.data.weather[0].main == "Rain"){
      	$scope.temp5WeatherNow.icon = "wi-day-rain";
      }
      else{
      	$scope.temp5WeatherNow.icon = "wi-day-sunny";
      }
      // $scope.temp5WeatherNow
    });

}



function temp10Controller($scope, $window, $timeout, $http, tempSrc, callback){

 /*
    1. entertainment
    buzzfeed and entertainment-weekly

    2. breaking news
    cnn, al-jazeera-english, google-news

    3. financial and business
    -bloomberg,business insider uk

    4. tech
    techcrunch

    5. sports
    espn
    */

    var loopCounter = 0;
    var interval1, interval2;

    var localData;
            
    var config = {

        //source -> latest, top, popular
        'sourceList': [ 'buzzfeed','cnn','espn','google-news','entertainment-weekly','al-jazeera-english','bloomberg,','techcrunch','business-insider-uk'],
        'source': 'cnn',
        'sort':'top',
        'apiKey': '44e7bd68b7d74cef902f1d9c7cb96b72',
        'loopNews':true,
        'loopInterval':13000,
        'image':{
            'buzzfeed': '/assets/logo-buzzfeed.png',
            'cnn': '/assets/logo-cnn.png',
            'espn': '/assets/logo-espn.png',
            'google-news': '/assets/logo-google-news.png',
            'entertainment-weekly': '/assets/logo-entertainment-weekly.png',
            'al-jazeera-english': '/assets/logo-aljazeera.png',
            'bloomberg': '/assets/logo-bloomberg.png',
            'techcrunch': '/assets/logo-techcrunch.png',
            'business-insider': '/assets/logo-business-insider.png'
        }

    }
    
    config.url = 'https://newsapi.org/v1/articles?source='+config.source+'&sortBy='+config.sort+'&apiKey='+config.apiKey;
    
        console.log(config.url);
        console.log("config source -> " + config.source);
    

        function checkIfNewsDataExpired(){

          var currentDate = moment().format('MM-DD-YYYY');

          if (localStorage.getItem('news-expiration-date') == null) {

              getDataFromApi();
          	
          }else{

            if(currentDate == localStorage.getItem('news-expiration-date')) {
              console.log("News data is still within the same day");
              console.log("Getting data from the local storage");

              if (localStorage.getItem('news-source') == null) {
                localStorage.setItem('news-source',config.source);
                getDataFromApi();
              }

              if (localStorage.getItem('news-source') != config.source) {
                console.log("news source is not the same with the config.source, getting data from api");
                getDataFromApi();
              }

              insertDataToScope();

            }else{

              getDataFromApi();


            }

          }

        } // end of the checkIfNewsDataExpired function

        
        for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp10'){
    			localData = $scope.TemplateData[i].TempData;
    			insertDataToScope();
    		}
    	}

    // checkIfNewsDataExpired();

        

      // this function  will get data from the api if the json file is not yet saved in the local storage
      function getDataFromApi() {

          console.log("fetch data from news api");


          $http.get(config.url)
              .then(function(response) {

                  var currentDate = moment().format('MM-DD-YYYY');

                  if (response.data) {
                      localStorage.setItem('news-expiration-date',currentDate);
                      localStorage.setItem('news',JSON.stringify(response.data));
                      localStorage.setItem('news-position',0);
                      localStorage.setItem('news-source',config.source);
                      console.log("fetch data from the local storage");
                      location.reload();
                      insertDataToScope();
                  } else {
                      console.log("nothing returned");
                  }
              })
              .catch(function() {
                  // handle error
                  console.log('error occurred');

                  if (localStorage.getItem('news') != null && localStorage.getItem('news') != '') {
                    console.log("fetch data from the local storage");
                    insertDataToScope();
                  }else{
                    callback();                    
                    // $(".news-loader").fadeIn("slow");
                  }
              })

      }

          //insert all the data to the angular $scope
      function insertDataToScope() {
          console.log('temp 10 data insert');
          $(".news-loader").fadeOut("slow",function(){
  
              // var x = localStorage.getItem('news');
              var x = localData;
              // var parsedData = JSON.parse(x);
              var parsedData = localData;

              //check if data is empty
              if (parsedData == '') {
                getDataFromApi();
              }

              var newsList = parsedData.articles;
              var currentPosition = parseInt(localStorage.getItem("news-position")) || 0;
              var newsCount = newsList.length-1;
              var article = newsList[currentPosition];

              var title = article.title;
              var author = article.author || "";

              var rawDate = article.publishedAt;
              var dateCreated;

              if (rawDate !== null) {
                    dateCreated = moment(article.publishedAt).format('LL');
              }else {
                    dateCreated = "";
              }

              console.log("News-Position " + currentPosition + "/"+newsCount);

              var description = article.description || "";
              var featuredImage = article.urlToImage;

              if (featuredImage === null || featuredImage == "") {
                  featuredImage = "assets/news-background.jpeg";
              }

                var articleAside =  returnArticle(currentPosition,newsCount);
                var article1 = newsList[articleAside[0]];
                var article2 = newsList[articleAside[1]];
                var article3 = newsList[articleAside[2]];

                $scope.news = {
                    'title': title,
                    'author': author,
                    'dateCreated': dateCreated,
                    'description': description,
                    'featuredImage': featuredImage,
                    'article1': article1,
                    'article2':article2,
                    'article3':article3,
                    'sourceIcon': config.image[config.source]
                }
              
              $scope.$apply();
              changeNews(currentPosition,newsCount);

              if(title.length > 50) {
                  $(".news-headline h1").css("font-size","1.2em");
              }else {
                $(".news-headline h1").css("font-size","1.5em");
              }

              if (description.length > 200) {
                  $(".news-upper").css("margin-top","3em")
              }else {
                  $(".news-upper").css("margin-top","4em")
              }

              if (loopCounter == 0) {
              	newsloop();
              	loopCounter++;
              }

              
        });
          
      }; // end of insertDataToScope

      function newsloop(){

        if(config.loopNews){
            
                interval1 = setInterval(function () {
                    removeNewsClass();
                }, config.loopInterval/2);
            
                interval2 = setInterval(function () {
                  
                    insertDataToScope();
                    addNewsClass();

                }, config.loopInterval);
            
          }

      }
        



    function removeNewsClass(){

		$(".news .header").delay(2000).removeClass("fadeInLeft");
        $(".news .news").delay(2000).removeClass("news-animation");
        $(".news .news-aside-div").delay(2000).removeClass("fadeInRight");
        $(".news .divider-bottom").delay(2000).removeClass("fadeInUp");
        $(".news .news-item").delay(2000).removeClass("fadeInRight");
        $(".news .news-source-div").delay(2000).removeClass("fadeInDown");
    
    }

    function addNewsClass(){

        $(".news .header").addClass("fadeInLeft");
        $(".news .news").addClass("news-animation");
        $(".news .news-aside-div").addClass("fadeInRight");
        $(".news .divider-bottom").addClass("fadeInUp");
        $(".news .news-item").addClass("fadeInRight");
        $(".news .news-source-div").addClass("fadeInDown");

    }      
        
    function changeNews(currentPosition,newsCount) {

              //saving data in local storage
              if (currentPosition >= newsCount) {
                  currentPosition = 0;
                  localStorage.setItem('news-position', currentPosition);
              } else {
                  currentPosition++;
                  localStorage.setItem('news-position', currentPosition);
              }

          }  //end of changeNews function
        
    function returnArticle(currentPosition,newsCount){

              var counter = parseInt(currentPosition)+1;
              var articleAsidePosition = []; 

              for (var i = 0; i < 3; i++ ) {
                  
                  if (counter <= newsCount) {
                      articleAsidePosition.push(counter);
                      counter++;
                  }else {
                      counter = 0;
                      articleAsidePosition.push(counter);
                      counter++;
                  }
                  
              }
             
             return articleAsidePosition;
          }
         
         


	function removeInterval() {

		if (interval1 != undefined && interval2 != undefined) {
			clearInterval(interval1);
			clearInterval(interval2);		
		} 

		
	}

    $timeout(removeInterval, 50000);      
	$timeout(callback, 52000);

}




function UpdateWallet($http, CampaignID){
	console.log('updating Wallet');
	$http.get('/myID').then(function(response){
      var RpiID = response.data.RpiID;

      var data = {
        RpiID: RpiID,
        CampaignID: CampaignID
      }
      $http.post('http://54.254.248.115/rpiUpdateWallet', data).then(function(response){
        // console.log(response);
        console.log('update wallet success');
      }, function(err){
        console.log('wallet update failed');
        console.log(err);
      });

    }, function(error){
      console.log('get config failed');
    });
}




function temp11Controller($scope, $window, $timeout, $http, tempSrc, callback){
      
/*        sample data
        makati -> lat: 14.5547 long: 121.0244
        quezon -> lat: 14.6760 long: 121.0437
        pasay -> lat: 14.5378 long: 121.0014
        mendiola -> lat: 14.598718 long: 120.992822
*/

    var restaurantList = [];
    var restaurantNameList = [];
    var tempCount, counter = 0;
    var temp, restaurantData;
    var loopCounter = 0;
    var interval3, interval4;
        
        
    var config = {
        'lat': 14.609695,
        'long': 121.0747,
        'loopStore': true,
        'loopInterval': 10000,
        'imgList': ['/assets/sample-image.jpg','/assets/one.jpeg','/assets/two.jpeg','/assets/three.jpeg','/assets/four.jpeg','/assets/five.jpeg'],
        'bgList':  { 'general':'/assets/bg_universal.png', 'korean':'/assets/bg_jap_kor.png', 'asian':'/assets/bg_asian.png' },
        'calculateKm': function(lat1, lon1, lat2, lon2){
                var R = 6371; // km
                var dLat = config.toRad(lat2 - lat1);
                var dLon = config.toRad(lon2 - lon1);
                var lat1 = config.toRad(lat1);
                var lat2 = config.toRad(lat2);

                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                return d;
        },
        'toRad': function toRad(Value) {
            return Value * Math.PI / 180;
        },
        'zomatoConfig':  {
            headers : {
                'user-key': '1e3481187e26de091dfdb5f7f768312a',
                'Accept': 'application/json;odata=verbose'
            }   
        }
    };

    config.url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;

    $("#rateYo").rateYo({
        starWidth: "50px",
    });

    	for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp11'){
    			restaurantData = $scope.TemplateData[i].TempData;
    			insertDataToScope();
    		}
    	}
    	

      function checkIfRestaurantDataExpired(){

          var currentTimeStamp = moment().unix();



          if (localStorage.getItem('restaurant-expiration-date') == null) {

              fetchRestaurantData(config.url);
          
          }else{

            if(localStorage.getItem('restaurant-expiration-date') >= currentTimeStamp) {
              console.log("restaurant data is still good and data is still within 1 month.");
              console.log("Getting data from the local storage");

              if (localStorage.getItem('restaurant') == null || localStorage.getItem('restaurant') == '') {
                console.log("data is not good, getting data from the api");
                fetchRestaurantData(config.url);
              }

              getDataFromStorage();

            }else{

              fetchRestaurantData(config.url);


            }

          }

        } // end of the checkIfNewsDataExpired function

        // fetchRestaurantData(config.url);
        // checkIfRestaurantDataExpired();

        function fetchRestaurantData(url){

            var currentTimeStamp = moment().unix() + 2592000;

           $http.get(url,config.zomatoConfig)
              .then(function(response) {

                  if (response.data) {
                  	console.log('resto');
                  	console.log(response.data);

                    var restaurants = response.data.nearby_restaurants;

                    for (var i = 0 ; i < restaurants.length; i++) {

                      if (restaurantNameList.indexOf(restaurants[i].restaurant.name) == -1) {
                        restaurantNameList.push(restaurants[i].restaurant.name);
                        restaurantList.push(restaurants[i]);
                      }
                    }

                      if (restaurantList.length < 100) {
                        checkIfListReach50(restaurantList.length);
                      }else{
                        localStorage.setItem('restaurant-expiration-date',currentTimeStamp);
                        localStorage.setItem('restaurant',JSON.stringify(restaurantList));
                        getDataFromStorage();
                      }
                      
                  } else {
                      console.log("nothing returned");
                  }
              })
              .catch(function() {
                  // handle error
                  console.log('error occurred');
                  callback();

              })

        }

        function checkIfListReach50(restaurantListLength){

           var currentTimeStamp = moment().unix() + 2592000;
           console.log(restaurantListLength);

            config.lat += .01;

            if (tempCount == restaurantListLength) {
              config.long += 0.01;
              counter++;
            }else {
              tempCount = restaurantListLength;
              counter = 0;
            }

            if (counter > 5) {
                localStorage.setItem('restaurant-expiration-date',currentTimeStamp);
                localStorage.setItem('restaurant',JSON.stringify(restaurantList));
                location.reload();
                getDataFromStorage();

            }else {
              url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;
              fetchRestaurantData(url);
            }


        }

        function getDataFromStorage() {

          console.log("fetch data from local storage");

          temp = localStorage.getItem('restaurant');
          restaurantData = JSON.parse(temp);
          console.log(JSON.stringify(restaurantData));
          // localStorage.setItem('restaurant-position',0);

          insertDataToScope();
      }


    

      //insert all the data to the angular $scope
      function insertDataToScope() {
          
          $(".restaurant-loader").fadeOut("slow",function(){
              
              var nearbyResto = restaurantData;
              var storeCount = nearbyResto.length - 1;
              var currentPosition =  parseInt(localStorage.getItem('restaurant-position')) || 0;
              var bg = config.bgList.general;

              if (localStorage.getItem('restaurant-position') === null) {
                  currentPosition = 1;
              }

              //getting the data ready
              var storePosition = currentPosition;
              console.log("current position: " + storePosition + "/" + storeCount);
              var store = nearbyResto[storePosition].restaurant;
              var distanceLatitude = store.location.latitude;
              var distanceLongitude = store.location.longitude;

              //information from the specific store
              var name = store.name;
              var featuredImage = store.featured_image;
              var cuisines = store.cuisines;

              //this will change the background image at the cuisines section of the webpage
              //this will vary based on the cuisines listed in the resto
              bg = bgCheck(cuisines);

              //some resto doesn't have featured_image, this will kick in ir featured_image is empty and will provide a local image in the dir
              if (featuredImage == "") {

                  var i = Math.floor((Math.random() * 5));
                  featuredImage = config.imgList[i];

              }

              //variables for store data
              var address = store.location.address;
              var distance = config.calculateKm(config.lat, config.long, distanceLatitude, distanceLongitude).toFixed(2) + " km away";
              var rating = store.user_rating.aggregate_rating + "/5.0";
              var votes = "(" + store.user_rating.votes + " Votes)";
              var ratingRaw = store.user_rating.aggregate_rating;

              //putting data of store inside the $scope variable
              $scope.data = {
                  'storePosition': storePosition,
                  'name': name,
                  'bg':bg,
                  'featuredImage': featuredImage,
                  'address': address,
                  'cuisines': cuisines,
                  'distance': distance,
                  'rating': rating,
                  'votes': votes
              }
              
              $scope.$apply();

              //change padding to center the cuisines if it reaches the 2nd line
              if (cuisines.length > 21) {
                  $(".restaurant-bottom-review").css("padding-top","1.5em");
              }else {
                  $(".restaurant-bottom-review").css("padding-top","2.3em");
              }

              if (cuisines.length > 41) {
                  $(".category-text").css("font-size","1.6em");
              }else {
                  $(".category-text").css("font-size","1.8em");
              }

              //changing the ratings on change
              $("#rateYo").rateYo("rating", ratingRaw);
              changeStore(currentPosition,storeCount);

              if (loopCounter == 0) {
              	restaurantloop();
              	loopCounter++;
              }
              


              // loop at the available stores in the array

              });
         
      } // end of insert data to scope

      function restaurantloop() {

        if (config.loopStore) {
            
              interval3 = setInterval(function () {
                  restaurantRemoveClass();
                }, config.loopInterval/2);
            
              interval4 = setInterval(function () {
                  insertDataToScope();
                  restaurantAddClass();
                }, config.loopInterval);
              
          }

      }
        



      function restaurantAddClass() {

          $(".restaurant .restaurant-top, .restaurant .restaurant-background").addClass("restaurant-animation");
          $(".restaurant .restaurant-top-float").addClass("fadeInLeft");
          $(".restaurant .restaurant-top-div,.restaurant .distance-div, .restaurant .restaurant-bottom-review, .restaurant .restaurant-bottom-rating").addClass("fadeInUp");
      }

      function restaurantRemoveClass(){
          $(".restaurant .restaurant-top, .restaurant .restaurant-background").removeClass("restaurant-animation");
          $(".restaurant .restaurant-top-float").removeClass("fadeInLeft");
          $(".restaurant .restaurant-top-div, .restaurant .distance-div, .restaurant .restaurant-bottom-review, .restaurant .restaurant-bottom-rating").removeClass("fadeInUp");    
      }


        
      //this will be the state of the current store, saved in local storage
      function changeStore(currentPosition,storeCount) {

              //saving data in localstorage
              if (currentPosition >= storeCount) {
                  currentPosition = 0;
                  localStorage.setItem('restaurant-position', currentPosition);
              } else {
                  currentPosition++;
                  localStorage.setItem('restaurant-position', currentPosition);
              }

          }

      //function that will identify what background to use in the cuisines section
      function bgCheck(cuisinesList) {

              var x = cuisinesList.split(",");

              for(var i = 0; i < x.length; i++) {
                  if (x[i] == 'Japanese' || x[i] == 'Korean') {
                      bg = config.bgList.korean;
                      break;
                  }else if (x[i] == 'Asian' || x[i] == 'Filipino') {
                      bg = config.bgList.asian;
                      break;
                  }else {
                      bg = config.bgList.general;
                  }

              }
              return bg;
          }



	function removeInterval2(){

		if (interval3 != undefined && interval4 != undefined) {
			clearInterval(interval3);
			clearInterval(interval4);		
		} 
		
	}

    $timeout(removeInterval2, 58000);      
	$timeout(callback, 60000);

	// fetchRestaurantData(config.url);

}

function temp12Controller($scope, $window, $timeout, $http, tempSrc, callback, $q){ 

    var today = moment().format('MMM. DD, YYYY');

    var data1, data2;
 
    for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp12'){
    			data1 = $scope.TemplateData[i].TempData[0];
    			data2 = $scope.TemplateData[i].TempData[1];

    			console.log('alltemp12data');
    			console.log($scope.TemplateData[i].TempData);
    			// insertDataToScope();
    		}
    	}

    weather = function() {
        // var d = $q.defer();
        // $http({
        //   method : 'GET',
        //   url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7',
        //   withCredentials: false,
        //   headers: { 'Content-Type': 'application/json' }
        // }).then(function(data){
        //   d.resolve(data);
        // }, function(err) {
        // 	d.reject('error');
        // });

        // return d.promise;

        return data1;
    }

    weather_now = function() {
        // var d = $q.defer();
        // $http({
        //   method : 'GET',
        //   url: 'http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67',
        //   withCredentials: false,
        //   headers: { 'Content-Type': 'application/json' }
        // }).then(function(data){
        //   d.resolve(data);
        // });

        // return d.promise;

        return data2;
    }

    function getGreetingTime (m) {
      	var g = null; //return g

      	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

      	var split_afternoon = 12 //24hr time to split the afternoon
      	var split_evening = 17 //24hr time to split the evening
      	var currentHour = parseFloat(m.format("HH"));

      	if(currentHour >= split_afternoon && currentHour <= split_evening) {
      		g = "afternoon";
      	} else if(currentHour >= split_evening) {
      		g = "evening";
      	} else {
      		g = "morning";
      	}

      	return g;
      }

    function get_icon (weather,greeting) {
      if(weather == 'Rain') {
        return  'icon-rain';
      }

      else if(greeting == 'evening') {
        if(x["weather"] == 'Clouds') {
          return 'icon-moon-cloud';

        }
        else {
          return 'icon-waning-crescent-moon'
        }
      }
      else {
        if(weather == 'Clouds') {
          return  'icon-sun-cloud';
        }
        else {
          return 'icon-sun';
        }
      }
    }

    // weather().then(function(d){

    	var d = data1;
    	if (d == 'error') {
    		 $(".weather-loader").fadeOut("slow");
    		callback();   
    	}else {

		      // now = weather_now().then(function(data){
		      //   now_w = {}
		      //   now_w["temp"] =  data.data.main.temp - 273.15
		      //   now_w["description"] = data.data.weather[0].description
		      //   now_w["weather"] = data.data.weather[0].main
		      //   now_w["greeting"] = getGreetingTime(moment(data.data.dt*1000))
		      //   now_w["icon"] = get_icon(now_w["weather"], now_w["greeting"])
		      //   now_w["currentDate"] = today
		      //   now_w["location"] = data.data.name

		      //   $(".weather-loader").fadeOut("slow",function(){
		      //       $(".weather").fadeIn(); 
		      //   });

		      //   console.log(now_w.weather);

		      //   if (now_w.weather == 'Rain') {
		      //     $scope.weather_background = "/assets/weather-rainy.png";
		      //   }else{
		      //     $scope.weather_background = "/assets/weather-sunny.jpg";
		      //   }
		          
		      //   if (now_w["icon"] === 'icon-sun') {
		      //        now_w["animation"] = 'rotateInfinite' + ' ' + now_w["icon"];
		      //   }else {
		      //        now_w["animation"] = 'leftToRight' + ' ' + now_w["icon"];
		      //   }
		        
		      //   $scope.now_weather = now_w

		      // })


		      // conditions = []
		      // _.each(d.data.list, function(v) {
		      //   x = {}

		      //   x["temp"] = v.temp.day - 273.15
		      //   x["day"] = moment(v.dt*1000).format('dddd')
		      //   x["weather"] = v.weather[0].main
		      //   x["greeting"] = getGreetingTime(moment(v.dt*1000))
		      //   x["icon"] = get_icon(x["weather"], x["greeting"])


		      //   conditions.push(x)
		      // })

		      // $scope.conditions = conditions

		      // $scope.now = moment().format('MMMM DD ddd');


    	}


    // });

	$timeout(callback, 15000);

};

function temp13Controller($scope, $window, $timeout, $http, tempSrc, callback, $q){ 

        
        var today = new Date();
        var yesterday = new Date(today.getTime() - 86400000);
        var currencyToDisplay = ["PHP","JPY","EUR"];
        var temp, currencyData;
        var errorCounter = 0;


        var config = {
            'currentDate': moment(today).format('YYYY-MM-DD'),
            'yesterdayDate': moment(yesterday).format('YYYY-MM-DD'),
        }
        
        console.log(config.currentDate);
        console.log(config.yesterdayDate);


        function checkIfCurrencyDataExpired(){

                var currentTimeStamp = moment().unix();

                if (localStorage.getItem('currency-expiration-date') == null) {

                    getDataFromApi();
                
                }else{

                  if(localStorage.getItem('currency-expiration-date') >= currentTimeStamp) {
                    console.log("currency data is still good and data is still within 2 hours.");
                    console.log("Getting data from the local storage");

                    if (localStorage.getItem('currency') == null || localStorage.getItem('currency') == '') {
                      console.log("data is not good, getting data from the api");
                      getDataFromApi();
                    }

                    getDataFromStorage();

                  }else{

                    getDataFromApi();


                  }

                }

              } // end of the checkIfNewsDataExpired function


         function getDataFromApi() {

            errorCounter++;

            if(errorCounter > 10) {
                //add some error catch here if the internet is not working
                getDataFromStorage();

            } else {


                console.log("fetch data from currency api");

                //get the current data today
                var url = 'https://openexchangerates.org/api/latest.json?app_id=611c0c2870aa4804a4014db80c91ee2d';
                var results = [];
                

              $http.get(url)
                  .then(function(response) {

                      console.log(response);

                      var currentTimeStamp = moment().unix() + 7200;

                      if (response.data) {

                          results.push(response.data.rates);

                          url = 'https://openexchangerates.org/api/historical/'+ config.yesterdayDate +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d';

                          $http.get(url)
                                .then(function(response) {

                                    results.push(response.data.rates);

                                    localStorage.setItem('currency-expiration-date',currentTimeStamp);
                                    localStorage.setItem('currency',JSON.stringify(results));
                                })
                                .catch(function(){

                                    console.log('error occured on the 2nd level of currency');
                                      if (localStorage.getItem('currency') != null && localStorage.getItem('currency') != '') {
                                        console.log("fetch data from the local storage");
                                        getDataFromStorage();
                                      }else{
                                      	callback();     
                                        // getDataFromApi();
                                      }
                                })



                          console.log("fetch data from the local storage");
                          getDataFromStorage();
                      } else {
                          console.log("nothing returned");
                      }
                  })
                  .catch(function() {
                      // handle error
                      console.log('error occurred on the first level of currency');
                      if (localStorage.getItem('currency') != null && localStorage.getItem('currency') != '') {
                        console.log("fetch data from the local storage");
                        getDataFromStorage();
                      }else{
                        callback();
                      }
                  })

            }

            
      }


    function getDataFromStorage() {

          
          temp = localStorage.getItem('currency');
          currencyData = JSON.parse(temp);

          inserDataToScope(currencyData);
      }

        
        function inserDataToScope(rates) {
            
            var rate_today= rates[0],
                  rate_yesterday = rates[1],
                  signs = {},
                  result = [];
            
            //get the first date
            var ratesToday = {
                'usd': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]])).toPrecision(5)),
                'yen': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]]/rate_today[currencyToDisplay[1]])).toPrecision(5)),
                'euro': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]]/rate_today[currencyToDisplay[2]])).toPrecision(5))
            }
            
            var ratesYesterday = {
                'usd': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]])).toPrecision(5)),
                'yen': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]]/rate_yesterday[currencyToDisplay[1]])).toPrecision(5)),
                'euro': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]]/rate_yesterday[currencyToDisplay[2]])).toPrecision(5))
            }
            
            console.log(ratesToday);
            console.log(ratesYesterday);
            
            if (ratesToday.usd > ratesYesterday.usd) {
                signs.usd = "up";
            }else if (ratesToday.usd == ratesYesterday.usd) {
                signs.usd = "equal";
            }else {
                signs.usd = "down";
            }
            
            if (ratesToday.yen > ratesYesterday.yen) {
                signs.yen = "up";
            }else if (ratesToday.yen == ratesYesterday.yen) {
                signs.yen = "equal";
            }else {
                signs.yen = "down";
            }
            
            if (ratesToday.euro > ratesYesterday.euro) {
                signs.euro = "up";
            }else if (ratesToday.euro == ratesYesterday.euro) {
                signs.euro = "equal";
            }else {
                signs.euro = "down";
            }
            
            console.log(signs);
            result.push(ratesToday,ratesYesterday,signs);
            console.log(result);
            insertDataToScope(result);
            
            

        }
        
        function insertDataToScope(result){

            $scope.todayYen = "P "+result[0].yen;
            $scope.todayUsd = "P "+result[0].usd;
            $scope.todayEuro = "P "+result[0].euro;
            $scope.yesterday = result[1];
            
            var temp = {
                'yen': result[0].yen.toString(),
                'usd': result[0].usd.toString(),
                'euro': result[0].euro.toString()
            }

            $scope.yen = temp["yen"].substring(1,2) + temp["yen"].substring(2,4);
            $scope.usd = temp["usd"].substring(0,2);
            $scope.euro = temp["euro"].substring(0,2);
            
            var signs = {
                'down': '/assets/currency-down.png',
                'equal': '/assets/currency-equal.png',
                'up': '/assets/currency-up.png'
            }
            $scope.signs = {};
            
            var usdSign,euroSign,yenSign;

            if (result[2].usd == "down") {
                $scope.signs.usd = signs.up;
            }else if (result[2].usd == "equal") {
                $scope.signs.usd = signs.equal;
            }else {
                $scope.signs.usd = signs.down;
            }

            if (result[2].yen == "down") {
                $scope.signs.yen = signs.up;
            }else if (result[2].yen == "equal") {
                $scope.signs.yen = signs.equal;
            }else {
                $scope.signs.yen = signs.down;
            }

            
            if (result[2].euro == "down") {
                $scope.signs.euro = signs.up;
            }else if (result[2].euro == "equal") {
                $scope.signs.euro = signs.equal;
            }else {
                $scope.signs.euro = signs.down;
            }
            
        }
        
        for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp13'){
    			currencyData = $scope.TemplateData[i].TempData;
    			// insertDataToScope();
    			inserDataToScope(currencyData);
    		}
    	}

        // checkIfCurrencyDataExpired();

        $timeout(callback, 15000);
        
};

//tweeter
function temp14Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

   
        var config =  {
            'loop': true,
            'loopInterval': 10000,
            'animationIn': 'zoomInUp',
            'animationOut': 'zoomOutUp'
        }


        var loopCounter = 0;
        // var twitterCounter =  parseInt(localStorage.getItem('twitter-counter')) || 0;
        var twitterCounter = 0;
        var temp, twitterData, hashtagList;
        var interval7, interval8;


       function checkIfTwitterDataExpired(){

                var currentTimeStamp = moment().unix();

                if (localStorage.getItem('twitter-expiration-date') == null) {

                    getDataFromApi();
                
                }else{

                  if(localStorage.getItem('twitter-expiration-date') >= currentTimeStamp) {
                    console.log("Twitter data is still good and data is still within 4 hours.");
                    console.log("Getting data from the local storage");

                    if (localStorage.getItem('twitter') == null || localStorage.getItem('twitter') == '') {
                      console.log("data is not good, getting data from the api");
                      getDataFromApi();
                    }

                    getDataFromStorage();

                  }else{

                    getDataFromApi();


                  }

                }

              } // end of the checkIfNewsDataExpired function


       

        // checkIfTwitterDataExpired();

         function getDataFromApi() {

          console.log("fetch data from twitter api");


          $http.get('/api/twitter')
              .then(function(response) {

                  console.log(response);

                  var currentTimeStamp = moment().unix() + 14400;

                  if (response.data) {
                      localStorage.setItem('twitter-expiration-date',currentTimeStamp);
                      localStorage.setItem('twitter',JSON.stringify(response.data));
                      localStorage.setItem('twitter-position',0);
                      console.log("fetch data from the local storage");
                      location.reload();
                      getDataFromStorage();
                  } else {
                      console.log("nothing returned");
                  }
              })
              .catch(function() {
                  // handle error
                  console.log('error occurred');
                  if (localStorage.getItem('twitter') != null && localStorage.getItem('twitter') != '') {
                    console.log("fetch data from the local storage");
                    getDataFromStorage();
                  }else{
                    callback();
                    // $(".twitter .loader").fadeIn("slow");
                  }
              })

      }

      function currentHashtag(){

          if (twitterCounter < hashtagList.length-1) {
            inserDataToScope();
            twitterCounter++;
          }else{
            twitterCounter = 0;
            inserDataToScope();
          }

          console.log("Twitter Counter: ", twitterCounter);
      }
        
        function getDataFromStorage() {

          
          temp = localStorage.getItem('twitter');
          twitterData = JSON.parse(temp);

          hashtagList = twitterData.pop();

          // localStorage.setItem('twitter-position',0);
          // localStorage.setItem('twitter-counter',0);
          $(".twitter .loader").fadeOut("slow");
          inserDataToScope();
      }

      function inserDataToScope(){


            // var tweets = twitterData[twitterCounter].statuses;
            var tweets = twitterData;
            var tweetsCount  = tweets.length-1;
            var currentPosition = localStorage.getItem('twitter-position') || 0;
            var nextTweetPosition = (currentPosition < tweetsCount)? parseInt(currentPosition)+1 : 0;
            console.log("Current Tweet Position: " + currentPosition +"/"+tweetsCount);
                
            $scope.topHashtag = removeSpace(hashtagList[twitterCounter]);
            
            
            if ($scope.topHashtag.length > 15) {
                $(".hashtag-overlay").css("font-size","3.5em");
                $(".hashtag-overlay").css("top","2.5em");
                $(".hashtag-overlay").css("letter-spacing","0");
            }else {
                $(".hashtag-overlay").css("font-size","7em");
                $(".hashtag-overlay").css("top","1em");
            }


            $scope.tweet = tweets[currentPosition];
            $scope.tweetText = removeEmojis(tweets[currentPosition].text);
            $scope.tweetDate = moment(tweets[currentPosition].created_at).format('LL');
            
            
            $scope.nextTweet = tweets[nextTweetPosition];
            $scope.nextTweetText = removeEmojis(tweets[nextTweetPosition].text);
            $scope.nextTweetDate = moment(tweets[nextTweetPosition].created_at).format('LL');

            $scope.name = removeEmojis(tweets[currentPosition].user.name);
            $scope.username = removeEmojis(tweets[currentPosition].user.screen_name);

            
//            $scope.$apply();
            
            changePosition(currentPosition,tweetsCount);
            // checkIfDataEnds();

              if (loopCounter == 0) {
              	twitterloop();
              	loopCounter++;
              }
            
        
        }

            
        function twitterloop(){

	        if (config.loop) {

	              interval7 = setInterval(function () {
	                  twitterRemoveClass();
	                }, config.loopInterval/2);

	            
	              interval8 = setInterval(function () {

	                  $scope.$apply(function(){
	                    inserDataToScope();
	                    twitterAddClass();
	                    });
	                    
	                }, config.loopInterval);
	            
	        }        	
        }
        

        

        function twitterRemoveClass(){
              $(".twitter #currentTweet").delay(2000).removeClass("bounceInUp");
              $(".twitter #secondTweet").delay(2000).removeClass("slideInUp");
        }


        function twitterAddClass(){
                $(".twitter #currentTweet").addClass("bounceInUp");
                $(".twitter #secondTweet").addClass("slideInUp");
        }
        
        function removeSpace(topHashtag) {
            
            if (topHashtag.indexOf('#') >= 0) {
                return topHashtag.replace(/ /g,'');
            }else {
                return '#' + topHashtag.replace(/ /g,'');
            }
            
        }
        
      function changePosition(currentPosition,tweetsCount) {

              if (currentPosition >= tweetsCount) {
                  currentPosition = 0;
                  localStorage.setItem('twitter-position', currentPosition);
                  localStorage.setItem('twitter-counter',twitterCounter);
                  currentHashtag();
              } else {
                  currentPosition++;
                  localStorage.setItem('twitter-position', currentPosition);
                  localStorage.setItem('twitter-counter', twitterCounter);
              }
            
            return currentPosition;

          }
        
    function removeEmojis (string) {
          var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

          return string.replace(regex, '');
        }


	function removeInterval() {

		if (interval7 != undefined && interval8 != undefined) {
			clearInterval(interval7);
			clearInterval(interval8);		
		} 


	}

	for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp14'){
    			twitterData = $scope.TemplateData[i].TempData.status.statuses;

    			hashtagList = twitterData.pop();

		          // localStorage.setItem('twitter-position',0);
		          // localStorage.setItem('twitter-counter',0);
		          $(".twitter .loader").fadeOut("slow");
		          inserDataToScope();

    			 // inserDataToScope();
    			// inserDataToScope(currencyData);
    		}
    	}

    $timeout(removeInterval, 58000);   
    $timeout(callback, 60000);


};


function temp15Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

     var config = {
        'loop':'true',
        'loopInterval': 10000,
        'animationEnter': 'flipInX',
        'animationOut' : 'flipOutX'
    }
    var loopCounter = 0;
    var interval5, interval6;
    
    
    var hugotList = [
        "Sabi ko na nga ba sabon ka! Kasi I'm SOAPer in love with you!",
        "Sana gravity nalang ako para kahit lumayo ka babalik at babalik ka din sa akin.",
        "Don't waste your time to the person who doesn't even cares to your feelings.",
        "Kung dalawa ang mahal mo, piliin mo yung pangalawa.. kasi, hindi ka naman magmamahal ng iba kung mahal mo talaga yung una.",
        "Sa Tindi ng Trapik sa EDSA, naniniwala na ako sa FOREVER.",
        "Ang Paglalakbay natin sa buhay ay tulad sa batas trapiko. Alam natin kung kailan maghahanda, ititigil at magpapatuloy, higit sa lahat ng sumusunod sa batas.",
        "Ang landian ay parang pagkain lang. Pag nasobrahan, nakakalaki ng tiyan.",
        "Liliko ako kahit saan, Makarating lang sa Kinaroroonan mo.",
        "Hintayin mo ang True Love mo. Na Traffic lang yun sa malalanding tao.",
        "If you want to be part of my life, make sure that you are ready to accept not only the good parts but also my stupid side.",
        "How can you love someone else. If you’re returning to the past.",
        "In a relationship, no matter how carefully you hold the one.. Yet you have lost it.. Because he had released the hold earlier.",
        
    ]

    // for(var i=0; i< $scope.TemplateData.length; i++){
    // 		if($scope.TemplateData[i].Template == 'temp15'){
    // 			hugotList = $scope.TemplateData[i].TempData;
    // 			console.log(hugotList);
    // 		}
    // 	}

    
    var uniqueRandoms = [];
    var numRandoms = hugotList.length;
        
    //generate random number that is not repeating    
    function makeUniqueRandom() {

        if (!uniqueRandoms.length) {
            for (var i = 0; i < numRandoms; i++) {
                uniqueRandoms.push(i);
            }
        }
        var index = Math.floor(Math.random() * uniqueRandoms.length);
        var val = uniqueRandoms[index];


        uniqueRandoms.splice(index, 1);

        return val;

    }        
        function insertDataToScope() {
            
             $scope.hugotText = hugotList[makeUniqueRandom()];

           	 if (loopCounter == 0) {
           	 	hugotloop();
           	 	loopCounter++;
           	 }
             

             
        }

        function hugotloop(){

	         if (config.loop) {
	            
	            insertDataToScope();
	    
	            interval5 = setInterval(function(){
	                hugotRemoveClass();
	            },config.loopInterval/2);

	            interval6 = setInterval(function(){

	                insertDataToScope();
	                hugotAddClass();
	                $scope.$apply();

	            },config.loopInterval);
	    
	        }       	
        }
        
        


        function hugotRemoveClass(){
            $(".hugot-text").delay(2000).removeClass(config.animationEnter);
        }

        function hugotAddClass(){
            $(".hugot-text").addClass(config.animationEnter);
        }
       




	function removeInterval() {

		if (interval5 != undefined && interval6 != undefined) {
			clearInterval(interval5);
			clearInterval(interval6);			
		} 


	}

	insertDataToScope();

    $timeout(removeInterval, 29000);   
    $timeout(callback, 30000);

};


function temp16Controller($scope, $window, $timeout, $http, tempSrc, callback){ 


  var filter = ["now_playing","upcoming","popular","top_rated"];
    var size= ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
    var config = {
    	"filter": filter[1],
    	"posterSize": size[4],
    	"backgroundSize": size[5],
    	"loop": true,
    	"loopInterval": 10000,
    	"animation": "flipInX"
    }

    var temp, movieData;
    var loopCounter = 0;
    var currentPosition = parseInt(localStorage.getItem('movie-position')) || 0;
    var moviesLength = 0;
    var movies, interval9, interval10; 

    config.url = "https://api.themoviedb.org/3/movie/"+config.filter+"?api_key=f2ebc8131c456f6ee2f134ac299aa40f&language=en&US";

    if (config.filter == "now_playing") {
    	$scope.movieslist = "Movies in Cinemas";
    }else if(config.filter == "upcoming"){
    	$scope.movieslist = "Latest Movies";
    }else if(config.filter == "popular"){
    	$scope.movieslist = "Popular Movies";
    }else if (config.filter == "top_rated"){
    	$scope.movieslist = "Top Rated Movies";
    }else{
    	$scope.movieslist = "Latest Movies";
    }


      function checkIfMovieDataExpired(){

                var currentTimeStamp = moment().unix();

                if (localStorage.getItem('movie-expiration-date') == null) {

                    getDataFromApi();
                
                }else{

                  if(localStorage.getItem('movie-expiration-date') >= currentTimeStamp) {
                    console.log("Movie data is still good and data is still within 4 hours.");
                    console.log("Getting data from the local storage");

                    if (localStorage.getItem('movie') == null || localStorage.getItem('movie') == '') {
                      console.log("data is not good, getting data from the api");
                      getDataFromApi();
                    }

                    getDataFromStorage();

                  }else{

                    getDataFromApi();


                  }

                }

              } // end of the checkIfMovieDataExpired function


    checkIfMovieDataExpired();

    function getDataFromApi() {

          console.log("fetch data from themoviedb api");


          $http.get(config.url)
              .then(function(response) {

                  var currentTimeStamp = moment().unix() + 259200;

                  if (response.data) {
                      localStorage.setItem('movie-expiration-date',currentTimeStamp);
                      localStorage.setItem('movie',JSON.stringify(response.data));
                      localStorage.setItem('movie-position',0);
                      location.reload();
                      console.log("fetch data from the local storage");
                      getDataFromStorage();
                  } else {
                      console.log("nothing returned");
                  }
              })
              .catch(function() {
                  // handle error
                  console.log('error occurred');
                  if (localStorage.getItem('movie') != null && localStorage.getItem('movie') != '') {
                    console.log("fetch data from the local storage");
                    getDataFromStorage();
                  }else{
                    callback();
                  }
              })

      }


       function getDataFromStorage() {

          
          temp = localStorage.getItem('movie');
          movieData = JSON.parse(temp);
          movies = movieData.results;
          moviesLength = movies.length;
          inserDataToScope();
      }


    function inserDataToScope(){

        var result = movies[currentPosition];

        if (result.overview.length > 400) {
            $(".movie-description p").css("font-size",".6em");
        }else{
            $(".movie-description p").css("font-size",".7em");
        }

        console.log("Movie position: " + currentPosition + "/" + moviesLength);

        $scope.title = result.original_title;
        $scope.description = result.overview;
        $scope.vote_average = "Ratings: " + result.vote_average + " / 10";
        $scope.release_date = "Release Date: " + moment(result.release_date).format('LL');
        $scope.poster_path = "http://image.tmdb.org/t/p/"+config.posterSize+"/"+result.poster_path;
        $scope.backdrop_path = "http://image.tmdb.org/t/p/"+config.backgroundSize+"/"+result.backdrop_path;
        $scope.animation = config.animation;

        if (loopCounter == 0) {
        	movieloop();
        	loopCounter++;	
        }
        

    }

    function changeMovie(){
    	
	       if ((currentPosition+1) >= moviesLength) {
              currentPosition = 0;
              localStorage.setItem('movie-position',currentPosition);
              console.log('setting data ' , currentPosition);
              inserDataToScope();
          } else {
              currentPosition++;
              localStorage.setItem('movie-position',currentPosition);
              console.log('setting data ' , currentPosition);
              inserDataToScope();
          }

    }

    function movieRemoveClass(){
		$(".movie-poster").delay(2000).removeClass("bounceInDown");   
        $(".movie-title").delay(2000).removeClass(config.animation);   
        $(".movie-release-date").delay(2000).removeClass(config.animation);   
        $(".movie-description").delay(2000).removeClass(config.animation);   
        $(".movie-ratings").delay(2000).removeClass(config.animation);   
        $(".movie-logo").delay(2000).removeClass("fadeInUp");   
    }

    function movieAddClass(){
		$(".movie-poster").addClass("bounceInDown");
        $(".movie-title").addClass(config.animation);
        $(".movie-release-date").addClass(config.animation);
        $(".movie-description").addClass(config.animation);
        $(".movie-ratings").addClass(config.animation);
        $(".movie-logo").addClass("fadeInUp");
    }


    function movieloop(){

	    if (config.loop) {

		 interval9 = setInterval(function () {
		        movieRemoveClass();     
		    }, config.loopInterval/2);

		  interval10 = setInterval(function () {
		        changeMovie();
		        movieAddClass();
		        $scope.$apply();
		    }, config.loopInterval);

	    }

    }





	function removeInterval() {


		if (interval9 != undefined && interval10 != undefined) {
			clearInterval(interval9);
			clearInterval(interval10);		
		} 


	}

    $timeout(removeInterval, 39000);   
    $timeout(callback, 40000);


};

