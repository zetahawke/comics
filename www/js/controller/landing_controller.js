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
      $scope.page_items = [];
      $scope.page_index = 1;
      $scope.pages = [];
      $scope.is_hidden = 0;

      $('.btn-cancel').on('click', function(){
        $('.search').val('');
      });

      MarvelServices.getComics(100, 0).then(function(err){
        //alert('Hubo un problema intentando obtener la lista de comics, porfavor vuelva mas tarde.');
        $('.wrapper').slideUp(0);
        $('.error-cont').removeClass('hide').text('hubo un problema al intentar obtener la lista de comics');
      }, function(data){
        
        $.each(data.data.data.results, function (index, obj){
          var desc = '';
          if(obj.description){
            desc = obj.description.substring(0, 40) + '...';
          }
          var creator = {
            name: '',
            role: ''
          }
          if(obj.creators.items.length > 0){
            var creator = {
              name: obj.creators.items[0].name,
              role: obj.creators.items[0].role
            }
          }
          var img = '';
          if(obj.images[0]){
            img = obj.images[0].path + '/portrait_medium.' + obj.images[0].extension;
          }else{
            img = '/pub/images.jpg';
          }
          var com = {
            text: desc,
            goto: obj.id,
            img: '' +img,
            title: '' + obj.title,
            creators: creator
          };  
          $scope.serched.push(com);
        });
        $scope.paginator(10);
      });

      $scope.paginator = function(limit){
        var count = 0;
        $scope.col = [];
        $scope.page_items = [];
        $scope.page_index = 1;
        $scope.pages = [];
        $.each($scope.serched, function(index, item){
          // if(count >= limit){
          if(((index+1) % limit) == 0 ){
            $scope.pages.push(count +1);
            $scope.col.push(item);
            $scope.page_items.push($scope.col);
            $scope.col = [];
            count++;
          }else{
            $scope.col.push(item);
            if(index == $scope.serched.length - 1){
              $scope.pages.push(count +1);
              $scope.page_items.push($scope.col);
              $scope.col = [];
              count++;
            }
          }
        });
      };

      $scope.change_page = function(p){
        $scope.page_index = p;
      };

      $scope.chevron = function(p){
        // if($scope.page_index < $scope.pages.length && $scope.page_index > 1){
        if(($scope.page_index == 1 && p == -1) || ($scope.page_index == $scope.pages.length && p == 1)){
        }else{
          $scope.page_index += p;
        }
      };

      
      $scope.dropdown = function(){
        // console.log($scope.is_hidden);
        if($scope.is_hidden == 0){
          $scope.is_hidden = 1;
          $('#dropdown1').css('opacity', '1').css('display', 'block');
        }else{
          $scope.is_hidden = 0;
          $('#dropdown1').css('opacity', '0').css('display', 'none');
        }
      };

    }]);
}).call(this);
