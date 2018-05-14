angular
    .module('angularjs-component-communication')
    .service('configService', function ($http) {

        this.getProfile = function () {
            return $http.get('https://api.github.com/users/vmanchev');
        };

        this.getReposByUsername = function (username) {
            return $http.get('https://api.github.com/users/' + username + '/repos');
        };

    });