var express = require('express');
var Twit = require('twit');
var requestify = require('requestify');
var LocalStorage = require('node-localstorage').LocalStorage;
var datetime = require('node-datetime');

var app = express();


localStorage = new LocalStorage('./local_data');


//twitter credentials
var T = new Twit({
  consumer_key:         'kvvXBOK0qr0El009CfVyU0KKB',
  consumer_secret:      'EZobxorl1JYSWYyJ1pdF9c3Ez89DohDbJaBg1I0n3iRV4CwobX',
  access_token:         '775694551545556993-CGbs51FySiiodicBaLEqnvJOGbmg0cI',
  access_token_secret:  'daL7XSMoexQkfU3zaz514Dy94uoNwBm91jIGxgzh80hD3'
})

/*
This route provides a list of news articles coming from the newsapi.org.
In order to get the data, this code runs a loop to get articles from the sources listed under newsSources variable.
Data will be saved in the local storage and will expires daily.
*/

// route to get data for news
app.get("/api/news",function(req,res){

	var newsSources = ['buzzfeed','cnn','espn','google-news','entertainment-weekly','al-jazeera-english','bloomberg','techcrunch','business-insider-uk'];
	var counter = 0;
	var newsApiKey = '44e7bd68b7d74cef902f1d9c7cb96b72';
	var url = 'https://newsapi.org/v1/articles?source='+newsSources[counter]+'&sortBy=top&apiKey='+newsApiKey;
	var newsList  = [];

	var expirationDate = datetime.create();
	expirationDate.offsetInDays(1);
	var dateToday = datetime.create();


	if (localStorage.getItem("newsList") == null || localStorage.getItem("newsDataExpiration") == null ) {
		fetchNewsData(url);

	}else {

		if (localStorage.getItem("newsDataExpiration") == dateToday.format('m/d/y')) {
			console.log('Data expired. Fetching data from the api.');
			fetchNewsData(url);

		}else {
			console.log('Data is still OK. Fetching data from the local storage.');
			fetchDataFromLocalStorage();
		}
	}

	function fetchNewsData(url) {

		requestify.get(url).then(function(response) {

			if (response.code == 200) {

				var news = response.getBody();

				newsList.push(news);

				console.log("news-source count: " + newsList.length);

				if (counter < newsSources.length-1) {
					counter++;
					url = 'https://newsapi.org/v1/articles?source='+newsSources[counter]+'&sortBy=top&apiKey='+newsApiKey;
					fetchNewsData(url);
				}else {
					localStorage.setItem("newsList", JSON.stringify(newsList));
			    	localStorage.setItem("newsDataExpiration",expirationDate.format('m/d/y'));
			    	// console.log("News data saved in the local storage. Expiration date: ", expirationDate.format('m/d/y'));
					res.send(newsList);
				}

			}
			

		});
	}

	function fetchDataFromLocalStorage() {

		console.log("news data fetch from the local storage");
		var newsData = localStorage.getItem("newsList");
		res.send(JSON.parse(newsData));

	}


});

/*
This will get the data from the zomato api to provide nearby restaurants based on the given lat and long.
It will fetch data once, saved it in the local storage and will expire after 1 month.
After the expiration, it will fetch the data again from the zomato api to refresh the data.
*/

