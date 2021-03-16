describe('MainController', function() {
    beforeEach(module('covid19'));
    
    var $scope, $controller, $rootScope, $http, $httpBackend;
    
    beforeEach(inject(function(_$controller_, _$rootScope_, _$http_,  _$httpBackend_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        controller = $controller('MainController', { $scope: $scope });
        $http = _$http_;
        $httpBackend = _$httpBackend_;
    }));

    describe('$scope.showCountry', function() {
        it('sets $scope.country to the country with the matching slug', function() {
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
        it('should make an $http GET call to the url for getting a summary by default', function() {
            var global = {
                "NewConfirmed": 10,
                "TotalConfirmed": 100,
                "NewDeaths": 20,
                "TotalDeaths": 200,
                "NewRecovered": 30,
                "TotalRecovered": 300,
                "Date": (new Date()).toISOString()
            };
            $scope.getSummary();
            var response = {ID:1, Global: global};
            $httpBackend.when('GET', 'https://api.covid19api.com/summary').respond(response);
            $httpBackend.expect('GET', 'https://api.covid19api.com/summary');
            $httpBackend.expect('GET', 'https://api.covid19api.com/summary');
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});