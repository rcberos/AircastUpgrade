var request = require('request');
var http = require('http');
var fs = require('fs');
var async = require('async');
var path = require('path');
var df = require('download-file')

var RpiConfig = {
	RpiID: 0,
	RpiServer: "",
	CheckFile: "",
	UpdateFile: "",
	RpiDownloading: [],
	isLegit: false,
	mayDownload: false
}

// var configLocation = '/Users/randyberos/Documents/nodejs/AircastConfig/config.json';

var configLocation = path.join(__dirname, '../AircastConfig/config.json');

var getConfig = function(){
	var AircastConfig = require(configLocation);

	// console.log("RpiID: "+AircastConfig.RpiID);

	RpiConfig.RpiID = AircastConfig.RpiID;
	RpiConfig.RpiServer = AircastConfig.RpiServer;
	RpiConfig.CheckFile = AircastConfig.CheckFile;
	RpiConfig.UpdateFile = AircastConfig.UpdateFile;
	RpiConfig.Timeout = AircastConfig.Timeout;

	if(RpiConfig.RpiID != 0){
		RpiConfig.isLegit = true;
		return true;
	}
	else
		return false;
}

function update(CampaignID){
	var options = {
	  uri: RpiConfig.RpiServer+RpiConfig.UpdateFile,
	  method: 'POST',
	  json: {
	    RpiID: RpiConfig.RpiID,
	    CampaignID: CampaignID
	  }
	};

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log('CampaignID: '+CampaignID+' UPDATED');
	  	RpiConfig.RpiDownloading.forEach(function(d, index){
	  		if(d.CampaignID == CampaignID){
	  			RpiConfig.RpiDownloading.splice(index, 1);
	  		}
	  	});
	  	// console.log(RpiConfig.RpiDownloading);
	  }
	});
}

function download(CampaignID, CampaignFile, cb){
	console.log('Downloading CampaignID: '+CampaignID+' FileID: '+CampaignFile.FileID);

	var dest = path.join(__dirname+'/Aircast/'+CampaignFile.FileName);
	var source = 'http://s3-ap-southeast-1.amazonaws.com/rpitv/Aircast/'+CampaignFile.FileName;

	var options = {
	    directory: path.join(__dirname+'/Aircast/'),
	    filename: CampaignFile.FileName,
	    timeout: 20000
	}
	 
	df(source, options, function(err){
	    // if (err) throw err
	    if(err){
	    	console.log(err);
	    	return cb('error');
	    }
	    else{
	    	console.log("meow")
			console.log('File Downloaded: '+CampaignFile.FileID);
			return cb();
	    }
		    
	}) 


	// var file = fs.createWriteStream(dest);
 //    var sendReq = request.get(source, {timeout: RpiConfig.Timeout});

 //    // verify response code
 //    sendReq.on('response', function(response) {
 //        if (response.statusCode !== 200) {
 //        	console.log('may mali');
 //            return cb('Response status was ' + response.statusCode);
 //        }
 //    });

 //    sendReq.on('end', function(){
 //    	file.close(function(){
 //    		// console.log('file close '+CampaignID);
 //    	});
 //    	// console.log('end');
 //    })

 //    // check for request errors
 //    sendReq.on('error', function (err) {
 //        // fs.unlink(dest);
 //        console.log('error ' + CampaignID)
 //        file.close()
 //        console.log(err.message)
 //    	cb('error');
 //        // return cb(err.message);
 //    });

 //    sendReq.pipe(file);

 //    file.on('finish', function() {
 //    	console.log('File Downloaded: '+CampaignFile.FileID);
 //        file.close(function(){
 //        	// console.log('file finish');
 //        	cb();
 //        });  // close() is async, call cb after close completes.
 //    });

 //    file.on('error', function(err) { // Handle errors
 //    	console.log(JSON.stringify(err));
 //    	console.log('file error');
 //    	cb('error');
 //    });
	
}


var getRpiFiles = function(){
	var opt = {
	   headers: { 'Content-Type': 'application/json' }
	  }
	var data = {
	    RpiID: RpiConfig.RpiID
	  }

	  // download();

	var options = {
	  uri: RpiConfig.RpiServer+RpiConfig.CheckFile,
	  method: 'POST',
	  json: {
	    RpiID: RpiConfig.RpiID
	  }
	};

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	// console.log(JSON.stringify(body));
	  	console.log('get files success');
		var data = body.value;
		for(var i = 0; i < data.length; i++){
			var isDownloading = false;
			for(var j = 0; j < RpiConfig.RpiDownloading.length; j++){
				if(data[i].CampaignID == RpiConfig.RpiDownloading[j].CampaignID){
					isDownloading = true;
					break;
				}
			}
			if(isDownloading == false){
				var campaign = {
					isDownloading: false,
					CampaignID: data[i].CampaignID,
					Files: data[i].Files
				}
				RpiConfig.RpiDownloading.push(campaign);
			}
			console.log(JSON.stringify(RpiConfig.RpiDownloading));
		}



		// if(!RpiConfig.mayDownload && RpiConfig.RpiDownloading.length > 0){
		// 	RpiConfig.mayDownload = true;

		// 	async.eachSeries(RpiConfig.RpiDownloading, function(d, callback) {

		// 		if(d.isDownloading == false){
		// 			d.isDownloading = true;
		// 			async.eachSeries(d.Files, function(file, callback) {
		// 				// console.log(index);
		// 				download(d.CampaignID, file, callback);
		// 			}, function(err){
		// 				console.log(err);
		// 				if(!err){
		// 					console.log('CampaignID: '+d.CampaignID+' FULL DOWNLOADED');
		// 					update(d.CampaignID);

		// 				}
		// 				else{
		// 					console.log('FileFailed');
		// 					d.isDownloading = false;
		// 				}
		// 				callback();
		// 			})
		// 		}

		// 	  // callback();
		// 	}, function(err){
		// 	    if( err ) {
		// 	      console.log('A file failed to process');
		// 	    } else {
		// 	      console.log('All files have been processed successfully');
		// 	    }
		// 	    RpiConfig.mayDownload = false;
		// 	});
		// 	// console.log('CampaignID: '+d.CampaignID+' FULL DOWNLOADED');
		// }


		RpiConfig.RpiDownloading.forEach(function(d, index){
			if(d.isDownloading == false){
				// console.log('New File to Download: '+d.CampaignID);
				d.isDownloading = true;
				async.each(d.Files, function(file, callback) {
					// console.log(index);
					download(d.CampaignID, file, callback);
				}, function(err){
					console.log(err);
					if(!err){
						console.log('CampaignID: '+d.CampaignID+' FULL DOWNLOADED');
						update(d.CampaignID);

					}
					else{
						console.log('FileFailed');
						d.isDownloading = false;

					}
				})
			}

		})
	  }
	  else{
	  	console.log('connection failed');
	  	// console.log(error);
	  }
	});
}



module.exports = {
	config: RpiConfig,
	getConfig: getConfig,
	getRpiFiles: getRpiFiles
};