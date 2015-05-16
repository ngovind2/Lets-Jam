/**
 * Created by Hackathon on 3/28/2015.
 */
var app = angular.module('coreModule', ['ui.bootstrap','ui.router']);

app.factory('socket', function(){
    return io.connect('http://104.236.28.179:3000/');
});

app.controller('CoreController',
    function($scope,$interval,socket){
        $scope.playing = [];
        $scope.connectCounter = 0;

        socket.on('getSound', function(data) {
            console.log("TESTHEREPLEASE");
            console.log(data + "asdfasdf");
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
            console.log("TESTHEREPLEASE");
            console.log(data + "asdfasdf");
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
            console.log("yay");
            socket.emit('fullUpdate',"hi");
        };

        socket.on('fullUpdate', function(data) {
            console.log("FINALLY");
            for (var i=0, iLen=$scope.allAudio.length; i<iLen; i++) {
                if($scope.allAudio[i].toggle === true){
                    socket.emit('setSound', $scope.allAudio[i].name);
                }
            }
            console.log("WOO!");

        });




        $scope.timeCount = 0;
        $scope.drumAudio = [
            {
                name: 'drums1',
                toggle: false
            },
            {
                name: 'drums2',
                toggle: false
            },
            {
                name: 'drums3',
                toggle: false
            },
            {
                name: 'drums4',
                toggle: false
            },
            {
                name: 'drums5',
                toggle: false
            },
            {
                name: 'drums6',
                toggle: false
            },
            {
                name: 'drums7',
                toggle: false
            },
            {
                name: 'drums8',
                toggle: false
            },
            {
                name: 'drums9',
                toggle: false
            },
            {
                name: 'drums10',
                toggle: false
            },
            {
                name: 'drums11',
                toggle: false
            },
            {
                name: 'drums12',
                toggle: false
            }
            ];
        $scope.guitarAudio = [
            {
                name: 'guitar1',
                toggle: false
            },
            {
                name: 'guitar2',
                toggle: false
            },
            {
                name: 'guitar3',
                toggle: false
            },
            {
                name: 'guitar4',
                toggle: false
            },
            {
                name: 'guitar5',
                toggle: false
            },
            {
                name: 'guitar6',
                toggle: false
            },
            {
                name: 'guitar7',
                toggle: false
            },
            {
                name: 'guitar8',
                toggle: false
            },
            {
                name: 'guitar9',
                toggle: false
            },
            {
                name: 'guitar10',
                toggle: false
            },
            {
                name: 'guitar11',
                toggle: false
            },
            {
                name: 'guitar12',
                toggle: false
            }
        ];

        $scope.allAudio = $scope.drumAudio.concat($scope.guitarAudio);





        $scope.updateTime = function() {
            return $scope.timeCount;
        };

        $scope.soundPlay = function() {
                for (var i=0, iLen=$scope.allAudio.length; i<iLen; i++) {
                    if ($scope.allAudio[i].toggle === true) {
                        console.log($scope.allAudio[i].name);
                        var audioIn = document.createElement('audio');
                        audioIn.src = "audio/" + $scope.allAudio[i].name + ".wav";
                        audioIn.load();
                        audioIn.play();
                    }
                }
        };

        $interval(function(){
            $scope.timeCount++;
        },1250);

    });
