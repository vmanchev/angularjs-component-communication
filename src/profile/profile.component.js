angular
    .module('angularjs-seed')
    .component('profileComponent', {
        templateUrl: 'profile/profile.html',
        controller: function ($scope) {

        }
    })
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('profile', {
                    url: '/profile',
                    component: 'profileComponent'
                });
        }
    ]);