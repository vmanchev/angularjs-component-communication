angular
    .module('angularjs-component-communication')
    .component('reposComponent', {
        bindings: {
            user: '='
        },
        templateUrl: 'repos/repos.html',
        controller: function (configService, _) {

            var $ctrl = this;

            $ctrl.$onInit = function () {

                configService
                    .getReposByUsername($ctrl.user.username)
                    .then(function (repos) {
                        $ctrl.user.repos = repos.data;
                    });
            };

            $ctrl.deleteRepo = function (repo) {
                _.pull($ctrl.user.repos, repo);
            };

            $ctrl.addRepo = function () {
                $ctrl.user.repos.push({ name: '' });
            }
        }
    });