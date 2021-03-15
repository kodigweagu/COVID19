describe('MainController', function() {
	beforeEach(module('covid19'));
	
	var $controller, $rootScope;
	
	beforeEach(inject(function(_$controller_, _$rootScope_){
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		jasmine.Ajax.install();
	}));
	
	afterEach(function() {
		jasmine.Ajax.uninstall();
	});
	
	describe('$scope.compare', function() {
		it('accurately compares two country objects by the default TotalConfirmed property', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('MainController', { $scope: $scope });
			var a = {"TotalConfirmed": 200};
			var b = {"TotalConfirmed": 100};
			var result = $scope.compare(a,b);
			expect(result).toEqual(-100);
		});
		it('accurately compares two country objects by the NewConfirmed property', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('MainController', { $scope: $scope });
			var a = {"NewConfirmed": 100};
			var b = {"NewConfirmed": 200};
			$scope.orderBy = "NewConfirmed";
			var result = $scope.compare(a,b);
			expect(result).toEqual(100);
		});
	});
	
	describe('$scope.sortCountries', function() {
		it('sorts $scope.data.Countries in descending order of the default TotalConfirmed property', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('MainController', { $scope: $scope });
			$scope.data = {};
			$scope.data.Countries = [
			{"Country": "Germany","TotalConfirmed": 200},
			{"Country": "France","TotalConfirmed": 100},
			{"Country": "Italy","TotalConfirmed": 300},
			{"Country": "Canada","TotalConfirmed": 200}
			];
			$scope.sortCountries();
			expect($scope.data.Countries[0].Country).toEqual("Italy");
			expect($scope.data.Countries[3].Country).toEqual("France");
		});
		it('sorts $scope.data.Countries in descending order of the NewConfirmed property', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('MainController', { $scope: $scope });
			$scope.data = {};
			$scope.data.Countries = [
			{"Country": "Germany","NewConfirmed": 200},
			{"Country": "France","NewConfirmed": 300},
			{"Country": "Italy","NewConfirmed": 100},
			{"Country": "Canada","NewConfirmed": 200}
			];
			$scope.orderBy = "NewConfirmed";
			$scope.sortCountries();
			expect($scope.data.Countries[0].Country).toEqual("France");
			expect($scope.data.Countries[3].Country).toEqual("Italy");
		});
	});
	
	describe('$scope.showCountry', function() {
		it('sets $scope.country to the country with the matching slug', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('MainController', { $scope: $scope });
			$scope.data = {};
			$scope.data.Countries = [
			{"Country": "Italy","Slug": "italy"},
			{"Country": "United States of America","Slug": 'united-states'}
			];
			$scope.showCountry('united-states');
			expect($scope.country.Country).toEqual("United States of America");
		});
	});
	
	describe('$scope.showGlobal', function() {
		it('sets $scope.country to the global information in $scope.Global', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('MainController', { $scope: $scope });
            $scope.Global = {
				"Country": "Worldwide",
				"Slug": "world"
			};
			$scope.showGlobal();
			expect($scope.country.Country).toEqual("Worldwide");
			expect($scope.country.Slug).toEqual("world");
		});
	});

	describe('$scope.getSummary', function() {
		it('makes an ajax GET call to the url for getting a summary', function() {
			var $scope = $rootScope.$new();
			var controller = $controller('MainController', { $scope: $scope });
			$scope.getSummary();
			expect(jasmine.Ajax.requests.mostRecent().url).toEqual('https://api.covid19api.com/summary');
			expect(jasmine.Ajax.requests.mostRecent().method).toEqual('GET');
		});
	});
});