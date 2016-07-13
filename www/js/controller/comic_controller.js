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
    		$scope.thisTitle = comic.title;
    		$scope.thisDescription = comic.description;
    		$scope.thisImage = '' + comic.images[0].path +'.'+ comic.images[0].extension;
    		$scope.thisCreators = comic.creators.items; //name, role
    		$scope.thisIssueNumber = comic.issueNumber;
    		$scope.thisPages = comic.pageCount;

        $('.thisImage').attr('src', $scope.thisImage);
        $('.thisTitle').text($scope.thisTitle);
        $('.thisDescription').text($scope.thisDescription);
        $('.thisIssueNumber').text($scope.thisIssueNumber);
        $('.thisPages').text($scope.thisPages);
    	});

      // MarvelServices.getComic(id + '/characters').then(function(err){
      // //alert('Hubo un problema intentando obtener la lista de comics, porfavor vuelva mas tarde.');
      //   $('.wrapper').slideUp(0);
      //   $('.error-cont').removeClass('hide').text('hubo un problema al intentar obtener los detalles del comic');
      // }, function(data){

      //     debugger;
      // });


  }]);
}).call(this);
