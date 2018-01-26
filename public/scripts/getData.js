function temp10GetData($http, $scope){
	console.log('temp10');

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp10'&&(!item.hasData||item.lastQuery < (Date.now()-600000))){
			console.log('news query');

			console.log(item);
			var dum = item.tempSrc.source.split('/');
			console.log(dum);
			var source = dum[1];
			item.source = source;
			// for(var i=0; i< $scope.templates.length; i++){
			// 	console.log()
			// 	if($scope.templates[i].Template == 'temp10'){
			// 		console.log('NEWWWS');
			// 		var dum = $scope.templates[i].tempSrc.source.split('/');
			// 		source = dum[1];
			// 		console.log('source: '+source);
			// 	}
			// }

			$http.get('https://newsapi.org/v1/articles?source='+source+'&sortBy=top&apiKey=44e7bd68b7d74cef902f1d9c7cb96b72')
				.then(function(response){
					console.log('temp 10 success');
					for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp10' && $scope.TemplateData[i].CampaignID == item.CampaignID){
		        			$scope.TemplateData[i].TempData = response.data;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			// $scope.TemplateData[i].source = source;
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
		              		if (response.status == 200 && response.data.length == 5) {
			              		console.log(response);
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
		              		}
		              })
		}
	})

			
}


function temp15GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp15'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/hugot.php')
		              .then(function(response) {
			              		$scope.TemplateData.forEach(function(item){
									if(item.Template == 'temp15'){
										item.TempData = response.data;
										item.hasData = true;
			        					item.lastQuery = Date.now();
										console.log('Get Data Temp Data 15');
					        			console.log(item);
									}
								})
		              		
		              })
		}
	})

}

