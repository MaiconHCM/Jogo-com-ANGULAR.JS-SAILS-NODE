(function (app) {
    'use strict';

    app.controller('LoginController', function ($scope, $location, $window, PersonagemService) {
        $scope.msgerror = '';

        $scope.credential = {
            user: '',
            password: ''
        };

        $scope.login = function () {
            var list = {};
            PersonagemService.$list()
                    .then(function (data) {
                        
                        $.each(data.data, function (i, item) {
                            if ($scope.credential.user === item.user) {
                                if (($scope.credential.password === item.password)) {
                                    $window.sessionStorage.setItem('user', item.id);
                                    $location.path('/play');
                                } else
                                    $scope.msgerror = 'Senha inválido';
                            }
                        });
                    })
                    .catch(function (error) {
                        $scope.msgerror = 'Não foi possivel estabelecer conexão com servidor';
                    });
        };

    });

})(appDS3);
