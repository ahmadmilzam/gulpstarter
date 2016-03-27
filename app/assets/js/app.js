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

;(function() {
  'use strict';

  console.log('app run');
  alert('gulp build system works!');
}());
//# sourceMappingURL=../sourcemaps/app.js.map
