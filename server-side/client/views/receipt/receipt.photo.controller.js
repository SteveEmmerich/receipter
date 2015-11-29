'use strict';

angular.module('receipter')
    .controller('ReceiptPhotoCtrl', function ($scope, $timeout, $mdDialog, $stateParams, $state, Receipt, Upload)
    {
        var vm = this;

        vm.id = $stateParams.id;
        vm.files = [];
        vm.log = '';
        console.log('receipt id', vm.id);
       // vm.title = angular.isUndefined(vm.id) || vm.id === '' ? 'New' : 'Edit';
        //Binding the CouchDB
        vm.loaded = Receipt.bound();
        Receipt.bind(vm)
            .then(function()
            {
                vm.loaded = true;
            });
    
        
    $scope.upload = function (files)
    {
        if(typeof files !== 'undefined' && files.length)
        {
            var attachments = {};
            for(var i = 0; i < files.length; ++i)
            {
                var file = files[i];
                Upload.dataUrl(file,
                    function(url, outFile)
                    {
                        attachments[outFile.name] = {
                            'content_type': file.type,
                            data: url,
                        }
                    });
            }
            Receipt.update({'_attachments': attachments});
            /*var reader = new FileReader();
            reader.addEventListener("loadend", function()
            {
                // reader.result contains the contents of blob as a typed array
                try
                {
                    
                    

                }
                catch(e)
                {
                    alert("Error: Failed to read dashboard file: " + e); //error in the above string(in this case,yes)!
                    return;
                }

            });
            reader.readAsDataURL(file);*/
        }

            /*
            */

        };