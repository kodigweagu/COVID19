# COVID19
COVID19 Statistics web application.
In this project, I use the covid19 API ( https://covid19api.com/ ) to build a simple single page web application where a user can upon visiting the site, immediately view a list of the 10 countries with the most cases of COVID-19. I also include functionality to access details for each of these countries, and global statistics. For improved user experience, there is added functionality for listing all countries, filtering countries by name, and ranking listed countries by one of:
Total Confirmed
New Confirmed
Total Deaths
New Deaths
Total Recovered
New Recovered

AngularJS is a very lightweight frontend framework for dynamic content, and for binding data to the html view.
jQuery creates the XMLHttpRequest for calling the API endpoint.
Bootstrap CSS is used for building the responsive, mobile first fluid front-end design.
Unit tests for the controller are built using the Jasmine and Karma frameworks as these come highly recommended for testing AngularJS applications and work well with the angular-mocks and mock-ajax libraries for testing the application's functionality.

To run the application, open index.html from the project folder in a browser.

To run tests, run 'karma start' in terminal from the project folder with Node.js installed ( https://nodejs.org/en/download/ ).