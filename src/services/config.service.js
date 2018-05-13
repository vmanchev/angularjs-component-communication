angular
    .module('angularjs-seed')
    .service('configService', function ($http) {

        this.getProfile = function () {
            return $http.get('https://api.github.com/users/vmanchev');
        }

    });