'use strict';
/* jshint newcap: false */

angular.module('citizendeskFrontendApp')
  .controller('ConfigureStepsCtrl', function ($scope, api, lodash) {
    var _ = lodash;
    api.steps
      .query()
      .then(function(data) {
        $scope.steps = data._items;
      });
    $scope.disabled = false;
    $scope.add = function() {
      $scope.steps.push({
        description: '',
        mandatory: false
      });
    };
    $scope.save = function(step) {
      $scope.disabled = true;
      api.steps.save(step)
        .then(function() {
          $scope.disabled = false;
        });
    };
    $scope.remove = function(step) {
      $scope.disabled = true;
      api.steps.remove(step)
        .then(function() {
          _.remove($scope.steps, step);
          $scope.disabled = false;
        });
    };
  });
