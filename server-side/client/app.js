'use strict';

angular.module('receipter', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngMessages',
    'ngAnimate',
    'ngMaterial',
    'ngMdIcons',
    'ngFx',
    'ui.router',
    'ui.utils',
    'firebase',
    'angular-md5',
    'angular-sortable-view',
    'factoryng'
])
    .constant('FirebaseUrl', 'https://receipter.firebaseio.com/')
    .run(["$rootScope", "$location",
        function($rootScope, $location)
        {
            $rootScope.$on("$routeChangeError",
                function(event, next, previous, error)
                {
                    // We can catch the error thrown when the $requireAuth promise is rejected
                    // and redirect the user back to the home page
                    if (error === "AUTH_REQUIRED")
                    {
                        $location.path("/login");
                    }
                });
        }])
    .config(function ($locationProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise("/home");
        $locationProvider.html5Mode(true);
    });
