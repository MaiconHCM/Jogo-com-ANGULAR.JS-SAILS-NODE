(function (app) {
    'use strict';

    app.controller('RegisterController', function ($scope, $location, $window, PersonagemService) {
        $scope.msgerror = '';

        $scope.register = {
            name: '',
            password: '',
            email: '',
            sprite:'1',
            map:1
        };

        $scope.cadastrar = function () {
            PersonagemService.$save($scope.register)
                    .then(function () {
                        $location.path('/play');
                    })
                    .catch(function (error) {
                        $scope.msgerror = 'Não foi possivel criar seu personagem:'+error;
                    });
        };

    });

})(appDS3);
