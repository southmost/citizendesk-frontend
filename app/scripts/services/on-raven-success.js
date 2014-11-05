'use strict';

angular.module('citizendeskFrontendApp')
  .factory('onRavenSuccess', function ($window, $cookieStore, $rootScope) {
    var cookie = 'on-raven-success-service-reload-counter',
        preventReloading = false;
    $rootScope.$on('locationChangeSuccess', onLocationChangeSuccess);
    function onLocationChangeSuccess() {
      if (preventReloading) {
        $cookieStore.remove(cookie);
      }
    }
    function onRavenSuccess() {
      var cookie = $cookieStore.get(cookie);
      if (Boolean(cookie)) {
        preventReloading = true;
      } else {
        $cookieStore.put(cookie, 1);
        $window.location.reload();
      }
    }
    // expose just for the tests
    onRavenSuccess.onLocationChangeSuccess = onLocationChangeSuccess;
    return onRavenSuccess;
  });
