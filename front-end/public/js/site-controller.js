(function (app) {
    'use strict';

    app.controller('noticiaController', function ($scope,noticiaService) {
        $scope.showForm = false;
        function onInit() {
            noticiaService.$list().then(function(){
                $scope.noticias=result.data;
            }).catch (function(){
                console.log(error);
            });

        }
    }
    )

})(appDS3);