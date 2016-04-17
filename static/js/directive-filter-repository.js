FilterRepository = ['$http', '$rootScope', 'clientSession', function($http, $rootScope, clientSession) {
  return {
    restrict: 'E',

    templateUrl: '/html/filter-repository.html',

    link: function(scope, elem, attrs) {

      scope.isLoggedIn = clientSession.isLoggedIn;

      var loadRepoList = function() {
        if (!scope.isLoggedIn()) return;
        console.log('loadRepoList');

        $http.get('/repos?user=' + scope.filterUser.id + '&host=' + scope.filterHost.id, {
          headers: {
            Authorization: clientSession.getApiKey()
          }
        }).then(
          function(res) {
            console.log('loadRepoList response');
            if (res.status === 200) {
              scope.loadingRepos = '';
              scope.filterRepositorySelection = res.data;

              if (res.data.length === 1) {
                scope.filterRepository = scope.filterRepositorySelection[0];
                scope.applyRepoFilter();
              }

              return;
            }
          },
          function(err) {
            console.error('in getting repositories', err);
            clientSession.logout();
          }
        );
      }

      var clearRepoList = function() {
        console.log('clearRepoList');
        scope.filterRepositorySelection = undefined;
        $rootScope.$emit('clearRepo');
        // scope.$apply();
      }

      $rootScope.$on('selectedUser', function(ev) {
        if (scope.filterUser && scope.filterHost) {
          loadRepoList();
          return;
        }
        clearRepoList();
      });

      $rootScope.$on('selectedHost', function(ev) {
        if (scope.filterUser && scope.filterHost) {
          loadRepoList();
          return;
        }
        clearRepoList();
      });


      scope.applyRepoFilter = function() {
        if (scope.filterRepository === null) {
          console.log('TODO: clear downward');
          return;
        }

        $rootScope.$emit('repo', scope.filterRepository);
      }


      // scope.filterRepositorySelection = [];

      // scope.filterRepository = scope.filterRepositorySelection[0];


      // scope.loadRepos = function() {

      //   if (!scope.isLoggedIn()) return;

      //   $http.get('/repos?whose=' + scope.filterUser.id, {
      //     headers: {
      //       Authorization: clientSession.getApiKey()
      //     }
      //   }).then(
      //     function(res) {
      //       if (res.status === 200) {
      //         scope.loadingRepos = '';
      //         scope.filterRepositorySelection = res.data;

      //         if (res.data.length === 1) {
      //           scope.filterRepository = scope.filterRepositorySelection[0];
      //           scope.applyRepoFilter();
      //         }

      //         return;
      //       }
      //     },
      //     function(err) {
      //       console.error('in getting repositories', err);
      //       clientSession.logout();
      //     }
      //   );
      // }

      // // scope.loadRepos();

      // $rootScope.$on('login', function() {
      //   scope.loadRepos();
      // });


    }
  }
}];