angular
    .module('angularjs-component-communication')
    .component('homeComponent', {
        templateUrl: 'home/home.html',
        controller: function ($scope) {
            $scope.message = 'this is home';
        }
    })
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    component: 'homeComponent'
                });
        }
    ]);;