(function() {

  this.app.service('MarvelServices', ['$http', '$state', 'ENV', '$q', 'md5',
    function ($http, $state, ENV, $q, md5) {

    return {
      getComics: function (limit, offset) {
        var defer = $q.defer();

        var ts = Math.floor(Date.now() / 1000);
        var pubkey = ENV.API_PUBLIC_KEY;
        var privkey = ENV.API_PRIVATE_KEY;
        var to_hash = ts + privkey + pubkey;
        hash = md5.createHash(to_hash || '');

        // console.log(hash);

        $http({
          method: 'GET',
          url: ENV.API_MARVEL_GET_SERVICES,
          params: {
            ts: ts
          , apikey: pubkey
          , hash: hash
          , limit: limit || 20
          , offset: offset || 0
          }
        }).then(function (error) {
          defer.reject(error);
        }, function (response) {
           defer.resolve(data);
        });

        return defer.promise;
      },
      getComic: function (id) {
        var defer = $q.defer();

        var ts = Math.floor(Date.now() / 1000);
        var pubkey = ENV.API_PUBLIC_KEY;
        var privkey = ENV.API_PRIVATE_KEY;
        var to_hash = ts + privkey + pubkey;
        hash = md5.createHash(to_hash || '');

        // console.log(hash);

        $http({
          method: 'GET',
          url: ENV.API_MARVEL_GET_SERVICES + '/' + id,
          params: {
            ts: ts
          , apikey: pubkey
          , hash: hash
          }
        }).then(function (error) {
          defer.reject(error);
        }, function (response) {
           defer.resolve(data);
        });

        return defer.promise;
      }

    }

  }]);

}).call(this);