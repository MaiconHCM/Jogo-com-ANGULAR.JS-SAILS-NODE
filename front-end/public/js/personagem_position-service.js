(function (app) {
    'use strict';

    app.service('PersonagemPositionService', function ($http) {

        var url = 'http://localhost:1337/personagempos';
        function listAll() {
            return $http.get(url);
        }
        function get(id) {
            return $http.get(url + '/' + id);
        }

        function deleteById(id) {
            return $http.delete(url + id);
        }
        function save(personagem) {
            return  $http.post(url, personagem);
        }
        function updade(personagem) {
            return  $http.put(url + '/' + personagem.id, personagem);
        }

        return{
            $list: listAll,
            $get: get,
            $deleteByID: deleteById,
            $save: save,
            $updade: updade
        }

    });


})(appDS3);