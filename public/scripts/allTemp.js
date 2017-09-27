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
            'al-jazeera-english': 'assets/logo-aljazeera.png',
            'bloomberg': '/assets/logo-bloomberg.png',
            'techcrunch': '/assets/logo-techcrunch.png',
            'business-insider': '/assets/logo-business-insider.png'
        }

    }
    
    config.url = 'https://newsapi.org/v1/articles?source='+config.source+'&sortBy='+config.sort+'&apiKey='+config.apiKey;
    
        console.log(config.url);
        console.log("config source -> " + config.source);
    
      // clear data from storage
      // this will delete the json file saved in the local storage
      // localStorage.removeItem('news');
    
    if (localStorage.getItem('news') === null) { 
          getDataFromApi();
        console.log("news is null, fetching data from the api");
      }else {
          
          if (localStorage.getItem("news-source") === null) {
               localStorage.setItem("news-source",config.source);
               localStorage.setItem("news-sort",config.sort);
              localStorage.setItem("newsPosition",0);
               getDataFromApi();
              console.log("news-source is null, setting data to local storage and calling getDataFromApi()");
          }else {
              
              if (localStorage.getItem("news-source") == config.source && localStorage.getItem("news-sort") == config.sort) {
                  console.log("local storage source -> " + localStorage.getItem("news-source"));
                  console.log("news source is still the same, getting data from localstorage");
                  insertDataToScope();
              }else {
                  console.log("news source is not the same with the config.source, getting data from api");
                  localStorage.setItem("news-source",config.source);
                  localStorage.setItem("newsPosition",0);
                  localStorage.setItem("news-sort",config.sort);
                  getDataFromApi();
              }
              
          }
         
      }
        

      // this function  will get data from the api if the json file is not yet saved in the local storage
      function getDataFromApi() {

          console.log("fetch data from news api");
          $http.get(config.url).then(function(result) {
              
            if (result.status == 200) {
                localStorage.setItem('news',JSON.stringify(result.data));
                insertDataToScope();
            }else {
                console.log("no internet, will get back to this later");
            }
              
          });

      }

          //insert all the data to the angular $scope
      function insertDataToScope() {
          
          $(".news-loader").fadeOut("slow",function(){
                   
              console.log("fetch data from the local storage");
              var x = localStorage.getItem('news');
              var parsedData = JSON.parse(x);

              var newsList = parsedData.articles;
              var currentPosition = localStorage.getItem("newsPosition");
              var newsCount = newsList.length-1;
              var article = newsList[currentPosition];
              console.log("news count: " + newsCount);

              var title = article.title;
              var author = article.author || "";
              console.log("raw-date: " + article.publishedAt);
              var rawDate = article.publishedAt;
              var dateCreated;

              if (rawDate !== null) {
                    dateCreated = moment(article.publishedAt).format('LL');
              }else {
                    dateCreated = "";
              }

              console.log("formatted date: " + dateCreated);
              console.log("current position -> " + currentPosition);

              var description = article.description || "";
              var featuredImage = article.urlToImage;

              if (featuredImage === null || featuredImage == "") {
                  featuredImage = "assets/images/news-background.jpeg";
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
                    'sourceIcon': config.image[config.source],
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

        });
          
      }; // end of insertDataToScope
        
        if(config.loopNews){
            
                var interval1 = setInterval(function () {
                    
                    $(".header").delay(2000).removeClass("fadeInLeft");
                    $(".news").delay(2000).removeClass("news-animation");
                    $(".news-aside-div").delay(2000).removeClass("fadeInRight");
                    $(".divider-bottom").delay(2000).removeClass("fadeInUp");
                    $(".news-item").delay(2000).removeClass("fadeInRight");
                    $(".news-source-div").delay(2000).removeClass("fadeInDown");
                   
                    
                }, config.loopInterval/2);
            
              var interval2 = setInterval(function () {
                  
                    insertDataToScope();

                    $(".header").addClass("fadeInLeft");
                    $(".news").addClass("news-animation");
                    $(".news-aside-div").addClass("fadeInRight");
                    $(".divider-bottom").addClass("fadeInUp");
                    $(".news-item").addClass("fadeInRight");
                    $(".news-source-div").addClass("fadeInDown");
                  
                }, config.loopInterval);
            
          }
        
    function changeNews(currentPosition,newsCount) {

              //saving data in local storage
              if (currentPosition >= newsCount) {
                  currentPosition = 0;
                  localStorage.setItem('newsPosition', currentPosition);
              } else {
                  currentPosition++;
                  localStorage.setItem('newsPosition', currentPosition);
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
		clearInterval(interval1);
		clearInterval(interval2);
	}

    $timeout(removeInterval, 38000);      
	$timeout(callback, 39000);

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
        
        
    var config = {
        'lat':'14.5838',
        'long':'121.0597',
        'loopStore': true,
        'loopInterval': 10000,
        'imgList': ['assets/one.jpeg','assets/two.jpeg','assets/three.jpeg','assets/four.jpeg','assets/five.jpeg'],
        'bgList':  { 'general':'assets/bg_universal.png', 'korean':'assets/bg_jap_kor.png', 'asian':'assets/bg_asian.png' },
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

      // clear data from storage
      // this will delete the json file saved in the local storage
      // localStorage.removeItem('resto');
        
    
        if (localStorage.getItem('resto') === null) { 
          getDataFromApi();
        console.log("news is null, fetching data from the api");
      }else {
          
          if (localStorage.getItem("resto-lat") === null || localStorage.getItem("resto-long") === null) {
               localStorage.setItem("resto-lat",config.lat);
               localStorage.setItem("resto-long",config.long);
               localStorage.setItem("storePosition",1);
               getDataFromApi();
              console.log("resto lat and long is null, setting data to local storage and calling getDataFromApi()");
          }else {
              
              if (localStorage.getItem("resto-lat") == config.lat || localStorage.getItem("resto-long") == config.long) {
                  console.log("news source is still the same, getting data from localstorage");
                  insertDataToScope();
              }else {
                  console.log("news source is not the same with the config.source, getting data from api");
                  localStorage.setItem("resto-lat",config.lat);
                  localStorage.setItem("resto-long",config.long);
                  localStorage.setItem("storePosition",0);
                  getDataFromApi();
              }
              
          }
      }
        
      // this function  will get data from the api if the json file is not yet saved in the local storage
      function getDataFromApi() {

          console.log("fetch data from zomato api");
          $http.get(config.url,config.zomatoConfig).then(function(result) {
              localStorage.setItem('resto',JSON.stringify(result.data));
              insertDataToScope();
          });

      }

      //insert all the data to the angular $scope
      function insertDataToScope() {
          
          $(".restaurant-loader").fadeOut("slow",function(){
              
            console.log("fetch data from local storage");

              var x = localStorage.getItem('resto');
              var result = JSON.parse(x);
              console.log("inserting data now");

              var nearbyResto = result.nearby_restaurants;
              var storeCount = nearbyResto.length - 1;
              var currentPosition = localStorage.getItem('storePosition');
              var bg = config.bgList.general;

              if (localStorage.getItem('storePosition') === null) {
                  currentPosition = 1;
              }

              //getting the data ready
              var storePosition = currentPosition;
              console.log("current position: " + storePosition);
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
              
              console.log($scope.data);
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

              // loop at the available stores in the array

              });
         
      } // end of insert data to scope
        
        if (config.loopStore) {
            
              var interval3 = setInterval(function () {
                  
                $(".restaurant-top, .restaurant-background").removeClass("restaurant-animation");
                $(".restaurant-top-div, .distance-div, .restaurant-bottom-review, .restaurant-bottom-rating").removeClass("fadeInUp");    
                  
                }, config.loopInterval/2);
            
              var interval4 = setInterval(function () {
                
                  insertDataToScope();
  
                  $(".restaurant-top, .restaurant-background").addClass("restaurant-animation");
                  $(".restaurant-top-float").addClass("fadeInLeft");
                  $(".restaurant-top-div, .distance-div, .restaurant-bottom-review, .restaurant-bottom-rating").addClass("fadeInUp");
                  
                }, config.loopInterval);
              
          }
        
              //this will be the state of the current store, saved in local storage
      function changeStore(currentPosition,storeCount) {

              //saving data in localstorage
              if (currentPosition >= storeCount) {
                  currentPosition = 0;
                  localStorage.setItem('storePosition', currentPosition);
              } else {
                  currentPosition++;
                  localStorage.setItem('storePosition', currentPosition);
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
		clearInterval(interval3);
		clearInterval(interval4);
	}

    $timeout(removeInterval2, 29000);      
	$timeout(callback, 30000);

}

function temp12Controller($scope, $window, $timeout, $http, tempSrc, callback, $q){ 

        var today = moment().format('MMM. DD, YYYY');
 
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

    weather().then(function(d){

      now = weather_now().then(function(data){
        now_w = {}
        now_w["temp"] =  data.data.main.temp - 273.15
        now_w["description"] = data.data.weather[0].description
        now_w["weather"] = data.data.weather[0].main
        now_w["greeting"] = getGreetingTime(moment(data.data.dt*1000))
        now_w["icon"] = get_icon(now_w["weather"], now_w["greeting"])
        now_w["currentDate"] = today
        now_w["location"] = data.data.name

        $(".weather-loader").fadeOut("slow",function(){
            $(".weather").fadeIn(); 
        });

        console.log(now_w.weather);

        if (now_w.weather == 'Rain') {
          $scope.weather_background = "assets/weather-rainy.png";
        }else{
          $scope.weather_background = "assets/weather-sunny.jpg";
        }
          
        if (now_w["icon"] === 'icon-sun') {
             now_w["animation"] = 'rotateInfinite' + ' ' + now_w["icon"];
        }else {
             now_w["animation"] = 'leftToRight' + ' ' + now_w["icon"];
        }
        
        $scope.now_weather = now_w

      })


      conditions = []
      _.each(d.data.list, function(v) {
        x = {}

        x["temp"] = v.temp.day - 273.15
        x["day"] = moment(v.dt*1000).format('dddd')
        x["weather"] = v.weather[0].main
        x["greeting"] = getGreetingTime(moment(v.dt*1000))
        x["icon"] = get_icon(x["weather"], x["greeting"])


        conditions.push(x)
      })

      $scope.conditions = conditions

      $scope.now = moment().format('MMMM DD ddd');

    });

	$timeout(callback, 15000);

};

function temp13Controller($scope, $window, $timeout, $http, tempSrc, callback, $q){ 


        var today = new Date();
        var yesterday = new Date(today.getTime() - 86400000);
        var currencyToDisplay = ["PHP","JPY","EUR"];
        
        var config = {
            'currentDate': moment(today).format('YYYY-MM-D'),
            'yesterdayDate': moment(yesterday).format('YYYY-MM-D'),
        }
        
        console.log(config.currentDate);
        console.log(config.yesterdayDate);

        function getTodayCurrency(){
            
            //get the current data today
            var url = 'https://openexchangerates.org/api/historical/'+ config.currentDate +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d';
            
                var results = [];
            
                $http.get(url).then(function(data){
                    
                    if (data.status == 200) {
                        results.push(data.data.rates);
                        
                        //get the yesterday data
                        url = 'https://openexchangerates.org/api/historical/'+ config.yesterdayDate +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d';
                        
                        $http.get(url).then(function(data){
                            
                            if (data.status == 200) {
                                results.push(data.data.rates);
                                calculateRate(results);
                                
                            }else {
                                //do something here to catch error
                            }
                        }); //end of 2nd $http.get
                    }else {
                        //do something here to catch error
                    }
                });// end of 1st $http.get
            
        } //end of getTodayCurrency function;
        
        function calculateRate(rates) {
            
            console.log(rates);
            
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
                'down': 'assets/currency-down.png',
                'equal': 'assets/currency-equal.png',
                'up': 'assets/currency-up.png'
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
        
        getTodayCurrency();
        $timeout(callback, 15000);
        
};


function temp14Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

   
        var config =  {
            'loop': true,
            'loopInterval': 10000,
            'animationIn': 'zoomInUp',
            'animationOut': 'zoomOutUp'
        }
    
        $http.get("/api/twitter").then(function(data){
            
            $(".loader").fadeOut();
            localStorage.setItem("tweetList",JSON.stringify(data));
            localStorage.setItem("tweetPosition",0);
            insertToScope();
        })
        
        
        function  insertToScope() {
            
            var temp = localStorage.getItem("tweetList");
            var data = JSON.parse(temp);

            var tweets = data.data.status.statuses;
            var tweetsCount  = tweets.length-1;
            var currentPosition = localStorage.getItem('tweetPosition') || 0;
            console.log('currentPosition: ' +currentPosition);
            var nextTweetPosition = (currentPosition < tweetsCount)? parseInt(currentPosition)+1 : 0;
                
            $scope.topHashtag = removeSpace(data.data.status.topHastagToday);
            $scope.tweet = tweets[currentPosition];
            $scope.tweetText = removeEmojis(tweets[currentPosition].text);
            $scope.tweetDate = moment(tweets[currentPosition].created_at).format('LL');
            
            
            $scope.nextTweet = tweets[nextTweetPosition];
            $scope.nextTweetText = removeEmojis(tweets[nextTweetPosition].text);
            $scope.nextTweetDate = moment(tweets[nextTweetPosition].created_at).format('LL');
            
//            $scope.$apply();
            
            changePosition(currentPosition,tweetsCount);
            
            if ($scope.topHashtag.length > 13) {
                $(".hashtag-overlay").css("font-size","3.6em");
                $(".hashtag-overlay").css("top","2.4em");
                $(".hashtag-overlay").css("letter-spacing","0");
            }else {
                $(".hashtag-overlay").css("font-size","7em");
                $(".hashtag-overlay").css("top","1em");
            }
        
        }
        
        if (config.loop) {
            
            
            
              var interval7 = setInterval(function () {

                  $("#currentTweet").delay(2000).removeClass("bounceInUp");
                  $("#secondTweet").delay(2000).removeClass("slideInUp");
    
                }, config.loopInterval/2);

            
              var interval8 = setInterval(function () {
                  
                    $scope.$apply(function () {
                        insertToScope();
                    });
                  
                  $("#currentTweet").addClass("bounceInUp");
                  $("#secondTweet").addClass("slideInUp");
    
                }, config.loopInterval);
            
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
                  localStorage.setItem('tweetPosition', currentPosition);
              } else {
                  currentPosition++;
                  localStorage.setItem('tweetPosition', currentPosition);
              }
            
            return currentPosition;

          }
        
        function removeEmojis(text) {
            return text.replace(/🎁/g,'');
        }


	function removeInterval() {
		clearInterval(interval7);
		clearInterval(interval8);
	}

    $timeout(removeInterval, 29000);   
    $timeout(callback, 30000);


};


function temp15Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

    var config = {
        'loop':'true',
        'loopInterval': 10000,
        'animationEnter': 'flipInY',
        'animationOut' : 'flipOutX'
    }
    
    
    var hugotList = [
        "Sabi ko na nga ba sabon ka! Kasi I'm SOAPer in love with you!",
        "Sana gravity nalang ako para kahit lumayo ka babalik at babalik ka din sa akin.",
        "dont waste your time to the person who dosen't even cares to your feelings.",
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
             
        }
        
        
        if (config.loop) {
            
            insertDataToScope();
    
            var interval5 = setInterval(function(){
                $(".hugot-text").delay(2000).removeClass(config.animationEnter);
            },config.loopInterval/2);

            var interval6 = setInterval(function(){

                insertDataToScope();
                $scope.$apply();    
                $(".hugot-text").addClass(config.animationEnter);

            },config.loopInterval);
    
        }




	function removeInterval() {
		clearInterval(interval5);
		clearInterval(interval6);
	}

    $timeout(removeInterval, 19000);   
    $timeout(callback, 20000);

};