angular
    .module('angularjs-component-communication')
    .factory('_', function ($window) {

        var _ = $window._;
        delete ($window._);

        return (_);


    });