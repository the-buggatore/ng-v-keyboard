(function () {
  angular.module('TestVirtualKeyboard.pages', []);
  angular.module('TestVirtualKeyboard.pages').controller('keyboardCtrl', ['$scope', function ($scope) {
    $scope.textFromVirtualKeyb = '';
    $scope.keyBoardConf = {kt: 'US International', relative: false, deadkeysOn: false, sizeAdj: false};

    $scope.blockEvent = function ($event, type) {
      var d = new Date();
      console.log(type + ' ' + d.getTime())
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
      '[': ['\u00ab'],
      ']': ['\u00bb'],
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
    for (key in keylayout) {
      $scope.altKeys.push(keylayout[key].toString());
    }

    $scope.keysConf = ['´ 1 2 3 4 5 6 7 8 9 0 - = BKSP', 'TAB q w e r t y u i o p [ ]', 'CAPS a s f g h j k l ; " ENTER', 'ALT z x c v b n m , . /', 'space clear'];
    var conf = $scope.keysConf;
    $scope.keyboardInput = '';

    function altKeyboard() {
      if ($scope.alt) {
        $scope.keysConf = $scope.keysConf.map(function (row) {
          for (char in keylayout) {
            row = row.replace(' ' + ($scope.capsLock ? char.toUpperCase():char) + ' ', ' ' +  ($scope.capsLock ? keylayout[char].toString().toUpperCase():keylayout[char].toString())  + ' ');
          }
          return row;
        });
      }else{
        $scope.keysConf = $scope.keysConf.map(function (row) {
          for (char in keylayout) {
            row = row.replace(' ' + ($scope.capsLock ?  keylayout[char].toString().toUpperCase(): keylayout[char] )  + ' ', ' ' + ($scope.capsLock ? char.toUpperCase():char) + ' ');
          }
          return row;
        });
      }
    }


    function capsLock() {
      $scope.keysConf = $scope.keysConf.map(function (row) {
        return $scope.capsLock  ? row.toUpperCase() : row.toLowerCase();
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
        altKeyboard();
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