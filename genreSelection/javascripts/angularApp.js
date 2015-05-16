var app = angular.module('coreModule', []);

app.controller('CoreController', [
    '$scope',
    function($scope){
        $scope.test = 'Hello world!';
    }]);