// route to get data for nearby-restaurant
app.get("/api/restaurant",function(req,res){


	var lat = 14.609695;
	var long = 121.0747;
	var zomatoConfig =  {
            headers : {
                'user-key': '1e3481187e26de091dfdb5f7f768312a',
                'Accept': 'application/json;odata=verbose' }
            };  

	var url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + lat + '&lon=' + long;

	var restaurantList = [];
	var restaurantNameList = [];
	var tempCount, counter = 0;

	var expirationDate = datetime.create();
	expirationDate.offsetInDays(30);
	var dateToday = datetime.create();


	if (localStorage.getItem("restaurantList") == null || localStorage.getItem("restaurantDataExpiration") == null ) {
		fetchRestaurantData(url);
	}else {

		if (localStorage.getItem("restaurantDataExpiration") == dateToday.format('m/d/y')) {
			console.log('Data expired. Fetching data from the api.');
			fetchRestaurantData(url);

		}else {
			console.log('Data is still OK. Fetching data from the local storage.');
			fetchDataFromLocalStorage();
		}
	}

	function fetchDataFromLocalStorage(){

		console.log("restaurant data fetch from the local storage");
		var restaurantData = localStorage.getItem("restaurantList");
		res.send(JSON.parse(restaurantData));

	}

	function fetchRestaurantData(url) {

		requestify.get(url,zomatoConfig).then(function(response) {

			if (response.code == 200) {

			    var temp = response.getBody();
			    var restaurants = temp.nearby_restaurants;

			    for (var i = 0 ; i < restaurants.length; i++) {

			    	if (restaurantNameList.indexOf(restaurants[i].restaurant.name) == -1) {
			    		restaurantNameList.push(restaurants[i].restaurant.name);
			    		restaurantList.push(restaurants[i]);
			    	}
			    }
			    console.log('restaurant count: ' + restaurantList.length);

			    if (restaurantList.length < 100) {
			    	checkIfListReach50(restaurantList.length);
			    	
			    }else {
			    	localStorage.setItem("restaurantList", JSON.stringify(restaurantList));
			    	localStorage.setItem("restaurantDataExpiration",expirationDate.format('m/d/y'));
			    	produceReport(restaurantList.length);
			    	res.send(restaurantList);
			    }

			}

		});
		

	}

	function checkIfListReach50(restaurantListLength) {

		lat += .01;

		if (tempCount == restaurantListLength) {
			long += 0.01;
			counter++;
		}else {
			tempCount = restaurantListLength;
			counter = 0;
		}

		if (counter > 5) {
			localStorage.setItem("restaurantList", JSON.stringify(restaurantList));
			localStorage.setItem("restaurantDataExpiration",expirationDate.format('m/d/y'));
			produceReport(restaurantListLength);
			res.send(restaurantList);
		}else {
			url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + lat + '&lon=' + long;
			fetchRestaurantData(url);
		}
	}

	function produceReport(restaurantCount){

		console.log("Completed the process.")
		console.log("Restaurant count: " + restaurantCount);
		console.log("Current date: ", dateToday.format('m/d/y'));
		console.log("Date to expire: ", expiration.format('m/d/y'));

	}

});


/*

This route will get top 5 hashtag in the philippines and will get 10 popular tweets each hashtag in the list.
After getting the data, it will be stored in the local storage which will expire every day
once the data expires, it will fetch the data again from the twitter api and then saved it again in the local storage.

*/

//route to get data from twitter
app.get("/api/twitter",function(req,res){

	var tweetList = [];
	var tweets = {};
	var keysSorted = [];
	var counter = 0;

	var expirationDate = datetime.create();
	expirationDate.offsetInDays(1);
	var dateToday = datetime.create();

	
	if (localStorage.getItem("tweetList") == null || localStorage.getItem("tweetsDataExpiration") == null ) {
		getTrendingHashtags();

	}else {

		if (localStorage.getItem("tweetsDataExpiration") == dateToday.format('m/d/y')) {
			console.log('Data expired. Fetching data from the api.');
			getTrendingHashtags();

		}else {
			console.log('Data is still OK. Fetching data from the local storage.');
			fetchDataFromLocalStorage();
		}
	}



	function getTrendingHashtags(){

		console.log("Fetching data from the Twitter api.");

		T.get('trends/place', {id: '23424934'}, function(err,data,response){

			var tweetsData = data[0]['trends'];
			
			for (var i = 0; i < tweetsData.length; i++) {
				tweets[tweetsData[i].name] = tweetsData[i].tweet_volume;
			}

			keysSorted = Object.keys(tweets).sort(function(a,b){return tweets[b]-tweets[a]});

			getTweets(keysSorted[counter]);

		});

	}

    function getTweets(topHashtag) {
        
        T.get('search/tweets', { q: topHashtag, lang: 'en', locale: 'fil', result_type: 'popular', count: 10 }, function(err, data, response) {
            var status = data;

            if (counter < 5) {
            	tweetList.push(data);
            	counter++;
            	getTweets(keysSorted[counter]);

            }else {
			   	localStorage.setItem("tweetList", JSON.stringify(tweetList));
			    localStorage.setItem("tweetsDataExpiration",expirationDate.format('m/d/y'));            	
            	res.json(tweetList);
            }

        });
    }

    function fetchDataFromLocalStorage() {

		console.log("restaurant data fetch from the local storage");
		var tweetsData = localStorage.getItem("tweetList");
		res.send(JSON.parse(tweetsData));

    }

    
});

app.get("/temp",function(){

	var dateTime = datetime.create();
	console.log(Math.round(dateTime.now()/1000));
});


app.listen("4000",function(){
	console.log("server started at port 4000");
});



