function temp10GetData($http, $scope){
	console.log('temp10');

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp10'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			console.log('news query');

			$http.get('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=44e7bd68b7d74cef902f1d9c7cb96b72')
				.then(function(response){
					console.log('temp 10 success');
					for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp10'){
		        			$scope.TemplateData[i].TempData = response.data;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			console.log('Get Data Temp Data');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}
				}, function(error){
					console.log(error);
				})
		}
	})

			
}


function temp11GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp11'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get("https://developers.zomato.com/api/v2.1/geocode?lat=14.6297778&lon=121.027977", {
		            headers : {
		                'user-key': '1e3481187e26de091dfdb5f7f768312a',
		                'Accept': 'application/json;odata=verbose'
		            }   
		        }).then(function(response){
		        	var dummy = [];
		        	for(var i=0; i< response.data.nearby_restaurants.length; i++){
		        		dummy.push(response.data.nearby_restaurants[i]);
		        		if(i>=9)
		        			break;
		        	}
		        	for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp11'){
		        			$scope.TemplateData[i].TempData = dummy;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			console.log('Get Data Temp Data');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}
		        })
		}
	})

			
}

function temp12GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp12'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7')
				.then(function(response1){
					$http.get('http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67')
						.then(function(response2){
							for(var i=0; i<$scope.TemplateData.length; i++){
				        		if($scope.TemplateData[i].Template == 'temp12'){
				        			var dummy = [];
				        			dummy.push(response1);
				        			dummy.push(response2);
				        			$scope.TemplateData[i].TempData = dummy;
				        			$scope.TemplateData[i].hasData = true;
		        					$scope.TemplateData[i].lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log($scope.TemplateData);
				        			break;
				        		}
				        	}
						})
				})
		}
	})

			

}


function temp13GetData($http, $scope){

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}


	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp13'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp13'){

					item.TempData = [];

					$http.get('https://openexchangerates.org/api/latest.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
						.then(function(response1){
							item.TempData.push(response1.data.rates);

							var yesterday = new Date((Date.now()) - 86400000);

							var yes = formatDate(yesterday);

							$http.get('https://openexchangerates.org/api/historical/'+ yes +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
								.then(function(response2){
									item.TempData.push(response2.data.rates);
				        			item.hasData = true;
		        					item.lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log(item);
								})
						})


				}
			})
		}
	})
			

}



function temp14GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp14'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('/api/twitter')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp14'){
									item.TempData = response.data;
									item.lastTweet = 0;
									item.lastArray = 0;
									item.hasData = true;
		        					item.lastQuery = Date.now();
									console.log('Get Data Temp Data 14');
				        			console.log(item);
								}
							})
		              })
		}
	})

			
}


function temp15GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp15'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){

			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp15'){
					item.TempData = [
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
				        
				    ];
					item.hasData = true;
					item.lastQuery = Date.now();
				}
			})
		}
	})

}



function temp17GetData($http, $scope){
	// console.log('temp10');

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp17'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			console.log('news query');

			$http.get('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=44e7bd68b7d74cef902f1d9c7cb96b72')
				.then(function(response){
					// console.log('temp 10 success');
					for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp17'){
		        			$scope.TemplateData[i].TempData = response.data;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			console.log('Get Data Temp Data');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}
				}, function(error){
					console.log(error);
				})
		}
	})

			
}

function temp18GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp18'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7')
				.then(function(response1){
					$http.get('http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67')
						.then(function(response2){
							for(var i=0; i<$scope.TemplateData.length; i++){
				        		if($scope.TemplateData[i].Template == 'temp18'){
				        			var dummy = [];
				        			dummy.push(response1);
				        			dummy.push(response2);
				        			$scope.TemplateData[i].TempData = dummy;
				        			$scope.TemplateData[i].hasData = true;
		        					$scope.TemplateData[i].lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log($scope.TemplateData);
				        			break;
				        		}
				        	}
						})
				})
		}
	})
}



function temp20GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp20'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('/api/twitter')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp20'){
									item.TempData = response.data;
									item.lastTweet = 0;
									item.hasData = true;
		        					item.lastQuery = Date.now();
									// console.log('Get Data Temp Data 14');
				        			console.log(item);
								}
							})
		              })
		}
	})
}



function temp23GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp23'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get("https://developers.zomato.com/api/v2.1/geocode?lat=14.6297778&lon=121.027977", {
		            headers : {
		                'user-key': '1e3481187e26de091dfdb5f7f768312a',
		                'Accept': 'application/json;odata=verbose'
		            }   
		        }).then(function(response){
		        	var dummy = [];
		        	for(var i=0; i< response.data.nearby_restaurants.length; i++){
		        		dummy.push(response.data.nearby_restaurants[i]);
		        		if(i>=9)
		        			break;
		        	}
		        	for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp23'){
		        			$scope.TemplateData[i].TempData = dummy;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			console.log('Get Data Temp Data');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}
		        })
		}
	})	
}


function temp22GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp22'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){

			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp22'){
					item.TempData = [
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
				        
				    ];
					item.hasData = true;
					item.lastQuery = Date.now();
				}
			})
		}
	})

}




function temp19GetData($http, $scope){

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}


	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp19'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp19'){

					item.TempData = [];

					$http.get('https://openexchangerates.org/api/latest.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
						.then(function(response1){
							item.TempData.push(response1.data.rates);

							var yesterday = new Date((Date.now()) - 86400000);

							var yes = formatDate(yesterday);

							$http.get('https://openexchangerates.org/api/historical/'+ yes +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
								.then(function(response2){
									item.TempData.push(response2.data.rates);
				        			item.hasData = true;
		        					item.lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log(item);
								})
						})


				}
			})
		}
	})
			

}


