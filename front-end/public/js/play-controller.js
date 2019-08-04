(function (app) {
    'use strict';

    app.controller('PlayController', function ($scope, $interval, $window, PersonagemService, PersonagemPositionService, WorldService) {
        //Obtem id do personagem
        var id = $window.sessionStorage.getItem('user');

        //Cria variaveis GLOBAIS
        var personagem = {};
        var pos_Player = {};
        var repetir = false;

        $scope.worlds = {};

        //carrega dados de personagem
        function carregaDadosPersonagem() {

            if (id) {
                PersonagemService.$get(id).then(function (result) {
                    personagem = result.data;
                    carregaDadosPosicaoPersonagem()
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }


        //carrega posição
        function carregaDadosPosicaoPersonagem() {
            PersonagemPositionService.$get(id).then(function (result) {
                pos_Player = result.data;
            }).catch(function (error) {
                pos_Player = {
                    posX: 50,
                    posY: 50,
                    map: 0,
                    id: id
                };
                PersonagemPositionService.$save(pos_Player).then(function (result) {
                    console.log('PersonagemPos Inserido');
                }).catch(function (error) {
                    console.log('Erro ao inserir personagemPos:' + error);
                });
            }).finally(function () {
                preparaCanvas();
            });
        }

        var cnv = document.querySelector("canvas");
        var ctx = cnv.getContext("2d");
        var player;
        var scene = new Image();
        window.addEventListener("keydown", keydownHandler, false);
        window.addEventListener("keyup", keyupHandler, false);
        function preparaCanvas() {
            scene.src = "assets/play/img/" + pos_Player.map + ".png";
            var spriteSheet = new Image();
            spriteSheet.src = "assets/play/img/sprite" + personagem.sprite + ".png";
            player = new Sprite(spriteSheet);
            init();
        }




        function keydownHandler(e) {
            switch (e.code) {
                case 'ArrowRight':
                    player.mvRight = true;
                    player.mvLeft = false;
                    player.mvUp = false;
                    player.mvDown = false;
                    break;
                case 'ArrowLeft':
                    player.mvRight = false;
                    player.mvLeft = true;
                    player.mvUp = false;
                    player.mvDown = false;
                    break;
                case 'ArrowUp':
                    player.mvRight = false;
                    player.mvLeft = false;
                    player.mvUp = true;
                    player.mvDown = false;
                    break;
                case 'ArrowDown':
                    player.mvRight = false;
                    player.mvLeft = false;
                    player.mvUp = false;
                    player.mvDown = true;
                    break;
            }
        }


        function keyupHandler(e) {
            switch (e.code) {
                case 'ArrowRight':
                    player.mvRight = false;
                    break;
                case 'ArrowLeft':
                    player.mvLeft = false;
                    break;
                case 'ArrowUp':
                    player.mvUp = false;
                    break;
                case 'ArrowDown':
                    player.mvDown = false;
                    break;
            }
        }

        function init() {
            player.posX = parseInt(pos_Player.posX);
            player.posY = parseInt(pos_Player.posY);
            enviaDados();
            loop();
        }

        function update() {
            if (repetir) {
                player.move();
            }
        }


        function draw() {
            if (repetir) {
                ctx.clearRect(0, 0, cnv.width, cnv.height);
                try {
                    ctx.drawImage(scene, 0, 0, scene.width, scene.height, 0, 0, scene.width, scene.height)
                } catch (error) {
                    scene.src = "assets/play/img/map0.png";
                }

                player.draw(ctx);
            }
        }


        function loop() {
            if (repetir) {
                window, requestAnimationFrame(loop, cnv);
                update();
                draw();
            }
        }


        function enviaDados() {
            if (repetir) {
                setInterval(function () {
                    if ((parseInt(pos_Player.posX) !== player.posX) || (parseInt(pos_Player.posY !== player.posY))) {
                        pos_Player.posX = player.posX;
                        pos_Player.posY = player.posY;
                        PersonagemPositionService.$updade(pos_Player)
                                .then(function (result) {
                                    console.log('Posição atualizada');
                                })
                                .catch(function (error) {
                                    console.log('Erro ao atualizar posição:' + error);
                                });
                    }
                }, 1000);
            }
        }


        function recebeDados() {
            //Quando estiver com modo online ativado
        }



        $scope.alterar = function (personagem) {

        };

        $scope.logout = function () {

        };

        $scope.alteraMapa = function (caminho) {
            repetir = false;
            pos_Player.map = caminho;
            PersonagemPositionService.$updade(pos_Player)
                    .then(function (result) {
                        console.log('Map atualizada');
                        repetir = true;
                        preparaCanvas();
                    })
                    .catch(function (error) {
                        console.log('Erro ao atualizar Map:' + error);
                    });
        };


        $scope.onInit = function () {
            WorldService.$list().then(function (result) {
                $scope.worlds = result.data;
            }).catch(function (error) {
                console.log(error);
            })
            repetir = true;
            carregaDadosPersonagem();
        }

        $scope.onInit();
    });


})(appDS3);