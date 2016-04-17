DisplayTestfiles = ['$http', '$rootScope', 'clientSession', function($http, $rootScope, clientSession) {
  return {
    restrict: 'E',

    templateUrl: '/html/display-testfiles.html',

    link: function(scope, elem, attrs) {

      scope.hideTestfiles = function() {
        if (!clientSession.isLoggedIn()) {
          scope.files = [];
          return true;
        }
        return scope.files.length == 0;
      };

      scope.files = [];

      $rootScope.$on('selectedUser', function(ev) {
        scope.files = [];
      });

      $rootScope.$on('clearRepo', function(ev) {
        scope.files = [];
      });

      $rootScope.$on('repo', function(ev, repo) {

        $http.get('/repos/' + repo.id + '/testfiles?user=' + scope.filterUser.id + '&host=' + scope.filterHost.id, {
          headers: {
            Authorization: clientSession.getApiKey()
          }
        })
        .then(
          function(res) {
            scope.files = res.data;
          },
          function(err) {
            console.error('in getting testfiles', err);
            clientSession.logout();
          }
        );

      });


      scope.toggleTestfile = function(file) {
        $rootScope.$emit('toggleTestfile', file);
      }


    }
  }

}];
