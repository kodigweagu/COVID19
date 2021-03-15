app.controller('MainController', ['$scope', '$http', function($scope, $http){
	
	$scope.LIST_SIZE = 10;

	$scope.orderOptions = [
	{ display: "Total Confirmed", value: "TotalConfirmed"},
	{ display: "New Confirmed", value: "NewConfirmed"},
	{ display: "Total Deaths", value: "TotalDeaths"},
	{ display: "New Deaths", value: "NewDeaths"},
	{ display: "Total Recovered", value: "TotalRecovered"},
	{ display: "New Recovered", value: "NewRecovered"}
	];

	$scope.orderBy = "TotalConfirmed";

	$scope.showCountry = function(slug){
		$scope.country = $scope.data.Countries.filter(function(element){ return element.Slug == slug;})[0];
	};

	$scope.showGlobal = function(){
		$scope.country = $scope.Global;
	};

	$scope.showMore = function(){
		$scope.LIST_SIZE = $scope.data.Countries.length;
		document.getElementById("show-more").style.display = "none";
		document.getElementById("show-less").style.display = "";
	};

	$scope.showLess = function(){
		$scope.LIST_SIZE = 10;
		document.getElementById("show-less").style.display = "none";
		document.getElementById("show-more").style.display = "";
	};

	$scope.getSummary = function(){
		$http({
			method: 'GET',
			url: 'https://api.covid19api.com/summary'
		}).then(function (response) {
			$scope.Global = {
				"ID": response.data.ID,
				"Country": "Worldwide",
				"CountryCode": "WW",
				"Slug": "world",
				"NewConfirmed": response.data.Global.NewConfirmed,
				"TotalConfirmed": response.data.Global.TotalConfirmed,
				"NewDeaths": response.data.Global.NewDeaths,
				"TotalDeaths": response.data.Global.TotalDeaths,
				"NewRecovered": response.data.Global.NewRecovered,
				"TotalRecovered": response.data.Global.TotalRecovered,
				"Date": response.data.Global.Date,
			};
			$scope.showGlobal();
			$scope.data = response.data;
			}, function (error) {
				console.log(error.data)
			});
	}
	$scope.getSummary();
}])