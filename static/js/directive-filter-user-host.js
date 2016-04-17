FilterUserHost = ['$http', '$rootScope', '$timeout', 'clientSession', function($http, $rootScope, $timeout, clientSession) {
  return {
    restrict: 'E',

    templateUrl: '/html/filter-user-host.html',

    link: function(scope, elem, attrs) {

      scope.isLoggedIn = clientSession.isLoggedIn;

      var loadUserList = function() {
        $http.get('/users', {
          headers: {
            Authorization: clientSession.getApiKey()
          }
        }).then(function(res) {
          scope.filterUserSelection = res.data;

          // load remembered user
          if (typeof localStorage.userSelection !== 'undefined') {
            console.log('load historical selected user');
            var i = 0;
            for (; i < scope.filterUserSelection.length; i++) {
              if (parseInt(scope.filterUserSelection[i].id) === parseInt(localStorage.userSelection)) {
                scope.filterUser = scope.filterUserSelection[i];
                scope.changeUserFilter();
              }
            }
          }

        }).catch(function(err) {
          console.error('error in getting users', err);
          clientSession.logout();
        });
      }

      scope.changeUserFilter = function() {
        localStorage.userSelection = scope.filterUser.id;

        scope.filterHostSelection = scope.filterUser.hosts;

        // uuto select user if only one
        if (scope.filterUser.hosts.length === 1) {
          scope.filterHost = scope.filterHostSelection[0];
          $rootScope.$emit('selectedHost');
        }

        // $rootScope.$emit('selectedUser');

      }


      scope.changeHostFilter = function() {
        $rootScope.$emit('selectedHost');
      }


      $rootScope.$on('login', function(ev) {
        loadUserList();
      });

      if (scope.isLoggedIn()) {
        loadUserList();
      }

    }
  }
}];
