app.controller("LoginController", function($scope, $http, $state){
    
    //Variables
    $scope.signUpInfo = {
        fName: undefined,
        lName: undefined,
        username: undefined,
        password: undefined,
        passwordR: undefined
    }
    
    $scope.loginInfo = {
        username: undefined,
        password: undefined
    }
    
    //functions
    $scope.signUserUp = function (){
        
        var isError = false;
        
        if(!($scope.signUpInfo.fName && $scope.signUpInfo.lName && $scope.signUpInfo.username && $scope.signUpInfo.password && $scope.signUpInfo.passwordR)){
            isError = true;
        }
        
        if(isError != true){
            
            var data = {
            fName: $scope.signUpInfo.fName,
            lName: $scope.signUpInfo.lName,
            username: $scope.signUpInfo.username,
            password: $scope.signUpInfo.password,
            passwordR: $scope.signUpInfo.passwordR
        }
            
            $http.post("endpoints/signup.php", data).success(function(response){
            console.log(response);
            var phpResponse = response;
            if(phpResponse.includes("|")){
                console.log("isError in if block is "+isError);
               localStorage.setItem("token", JSON.stringify(response));
               localStorage.setItem("username", JSON.stringify($scope.signUpInfo.username));
               
                //insert into accounts table 100$
                $http.post("endpoints/insertBalance.php", data).success(function(response){
                console.log(response);
                $state.go("application");
                }).error(function(error){
                    console.error(error);
                });
               //$state.go("application");   
            } else{
                isError = true;
                console.log("in else block "+isError);
                //localStorage.setItem("token", JSON.stringify(response));
                //localStorage.setItem("username", JSON.stringify($scope.signUpInfo.username));
                alert(phpResponse);
                $state.go("login");
            }
            
        }).error(function(error){
            console.error(error);
        });
            
//        if(isError !== true){
//                console.log("Entered in insertion block");
//                $http.post("endpoints/insertBalance.php", data).success(function(response){
//                console.log(response);
//                $state.go("application");
//                }).error(function(error){
//                    console.error(error);
//                });
//            
//         }     
            
        }
        
    };
    
    $scope.loginUser = function() {
        
     if($scope.loginInfo.username && $scope.loginInfo.password){
         
         var data = {
            username: $scope.loginInfo.username,
            password: $scope.loginInfo.password
        }
        
        $http.post("endpoints/login.php", data).success(function(response){
            console.log(response);
            if(response.includes("|")){
               localStorage.setItem("token", JSON.stringify(response));
               localStorage.setItem("username", JSON.stringify($scope.loginInfo.username));
               $state.go("application"); 
            } else alert(response);
            
        }).error(function(error){
            console.error(error);
        });
            
     }
         
    
    };
    
    //Init

})