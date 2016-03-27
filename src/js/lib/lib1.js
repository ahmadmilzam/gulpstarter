var Lib1 = (function() {
  'use strict';

  function Lib1(args) {
    // enforces new
    if (!(this instanceof Lib1)) {
      return new Lib1(args);
    }
    // constructor body
  }

  Lib1.prototype.methodName = function(args) {
    // method body
  };

  return Lib1;
}());
