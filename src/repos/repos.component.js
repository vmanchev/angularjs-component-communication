angular
    .module('angularjs-component-communication')
    .component('reposComponent', {
        bindings: {
            user: '='
        },
        templateUrl: 'repos/repos.html',
        controller: function (configService) {

            var $ctrl = this;

            $ctrl.$onInit = function () {

                configService
                    .getReposByUsername($ctrl.user.username)
                    .then(function (repos) {
                        $ctrl.user.repos = repos.data;
                    });
            };
        }
    });