function temp16GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp16'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=f2ebc8131c456f6ee2f134ac299aa40f&language=en&US')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp16'){
									item.TempData = response.data;
									console.log("movies data: ");
									console.log(response.data);
									item.moviePosition = 0;
									item.hasData = true;
		        					item.lastQuery = Date.now();
									console.log('Get Data Temp Data 16');
				        			console.log(item);
								}
							})
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
		if(item.Template=='temp23'&&(!item.hasData||item.lastQuery < (Date.now()-36000000))){
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
		if(item.Template=='temp22'&&(!item.hasData||item.lastQuery < (Date.now()-360000))){

			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp22'){
					item.TempData = [
				        "Hintayin mo ang True Love mo. Na Traffic lang yun sa malalanding tao.",
				        "If you want to be part of my life, make sure that you are ready to accept not only the good parts but also my stupid side.",
				        "How can you love someone else. If you’re returning to the past.",
				        "In a relationship, no matter how carefully you hold the one.. Yet you have lost it.. Because he had released the hold earlier.",
				        "Hopeless, minsan lovelife mo pero Madalas Trapik",
				        "Sa LOVE, walang bingi; walang bulag; walang pipi…pero TANGA marami.",
				        "Kapag mahal mo, ipaglaban mo. Pero kung pinagmumukha ka nang tanga, iwan mo na.",
				        "Mamatay-matay ka sa selos, hindi naman pala kayo. Ano ba ‘yun !",
				        "Lagi na lang ninyong sinisisi ang mga taong “paasa”. Hindi kaya, kasalanan mo dahil “assuming” ka lang?",
				        "Ang mabuting lalaki, “stick to one”, hindi 3 in 1.",
				        "Aanhin pa ang tiwala, kung ang hinala ay laging tumatama?",
				        "Sa pahanon ngayon, tanghali nalang ang tapat.",
				        "Ang daling matulog, and hirap bumangon. Ang daling mahulog, ang hirap mag move on.",
				        "Namimiss ka daw pero wala naman ginagawa para makita ka. Ano yun namimiss ka pero ikaw ang kailangang lumapit sa kanya?",
				        "Never get rid of the person who understands you more than anyone else.",
				        "Being simple is the most perfect way to make someone fall in love with you.",
				        "As you grow older, you realize it becomes less important to have more friends and more important to have real ones.",
				        "There's nothing wrong with giving up. It's just wrong to give up before you try and give your best.",
				        "Ang crush ay parang math problem, kung hindi mo makuha, titigan mo nalang.",
				        "Kung isa akong joke, gusto ko yung mapipikon ka, para naman seryosohin mo ako.",
				        "Kung magkaroon man ako ng third eye. Ilalagay ko ito sa puso ko. Para hindi na ako mabulag sa pag-ibig.",
				        "Kapag namatay na ako, huwag na huwag kang pupunta sa libingan ko, Baka tumibok uli ang puso ko.",
				        'Ang salitang "Sorry" ginagamit sa kasalanang hindi sinasadya, hindi yung paulit-ulit mong ginagawa.',
				        "If you get tired, learn to rest, not to quit.",
				        "You may lose people you love. You may lose the things you have. But whatever happens, never lose yourself.",
				        "Don't let other people define who you really are.",
				        "May mga tao talaga na kahit ibigay mo pa ang lahat sa kanila, naghahanap pa rin ng iba.",
				        "Ikaw yung tipong pag naging multo, di pa rin magpaparamdam.",
				        "Follow your heart but always take your brain with you.",
				        "You can't make others happy until you make yourself happy.",
				        "The best way to avoid disappointment is to not expect anything from anyone.",
				        "Pag-usapan ng maayos. Di yung puro away.",
				        "Sometimes all you need is someone who can make you smile.",
				        "Fake friends believe in rumors, real friends believe in you.",
				        "People who hide their feelings usually care the most.",
				        "Never compare yourself to anyone.",
				        "Distance sometimes lets you know who's worth keeping and who's worth letting go.",
				        "Ginawa kitang mundo ko eh.. Ngayon wala ka na. Ano nang gagawin ko ngayon? Paano ako makakamove on galing dito?",
				        "Hindi kailangan tumigil ang mundo mo dahil lang hindi naging kayo.",
				        "You deserve someone who goes out their way to show you that they love you.",
				        "True love and loyal friends are two of the hardest things to find.",
				        "Kunwari kinikilig, pero nagseselos na pala.",
				        "God will never be busy to answer your prayers.",
				        "Ang tunay na lalaki, nagbabago para sa babae. Hindi pabago-bago ng babae.",
				        "Ang plastic pinaglalagyan yan, hindi inuugali.",
				        "Ang problema, hinahanapan ng solusyon, hindi idinadaan sa init ng ulo at sisihan.",
				        "Ang sweet niyo no? Hindi naman kayo.",
				        "Ang totoong pag ibig Hindi madamot.",
				        "As human, you are never designed to fly but you can always choose to soar high.",
				        "Babae ka! you deserve to loved, to be respected and to be needed.",
				        "Kinilig. Nagmahal. Nasaktan. Nasaktan. Nasaktan. Nasaktan. Nasaktan.",
				        "I still remember the first feeling I got when I first saw you smiling.",
				        "Kung hindi mo kayang mag forgive, sarili mo rin ang pinapahirapan mo, di ang taong humihingi nito.",
				        "I'm not looking for someone who has everything. I'm looking for someone who can share time with me more than anything.",
				        "Don't be afraid to dream, live or love. This is what makes life worth living.",
				        "Alam mo yung pakiramdam na hindi mo siya matiis kasi mahal mo siya, pero natitiis ka niya kasi alam niyang mahal mo siya.",
				        "Sana may nagtatanong din sakin kung kamusta ang araw ko.",
				        "If you can love the wrong one so much, just imagine how much you can love the right one.",
				        "Sana pag dumating yung araw na mahal mo nako, mahal pa rin kita.",
				        "I need someone who would actually stay by my side, no matter what mood I'm in.",
				        "Minsan talaga siya lang ang kailangan mo para ngumiti ka.",
				        "Anong laban ko? Mahal mo siya, Kaibigan mo lang ako.",
				        "Smile. Even amazing people have struggles too.",
				        "Bawat bagay ay mahalaga, hindi mo lang nakikita kasi hindi pa nawawala.",
				        "Life is too short to be stressed.",
				        "May mga tao talagang feeling magagaling.",
				        "Di nagtetext? Dalawa lang yan, it's either busy sya or mas importante yung ginagawa nya.",
				        "Wag mong iwan 'yung sinaing. 'Di yan tulad mo na sanay iniiwan.",
				        "Yung feeling na may narinig kang kanta tapos naalala mo sya.",
				        "Dapat ba masaya ako dahil magkaibigan tayo? O dapat ba akong malungkot kasi hanggang dun lang tayo?",
				        "May mga taong di payag na mawala ka. Pero di naman gumagawa ng paraan para manatili ka.",
				        "Siopao kaba? Binobola-bola kana, asadong asado ka pa.",
				        "God cares about everything that concerns you, so feel free to talk to Him about anything.",
				        "Bawal mag-assume. Nakakamatay.",
				        "Bakit nagbabago ang isang tao? Dahil nasasaktan ito ng todo.",
				        "Ang tiwala ay madaling makuha pero madali ding masira at mawala.",
				        "Lahat ng binabalewala, nawawala."
				        
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
		if(item.Template=='temp19'&&(!item.hasData||item.lastQuery < (Date.now()-360000))){
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


// function temp24GetData($http, $scope){
// 	console.log('temp24');

// 	$scope.TemplateData.forEach(function(item){
// 		if(item.Template=='temp24'&&(!item.hasData||item.lastQuery < (Date.now()-600000))){
// 			console.log('news query');

// 			$http.get('https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=44e7bd68b7d74cef902f1d9c7cb96b72')
// 				.then(function(response){
// 					console.log('temp 24 success');
// 					for(var i=0; i<$scope.TemplateData.length; i++){
// 		        		if($scope.TemplateData[i].Template == 'temp24'){
// 		        			$scope.TemplateData[i].TempData = response.data;
// 		        			$scope.TemplateData[i].hasData = true;
// 		        			$scope.TemplateData[i].lastQuery = Date.now();
// 		        			console.log('Get Data Temp Data');
// 		        			console.log($scope.TemplateData);
// 		        			break;
// 		        		}
// 		        	}
// 				}, function(error){
// 					console.log(error);
// 				})
// 		}
// 	})

			
// }

