app.controller('MainController', ['$scope', function($scope){
	
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

	var settings = {
	  "url": "https://api.covid19api.com/summary",
	  "method": "GET",
	  "timeout": 0,
	  async:false,
	};

	$scope.compare = function( a, b ) {
	  return b[$scope.orderBy] - a[$scope.orderBy];
	}

	$scope.sortCountries = function(){
		$scope.data.Countries.sort($scope.compare);
	};

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
		$.ajax(settings)
		.done( function (response) {
			$scope.Global = {
				"ID": response.ID,
				"Country": "Worldwide",
				"CountryCode": "WW",
				"Slug": "world",
				"NewConfirmed": response.Global.NewConfirmed,
				"TotalConfirmed": response.Global.TotalConfirmed,
				"NewDeaths": response.Global.NewDeaths,
				"TotalDeaths": response.Global.TotalDeaths,
				"NewRecovered": response.Global.NewRecovered,
				"TotalRecovered": response.Global.TotalRecovered,
				"Date": response.Global.Date,
			};
			$scope.showGlobal();
			$scope.data = response;
			$scope.sortCountries();
		});
	}

	$scope.getSummary();
	
}])