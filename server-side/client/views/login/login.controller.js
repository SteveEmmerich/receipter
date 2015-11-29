'use strict';

angular.module('receipter')
  .controller('LoginCtrl', function (Auth, $state) {

    var vm = this;
        vm.user = {
            username: '',
            email: '',
            password: ''
        };
 
        vm.login = function()
        {
            Auth.$authWithPassword(vm.user)
                .then(function(auth)
                {
                    $state.go('app.home');
                },
                function(error)
                {
                    vm.error = error;
                });
        };

        vm.register = function ()
        {
            Auth.$createUser(vm.user)
                .then(function (user)
                {
                    vm.login();
                },
                function (error)
                {
                    vm.error = error;
                });
        };

    angular.extend(vm, {
      name: 'LoginCtrl'
    });

  });
