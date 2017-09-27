var async = require('async')
var needle = require('needle')
var fs = require('fs')
var express = require('express')
var path = require('path')
var aircast = require('./aircastServer.js')

var Twit = require('twit');


var app = express()

app.set('port', process.env.PORT || 3000);
app.use('/css', express.static(path.join(__dirname+'/public/css')));
app.use('/scripts', express.static(path.join(__dirname+'/public/scripts')));
app.use('/templates', express.static(path.join(__dirname+'/public/templates')));
app.use('/assets', express.static(path.join(__dirname+'/public/assets')));
app.use('/Aircast', express.static(path.join(__dirname+'/Aircast')));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/public')});
})

app.get('/demo', function (req, res) {
  res.sendFile('indexDemo.html', {root: path.join(__dirname, '/public')});
})

app.get('/myID', function (req, res) {
  // console.log(aircast);
  var data = {
              RpiID: aircast.config.RpiID,
              RpiServer: aircast.config.RpiServer
            }

  if(aircast.config.isLegit){
    res.send(data);
  }
  else{
    res.send({
      error: 'config failed'
    });
  }

})



//twitter credentials
var T = new Twit({
  consumer_key:         'kvvXBOK0qr0El009CfVyU0KKB',
  consumer_secret:      'EZobxorl1JYSWYyJ1pdF9c3Ez89DohDbJaBg1I0n3iRV4CwobX',
  access_token:         '775694551545556993-CGbs51FySiiodicBaLEqnvJOGbmg0cI',
  access_token_secret:  'daL7XSMoexQkfU3zaz514Dy94uoNwBm91jIGxgzh80hD3'
})



//route to get data from twitter
app.get("/api/twitter",function(req,res){
    
    T.get('trends/place', {id: '23424934'}, function(err,data,response){
        var trends = data[0]['trends'];
        var top = 0;
        var topHashtag,hashtagQuery;
        
        for (var i=0; i < trends.length; i++) {
            var temp = trends[i].tweet_volume || 0;
            if (top <= temp) {
                top = temp;
                topHashtag = trends[i].name;
                hashtagQuery = trends[i].query;
            }
        }
        console.log("\nTop Hastag: " + topHashtag);
        console.log("Tweet Volume: " + top);
        console.log("Query: " + hashtagQuery);
        getTweets(topHashtag);
    });
    
    function getTweets(topHashtag) {
        
        T.get('search/tweets', { q: topHashtag, lang: 'en', result_type: 'mixed', count: 100 }, function(err, data, response) {
            var status = data;
            status.topHastagToday = topHashtag;
            res.json({status});
        });
    }
    
});









app.listen(app.get('port'), function () {
  console.log('Example app listening on port: '+app.get('port'))
})


function getRpiConfig(){
  if(aircast.getConfig()){
    console.log('success');
    // updateRpi();
    setInterval(aircast.getRpiFiles, 10000);
  }
  else{
    console.log('fail');
    setTimeout(getRpiConfig, 100);
  }
}

function updateRpi(){
  setInterval(aircast.getRpiFiles, 10000);
}


getRpiConfig()

