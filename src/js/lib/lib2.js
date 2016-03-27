var Lib2 = (function() {
  'use strict';

  function Lib2(args) {
    // enforces new
    if (!(this instanceof Lib2)) {
      return new Lib2(args);
    }
    // constructor body
  }

  Lib2.prototype.methodName = function(args) {
    // method body
  };

  return Lib2;
}());
