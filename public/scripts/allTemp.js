function UpdateWallet($http, CampaignID){
	// console.log('updating Wallet');
	$http.get('/myID').then(function(response){
      var RpiID = response.data.RpiID;

      var data = {
        RpiID: RpiID,
        CampaignID: CampaignID
      }
      $http.post('http://54.254.248.115/rpiUpdateWallet', data).then(function(response){
        // console.log(response);
        // console.log('update wallet success');
      }, function(err){
        // console.log('wallet update failed');
        console.log(err);
      });

    }, function(error){
      // console.log('get config failed');
    });
}



























