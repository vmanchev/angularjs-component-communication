'use strict';

angular.module('angularjs-component-communication', ['ui.router', 'ngAnimate'])
    .constant('_', window._)
    .config([
        '$urlMatcherFactoryProvider',
        '$urlRouterProvider',
        function ($urlMatcherFactoryProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
            $urlMatcherFactoryProvider.caseInsensitive(true);
        }
    ])
    .config(['$provide', function ($provide) {

        $provide.decorator('$templateRequest', ['$delegate', '$injector', '$templateCache', '$q', function ($delegate, $injector, $templateCache, $q) {

            var fn = $delegate;

            $delegate = function (tpl) {

                for (var key in fn) {
                    $delegate[key] = fn[key];
                }

                if (tpl.split(".").pop() !== 'html') {
                    return fn.apply(this, [tpl, true]);
                }

                var defer = $q.defer();

                $injector.get("configService").getProfile().then(function (clientConfig) {
                    var clientTemplate = tpl.replace(/\.html$/, "." + clientConfig.data.login.toLowerCase() + ".html");
                    $templateCache.get(clientTemplate) ? defer.resolve($templateCache.get(clientTemplate)) : defer.resolve($templateCache.get(tpl));
                })

                return defer.promise;

            };

            return $delegate;
        }]);
    }]);
