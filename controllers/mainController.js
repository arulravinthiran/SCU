app.controller("MainController", function ($scope, $state, $http, AuthenticationService){
    
    //If user is not logged in
	var token;
	if (localStorage['token']){
        token = JSON.parse(localStorage['token']);
        AuthenticationService.checkToken(token);
	} else {
	   token = "something stupid";
       $state.go("login");    
	}
    
    $scope.retrieveUser = function(){
        
//        $scope.profileInfo = {
//        fName: "undefined",
//        lName: "undefined",
//        email: undefined,
//        balance: undefined
//        }
        
        $scope.profileInfo = {
        }
        
        $scope.allProfiles;
        
        var eachProfile = {
            "fName" : undefined,
            "lName" : undefined,
            "email" : undefined,
            "balance" : undefined
        }
        
        //console.log("username as in local storage");
        var email = JSON.parse(localStorage['username']);
        console.log(email);
		var data = {
			email: JSON.parse(localStorage['username'])
		}
		
		$http.post('endpoints/retrieveTokenInfo.php', data).success(function(response){
            //console.log(response);
			var profileInfo = response;
            //console.log(profileInfo["fName"]+" is prf info fName");
            $scope.profileInfo.fName = profileInfo["fName"];
            $scope.profileInfo.lName = profileInfo["lName"];
            $scope.profileInfo.email = profileInfo["email"];
            $scope.profileInfo.balance = profileInfo["balance"];
            //console.log($scope.profileInfo.fName+" is fName");
			//localStorage.clear();
            
            //retrieve all profiles
            $http.post('endpoints/retrieveUserProfile.php').success(function(response){
            console.log(response);
//            var profileInfo = response;
//            var profInfLen = profileInfo.length;
//            var jsonTexts = [];    
//            for(var i = 0; i < profInfLen; i++){
//                
////                if(i==0) {jsonText = '['};
////                
////                jsonText+'{'+'"fName"'+':'+'"'+profileInfo[i]["firstName"]+'"'+','+'"lName"'+':'+'"'+profileInfo[i]["lastName"]+'"'+','+'"email"'+':'+'"'+profileInfo[i]["email"]+'"'+','+'"balance"'+':'+'"'+profileInfo[i]["balance"]+'"'+'}';
////                
////                if(i < profInfLen-1){ jsonText+','; }
////                
////                if(i == profInfLen-1){ 
////                    jsonText+']';
////                    console.log("End of for : json text is "+jsonText);
////                }
//                eachProfile.fName = profileInfo[i]["firstName"];
//                eachProfile.lName = profileInfo[i]["lastName"];
//                eachProfile.email = profileInfo[i]["email"];
//                eachProfile.balance = profileInfo[i]["balance"];
//                console.log(profileInfo[i]["firstName"]);
//                console.log(profileInfo[i]["lastName"]);
//                console.log(profileInfo[i]["email"]);
//                console.log(profileInfo[i]["balance"]);
//                jsonTexts[i] = eachProfile;
//                console.log(jsonTexts);
//            }
//                
//            $scope.allProfiles = jsonTexts;
//            //$scope.allProfiles = response;    
//            console.log($scope.allProfiles);    
        }).error(function(error){
            console.error(error);
        });
            
			$state.go("application");
		}).error(function(error){
			console.error(error);
		});
        
        
	}
    
	$scope.logout = function(){
		var data = {
			token: token
		}
		
		$http.post('endpoints/logout.php', data).success(function(response){
			//console.log(response)
			localStorage.clear();
			$state.go("login");
		}).error(function(error){
			console.error(error);
		});
	}
	
    
})