/*
================================
 CONTROLLER DEFINITION
================================
*/

(function() {
  this.app.controller('ComicController', ['$rootScope', '$scope', '$state', 'ENV', 'MarvelServices',
    function($rootScope, $scope, $state, ENV, MarvelServices) {
      /*
      ================================
        SCOPE DEFINITION
      ================================
      */

      var id = $state.params.id;

    	MarvelServices.getComic(id).then(function(err){
    	//alert('Hubo un problema intentando obtener la lista de comics, porfavor vuelva mas tarde.');
    		$('.wrapper').slideUp(0);
    		$('.error-cont').removeClass('hide').text('hubo un problema al intentar obtener los detalles del comic');
    	}, function(data){

    		var comic = data.data.data.results[0];
    		$scope.title = comic.title;
    		$scope.description = comic.description;
    		$scope.image = '' + comic.images[0].path +'.'+ comic.images[0].extension;
    		$scope.creators = comic.creators.items; //name, role
    		$scope.issueNumber = comic.issueNumber;
    		$scope.pages = comic.pageCount;

        $('.img-par').attr('src', $scope.image);
    	});


  }]);
}).call(this);
