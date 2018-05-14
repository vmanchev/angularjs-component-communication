angular
    .module('angularjs-component-communication')
    .component('addressComponent', {
        bindings: {
            address: '<'
        },
        templateUrl: 'address/address.html',
        controller: function ($scope) {

            var $ctrl = this;

            $ctrl.emitAddressToDelete = function (address) {
                $scope.$emit('address:delete', address);
            }
        }
    });