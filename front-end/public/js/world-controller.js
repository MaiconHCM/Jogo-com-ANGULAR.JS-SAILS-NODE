(function (app, ng) {
    'use strict';

    app.controller('WorldController', function ($scope, $interval, WorldService) {
        //$scope.noticias=noticiaService.$list();
        $scope.showForm = false;

        function onInit() {
            WorldService.$list().then(function (result) {

                $scope.noticias = result.data;

            }).catch(function (error) {

                if (error.status <= 0) {
                    $scope.msgerror = 'Não foi possível estabelecer uma conexão com o servidor.';
                } else if (error.status == 404) {
                    $scope.msgerror = 'O recurso "/notícias" não foi encontrado.';
                } else {
                    $scope.msgerror = error.statusText;
                }

            });
        }

        $scope.excluir = function (id) {
            WorldService.$deleteByID(id)
                    .then(function (result) {

                        $scope.msgsuccess = 'O registro foi excluído com sucesso!';

                        $interval(function () {
                            $scope.msgsuccess = '';
                        }, 5000);

                        onInit();
                    })
                    .catch(function (error) {
                        if (error.status <= 0) {
                            $scope.msgerror = 'Não foi possível estabelecer uma conexão com o servidor.';
                        } else {
                            $scope.msgerror = error.statusText;
                        }
                    });
        }
        $scope.adicionar = function () {

            $scope.form = {
                titulo: '',
                caminho: '',
                descricao: ''
            };

            $scope.showForm = true;

        }
        $scope.alterar = function (noticia) {

            $scope.form = ng.copy(noticia);

            $scope.showForm = true;

        }
        $scope.cancelar = function () {
            $scope.showForm = false;
        }
        $scope.confirmar = function () {
            WorldService.$save($scope.form)
                    .then(function (result) {
                        $scope.msgsuccess = 'O registro foi salvo com sucesso!';

                        $interval(function () {
                            $scope.msgsuccess = '';
                        }, 5000);

                        onInit();
                    })
                    .catch(function (error) {
                        if (error.status <= 0) {
                            $scope.msgerror = 'Não foi possível estabelecer uma conexão com o servidor.';
                        } else {
                            $scope.msgerror = error.statusText;
                        }
                    })
                    .finally(function () {
                        $scope.showForm = false;
                    })
        }

        onInit();
    });


})(appDS3, angular);