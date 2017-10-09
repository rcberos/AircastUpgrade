function temp20Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){
	var config =  {
            'loop': true,
            'loopInterval': 10000,
            'animationIn': 'zoomInUp',
            'animationOut': 'zoomOutUp'
        }


        var loopCounter = 0;
        var cb = false;
        var twitterCounter =  parseInt(localStorage.getItem('twitter-counter')) || 0;
        var temp, twitterData, hashtagList;
        var interval7, interval8;

        var twitterPosition = 0;

       function checkIfTwitterDataExpired(){

                var currentTimeStamp = moment().unix();

                if (localStorage.getItem('twitter-expiration-date') == null) {

                    getDataFromApi();
                
                }else{

                  if(localStorage.getItem('twitter-expiration-date') >= currentTimeStamp) {
                    console.log("Twitter data is still good and data is still within 4 hours.");
                    console.log("Getting data from the local storage");

                    if (localStorage.getItem('twitter') != null || localStorage.getItem('twitter') != '') {
                      
                      getDataFromStorage();
                    }

                      console.log("data is not good, getting data from the api");
                      getDataFromApi();

                    

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

                  console.log(response.data);

                  if (response.data) {
                      localStorage.setItem('twitter-expiration-date',currentTimeStamp);
                      localStorage.setItem('twitter',JSON.stringify(response.data));
                      localStorage.setItem('twitter-position',0);
                      console.log("fetch data from the local storage");

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
                  	if (cb == false) {
                  		callback();	
                  	}
                    
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
          $(".twitter-portrait .loader").fadeOut("slow");
          inserDataToScope();
      }

      function inserDataToScope(){


            var tweets = twitterData.status.statuses;
            var tweetsCount  = tweets.length-1;
            var currentPosition = twitterPosition;
            var nextTweetPosition = (currentPosition < tweetsCount)? currentPosition+1 : 0;
            console.log("Current Tweet Position: " + currentPosition +"/"+tweetsCount);
                
            $scope.topHashtag = removeSpace(twitterData.status.topHastagToday);
            
            
            // if ($scope.topHashtag.length > 15) {
            //     $(".hashtag-overlay").css("font-size","3.5em");
            //     $(".hashtag-overlay").css("top","2.5em");
            //     $(".hashtag-overlay").css("letter-spacing","0");
            // }else {
            //     $(".hashtag-overlay").css("font-size","7em");
            //     $(".hashtag-overlay").css("top","1em");
            // }


            $scope.tweet = tweets[currentPosition];
            $scope.tweetTextPort = removeEmojis(tweets[currentPosition].text);
            $scope.tweetDate = moment(tweets[currentPosition].created_at).format('LL');
            
            
            $scope.nextTweet = tweets[nextTweetPosition];
            $scope.nextTweetText = removeEmojis(tweets[nextTweetPosition].text);
            $scope.nextTweetDate = moment(tweets[nextTweetPosition].created_at).format('LL');

            $scope.name = removeEmojis(tweets[currentPosition].user.name);
            $scope.username = removeEmojis(tweets[currentPosition].user.screen_name);

            
            if(!$scope.$$phase) {
              $scope.$apply();
            }
//            $scope.$apply();
            
            changePosition(currentPosition,tweetsCount);
            // checkIfDataEnds();

              if (loopCounter == 0) {
              	twitterloop();
              	cb = true;
              	callCallback();
              	loopCounter++;
              }
            
        
        }

        function twitterloop() {


			if (config.loop) {	

	              interval11 = setInterval(function () {
	                  twitterRemoveClass();
	                }, config.loopInterval/2);

	            
	              interval12 = setInterval(function () {

	                  $scope.$apply(function(){
	                    inserDataToScope();
	                    twitterAddClass();
	                    });
	                    
	                }, config.loopInterval);
	            
	        }

        }

	                	
        

        

        function twitterRemoveClass(){
              $(".twitter-portrait #currentTweet").delay(2000).removeClass("bounceInUp");
              $(".twitter-portrait #secondTweet").delay(2000).removeClass("slideInUp");
        }


        function twitterAddClass(){
                $(".twitter-portrait #currentTweet").addClass("bounceInUp");
                $(".twitter-portrait #secondTweet").addClass("slideInUp");
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
                  twitterPosition = 0;
                  localStorage.setItem('twitter-position', currentPosition);
                  localStorage.setItem('twitter-counter',twitterCounter);
                  currentHashtag();
              } else {
                  twitterPosition++;
                  localStorage.setItem('twitter-position', currentPosition);
                  localStorage.setItem('twitter-counter', twitterCounter);
              }

              $scope.TemplateData.forEach(function(item){
					if(item.Template == 'temp20'){
							item.lastTweet = twitterPosition
			    		}
				})
            
            return currentPosition;

          }
        
    function removeEmojis (string) {
          var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

          return string.replace(regex, '');
        }


	function removeInterval() {


	clearInterval(interval11);
	clearInterval(interval12);		


	}

	$scope.TemplateData.forEach(function(item){
		if(item.Template == 'temp20'){
    			twitterData = item.TempData;
    			twitterPosition = item.lastTweet;


		          $(".twitter .loader").fadeOut("slow");
		          inserDataToScope();
    		}
	})


	function callCallback(){
		if (cb) {
			$timeout(removeInterval, 58000);   
		    $timeout(callback, 60000);	
		}
	}
}