/**
 * Created by Hackathon on 3/28/2015.
 */
var app = angular.module('coreModule', ['ui.bootstrap','ui.router']);

app.factory('socket', function(){
    return io.connect('localhost:3000');
});

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('launchpad', {
                url: '/launchpad',
                templateUrl: '/launchpad.html',
                controller: 'CoreController'
            });

        $urlRouterProvider.otherwise('launchpad');
    }]);

app.controller('CoreController',
    function($scope,$interval,socket){
        var d = new Date();
        $scope.startingTime = d.getTime();
        $scope.timeCount = Math.round($scope.startingTime/1000)%4;
        $scope.playing = [];

        socket.on('getSound', function(data) {
            for (var i=0, iLen=$scope.allAudio.length; i<iLen; i++) {
                if ($scope.allAudio[i].name === data){
                    if($scope.allAudio[i].toggle === true){
                        $scope.allAudio[i].toggle = false;
                    }else{
                        $scope.allAudio[i].toggle = true;
                    }
                }
            }
            $scope.$digest();
        });

        socket.on('getTrueSound', function(data) {
            for (var i=0, iLen=$scope.allAudio.length; i<iLen; i++) {
                if ($scope.allAudio[i].name === data){
                    if($scope.allAudio[i].toggle === false){
                        $scope.allAudio[i].toggle = true;
                    }
                }
            }
            $scope.$digest();
        });



        $scope.setToggle = function(soundIn) {
            socket.emit('sendSound', soundIn.name);
        };

        $scope.initUpdate = function() {
            socket.emit('fullUpdate',"hi");
        };

        socket.on('fullUpdate', function(data) {
            for (var i=0, iLen=$scope.allAudio.length; i<iLen; i++) {
                if($scope.allAudio[i].toggle === true){
                    socket.emit('setSound', $scope.allAudio[i].name);
                }
            }
        });




        $scope.drumAudio = [
            {
                name: 'jazz1',
                toggle: false
            },
            {
                name: 'jazz2',
                toggle: false
            },
            {
                name: 'jazz3',
                toggle: false
            },
            {
                name: 'jazz4',
                toggle: false
            },
            {
                name: 'jazz5',
                toggle: false
            },
            {
                name: 'jazz6',
                toggle: false
            },
            {
                name: 'jazz7',
                toggle: false
            },
            {
                name: 'jazz8',
                toggle: false
            },
            {
                name: 'jazz9',
                toggle: false
            },
            {
                name: 'jazz10',
                toggle: false
            },
            {
                name: 'jazz11',
                toggle: false
            },
            {
                name: 'jazz12',
                toggle: false
            }
            ];

        $scope.allAudio = $scope.drumAudio;


        $scope.updateTime = function() {
            return $scope.timeCount;
        };

        $scope.soundPlay = function() {
                for (var i=0, iLen=$scope.allAudio.length; i<iLen; i++) {
                    if ($scope.allAudio[i].toggle === true) {
                        console.log($scope.allAudio[i].name);
                        var audioIn = document.createElement('audio');
                        audioIn.src = "audio/Jazz/" + $scope.allAudio[i].name + ".wav";
                        audioIn.load();
                        audioIn.play();
                    }
                }
        };

        $interval(function(){
            $scope.timeCount++;
        },1263);

    });
