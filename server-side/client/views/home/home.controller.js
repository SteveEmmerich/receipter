'use strict';

angular.module('receipter')
  .controller('HomeCtrl', function ($scope, $state, Receipt) {

    var vm = this;
    vm.loaded = Receipt.bound(); // don't show spinner if already bound
    Receipt.bind(vm).then(
        function ()
        {
            console.log('done binding');
            // console.log($scope.contacts);
            vm.loaded = true; // hide loading spinner
        });
    if (vm.loaded)
    {
        vm.receipts = Receipt.get();
    }
    
    /*[
        {
            title: 'kmart'
        },
        {
            title: 'tj-max'
        }
    ];*/

    angular.extend(vm, {
        name: 'HomeCtrl',
        edit: function(id)
        {
            $state.go('app.receipt', {id:id});
        },
        grid: true,
        list: false
    });

    

  });
