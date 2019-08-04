(function (app) {
    'use strict';

    app.service('noticiaService', function ($http) {

        var url = 'http://localhost:1337/noticias/';
        function listAll() {
            return $http.get(url);
        }
        function get(id) {
            return $http.get(url + id);
        }
        
        function deleteById(id) {
            return $http.delete(url + id);
        }
        function saveOrUpdade(noticia) {
            if (noticia.id) {
                return  $http.put(url+noticia.id,noticia);
            } else {
                return  $http.post(url,noticia);
            }
        }

        return{
            $list: listAll,
            $get:get,
            $deleteByID: deleteById,
            $save: saveOrUpdade,
        }

    });


})(appDS3);