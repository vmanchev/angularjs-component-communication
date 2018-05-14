angular
    .module('angularjs-component-communication')
    .component('profileComponent', {
        templateUrl: 'profile/profile.html',
        controller: function ($scope, $log, _) {

            var $ctrl = this;

            $ctrl.$onInit = function () {

                $ctrl.user = {
                    username: 'vmanchev',
                    firstName: 'Venelin',
                    lastName: 'Manchev',
                    addresses: [{
                        city: 'Sofia',
                        postCode: 1000
                    }, {
                        city: 'Varna',
                        postCode: 9000
                    }]
                };

                $ctrl.addressDeleteListener = $scope.$on('address:delete', function (event, address) {
                    _.pull($ctrl.user.addresses, address);
                });
            };

            $ctrl.addAddress = function () {
                $ctrl.user.addresses.push({});
            };

            $ctrl.$onDestroy = function () {
                $ctrl.addressDeleteListener();
            };

            $ctrl.saveUserProfile = function () {
                console.log('User profile to be saved: ', $ctrl.user);
            };

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