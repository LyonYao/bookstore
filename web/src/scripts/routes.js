(function() {
    "use strict";
    app.config(['$routeProvider', '$mdThemingProvider', '$mdIconProvider',
        function($routeProvider, $mdThemingProvider,$mdIconProvider) {
            $routeProvider.otherwise({ redirectTo: '/404' });
            $routeProvider.when('/404', {
                templateUrl: 'templates/404.html',
                controller: '404Ctl'
            }).when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'homeCtl'
            });
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('green')
                .warnPalette('red')
                .backgroundPalette('grey');

            $mdThemingProvider.alwaysWatchTheme(true);
            $mdIconProvider.icon("share", "./images/menu.svg", 34);
            //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        }
    ]);
})();