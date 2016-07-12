/*
================================
 CONTROLLER DEFINITION
================================
*/

(function() {
  this.app.controller('LandingController', ['$rootScope', '$scope', '$state', 'ENV', 'MarvelServices',
    function($rootScope, $scope, $state, ENV, MarvelServices) {
      /*
      ================================
        SCOPE DEFINITION
      ================================
      */
      $scope.searchText = '';
      $scope.serched = [];

      $('.btn-cancel').on('click', function(){
        $('.search').val('');
      });

      MarvelServices.getComics(2, 0).then(function(err){
        //alert('Hubo un problema intentando obtener la lista de comics, porfavor vuelva mas tarde.');
        $('.wrapper').slideUp(0);
        $('.error-cont').removeClass('hide').text('hubo un problema al intentar obtener la lista de comics');
      }, function(data){
        
        $.each(data.data.data.results, function (index, obj){
          // debugger;
          var desc = '';
          if(obj.description){
            desc = obj.description.substring(0, 40) + '...';
          }
          var com = {
            text: desc,
            goto: obj.id,
            img: '' + obj.images[0].path + '/standard_medium.' + obj.images[0].extension,
            title: '' + obj.title
          };  
          $scope.serched.push(com); 
        });
      });

      // var api = require('marvel-api');
      // var marvel = api.createClient({
      //   publicKey: ENV.API_PUBLIC_KEY,
      //   privateKey: ENV.API_PRIVATE_KEY
      // });



      // marvel.comics.findAll(function(err, results){
      //   if (err){
      //     return console.error(err);
      //   }
      //   else{
      //     console.log(results)
      //   }

      // });

    }]);
}).call(this);
