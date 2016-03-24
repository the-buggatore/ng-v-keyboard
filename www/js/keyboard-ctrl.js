(function () {
  'use strict';
  angular.module('TestVirtualKeyboard.pages', []);
  angular.module('TestVirtualKeyboard.pages').controller('keyboardCtrl', ['$scope', function ($scope) {
    $scope.textFromVirtualKeyb = '';
    $scope.keyBoardConf = {kt: 'US International', relative: false, deadkeysOn: false, sizeAdj: false};

    $scope.blockEvent = function ($event, type) {
      $event.preventDefault();
      $event.stopImmediatePropagation();
    };

    $scope.capsLock = false;
    $scope.alt = false;

    var keylayout = {
      a: ['\u00e1'],
      e: ['\u00e9'],
      i: ['\u00ed'],
      o: ['\u00f3'],
      u: ['\u00fa'],
      y: ['\u00fb'],
      p: ['\u00f6'],
      c: ['\u00a9'],
      z: ['\u00e6'],
      q: ['\u00e4'],
      m: ['\u00b5'],
      ',': ['\u00e7'],
      ']': ['\u00bb'],
      '[': ['\u00ab'],
      9: ['\u02bb'],
      0: ['\u02bc'],
      1: ['\u0021'],
      2: ['\u00B2'],
      3: ['\u00B3'],
      5: ['\u20ac'],
      r: ['\u00ae'],
      x: ['\u0026'],
      '=': ['\u0040'],
      '/': ['\u003f']
    };

    $scope.longKey = ['bksp', 'tab', 'shift', 'enter', 'clear', 'caps', 'alt'];
    $scope.caps = ['caps'];
    $scope.altKeys = [];
    for (var key in keylayout) {
      $scope.altKeys.push(keylayout[key].toString());
    }

    $scope.keysConf = ['´ 1 2 3 4 5 6 7 8 9 0 - = BKSP', 'TAB q w e r t y u i o p [ ]', 'CAPS a s f g h j k l ; " ENTER', 'ALT z x c v b n m , . /', 'space clear'];
    var conf = $scope.keysConf;
    $scope.keyboardInput = '';


    function prepareRegEx(char) {
      var specialChars = ['/', '^', '[', '\\', 'w', '&', '.', '-', ']', '+', '$', '/', ']', '?'];
      var regExChar = char.toString();
      if (specialChars.indexOf(regExChar) >= 0) {
        regExChar = '\\' + regExChar;
      }
      return new RegExp('(^|\\s)' + regExChar + '(\\s|$)', 'ig');
    }

    function prepareRegExReplacement(char, capsLock) {
      return '$1' + (capsLock ? char.toString().toUpperCase() : char.toString()) + '$2';
    }

    function replaceChar(row, char, alternate, capsLock) {

      var charToSearch = alternate ? char : keylayout[char];
      var newChar = alternate ? keylayout[char] : char;

      return row.replace(prepareRegEx(charToSearch), prepareRegExReplacement(newChar, capsLock));
    }

    function altKeyboard(alternate, capsLock) {
      $scope.keysConf = $scope.keysConf.map(function (row) {
        for (var char in keylayout) {
          row = replaceChar(row, char, alternate, capsLock);
        }
        return row;
      });
    }


    function capsLock() {
      $scope.keysConf = $scope.keysConf.map(function (row) {
        return $scope.capsLock ? row.toUpperCase() : row.toLowerCase();
      });
      conf = $scope.keysConf;
    }

    function clearInput(input) {
      $scope[input] = '';
    }

    function backSpace(input) {
      $scope[input] = $scope[input].slice(0, -1);
    }

    function applyNewChar(char, input) {
      $scope[input] = $scope[input] + char;
    }

    $scope.keypress = function (key, input) {
      if (_.isUndefined($scope[input])) {
        console.log('no model in scope defined');
        return;
      }

      if (key.toLowerCase() == 'space') {
        key = ' ';
      } else if (key.toLowerCase() == 'tab') {
        key = '\u0009';
      }

      if (key.toLowerCase() == 'bksp') {
        backSpace(input);
      } else if (key.toLowerCase() == 'clear') {
        clearInput(input);
      } else if (key.toLowerCase() == 'alt') {
        $scope.alt = !$scope.alt;
        altKeyboard($scope.alt, $scope.capsLock);
      } else if (key.toLowerCase() == 'caps') {
        $scope.capsLock = !$scope.capsLock;
        capsLock();
      } else if (key.toLowerCase() == 'enter') {
        $scope.showKey = false;
      } else {
        applyNewChar(key, input);
      }

    };

  }]);
})();